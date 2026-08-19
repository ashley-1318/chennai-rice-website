import { useState } from 'react'
import { ASSETS, HERO } from '../data/content.js'
import './hero.css'

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <section className="home-hero" id="home">
      {!videoFailed && (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
        >
          <source src={ASSETS.heroVideo} type="video/mp4" />
        </video>
      )}
      {videoFailed && <div className="hero-fallback" />}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">
          {HERO.titleLines.map(line => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="home-hero-sub">{HERO.subtitle}</p>

        <div className="hero-scroll">
          <svg width="24" height="38" viewBox="0 0 24 38" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="22" height="36" rx="11" stroke="#cdb37c" strokeWidth="1.5" />
            <circle className="hero-scroll-dot" cx="12" cy="11" r="2.5" fill="#cdb37c" />
          </svg>
          <span>Scroll</span>
        </div>
      </div>

      <div className="hero-estd">
        <div className="hero-estd-ring">
          <span className="hero-estd-label">Estd</span>
          <span className="hero-estd-year">{HERO.estd}</span>
        </div>
      </div>

      <svg className="hero-curve" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,88 C240,34 520,18 810,34 C1080,49 1290,84 1440,64 L1440,150 L0,150 Z"
          fill="#f8f3e9"
        />
        <path
          d="M0,88 C240,34 520,18 810,34 C1080,49 1290,84 1440,64"
          fill="none"
          stroke="url(#heroGoldRim)"
          strokeWidth="8"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="heroGoldRim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8a6a25" />
            <stop offset="0.35" stopColor="#e3c878" />
            <stop offset="0.65" stopColor="#c69a3f" />
            <stop offset="1" stopColor="#8a6a25" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}
