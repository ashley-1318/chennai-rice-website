import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Img from './Img.jsx'
import { ASSETS, NAV_LINKS, NAV_CTA } from '../data/content.js'
import './navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Only the home page has a dark hero behind the bar. Every other route is
  // cream, where the light nav text would be unreadable while transparent.
  const isHome = pathname === '/'
  const solid = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`nav-bar${solid ? ' nav-solid' : ''}`}>
      <div className="container nav-inner">
        <Link className="nav-logo" to="/" aria-label="Chennai Rice home">
          <Img src={ASSETS.logo} alt="Chennai Rice Industries" />
        </Link>

        <nav className="nav-links">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link nav-active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link className="nav-cta" to={NAV_CTA.to}>
          {NAV_CTA.label}
        </Link>

        <button
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {NAV_LINKS.map(link => (
            <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link className="nav-mobile-cta" to={NAV_CTA.to} onClick={() => setOpen(false)}>
            {NAV_CTA.label}
          </Link>
        </div>
      )}
    </header>
  )
}
