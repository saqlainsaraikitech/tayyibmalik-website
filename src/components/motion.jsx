// Decorative motion pieces for the home page:
//   <HeroDust />   – floating gold dust behind the hero (canvas)
//   <ScalesArt />  – the big scales of justice: draws itself, then the beam tips as you scroll
//   <Signature />  – the founder's name written out in script, like a pen signature
// All of them are aria-hidden and do nothing for visitors who prefer reduced motion.
import { useEffect, useRef } from 'react'
import { createDustField } from './particles'

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function HeroDust() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const hero = canvas?.parentElement
    if (!canvas || !hero || prefersReduced()) return
    const field = createDustField(canvas)
    let onScreen = true

    const size = () => field.resize(hero.clientWidth, hero.clientHeight)
    size()
    const ro = 'ResizeObserver' in window ? new ResizeObserver(size) : null
    ro?.observe(hero)

    // Only animate while the hero is on screen and the tab is visible.
    const sync = () => (onScreen && !document.hidden ? field.start() : field.stop())
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      sync()
    })
    io.observe(hero)
    document.addEventListener('visibilitychange', sync)

    const move = (e) => {
      const r = hero.getBoundingClientRect()
      field.setMouse(e.clientX - r.left, e.clientY - r.top)
    }
    const leave = () => field.setMouse(-9999, -9999)
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', leave)

    return () => {
      field.destroy()
      ro?.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas ref={ref} className="hero-dust" aria-hidden="true" />
}

// Scales of justice drawn with SVG strokes. Each line "draws" on load (CSS),
// and the beam tilts with scroll speed — the pans counter-rotate so they keep
// hanging straight down — then settles back to level.
export function ScalesArt() {
  const ref = useRef(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg || prefersReduced()) return
    let raf = 0
    let tilt = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let velocity = 0
    let visible = true

    const loop = (now) => {
      const dt = Math.max(now - lastT, 1)
      lastT = now
      const y = window.scrollY
      velocity = velocity * 0.75 + ((y - lastY) / dt) * 0.25 // px per ms, smoothed
      lastY = y
      const idle = Math.sin(now / 1700) * 1.6 // gentle rocking when nothing happens
      const target = Math.max(-10, Math.min(10, velocity * 12)) + idle
      tilt += (target - tilt) * 0.1
      svg.style.setProperty('--tilt', `${tilt.toFixed(2)}deg`)
      if (visible) raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) {
        lastT = performance.now()
        lastY = window.scrollY
        raf = requestAnimationFrame(loop)
      } else if (!visible) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(svg)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  return (
    <svg
      ref={ref}
      className="scales-art"
      viewBox="0 0 24 24"
      width="420"
      height="420"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path className="draw" style={{ '--i': 0 }} pathLength="1" d="M12 3v18" />
      <path className="draw" style={{ '--i': 1 }} pathLength="1" d="M8 21h8" />
      <circle className="draw" style={{ '--i': 1 }} pathLength="1" cx="12" cy="2.6" r="0.6" />
      <g className="scales-beam">
        <path className="draw" style={{ '--i': 2 }} pathLength="1" d="M4 7h16" />
        <g className="scales-pan scales-pan-l">
          <path className="draw" style={{ '--i': 3 }} pathLength="1" d="M7 7l-3 6a3.2 3.2 0 0 0 6 0L7 7z" />
        </g>
        <g className="scales-pan scales-pan-r">
          <path className="draw" style={{ '--i': 4 }} pathLength="1" d="M17 7l-3 6a3.2 3.2 0 0 0 6 0l-3-6z" />
        </g>
      </g>
    </svg>
  )
}

// Script-font signature that writes itself when its section scrolls into view
// (driven by the surrounding .reveal.visible class — see .signature in styles.css).
export function Signature({ name = 'M. Tayyib Malik' }) {
  return (
    <svg className="signature" viewBox="0 0 340 92" aria-hidden="true" focusable="false">
      <text x="6" y="60" textLength="318" lengthAdjust="spacingAndGlyphs">
        {name}
      </text>
      <path className="signature-flourish" pathLength="1" d="M10 76 C 90 68, 190 84, 300 70 S 330 64, 334 60" />
    </svg>
  )
}
