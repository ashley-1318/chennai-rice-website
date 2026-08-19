// Vercel serverless function: GET /api/health
export default function handler(req, res) {
  res.status(200).json({ ok: true, hasKey: Boolean(process.env.GROQ_API_KEY) })
}
