import { useState } from 'react'
import { site } from '../data/site.js'

// Décor : remplace public/background.jpg ou public/background.mp4 (réglage dans data/site.js)
export default function Background() {
  const { type, src, poster } = site.background
  const [failed, setFailed] = useState(false)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <div className="bg" aria-hidden="true">
      {!failed && type === 'video' && !reduce ? (
        <video src={src} poster={poster} autoPlay loop muted playsInline preload="auto" onError={() => setFailed(true)} />
      ) : !failed ? (
        <img src={type === 'video' ? poster : src} alt="" onError={() => setFailed(true)} />
      ) : null}
      <div className="bg-shade" />
    </div>
  )
}
