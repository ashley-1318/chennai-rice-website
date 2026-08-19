import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { callGroq } from '../api/_lib/soruKutty.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '200kb' }))

const PORT = process.env.PORT || 8787
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(GROQ_API_KEY) })
})

app.post('/api/chat', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured on the server.' })
  }

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  try {
    const reply = await callGroq({ apiKey: GROQ_API_KEY, model: GROQ_MODEL, messages })
    res.json({ reply })
  } catch (err) {
    console.error('Chat proxy error:', err)
    res.status(err.status || 500).json({ error: err.publicMessage || 'Something went wrong talking to Soru Kutty.' })
  }
})

app.listen(PORT, () => {
  console.log(`Soru Kutty chat proxy listening on http://localhost:${PORT}`)
  if (!GROQ_API_KEY) {
    console.warn('WARNING: GROQ_API_KEY is not set. Add it to server/.env')
  }
})
