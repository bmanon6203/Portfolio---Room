import { useMemo, useState } from 'react'
import { projects } from '../data/projects.js'
import { categories } from '../data/site.js'
import Media from './Media.jsx'
import Modal from './Modal.jsx'

const SHAPES = ['58% 42% 55% 45% / 48% 55% 45% 52%', '46% 54% 42% 58% / 56% 44% 56% 44%', '50%', '62% 38% 50% 50% / 44% 58% 42% 56%']
const SIZES = ['l', 'm', 's', 'm', 'm', 's', 'l', 's']

export default function Projects() {
  const [cat, setCat] = useState('Tous')
  const [open, setOpen] = useState(null)
  // Catégories affichées = celles qui contiennent des projets (+ catégories inconnues trouvées dans les données)
  const tabs = useMemo(() => {
    const known = categories.filter((c) => projects.some((p) => p.category === c.name))
    const extra = [...new Set(projects.map((p) => p.category))].filter((n) => !categories.some((c) => c.name === n)).map((name) => ({ name, icon: '✦' }))
    return [{ name: 'Tous', icon: '◎' }, ...known, ...extra]
  }, [])
  const count = (n) => (n === 'Tous' ? projects.length : projects.filter((p) => p.category === n).length)

  return (
    <section className="projects" aria-labelledby="t-projects">
      <h2 id="t-projects" className="sr">Projets</h2>
      <div className="filters" role="group" aria-label="Filtrer par catégorie">
        {tabs.map((t, i) => (
          <button key={t.name} className={`pill ${cat === t.name ? 'on' : ''}`} aria-pressed={cat === t.name}
            style={{ '--i': i }} data-cursor="FILTER" onClick={() => setCat(t.name)}>
            <span aria-hidden="true">{t.icon}</span>{t.name}<em>{count(t.name)}</em>
          </button>
        ))}
      </div>
      <div className="bubbles">
        {projects.map((p, i) => {
          const on = cat === 'Tous' || p.category === cat
          return (
            <button key={p.id} className={`bubble ${p.size || SIZES[i % SIZES.length]} ${on ? '' : 'off'}`}
              style={{ '--d': (i % 7) * -0.9 + 's', '--r': SHAPES[i % SHAPES.length] }}
              data-cursor="VIEW" tabIndex={on ? 0 : -1} aria-hidden={!on} aria-label={`${p.title}, ${[p.category, p.year].filter(Boolean).join(', ')}`}
              onClick={() => setOpen(p)}>
              <span className="float">
                <Media className="thumb" src={p.thumbnail} seed={p.title} />
                <span className="cap"><b>{p.title}</b><small>{[p.category, p.year].filter(Boolean).join(' · ')}</small></span>
              </span>
            </button>
          )
        })}
      </div>
      {open && <Modal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
