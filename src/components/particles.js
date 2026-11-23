// Tiny canvas particle layer for the hero typewriter.
//   burst(rect, gold)    – gold sparks fly out of a letter that was just typed
//   dissolve(rect, gold) – a letter being erased breaks into dust that drifts up
// The animation loop only runs while particles are alive, so it costs nothing when idle.

const GOLD = ['#f3d27a', '#d4af37', '#df9a2b', '#fff1c4']
const WHITE = ['#ffffff', '#fff6dc', '#f3d27a']

const rand = (a, b) => a + Math.random() * (b - a)
const pick = (list) => list[(Math.random() * list.length) | 0]

export function createParticleLayer(canvas) {
  const ctx = canvas.getContext('2d')
  let parts = []
  let raf = 0
  let last = 0
  let dpr = 1
  // Particle counts drop on small screens to stay light on phones.
  const scale = () => (window.innerWidth < 600 ? 0.6 : 1)

  function resize(width, height) {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

  function start() {
    if (raf) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }

  function tick(now) {
    // dt = 1 at 60fps, so motion speed is the same on 60/120Hz screens.
    const dt = Math.min((now - last) / 16.67, 3)
    last = now
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'lighter' // overlapping sparks glow brighter

    parts = parts.filter((p) => (p.life -= dt) > 0)
    for (const p of parts) {
      p.vx *= Math.pow(p.drag, dt)
      p.vy = p.vy * Math.pow(p.drag, dt) + p.gravity * dt
      p.x += p.vx * dt
      p.y += p.vy * dt
      const t = p.life / p.maxLife // 1 → 0
      const a = t < 0.7 ? t / 0.7 : 1 // fade during the last 70% of life
      const r = p.size * (0.5 + 0.5 * t)
      // soft halo + bright core
      ctx.globalAlpha = a * 0.25
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, r * 2.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = a
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    if (parts.length) raf = requestAnimationFrame(tick)
    else {
      raf = 0
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  // rect is { x, y, w, h } in canvas CSS pixels.
  function burst(rect, gold) {
    const n = Math.round(14 * scale())
    const cx = rect.x + rect.w / 2
    const cy = rect.y + rect.h * 0.55
    for (let i = 0; i < n; i++) {
      const ang = rand(0, Math.PI * 2)
      const sp = rand(0.8, 3.2)
      const life = rand(28, 55)
      parts.push({
        x: cx + rand(-rect.w * 0.3, rect.w * 0.3),
        y: cy + rand(-rect.h * 0.25, rect.h * 0.25),
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 0.6,
        gravity: 0.06,
        drag: 0.94,
        size: rand(0.9, 2.1),
        life,
        maxLife: life,
        color: pick(gold ? GOLD : GOLD.concat(WHITE)),
      })
    }
    start()
  }

  function dissolve(rect, gold) {
    const n = Math.round(26 * scale())
    for (let i = 0; i < n; i++) {
      const life = rand(35, 70)
      parts.push({
        // sampled across the letter's body so it looks like the glyph crumbles
        x: rect.x + rand(rect.w * 0.1, rect.w * 0.9),
        y: rect.y + rand(rect.h * 0.2, rect.h * 0.85),
        vx: rand(-0.5, 0.9),
        vy: rand(-1.6, -0.3),
        gravity: -0.015, // dust rises
        drag: 0.97,
        size: rand(0.8, 1.9),
        life,
        maxLife: life,
        color: pick(gold ? GOLD : WHITE),
      })
    }
    start()
  }

  function destroy() {
    cancelAnimationFrame(raf)
    raf = 0
    parts = []
  }

  return { resize, burst, dissolve, destroy }
}

// Ambient gold dust for the hero background: specks drift slowly upward,
// twinkle, and ease away from the mouse. Call start()/stop() to pause it
// (the hero pauses it when scrolled off screen or the tab is hidden).
export function createDustField(canvas) {
  const ctx = canvas.getContext('2d')
  let w = 0
  let h = 0
  let dpr = 1
  let specks = []
  let raf = 0
  let last = 0
  const mouse = { x: -9999, y: -9999 }

  function seed() {
    const n = Math.round(Math.min(70, (w * h) / 16000)) // ~60 on desktop, ~25 on phones
    specks = Array.from({ length: n }, () => makeSpeck(true))
  }

  function makeSpeck(anywhere) {
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: rand(0.6, 2.1),
      vy: rand(-0.12, -0.38), // slow upward drift
      sway: rand(0, Math.PI * 2),
      swaySpeed: rand(0.004, 0.012),
      tw: rand(0, Math.PI * 2), // twinkle phase
      ox: 0, // offset from the mouse push
      oy: 0,
      color: pick(GOLD),
    }
  }

  function resize(width, height) {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = width
    h = height
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    seed()
  }

  function tick(now) {
    const dt = Math.min((now - last) / 16.67, 3)
    last = now
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    for (const s of specks) {
      s.sway += s.swaySpeed * dt
      s.tw += 0.03 * dt
      s.y += s.vy * dt
      s.x += Math.sin(s.sway) * 0.15 * dt
      if (s.y < -10) Object.assign(s, makeSpeck(false))
      // Push away from the mouse within 120px, then ease back.
      const dx = s.x + s.ox - mouse.x
      const dy = s.y + s.oy - mouse.y
      const d2 = dx * dx + dy * dy
      if (d2 < 14400) {
        const f = (1 - Math.sqrt(d2) / 120) * 2.2
        const d = Math.sqrt(d2) || 1
        s.ox += (dx / d) * f * dt
        s.oy += (dy / d) * f * dt
      }
      s.ox *= Math.pow(0.94, dt)
      s.oy *= Math.pow(0.94, dt)
      const a = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(s.tw))
      const x = s.x + s.ox
      const y = s.y + s.oy
      ctx.fillStyle = s.color
      ctx.globalAlpha = a * 0.22
      ctx.beginPath()
      ctx.arc(x, y, s.r * 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = a
      ctx.beginPath()
      ctx.arc(x, y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    raf = requestAnimationFrame(tick)
  }

  function start() {
    if (raf) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
  function stop() {
    cancelAnimationFrame(raf)
    raf = 0
  }
  function setMouse(x, y) {
    mouse.x = x
    mouse.y = y
  }

  return { resize, start, stop, setMouse, destroy: stop }
}
