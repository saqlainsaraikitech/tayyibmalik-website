import { useEffect, useRef, useState } from 'react'

// Adds .visible when the element scrolls into view (reveal animation).
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('visible')
            io.unobserve(en.target)
          }
        })
      },
      // Fire as soon as an element's top edge is ~40px inside the viewport.
      // (A ratio threshold made tall blocks wait until much of them was on screen.)
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n))
    if (el.classList.contains('reveal')) io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// Subtle 3D tilt that follows the mouse (desktop pointers only, respects reduced motion).
// Writes --rx / --ry custom properties; CSS does the transform.
export function useTilt(max = 5) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    let frame = 0
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`)
        el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

// True once the element has scrolled into view (stays true).
export function useInView(threshold = 0.4) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView]
}

// 3D tilt + moving glare for cards. Writes --rx/--ry (tilt) and --gx/--gy
// (glare position, %) on the element; CSS does the rest. Mouse/trackpad only.
export function useCardTilt(max = 7) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    let frame = 0
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${((x - 0.5) * max).toFixed(2)}deg`)
        el.style.setProperty('--rx', `${((0.5 - y) * max).toFixed(2)}deg`)
        el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
        el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])
  return ref
}

// Sets the document title for the current page (SPA).
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
