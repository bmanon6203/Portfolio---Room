import { useEffect, useRef } from 'react'

// Curseur minimaliste + parallax (variables --mx / --my) : un seul écouteur, animation par transform.
export default function Cursor() {
  const el = useRef(null)
  useEffect(() => {
    const root = document.documentElement
    const fine = matchMedia('(pointer: fine)').matches
    const move = (e) => {
      root.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3))
      root.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3))
      if (!fine) return
      tx = e.clientX; ty = e.clientY
      const label = e.target.closest?.('[data-cursor]')?.dataset.cursor || ''
      el.current.firstChild.textContent = label
      el.current.classList.toggle('big', !!label)
    }
    let x = 0, y = 0, tx = 0, ty = 0, raf
    const loop = () => {
      x += (tx - x) * 0.25; y += (ty - y) * 0.25
      el.current.style.transform = `translate3d(${x}px,${y}px,0)`
      raf = requestAnimationFrame(loop)
    }
    if (fine) { document.body.classList.add('has-cursor'); loop() }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); document.body.classList.remove('has-cursor') }
  }, [])
  return <div className="cursor" ref={el} aria-hidden="true"><span /></div>
}
