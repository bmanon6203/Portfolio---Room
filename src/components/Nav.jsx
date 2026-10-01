import Icon from './Icon.jsx'
import { site } from '../data/site.js'

// Objets flottants = navigation. Sur l'accueil : dispersés dans le décor. Dans une section : rangés en dock.
export default function Nav({ view, onGo }) {
  return (
    <nav className="nav" aria-label="Navigation principale">
      {site.nav.map((o, i) => (
        <button key={o.id} className={`obj ${view === o.id ? 'current' : ''}`} data-cursor="OPEN"
          style={{ '--x': o.x + '%', '--y': o.y + '%', '--i': i }} aria-label={`${o.label} — ${o.hint}`}
          aria-current={view === o.id ? 'page' : undefined} onClick={() => onGo(o.id)}>
          <span className="ico" aria-hidden="true"><Icon value={o.icon} /></span>
          <span className="lab"><b>{o.label}</b><small>{o.hint}</small></span>
        </button>
      ))}
    </nav>
  )
}
