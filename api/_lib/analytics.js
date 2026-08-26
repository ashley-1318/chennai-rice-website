// Shared visitor-analytics logic — used by both the Vercel serverless
// functions (api/track/*.js, production) and the local dev proxy
// (server/index.js). Keeping one copy avoids the two drifting apart, the
// same arrangement as _lib/consent.js.
//
// Populated only for visitors who accepted the "analytics" cookie-consent
// category — the frontend hook (src/hooks/useVisitorTracking.js) never
// calls these endpoints otherwise.
import { anonymiseIp, clientIp } from './consent.js'
import { hasSupabase, supabase } from './supabase.js'

const ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/

function str(value, max) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return max ? trimmed.slice(0, max) : trimmed
}

function int(value) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : null
}

/** Very small user-agent sniff — enough to bucket sessions, not a full parser. */
function parseUserAgent(ua) {
  const s = typeof ua === 'string' ? ua : ''
  const device = /Mobi|Android(?!.*Tablet)|iPhone/i.test(s)
    ? 'mobile'
    : /Tablet|iPad/i.test(s)
      ? 'tablet'
      : 'desktop'

  const browser = /Edg\//.test(s)
    ? 'Edge'
    : /OPR\//.test(s)
      ? 'Opera'
      : /Chrome\//.test(s)
        ? 'Chrome'
        : /Firefox\//.test(s)
          ? 'Firefox'
          : /Safari\//.test(s) && /Version\//.test(s)
            ? 'Safari'
            : null

  const os = /Windows/.test(s)
    ? 'Windows'
    : /Mac OS X/.test(s)
      ? 'macOS'
      : /Android/.test(s)
        ? 'Android'
        : /iPhone|iPad|iOS/.test(s)
          ? 'iOS'
          : /Linux/.test(s)
            ? 'Linux'
            : null

  return { device, browser, os }
}

/**
 * Best-effort IP→location lookup via ip-api.com's free, keyless endpoint.
 * Never throws — a failed or rate-limited lookup just means no location on
 * that row, which must not block the session from being recorded.
 */
async function geolocate(ip) {
  if (!ip || ip === '::1' || ip === '127.0.0.1') return {}
  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,regionName,city`
    )
    if (!res.ok) return {}
    const data = await res.json()
    if (data.status !== 'success') return {}
    return { country: data.country || null, region: data.regionName || null, city: data.city || null }
  } catch {
    return {}
  }
}

/**
 * Validates a session-start payload and shapes it into a visitor_sessions
 * row, including a best-effort IP geolocation. Returns { row } or { error }.
 */
export async function buildSessionRow({ body, req }) {
  const visitorId = str(body?.visitorId, 64)
  const sessionId = str(body?.sessionId, 64)
  if (!visitorId || !ID_PATTERN.test(visitorId)) return { error: 'A valid visitorId is required.' }
  if (!sessionId || !ID_PATTERN.test(sessionId)) return { error: 'A valid sessionId is required.' }

  const ip = clientIp(req)
  const { device, browser, os } = parseUserAgent(req.headers?.['user-agent'])
  const location = await geolocate(ip.split(',')[0]?.trim())

  return {
    row: {
      visitor_id: visitorId,
      session_id: sessionId,
      referrer: str(body?.referrer, 512),
      utm_source: str(body?.utmSource, 128),
      utm_medium: str(body?.utmMedium, 128),
      utm_campaign: str(body?.utmCampaign, 128),
      user_agent: str(req.headers?.['user-agent'], 256),
      device_type: device,
      browser,
      os,
      screen_width: int(body?.screenWidth),
      screen_height: int(body?.screenHeight),
      ip_prefix: anonymiseIp(ip),
      ...location,
    },
  }
}

/** Inserts a new session row. Resolves to false when Supabase isn't configured. */
export async function insertSession(row) {
  if (!hasSupabase) return false
  const { error } = await supabase.from('visitor_sessions').insert(row)
  if (error) throw storeError('visitor_sessions', error)
  return true
}

/**
 * Heartbeat: bumps last_seen_at/total_seconds/page_count on an existing
 * session. Silently a no-op if the session id is unknown — a heartbeat for a
 * session the server never saw (e.g. insert failed, or Supabase was briefly
 * unconfigured) must not surface as an error to the visitor's tab.
 */
export async function touchSession({ sessionId, totalSeconds, pageCount }) {
  if (!hasSupabase) return false
  const sid = str(sessionId, 64)
  if (!sid || !ID_PATTERN.test(sid)) return false

  const update = { last_seen_at: new Date().toISOString() }
  const seconds = int(totalSeconds)
  const pages = int(pageCount)
  if (seconds !== null) update.total_seconds = seconds
  if (pages !== null) update.page_count = pages

  const { error } = await supabase.from('visitor_sessions').update(update).eq('session_id', sid)
  if (error) throw storeError('visitor_sessions', error)
  return true
}

/** Validates and inserts one pageview row. */
export async function insertPageview(body) {
  const sessionId = str(body?.sessionId, 64)
  const path = str(body?.path, 512)
  if (!sessionId || !ID_PATTERN.test(sessionId)) return { error: 'A valid sessionId is required.' }
  if (!path) return { error: 'A path is required.' }

  if (!hasSupabase) return { stored: false }

  const { error } = await supabase.from('visitor_pageviews').insert({
    session_id: sessionId,
    path,
    seconds_on_page: int(body?.secondsOnPage) || 0,
  })
  if (error) throw storeError('visitor_pageviews', error)
  return { stored: true }
}

function storeError(table, cause) {
  const err = new Error(`Supabase write to ${table} failed: ${cause.message}`)
  err.status = 502
  err.publicMessage = 'Could not save analytics data.'
  return err
}
