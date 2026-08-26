// STUB — no checkout/payment UI exists in this app yet. Nothing here is
// wired up or called from anywhere today.
//
// `payments` only has an `authenticated`-role SELECT policy (checked against
// the live project) — no INSERT/UPDATE policy, so the browser client can
// never write a payment row directly. Real payment capture has to go through
// a server-role edge function that talks to whatever payment gateway is
// chosen (Razorpay/Stripe/etc — not decided yet) and writes the verified
// result, never trusting amounts posted from the browser. These functions
// are placeholders for that future edge function's client-side call sites.
import { supabase, hasSupabase } from '../lib/supabaseClient.js'

function notImplemented(name) {
  throw new Error(
    `payments.service.${name} is not yet implemented — no checkout UI exists yet, and no ` +
      'payment gateway/edge function has been chosen or built. This stub exists so a future ' +
      'checkout flow has a stable function to call.'
  )
}

/**
 * Start a payment for an order (e.g. create a gateway order/intent server-side).
 * NOT IMPLEMENTED — see file header.
 * @param {{ orderId: string, amount: number }} _input
 * @returns {Promise<never>}
 */
export async function initiatePayment(_input) {
  return notImplemented('initiatePayment')
}

/**
 * Confirm/verify a payment after the gateway redirects back.
 * NOT IMPLEMENTED — see file header.
 * @param {{ orderId: string, transactionId: string }} _input
 * @returns {Promise<never>}
 */
export async function confirmPayment(_input) {
  return notImplemented('confirmPayment')
}

/**
 * Fetch payment records for an order. Real (non-stub) read path — RLS
 * (`payments_select`, authenticated-only) permits a signed-in user to read
 * payments tied to their own orders once such rows exist; returns [] today
 * since nothing creates payment rows yet.
 * @param {string} orderId
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function getPaymentsForOrder(orderId) {
  if (!hasSupabase) {
    throw new Error('Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing).')
  }
  if (!orderId) throw new Error('getPaymentsForOrder requires an orderId.')

  const { data, error } = await supabase.from('payments').select('*').eq('order_id', orderId)
  if (error) throw new Error(`getPaymentsForOrder failed: ${error.message}`)
  return data ?? []
}
