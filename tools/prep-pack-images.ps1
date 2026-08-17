Add-Type -AssemblyName System.Drawing

$code = @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class LightKey
{
    // Background test: light and near-grey (white studio wall, podium, soft shadows).
    // Saturated pack colors and true blacks never qualify.
    static bool IsBg(byte[] b, int o, int chromaMax, int lumMin)
    {
        int r = b[o + 2], g = b[o + 1], bl = b[o];
        int max = Math.Max(r, Math.Max(g, bl));
        int min = Math.Min(r, Math.Min(g, bl));
        return (max - min) <= chromaMax && max >= lumMin;
    }

    public static string Process(string src, string dst, int chromaMax, int lumMin, int pad, int targetH)
    {
        Bitmap orig = new Bitmap(src);
        int w = orig.Width, h = orig.Height;
        Bitmap bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(bmp))
            g.DrawImage(orig, new Rectangle(0, 0, w, h));
        orig.Dispose();

        BitmapData data = bmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
        int stride = data.Stride;
        byte[] buf = new byte[stride * h];
        Marshal.Copy(data.Scan0, buf, 0, buf.Length);

        bool[] cleared = new bool[w * h];
        Queue<int> q = new Queue<int>();
        int[] dx = { 1, -1, 0, 0 };
        int[] dy = { 0, 0, 1, -1 };

        // 1. Flood the background in from every border pixel.
        for (int x = 0; x < w; x++) { TrySeed(buf, stride, cleared, q, x, 0, w, chromaMax, lumMin); TrySeed(buf, stride, cleared, q, x, h - 1, w, chromaMax, lumMin); }
        for (int y = 0; y < h; y++) { TrySeed(buf, stride, cleared, q, 0, y, w, chromaMax, lumMin); TrySeed(buf, stride, cleared, q, w - 1, y, w, chromaMax, lumMin); }

        while (q.Count > 0)
        {
            int idx = q.Dequeue();
            int x = idx % w, y = idx / w;
            for (int k = 0; k < 4; k++)
            {
                int nx = x + dx[k], ny = y + dy[k];
                if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                int nidx = ny * w + nx;
                if (cleared[nidx]) continue;
                if (IsBg(buf, ny * stride + nx * 4, chromaMax, lumMin))
                {
                    cleared[nidx] = true;
                    q.Enqueue(nidx);
                }
            }
        }

        // 2. Keep only the largest surviving component (drops the studio watermark island).
        int[] comp = new int[w * h];
        for (int i = 0; i < comp.Length; i++) comp[i] = -1;
        int compCount = 0, bestComp = -1;
        long bestSize = 0;
        Queue<int> cq = new Queue<int>();
        for (int i = 0; i < w * h; i++)
        {
            if (cleared[i] || comp[i] != -1) continue;
            long size = 0;
            comp[i] = compCount;
            cq.Enqueue(i);
            while (cq.Count > 0)
            {
                int idx = cq.Dequeue();
                size++;
                int x = idx % w, y = idx / w;
                for (int k = 0; k < 4; k++)
                {
                    int nx = x + dx[k], ny = y + dy[k];
                    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                    int nidx = ny * w + nx;
                    if (cleared[nidx] || comp[nidx] != -1) continue;
                    comp[nidx] = compCount;
                    cq.Enqueue(nidx);
                }
            }
            if (size > bestSize) { bestSize = size; bestComp = compCount; }
            compCount++;
        }

        for (int i = 0; i < w * h; i++)
            if (!cleared[i] && comp[i] != bestComp) cleared[i] = true;

        // 2b. Repair over-eaten interior: pack faces are horizontally and vertically
        // convex, so any cleared pixel between surviving pixels in BOTH its row and
        // its column is pack content (e.g. a white rice window reaching the pack edge),
        // not background. Restore it.
        int[] rowMin = new int[h], rowMax = new int[h], colMin = new int[w], colMax = new int[w];
        for (int y = 0; y < h; y++) { rowMin[y] = w; rowMax[y] = -1; }
        for (int x = 0; x < w; x++) { colMin[x] = h; colMax[x] = -1; }
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
                if (!cleared[y * w + x])
                {
                    if (x < rowMin[y]) rowMin[y] = x;
                    if (x > rowMax[y]) rowMax[y] = x;
                    if (y < colMin[x]) colMin[x] = y;
                    if (y > colMax[x]) colMax[x] = y;
                }
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                int i = y * w + x;
                if (cleared[i] && x > rowMin[y] && x < rowMax[y] && y > colMin[x] && y < colMax[x])
                    cleared[i] = false;
            }

        // 3. Apply alpha; feather the one-pixel rim so the cut edge sits softly.
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                int o = y * stride + x * 4;
                if (cleared[y * w + x]) { buf[o] = 0; buf[o + 1] = 0; buf[o + 2] = 0; buf[o + 3] = 0; }
            }
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
            {
                int i = y * w + x;
                if (cleared[i]) continue;
                for (int k = 0; k < 4; k++)
                {
                    int nx = x + dx[k], ny = y + dy[k];
                    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                    if (cleared[ny * w + nx]) { buf[y * stride + x * 4 + 3] = 140; break; }
                }
            }

        // 4. Crop to content and scale to a common height.
        int minX = w, minY = h, maxX = -1, maxY = -1;
        for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
                if (buf[y * stride + x * 4 + 3] > 12)
                {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }

        Marshal.Copy(buf, 0, data.Scan0, buf.Length);
        bmp.UnlockBits(data);
        if (maxX < 0) { bmp.Dispose(); return "no content: " + src; }

        minX = Math.Max(0, minX - pad); minY = Math.Max(0, minY - pad);
        maxX = Math.Min(w - 1, maxX + pad); maxY = Math.Min(h - 1, maxY + pad);
        int cw = maxX - minX + 1, ch = maxY - minY + 1;
        Bitmap cropped = bmp.Clone(new Rectangle(minX, minY, cw, ch), PixelFormat.Format32bppArgb);
        bmp.Dispose();

        Bitmap final = cropped;
        if (ch > targetH)
        {
            int nw = (int)Math.Round(cw * (double)targetH / ch);
            Bitmap resized = new Bitmap(nw, targetH, PixelFormat.Format32bppArgb);
            using (Graphics g = Graphics.FromImage(resized))
            {
                g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                g.DrawImage(cropped, new Rectangle(0, 0, nw, targetH));
            }
            cropped.Dispose();
            final = resized;
        }

        final.Save(dst, ImageFormat.Png);
        string res = System.IO.Path.GetFileName(dst) + " -> " + final.Width + "x" + final.Height;
        final.Dispose();
        return res;
    }

    static void TrySeed(byte[] buf, int stride, bool[] cleared, Queue<int> q, int x, int y, int w, int chromaMax, int lumMin)
    {
        int idx = y * w + x;
        if (cleared[idx]) return;
        if (IsBg(buf, y * stride + x * 4, chromaMax, lumMin))
        {
            cleared[idx] = true;
            q.Enqueue(idx);
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

$out = "D:\Product Page\assets"
[LightKey]::Process("D:\Assets\Premium Bag.jpeg",       "$out\pack-premium.png", 32, 55, 4, 820)
[LightKey]::Process("D:\Assets\Raja Bogam Ponni.jpeg",  "$out\pack-red.png",     32, 55, 4, 820)
[LightKey]::Process("D:\Assets\Vada Kolam.jpeg",        "$out\pack-gold.png",    32, 55, 4, 820)
[LightKey]::Process("D:\Assets\Akashaya Ponni.jpeg",    "$out\pack-akshaya.png", 32, 55, 4, 820)
