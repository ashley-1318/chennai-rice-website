import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { callGroq } from '../api/_lib/soruKutty.js'
import {
  POLICY_VERSION,
  buildRecord,
  clientIp,
  hasStore,
  readRecord,
  saveRecord,
} from '../api/_lib/consent.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '200kb' }))

const PORT = process.env.PORT || 8787
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(GROQ_API_KEY), consentStore: hasStore })
})

/* Cookie consent — mirrors api/consent.js so the banner behaves the same
   against the dev proxy as it does on Vercel. */
app.get('/api/consent', async (req, res) => {
  const { id } = req.query
  if (!id) return res.json({ policyVersion: POLICY_VERSION, stored: hasStore })

  try {
    const record = await readRecord(id)
    if (!record) return res.status(404).json({ error: 'No consent recorded for that id.' })
    res.json({ consent: record })
  } catch (err) {
    console.error('Consent read error:', err)
    res.status(err.status || 500).json({ error: err.publicMessage || 'Could not read the consent record.' })
  }
})

app.post('/api/consent', async (req, res) => {
  const { record, error } = buildRecord({
    body: req.body,
    ip: clientIp(req),
    userAgent: req.headers['user-agent'],
    now: Date.now(),
  })
  if (error) return res.status(400).json({ error })

  try {
    const stored = await saveRecord(record)
    res.json({ consent: record, stored })
  } catch (err) {
    console.error('Consent write error:', err)
    res.status(err.status || 500).json({ error: err.publicMessage || 'Could not record the consent.' })
  }
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
