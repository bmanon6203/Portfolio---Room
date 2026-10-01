import { useState } from 'react'
import CvLink from './CvLink.jsx'
import { site, skills } from '../data/site.js'

const ring = (list, r, off) => list.map((name, i) => {
  const a = (i / list.length) * Math.PI * 2 + off
  return { name, x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) }
})

// Constellation : logiciels sur l'orbite extérieure, qualités sur l'orbite intérieure.
export default function Profile() {
  const [sel, setSel] = useState(null)
  const nodes = [
    ...ring(skills.hard, 40, -Math.PI / 2).map((n) => ({ ...n, kind: 'hard', tag: 'Logiciel' })),
    ...ring(skills.soft, 22, -Math.PI / 2 + 0.4).map((n) => ({ ...n, kind: 'soft', tag: 'Qualité' }))
  ]
  return (
    <section className="profile" aria-labelledby="t-profile">
      <div className="prose">
        <h2 id="t-profile">{site.profile.title}</h2>
        {site.profile.text.map((t, i) => <p key={i}>{t}</p>)}
        <p className="legend"><i className="dot hard" />Logiciels (hard skills)<i className="dot soft" />Qualités (soft skills)</p>
        <p className="caption" aria-live="polite">{sel ? `${sel.name} — ${sel.tag}` : 'Touche une étoile pour explorer mes compétences.'}</p>
        <CvLink />
      </div>
      <div className="constellation">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {nodes.map((n) => <line key={n.name} x1="50" y1="50" x2={n.x} y2={n.y} className={sel?.name === n.name ? 'on' : ''} />)}
        </svg>
        <div className="core">{site.name}</div>
        {nodes.map((n, i) => (
          <button key={n.name} className={`star ${n.kind} ${sel?.name === n.name ? 'on' : ''}`} data-cursor="+"
            style={{ left: n.x + '%', top: n.y + '%', '--d': (i % 5) * 0.7 + 's' }}
            onClick={() => setSel(n)} onMouseEnter={() => setSel(n)} onFocus={() => setSel(n)}>
            <span>{n.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
