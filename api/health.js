// Vercel serverless function: GET /api/health
import { hasStore } from './_lib/consent.js'
import { hasSupabase } from './_lib/supabase.js'

export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    hasKey: Boolean(process.env.GROQ_API_KEY),
    consentStore: hasStore,
    supabase: hasSupabase,
  })
}
