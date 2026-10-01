import { useState } from 'react'

// Image avec repli automatique (dégradé) si le fichier n'existe pas encore.
export default function Media({ src, alt = '', seed = '', className = '' }) {
  const [bad, setBad] = useState(!src)
  const hue = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) * 37 % 360
  if (bad) return <span className={`ph ${className}`} style={{ '--h': hue }} aria-hidden="true">{seed[0]}</span>
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} />
}
