import { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Img from '../../components/Img.jsx'
import useGsapContext from '../../hooks/useGsapContext.js'
import useIsMobile from '../../hooks/useIsMobile.js'
import useCountUp from '../../hooks/useCountUp.js'
import {
  INFRA_ASSETS,
  INFRA_HERO,
  FACILITY_CAPACITY,
  STORAGE_CAPACITY,
  SILO_COUNT,
  PLANNED_CAPACITY,
  SOURCING_STEPS,
  QUALITY_CARDS,
  PROCESSING_STAGES,
  SILO_LOCATIONS,
  PACKAGING_PRODUCTS,
  LOGISTICS_FLOW,
  QC_CARDS,
  INFRA_NUMBERS,
  INFRA_FINAL_CTA,
} from '../../data/infrastructure.js'
import './infrastructure.css'

gsap.registerPlugin(ScrollTrigger)

const ArrowIcon = ({ dir = 'right' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={dir === 'right' ? 'M4 12h15m0 0l-6-6m6 6l-6 6' : 'M20 12H5m0 0l6-6m-6 6l6 6'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DownArrow = () => (
  <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
    <path d="M7 0v18m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* Thin-line editorial icons for the Quality Control cards. */
const QC_ICONS = [
  <path key="a" d="M6 22V10l10-6 10 6v12M11 22v-8h10v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  <path key="b" d="M6 8h20M8 8v18a2 2 0 002 2h12a2 2 0 002-2V8M13 13v9m6-9v9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  <>
    <ellipse key="c1" cx="16" cy="10" rx="6" ry="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path key="c2" d="M10 10v10c0 2 3 4 6 4s6-2 6-4V10" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </>,
  <path key="d" d="M16 4l3.5 8L28 13.5l-6.5 5.5L23 28l-7-4.5L9 28l1.5-9L4 13.5 12.5 12z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
]

function OverviewStat({ stat }) {
  const [ref, display] = useCountUp(stat.value)
  return (
    <div className="infra-stat-block" ref={ref}>
      <span className="infra-stat-value">{display}</span>
      <span className="infra-stat-unit">{stat.unit}</span>
      <span className="infra-stat-label">{stat.label}</span>
    </div>
  )
}

function CapacityCell({ value, unit }) {
  const [ref, display] = useCountUp(value)
  return (
    <div className="infra-capacity-cell" ref={ref}>
      <div className="infra-capacity-value">{display}</div>
      <span className="infra-capacity-unit">{unit}</span>
    </div>
  )
}

function NumberCell({ item }) {
  const [ref, display] = useCountUp(item.value)
  return (
    <div className="infra-reveal" ref={ref}>
      <div className="infra-number-value">{display}</div>
      <span className="infra-number-unit">{item.unit}</span>
      <div className="infra-number-label">{item.label}</div>
      <span className={`infra-number-status${item.status === 'Planned' ? ' is-planned' : ''}`}>{item.status}</span>
    </div>
  )
}

export default function InfrastructurePage() {
  const isMobile = useIsMobile()
  const rootRef = useRef(null)
  const sourcingRef = useRef(null)
  const processingRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [activeStage, setActiveStage] = useState(0)

  useGsapContext(
    () => {
      // Generic fade/rise reveal for anything tagged .infra-reveal.
      gsap.utils.toArray('.infra-reveal').forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('is-in'),
        })
      })

      // Section 01 — gentle parallax drift on the aerial overview image.
      const overviewImg = rootRef.current.querySelector('.infra-overview-frame img')
      if (overviewImg) {
        gsap.to(overviewImg, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: overviewImg,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Section 06 — parallax on the silo aerial image.
      const siloImg = rootRef.current.querySelector('.infra-silos-media img')
      if (siloImg) {
        gsap.to(siloImg, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: siloImg,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (isMobile) return

      // Section 02 — paddy-to-processing: pin the section, swap active step
      // as the user scrolls through four bands.
      const sourcingSection = sourcingRef.current
      if (sourcingSection) {
        const steps = gsap.utils.toArray('.infra-step', sourcingSection)
        ScrollTrigger.create({
          trigger: sourcingSection,
          start: 'top top+=90',
          end: () => `+=${steps.length * 260}`,
          onUpdate: self => {
            const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
            setActiveStep(idx)
          },
        })
      }

      // Section 04 — processing sequence: same pattern across ten stages.
      const processingSection = processingRef.current
      if (processingSection) {
        const stages = gsap.utils.toArray('.infra-process-stage', processingSection)
        ScrollTrigger.create({
          trigger: processingSection,
          start: 'top top+=90',
          end: () => `+=${stages.length * 220}`,
          onUpdate: self => {
            const idx = Math.min(stages.length - 1, Math.floor(self.progress * stages.length))
            setActiveStage(idx)
          },
        })
      }
    },
    rootRef,
    [isMobile]
  )

  const activeStageId = PROCESSING_STAGES[activeStage]?.id

  return (
    <main className="infra" ref={rootRef}>
      {/* ===================== HERO ===================== */}
      <section className="infra-hero">
        <div className="infra-hero-media">
          <Img src={INFRA_ASSETS.heroImage} fallback={INFRA_ASSETS.fallback} alt="Aerial view of Chennai Rice infrastructure" />
        </div>
        <div className="infra-wrap infra-hero-inner">
          <span className="infra-eyebrow on-dark">{INFRA_HERO.label}</span>
          <h1 className="infra-title on-dark infra-hero-title">
            {INFRA_HERO.titleLines.map(line => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="infra-hero-sub">{INFRA_HERO.subtitle}</p>
          <a className="infra-hero-cta" href="#infra-overview">
            {INFRA_HERO.cta}
            <DownArrow />
          </a>
        </div>
      </section>

      {/* ===================== 01 FACILITY OVERVIEW ===================== */}
      <section className="infra-overview" id="infra-overview">
        <div className="infra-wrap">
          <div className="infra-overview-frame infra-reveal">
            <Img src={INFRA_ASSETS.facilityAerial} fallback={INFRA_ASSETS.fallback} alt="Aerial view of the Chennai Rice processing facility" />
            <span className="infra-overview-label">Chennai Rice Infrastructure</span>
            <div className="infra-overview-stats">
              <OverviewStat stat={FACILITY_CAPACITY} />
              <OverviewStat stat={STORAGE_CAPACITY} />
              <OverviewStat stat={SILO_COUNT} />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 02 PADDY TO PROCESSING ===================== */}
      <section className="infra-sourcing" ref={sourcingRef}>
        <div className="infra-wrap">
          <div className="infra-section-head infra-reveal">
            <span className="infra-eyebrow">From Sourcing to Storage</span>
            <h2 className="infra-title">From Paddy Fields to Precision</h2>
            <p className="infra-lede">
              Every batch of paddy is selected, inspected and moved under controlled conditions before it ever
              reaches the mill — the first step in preserving quality at every stage.
            </p>
          </div>

          <div className="infra-steps">
            <div className="infra-steps-list">
              {SOURCING_STEPS.map((step, index) => (
                <div
                  key={step.num}
                  className={`infra-step${index === activeStep ? ' is-active' : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="infra-step-num">{step.num}</span>
                  <div>
                    <div className="infra-step-title">{step.title}</div>
                    <p className="infra-step-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="infra-step-frame">
              {SOURCING_STEPS.map((step, index) => (
                <Img
                  key={step.num}
                  className={index === activeStep ? 'is-active' : ''}
                  src={INFRA_ASSETS[step.image]}
                  fallback={INFRA_ASSETS.fallback}
                  alt={step.title}
                  style={{ position: 'absolute', inset: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 03 QUALITY ===================== */}
      <section className="infra-quality">
        <div className="infra-wrap">
          <div className="infra-section-head infra-reveal">
            <span className="infra-eyebrow">Before It Reaches the Mill</span>
            <h2 className="infra-title">Quality Starts Before Processing</h2>
          </div>

          <div className="infra-quality-grid">
            <div className="infra-quality-media infra-reveal">
              <Img src={INFRA_ASSETS.paddyMacro} fallback={INFRA_ASSETS.fallback} alt="Close-up of paddy grain" />
            </div>
            <div className="infra-quality-cards infra-reveal">
              {QUALITY_CARDS.map(card => (
                <div className="infra-quality-card" key={card.title}>
                  <div className="infra-quality-card-title">{card.title}</div>
                  <p className="infra-quality-card-text">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 04 PROCESSING ===================== */}
      <section className="infra-processing" ref={processingRef}>
        <div className="infra-wrap">
          <div className="infra-processing-head infra-reveal">
            <span className="infra-eyebrow on-dark">Milling & Polishing</span>
            <h2 className="infra-title on-dark">
              Precision Processing.
              <br />
              Modern Technology.
            </h2>
          </div>

          <div className="infra-process-layout">
            <div className="infra-process-media">
              {PROCESSING_STAGES.map(stage => (
                <Img
                  key={stage.id}
                  className={stage.id === activeStageId ? 'is-active' : ''}
                  src={INFRA_ASSETS.processing[stage.id]}
                  fallback={INFRA_ASSETS.fallback}
                  alt={stage.title}
                  style={{ position: 'absolute', inset: 0 }}
                />
              ))}
              <span className="infra-process-media-num">
                {PROCESSING_STAGES[activeStage]?.num} / {PROCESSING_STAGES.length}
              </span>
            </div>

            <div className="infra-process-list">
              {PROCESSING_STAGES.map((stage, index) => (
                <div
                  key={stage.id}
                  className={`infra-process-stage${index === activeStage ? ' is-active' : ''}`}
                  onClick={() => setActiveStage(index)}
                >
                  <span className="infra-process-stage-num">{stage.num}</span>
                  <div>
                    <div className="infra-process-stage-title">{stage.title}</div>
                    <p className="infra-process-stage-text">{stage.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 05 CAPACITY ===================== */}
      <section className="infra-capacity">
        <div className="infra-wrap">
          <div className="infra-section-head infra-reveal">
            <span className="infra-eyebrow">Scale & Capacity</span>
            <h2 className="infra-title">Capacity Built to Serve</h2>
          </div>

          <div className="infra-capacity-stats infra-reveal">
            <CapacityCell value={FACILITY_CAPACITY.value} unit="MTPA" />
            <CapacityCell value={STORAGE_CAPACITY.value} unit="MT STORAGE" />
            <CapacityCell value={SILO_COUNT.value} unit="SILOS" />
          </div>

          <div className="infra-expansion infra-reveal">
            <div>
              <span className="infra-tag is-planned">{PLANNED_CAPACITY.status}</span>
              <div className="infra-expansion-label" style={{ marginTop: 20 }}>The Next Generation</div>
              <p className="infra-expansion-text">{PLANNED_CAPACITY.description}</p>
            </div>
            <div className="infra-expansion-figure">
              <div className="infra-capacity-value">{PLANNED_CAPACITY.value}</div>
              <span className="infra-capacity-unit">{PLANNED_CAPACITY.unit}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 06 SILO STORAGE ===================== */}
      <section className="infra-silos">
        <div className="infra-wrap infra-silos-grid">
          <div className="infra-silos-media infra-reveal">
            <Img src={INFRA_ASSETS.siloAerial} fallback={INFRA_ASSETS.fallback} alt="Aerial view of the Chennai Rice silo storage yard" />
          </div>
          <div className="infra-silos-copy infra-reveal">
            <span className="infra-eyebrow on-dark">Storage & Inventory</span>
            <h2 className="infra-title on-dark">Storage Built for Stability</h2>
            <p className="infra-silos-text">
              Modern silo infrastructure supports efficient paddy storage and inventory management.
            </p>
            <div className="infra-silo-numbers">
              {SILO_LOCATIONS.map(silo => (
                <div key={silo.location}>
                  <div className="infra-silo-num-value">{silo.value}</div>
                  <div className="infra-silo-num-unit">{silo.unit}</div>
                  <div className="infra-silo-num-location">{silo.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 07 PACKAGING ===================== */}
      <section className="infra-packaging">
        <div className="infra-wrap">
          <div className="infra-section-head infra-reveal">
            <span className="infra-eyebrow">Packed to Protect</span>
            <h2 className="infra-title">Packed to Protect Quality</h2>
          </div>

          <div className="infra-pack-track">
            {PACKAGING_PRODUCTS.map(product => (
              <div className="infra-pack-card infra-reveal" key={product.name}>
                <div className="infra-pack-frame">
                  <Img src={product.image} fallback={product.fallback} alt={`${product.name} pack`} />
                </div>
                <div className="infra-pack-name">{product.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 08 WAREHOUSE & LOGISTICS ===================== */}
      <section className="infra-logistics">
        <div className="infra-wrap">
          <div className="infra-section-head infra-reveal">
            <span className="infra-eyebrow">Distribution</span>
            <h2 className="infra-title">From Our Facility to Your Market</h2>
          </div>

          <div className="infra-warehouse-frame infra-reveal">
            <Img src={INFRA_ASSETS.warehouse} fallback={INFRA_ASSETS.fallback} alt="Chennai Rice warehouse" />
          </div>

          <div className="infra-flow infra-reveal">
            {LOGISTICS_FLOW.map((node, index) => (
              <Fragment key={node}>
                <div className="infra-flow-node">
                  <div className="infra-flow-node-label">{node}</div>
                </div>
                {index < LOGISTICS_FLOW.length - 1 && (
                  <div className="infra-flow-arrow">
                    <ArrowIcon />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <div className="infra-truck-strip infra-reveal">
            <Img src={INFRA_ASSETS.truck} fallback={INFRA_ASSETS.fallback} alt="" aria-hidden="true" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
            <span>On the Road to Every Market</span>
          </div>
        </div>
      </section>

      {/* ===================== 09 QUALITY CONTROL ===================== */}
      <section className="infra-qc">
        <div className="infra-wrap">
          <div className="infra-section-head infra-reveal">
            <span className="infra-eyebrow on-dark">Checked at Every Stage</span>
            <h2 className="infra-title on-dark">
              Every Grain.
              <br />
              Checked With Care.
            </h2>
          </div>

          <div className="infra-qc-grid infra-reveal">
            {QC_CARDS.map((card, index) => (
              <div className="infra-qc-card" key={card.num}>
                <div className="infra-qc-num">{card.num}</div>
                <svg className="infra-qc-icon" width="36" height="36" viewBox="0 0 32 32" fill="none">
                  {QC_ICONS[index]}
                </svg>
                <div className="infra-qc-title">{card.title}</div>
                <p className="infra-qc-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 10 INFRASTRUCTURE NUMBERS ===================== */}
      <section className="infra-numbers">
        <div className="infra-wrap">
          <div className="infra-section-head infra-reveal" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <span className="infra-eyebrow">At a Glance</span>
            <h2 className="infra-title">Infrastructure Numbers</h2>
          </div>
          <div className="infra-numbers-grid">
            {INFRA_NUMBERS.map(item => (
              <NumberCell item={item} key={item.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 11 FINAL CTA ===================== */}
      <section className="infra-final">
        <div className="infra-final-media">
          <Img src={INFRA_ASSETS.fieldLandscape} fallback={INFRA_ASSETS.fallback} alt="Chennai Rice fields at dusk" />
        </div>
        <div className="infra-final-inner">
          <h2 className="infra-title on-dark infra-final-title">{INFRA_FINAL_CTA.title}</h2>
          <p className="infra-final-text">{INFRA_FINAL_CTA.text}</p>
          <Link className="infra-btn infra-final-cta" to={INFRA_FINAL_CTA.to}>
            {INFRA_FINAL_CTA.cta}
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  )
}
