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
      { threshold: 0.12, rootMargin: '60px 0px' },
    )
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n))
    if (el.classList.contains('reveal')) io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// Animated counter: counts up to `target` once visible.
export function useCountUp(target, duration = 1500) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setValue(target)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(target * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return [ref, value]
}

// Sets the document title for the current page (SPA).
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
