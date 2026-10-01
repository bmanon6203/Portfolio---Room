import { useEffect, useRef } from 'react'
import Media from './Media.jsx'

const Row = ({ label, children }) => children ? <div className="row"><dt>{label}</dt><dd>{children}</dd></div> : null

export default function Modal({ project: p, onClose }) {
  const btn = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    btn.current?.focus()
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus?.() }
  }, [onClose])
  const videos = [p.video, ...(p.videos || [])].filter(Boolean)
  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <article className="sheet" role="dialog" aria-modal="true" aria-labelledby="m-title">
        <button ref={btn} className="close" aria-label="Fermer" data-cursor="CLOSE" onClick={onClose}>✕</button>
        <h3 id="m-title">{p.title}</h3>
        <div className="hero-media">
          {videos[0] ? <video src={videos[0]} poster={p.cover || p.thumbnail} controls playsInline preload="metadata" /> : <Media src={p.cover || p.thumbnail} alt={p.title} seed={p.title} />}
        </div>
        <p className="lead">{p.description}</p>
        {p.details && <p>{p.details}</p>}
        <dl>
          <Row label="Mon rôle">{p.role?.join(', ')}</Row>
          <Row label="Logiciels">{p.software?.join(', ')}</Row>
          <Row label="Catégorie">{p.category}</Row>
          <Row label="Année">{p.year}</Row>
          <Row label="Contexte">{p.client}</Row>
        </dl>
        {videos.slice(1).map((v) => <video key={v} src={v} controls playsInline preload="none" />)}
        {p.images?.length > 0 && <div className="gallery">{p.images.map((s) => <Media key={s} src={s} alt="" seed={p.title} />)}</div>}
        {p.externalLink && <a className="ext" data-cursor="OPEN" href={p.externalLink} target="_blank" rel="noopener noreferrer">Voir le projet en ligne</a>}
      </article>
    </div>
  )
}
