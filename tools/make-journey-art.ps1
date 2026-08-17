# Generates the winding journey road and the milestone thumbnails.
#
# The road is generated rather than hand-drawn so its curve passes exactly
# through the pin coordinates the stylesheet uses. Change STOPS / ROW / AMP
# here and in the .journey-map CSS block together.

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$assets = "D:\Product Page\assets"
$journey = Join-Path $assets "journey"
New-Item -ItemType Directory -Force -Path $journey | Out-Null

# ------------------------------------------------------------------ road ---
$STOPS = 10      # number of milestones
$ROW   = 150     # vertical gap between stops (px)
$AMP   = 72      # how far the road swings either side of centre
$CX    = 160     # centre line of the road column
$LEAD  = 90      # space above the first stop / below the last

$H = $LEAD * 2 + ($STOPS - 1) * $ROW

# x alternates right, left, right ... so consecutive pins sit on opposite bends
function StopX([int]$i) { if ($i % 2 -eq 0) { $CX + $AMP } else { $CX - $AMP } }
function StopY([int]$i) { $LEAD + $i * $ROW }

$pts = @()
$pts += ,@((StopX 0), 0)
for ($i = 0; $i -lt $STOPS; $i++) { $pts += ,@((StopX $i), (StopY $i)) }
$pts += ,@((StopX ($STOPS - 1)), $H)

$d = "M{0} {1}" -f $pts[0][0], $pts[0][1]
for ($i = 1; $i -lt $pts.Count; $i++) {
  $x1 = $pts[$i - 1][0]; $y1 = $pts[$i - 1][1]
  $x2 = $pts[$i][0];     $y2 = $pts[$i][1]
  $mid = ($y2 - $y1) / 2
  $d += " C{0} {1} {2} {3} {4} {5}" -f $x1, ($y1 + $mid), $x2, ($y2 - $mid), $x2, $y2
}

$r = New-Object System.Text.StringBuilder
function AddRoad([string]$s) { [void]$r.AppendLine($s) }
AddRoad ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 {0}" width="320" height="{0}" aria-hidden="true">' -f $H)
AddRoad '  <defs>'
AddRoad '    <linearGradient id="tar" x1="0" y1="0" x2="1" y2="0">'
AddRoad '      <stop offset="0" stop-color="#332B28"/>'
AddRoad '      <stop offset="0.5" stop-color="#4A403C"/>'
AddRoad '      <stop offset="1" stop-color="#2C2523"/>'
AddRoad '    </linearGradient>'
AddRoad ('    <linearGradient id="fadeG" x1="0" y1="0" x2="0" y2="1">')
AddRoad ('      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>')
AddRoad ('      <stop offset="0.05" stop-color="#ffffff" stop-opacity="1"/>')
AddRoad ('      <stop offset="0.95" stop-color="#ffffff" stop-opacity="1"/>')
AddRoad ('      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>')
AddRoad ('    </linearGradient>')
AddRoad ('    <mask id="fade"><rect x="0" y="0" width="320" height="{0}" fill="url(#fadeG)"/></mask>' -f $H)
AddRoad '  </defs>'
AddRoad '  <g mask="url(#fade)">'
AddRoad ('  <path d="{0}" fill="none" stroke="#2B1B16" stroke-opacity="0.13" stroke-width="66" stroke-linecap="round" transform="translate(0 7)"/>' -f $d)
AddRoad ('  <path d="{0}" fill="none" stroke="#C9A44C" stroke-opacity="0.45" stroke-width="60" stroke-linecap="round"/>' -f $d)
AddRoad ('  <path d="{0}" fill="none" stroke="url(#tar)" stroke-width="54" stroke-linecap="round"/>' -f $d)
AddRoad ('  <path d="{0}" fill="none" stroke="#FBF6EC" stroke-opacity="0.75" stroke-width="3" stroke-linecap="round" stroke-dasharray="20 18"/>' -f $d)
AddRoad '  </g>'
AddRoad '</svg>'
[System.IO.File]::WriteAllText((Join-Path $assets "road.svg"), $r.ToString(), $utf8NoBom)

# ------------------------------------------------------- milestone thumbs ---
# Flat illustrations in the site palette, sized for the hover popover.

function Thumb([string]$name, [string]$body) {
  $s = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200" role="img" aria-label="$name">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FBF6EC"/><stop offset="1" stop-color="#EFE3C8"/>
    </linearGradient>
  </defs>
  <rect width="320" height="200" fill="url(#bg)"/>
$body
</svg>
"@
  [System.IO.File]::WriteAllText((Join-Path $journey "$name.svg"), $s, $utf8NoBom)
}

Thumb "mill" @'
  <rect x="0" y="150" width="320" height="50" fill="#D6C298"/>
  <rect x="42" y="86" width="128" height="66" fill="#FDFBF5" stroke="#C9B896" stroke-width="2"/>
  <path d="M34 88 L106 52 L178 88 Z" fill="#6E1B22"/>
  <rect x="62" y="108" width="20" height="26" fill="#E3D3B0"/>
  <rect x="96" y="108" width="20" height="26" fill="#E3D3B0"/>
  <rect x="130" y="108" width="20" height="26" fill="#E3D3B0"/>
  <rect x="196" y="70" width="26" height="82" fill="#C9A44C"/>
  <rect x="236" y="96" width="56" height="56" fill="#FDFBF5" stroke="#C9B896" stroke-width="2"/>
  <path d="M230 98 L264 74 L298 98 Z" fill="#8A2A31"/>
'@

Thumb "silo" @'
  <rect x="0" y="150" width="320" height="50" fill="#D6C298"/>
  <g fill="#EFE6D2" stroke="#C9B896" stroke-width="2">
    <rect x="34" y="72" width="52" height="80"/><rect x="100" y="72" width="52" height="80"/>
    <rect x="166" y="72" width="52" height="80"/><rect x="232" y="72" width="52" height="80"/>
  </g>
  <g fill="#B9A87F">
    <path d="M30 74 L60 46 L90 74 Z"/><path d="M96 74 L126 46 L156 74 Z"/>
    <path d="M162 74 L192 46 L222 74 Z"/><path d="M228 74 L258 46 L288 74 Z"/>
  </g>
  <g fill="#C9A44C" fill-opacity="0.5">
    <rect x="34" y="104" width="52" height="4"/><rect x="100" y="104" width="52" height="4"/>
    <rect x="166" y="104" width="52" height="4"/><rect x="232" y="104" width="52" height="4"/>
  </g>
'@

Thumb "upgrade" @'
  <rect x="0" y="150" width="320" height="50" fill="#D6C298"/>
  <rect x="30" y="112" width="260" height="16" rx="8" fill="#4A403C"/>
  <g fill="#C9A44C"><circle cx="60" cy="120" r="14"/><circle cx="120" cy="120" r="14"/><circle cx="180" cy="120" r="14"/><circle cx="240" cy="120" r="14"/></g>
  <g fill="#6E1B22">
    <circle cx="120" cy="66" r="30"/><circle cx="120" cy="66" r="12" fill="#FBF6EC"/>
    <rect x="114" y="26" width="12" height="16"/><rect x="114" y="90" width="12" height="16"/>
    <rect x="80" y="60" width="16" height="12"/><rect x="144" y="60" width="16" height="12"/>
  </g>
  <g fill="#A87A22">
    <circle cx="196" cy="82" r="20"/><circle cx="196" cy="82" r="8" fill="#FBF6EC"/>
    <rect x="191" y="54" width="10" height="12"/><rect x="191" y="98" width="10" height="12"/>
  </g>
'@

Thumb "energy" @'
  <rect x="0" y="150" width="320" height="50" fill="#D6C298"/>
  <circle cx="256" cy="56" r="26" fill="#E8C766"/>
  <g stroke="#A87A22" stroke-width="4" stroke-linecap="round" fill="none">
    <path d="M92 150 L92 66"/><path d="M186 150 L186 88"/>
  </g>
  <g fill="#6E1B22">
    <path d="M92 62 L86 20 L98 20 Z"/><path d="M92 62 L130 78 L124 88 Z"/><path d="M92 62 L54 78 L60 88 Z"/>
    <circle cx="92" cy="63" r="6"/>
  </g>
  <g fill="#8A2A31">
    <path d="M186 86 L181 52 L191 52 Z"/><path d="M186 86 L216 98 L211 106 Z"/><path d="M186 86 L156 98 L161 106 Z"/>
    <circle cx="186" cy="87" r="5"/>
  </g>
  <g fill="#C9A44C"><rect x="230" y="112" width="64" height="38" rx="3"/></g>
  <g stroke="#FBF6EC" stroke-width="2"><path d="M246 112 L246 150"/><path d="M262 112 L262 150"/><path d="M278 112 L278 150"/></g>
'@

Thumb "foodpark" @'
  <rect x="0" y="150" width="320" height="50" fill="#D6C298"/>
  <g fill="#FDFBF5" stroke="#C9B896" stroke-width="2">
    <rect x="26" y="98" width="80" height="54"/><rect x="118" y="80" width="88" height="72"/><rect x="218" y="106" width="76" height="46"/>
  </g>
  <g fill="#6E1B22"><rect x="20" y="90" width="92" height="10"/><rect x="112" y="72" width="100" height="10"/><rect x="212" y="98" width="88" height="10"/></g>
  <g fill="#E3D3B0">
    <rect x="42" y="114" width="18" height="20"/><rect x="72" y="114" width="18" height="20"/>
    <rect x="134" y="96" width="20" height="22"/><rect x="168" y="96" width="20" height="22"/>
    <rect x="134" y="128" width="20" height="22"/><rect x="168" y="128" width="20" height="22"/>
    <rect x="234" y="120" width="18" height="20"/><rect x="264" y="120" width="18" height="20"/>
  </g>
'@

Thumb "award" @'
  <rect x="0" y="150" width="320" height="50" fill="#D6C298"/>
  <circle cx="160" cy="88" r="46" fill="#6E1B22"/>
  <circle cx="160" cy="88" r="46" fill="none" stroke="#C9A44C" stroke-width="4"/>
  <path d="M160 62 l7 17 18 2 -13 13 3 18 -15 -9 -15 9 3 -18 -13 -13 18 -2 Z" fill="#E8C766"/>
  <g fill="none" stroke="#A87A22" stroke-width="5" stroke-linecap="round">
    <path d="M96 96 C82 122 92 146 112 152"/><path d="M224 96 C238 122 228 146 208 152"/>
  </g>
  <rect x="128" y="140" width="64" height="10" rx="5" fill="#C9A44C"/>
'@

"road.svg  -> {0} bytes (height {1}px)" -f (Get-Item -LiteralPath (Join-Path $assets "road.svg")).Length, $H
Get-ChildItem -LiteralPath $journey -Filter *.svg | ForEach-Object {
  $x = New-Object System.Xml.XmlDocument
  try { $x.Load($_.FullName); "  {0,-16} ok" -f $_.Name } catch { "  {0,-16} INVALID" -f $_.Name }
}
