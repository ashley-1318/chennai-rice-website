import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookieConsent } from './useCookieConsent.jsx'

/**
 * Visitor analytics: a unique visitor id, a per-tab session, pages visited,
 * and time spent, stored in Supabase (see api/track/*.js). Runs only once
 * the visitor has accepted the "analytics" cookie category — nothing here
 * ever fires before that, and everything stops the moment consent is
 * withdrawn (rejecting after having accepted does not retroactively delete
 * what was already recorded, the same as any other analytics tool).
 */

const VISITOR_KEY = 'chennai-rice-visitor-id'
const HEARTBEAT_MS = 20_000

function newId() {
  try {
    return crypto.randomUUID().replace(/-/g, '')
  } catch {
    return `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
  }
}

/** Stable per-browser id, reused across visits. */
function getVisitorId() {
  try {
    let id = window.localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = newId()
      window.localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return newId()
  }
}

/** Per-tab id: a page reload should still count as the same session. */
function getSessionId() {
  try {
    let id = window.sessionStorage.getItem('chennai-rice-session-id')
    if (!id) {
      id = newId()
      window.sessionStorage.setItem('chennai-rice-session-id', id)
    }
    return id
  } catch {
    return newId()
  }
}

function utmFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search)
    return {
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    }
  } catch {
    return {}
  }
}

function post(path, body) {
  return fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    /* Analytics is best-effort — a dropped beat must never affect the page. */
  })
}

export function useVisitorTracking() {
  const { allowAnalytics } = useCookieConsent()
  const { pathname } = useLocation()

  const sessionRef = useRef({ started: false, sessionId: null, totalSeconds: 0, pageCount: 0 })
  const pageRef = useRef({ path: null, enteredAt: null })

  // Start the session exactly once, the first time analytics is allowed.
  useEffect(() => {
    if (!allowAnalytics || sessionRef.current.started) return
    sessionRef.current.started = true
    sessionRef.current.sessionId = getSessionId()

    post('/api/track/session', {
      visitorId: getVisitorId(),
      sessionId: sessionRef.current.sessionId,
      referrer: document.referrer || undefined,
      screenWidth: window.screen?.width,
      screenHeight: window.screen?.height,
      ...utmFromUrl(),
    })
  }, [allowAnalytics])

  // Heartbeat while the tab is visible, so total_seconds stays accurate even
  // if the visitor never triggers a clean "unload".
  useEffect(() => {
    if (!allowAnalytics) return

    const tick = () => {
      if (document.visibilityState !== 'visible' || !sessionRef.current.sessionId) return
      sessionRef.current.totalSeconds += HEARTBEAT_MS / 1000
      post('/api/track/heartbeat', {
        sessionId: sessionRef.current.sessionId,
        totalSeconds: Math.round(sessionRef.current.totalSeconds),
        pageCount: sessionRef.current.pageCount,
      })
    }

    const interval = setInterval(tick, HEARTBEAT_MS)
    return () => clearInterval(interval)
  }, [allowAnalytics])

  // One pageview per route change, carrying the time spent on whichever
  // page was open before it.
  useEffect(() => {
    if (!allowAnalytics || !sessionRef.current.sessionId) return

    const prev = pageRef.current
    if (prev.path) {
      const seconds = Math.round((Date.now() - prev.enteredAt) / 1000)
      post('/api/track/pageview', { sessionId: sessionRef.current.sessionId, path: prev.path, secondsOnPage: seconds })
    }

    pageRef.current = { path: pathname, enteredAt: Date.now() }
    sessionRef.current.pageCount += 1
  }, [allowAnalytics, pathname])

  // Flush the final page's time when the tab actually closes.
  useEffect(() => {
    if (!allowAnalytics) return

    const onUnload = () => {
      const prev = pageRef.current
      if (!prev.path || !sessionRef.current.sessionId) return
      const seconds = Math.round((Date.now() - prev.enteredAt) / 1000)
      navigator.sendBeacon?.(
        '/api/track/pageview',
        new Blob([JSON.stringify({ sessionId: sessionRef.current.sessionId, path: prev.path, secondsOnPage: seconds })], {
          type: 'application/json',
        })
      )
    }

    window.addEventListener('pagehide', onUnload)
    return () => window.removeEventListener('pagehide', onUnload)
  }, [allowAnalytics])
}
