import Img from './Img.jsx'
import SectionHead from './SectionHead.jsx'
import { ASSETS, CELEBS, CELEB_HEAD } from '../data/content.js'
import './celebrities.css'

export default function Celebrities() {
  return (
    <section className="celeb">
      <Img className="celeb-decor celeb-decor-left" src={ASSETS.wheatRight} alt="" aria-hidden="true" />
      <Img className="celeb-decor celeb-decor-right" src={ASSETS.wheatRight} alt="" aria-hidden="true" />

      <div className="celeb-head">
        <SectionHead label={CELEB_HEAD.label} title={CELEB_HEAD.title} />
      </div>

      <div className="container celeb-grid">
        {CELEBS.map(c => (
          <div className="celeb-pair" key={c.name}>
            <div className="celeb-figure" style={{ '--fig-scale': c.scale ?? 1 }}>
              <Img src={c.image} alt={c.name} />
            </div>
            <div className="celeb-text">
              <h3 className="celeb-name">{c.name}</h3>
              <div className="celeb-rule" />
              <p className="celeb-quote">&ldquo;{c.quote}&rdquo;</p>
              <div className="celeb-sign">{c.signature}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
