import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FOUNDER_SHORT_BIO, HELP_ITEMS, PRACTICES, SITE } from '../data'
import { usePageTitle, useReveal, useTilt } from '../hooks'
import Icon from '../icons'
import { createParticleLayer } from '../components/particles'
import { HeroDust, ScalesArt, Signature } from '../components/motion'
import {
  AppointmentForm,
  Counters,
  CtaBand,
  Marquee,
  PracticeImageCard,
  SectionHead,
} from '../components/shared'

// Typewriter: types the firm name, holds, erases it, then types it again (loops).
// "Tayyib Malik " is plain white, "& Co." is the gold italic part.
const NAME_PLAIN = 'Tayyib Malik '
const NAME_GOLD = '& Co.'
const NAME_FULL = NAME_PLAIN + NAME_GOLD
const TYPE_MS = 150 // per letter while writing
const ERASE_MS = 70 // per letter while erasing
const HOLD_MS = 2600 // full name stays on screen
const EMPTY_MS = 500 // pause before writing again
const START_MS = 400 // first letter after page load
const LETTERS = [...NAME_FULL].map((ch, i) => ({ ch, gold: i >= NAME_PLAIN.length }))
const SPARK_PAD = 60 // room (px) around the heading for particles to fly into

// How it stays smooth:
//  - every letter is always in the page; typing/erasing only toggles a class,
//    so each letter fades in from a soft blur (and fades out) with a CSS transition
//    instead of popping, and the heading never reflows;
//  - the cursor is positioned from the last visible letter and slides there
//    with a transition instead of jumping.
function TypewriterName() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(reduced ? NAME_FULL.length : 0)
  const [erasing, setErasing] = useState(false)
  const [caret, setCaret] = useState(null)
  const [layoutTick, setLayoutTick] = useState(0)
  const h1Ref = useRef(null)
  const charRefs = useRef([])
  const canvasRef = useRef(null)
  const layerRef = useRef(null)
  const prevCount = useRef(count)

  // Particle layer: a canvas a little larger than the heading so sparks can fly past its edges.
  useEffect(() => {
    if (reduced || !canvasRef.current) return
    const layer = createParticleLayer(canvasRef.current)
    const h1 = h1Ref.current
    // Height pads only the top: the canvas ends at the heading's bottom edge,
    // so sparks can never splash onto the intro paragraph below it.
    if (h1) layer.resize(h1.offsetWidth + SPARK_PAD * 2, h1.offsetHeight + SPARK_PAD)
    layerRef.current = layer
    return () => {
      layer.destroy()
      layerRef.current = null
    }
  }, [reduced])

  useLayoutEffect(() => {
    const h1 = h1Ref.current
    if (!layerRef.current || !h1) return
    layerRef.current.resize(h1.offsetWidth + SPARK_PAD * 2, h1.offsetHeight + SPARK_PAD)
  }, [layoutTick])

  // Typed a letter → sparks. Erased a letter → it dissolves into rising dust.
  useEffect(() => {
    const prev = prevCount.current
    prevCount.current = count
    const layer = layerRef.current
    const h1 = h1Ref.current
    if (!layer || !h1 || count === prev) return
    const i = count > prev ? count - 1 : count
    const el = charRefs.current[i]
    if (!el || !LETTERS[i].ch.trim()) return // no particles for the space
    const box = h1.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const rect = { x: r.left - box.left + SPARK_PAD, y: r.top - box.top + SPARK_PAD, w: r.width, h: r.height }
    if (count > prev) layer.burst(rect, LETTERS[i].gold)
    else layer.dissolve(rect, LETTERS[i].gold)
  }, [count])

  // Re-measure the cursor position when the heading's size changes (resize, font load).
  useEffect(() => {
    const el = h1Ref.current
    if (!el || !('ResizeObserver' in window)) return
    const ro = new ResizeObserver(() => setLayoutTick((t) => t + 1))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    const chars = charRefs.current
    const h1 = h1Ref.current
    if (!chars[0] || !h1) return
    // Cursor sits after the last visible letter (or before the first one when empty).
    // Measured in screen coordinates relative to the <h1>, because the gold <em>
    // is itself positioned and would skew offsetLeft/offsetTop. (Letters only fade
    // and un-blur — no transform — so their boxes never move while animating.)
    const box = h1.getBoundingClientRect()
    const r = (count > 0 ? chars[count - 1] : chars[0]).getBoundingClientRect()
    const left = (count > 0 ? r.right : r.left) - box.left
    setCaret({ left, top: r.top - box.top, height: r.height })
  }, [count, layoutTick])

  useEffect(() => {
    if (reduced) return
    let delay
    if (!erasing && count < NAME_FULL.length) delay = count === 0 ? START_MS : TYPE_MS
    else if (!erasing) delay = HOLD_MS
    else if (count > 0) delay = ERASE_MS
    else delay = EMPTY_MS
    const t = setTimeout(() => {
      if (!erasing && count < NAME_FULL.length) setCount(count + 1)
      else if (!erasing) setErasing(true)
      else if (count > 0) setCount(count - 1)
      else setErasing(false)
    }, delay)
    return () => clearTimeout(t)
  }, [count, erasing, reduced])

  const done = count === NAME_FULL.length
  const letter = (l, i) => (
    <span key={i} ref={(el) => (charRefs.current[i] = el)} className={`tw-char${i < count ? ' on' : ''}`}>
      {l.ch}
    </span>
  )

  return (
    // Screen readers get the full name once; the moving letters are hidden from them.
    <h1 ref={h1Ref} className={`hero-title typewriter${done ? ' is-done' : ''}`} aria-label="Tayyib Malik & Co.">
      <span aria-hidden="true">
        {LETTERS.map((l, i) => (l.gold ? null : letter(l, i)))}
        <em>{LETTERS.map((l, i) => (l.gold ? letter(l, i) : null))}</em>
      </span>
      {!reduced && (
        <canvas ref={canvasRef} className="tw-particles" aria-hidden="true" style={{ left: -SPARK_PAD, top: -SPARK_PAD }} />
      )}
      {caret && (
        <span
          aria-hidden="true"
          className={`tw-caret${erasing || !done ? ' is-busy' : ''}`}
          style={{ left: caret.left, top: caret.top, height: caret.height }}
        />
      )}
    </h1>
  )
}

export default function Home() {
  usePageTitle('Tayyib Malik & Co. | Advocates & Corporate Consultants — Islamabad')
  const ref = useReveal()
  const tiltRef = useTilt()

  return (
    <main ref={ref}>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <HeroDust />
        <div className="hero-mark" aria-hidden="true">
          <ScalesArt />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light hero-eyebrow anim" style={{ '--d': '0ms' }}>
              Est. Islamabad <span className="eyebrow-sep" aria-hidden="true">·</span> Advocates &amp; Corporate
              Consultants
            </span>
            <TypewriterName />
            <p className="hero-lead anim" style={{ '--d': '380ms' }}>
              {SITE.heroIntro} <span className="hero-detail">{SITE.heroDetail}</span>
            </p>
            <div className="hero-actions anim" style={{ '--d': '480ms' }}>
              <Link className="btn btn-gold" to="/contact">
                <Icon name="calendar" size={17} />
                Free Consultancy
              </Link>
              <Link className="btn btn-outline-gold" to="/practice-area">
                Explore Practice Areas
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <ul className="hero-trust anim" style={{ '--d': '580ms' }}>
              <li>
                <Icon name="scales" size={19} />
                10+ years of courtroom practice
              </li>
              <li>
                <Icon name="briefcase" size={19} />
                Corporate, civil &amp; constitutional matters
              </li>
              <li>
                <Icon name="check" size={19} />
                National &amp; international advisory
              </li>
            </ul>
          </div>
          <div className="hero-visual anim-visual" ref={tiltRef} style={{ '--d': '250ms' }}>
            <div className="hero-frame">
              <img
                src="/images/hero.jpg"
                alt="Muhammad Tayyib Malik working at his desk in the firm library"
                width="1024"
                height="1024"
                fetchPriority="high"
              />
              <div className="hero-float-card">
                <span className="hero-float-num">1,364+</span>
                <span className="hero-float-label">Matters Handled</span>
              </div>
            </div>
            <div className="hero-portrait">
              <img
                src="/images/tayyib-circle.jpg"
                alt="Muhammad Tayyib Malik, Advocate High Court"
                width="300"
                height="300"
              />
              <div className="hero-portrait-text">
                <strong>Muhammad Tayyib Malik</strong>
                <span>Advocate High Court</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />
      <Counters />

      {/* ---------- Founder ---------- */}
      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="portrait-frame">
              <img
                src="/images/tayyib-portrait.jpg"
                alt="Muhammad Tayyib Malik, Advocate High Court"
                width="768"
                height="768"
                loading="lazy"
              />
              <span className="portrait-badge">Founder</span>
            </div>
            <div>
              <SectionHead
                eyebrow="Founder & Chief Executive"
                index="01"
                title={
                  <>
                    Muhammad Tayyib <em>Malik</em>
                  </>
                }
              />
              <p className="role-line">Advocate High Court</p>
              <p className="body-lg">{FOUNDER_SHORT_BIO}</p>
              <Signature />
              <div className="chip-row">
                <span className="chip">
                  <strong>LLM</strong> International Trade Law
                </span>
                <span className="chip">
                  <strong>LLB</strong>
                </span>
                <span className="chip">High Courts of Pakistan</span>
              </div>
              <div className="btn-row">
                <Link className="btn btn-navy" to="/about-tayyib-malik">
                  Know More
                  <Icon name="arrow" size={17} />
                </Link>
                <Link className="btn btn-ghost" to="/about">
                  More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Practice areas ---------- */}
      <section className="section section-cream">
        <div className="container">
          <SectionHead
            eyebrow="Practice Area"
            index="02"
            title={
              <>
                Gain the insights, advice and tools to achieve your{' '}
                <em>mission-critical priorities</em>
              </>
            }
            sub="Strategic legal solutions in corporate, civil, constitutional, and commercial matters — with professional excellence, integrity, and client-focused representation."
          />
          <div className="card-grid">
            {PRACTICES.map((p, i) => (
              <PracticeImageCard key={p.slug} practice={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- About teaser ---------- */}
      <section className="section">
        <div className="container">
          <div className="split split-reverse reveal">
            <div className="frame">
              <img
                src="/images/about-firm.jpg"
                alt="Tayyib Malik & Co. — legal team at work"
                width="1536"
                height="1024"
                loading="lazy"
              />
            </div>
            <div>
              <SectionHead
                eyebrow="About Our Law Firm"
                index="03"
                title={
                  <>
                    An established firm, recognized <em>nationally &amp; internationally</em>
                  </>
                }
              />
              <p className="body-lg">
                <strong>Tayyib Malik &amp; Co.</strong> is an established law firm based in Islamabad, Pakistan,
                recognized nationally and internationally for its comprehensive legal and corporate advisory services.
                The Firm comprises a highly qualified team of barristers, advocates, solicitors, and chartered
                accountants with extensive experience across multiple areas of law.
              </p>
              <ul className="check-list">
                <li>
                  <Icon name="check" size={20} />
                  <span>Corporate, civil, and constitutional litigation at all jurisdictional levels</span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>Specialized corporate consultancy for major multinational and domestic organizations</span>
                </li>
                <li>
                  <Icon name="check" size={20} />
                  <span>Committed to the highest standards of professional ethics and integrity</span>
                </li>
              </ul>
              <div className="btn-row">
                <Link className="btn btn-navy" to="/about">
                  More About Us
                  <Icon name="arrow" size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How we help ---------- */}
      <section className="section section-navy help-section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="How Can We Help?"
                index="04"
                dark
                title={
                  <>
                    From strategic advice through <em>effective legal execution</em>
                  </>
                }
                sub="We support our clients from strategic advice through effective legal execution."
              />
              <div className="frame frame-small reveal">
                <img
                  src="/images/help.jpg"
                  alt="Client consultation at Tayyib Malik & Co."
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="help-rows">
              {HELP_ITEMS.map((item, i) => (
                <article className="help-row reveal" key={item.num} style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="help-num">{item.num}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <Icon name="arrow" size={22} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />

      {/* ---------- Appointment ---------- */}
      <section className="section section-cream">
        <div className="container">
          <div className="split reveal">
            <div>
              <div className="frame">
                <img
                  src="/images/contact-photo.jpg"
                  alt="Book an appointment with Tayyib Malik & Co."
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <p className="direct-contact">
                <strong>Prefer to talk directly?</strong>
                <br />
                <Icon name="whatsapp" size={16} /> WhatsApp{' '}
                <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer">
                  {SITE.whatsapp}
                </a>{' '}
                &nbsp;·&nbsp; Calls &amp; SMS <a href={`tel:${SITE.calls}`}>{SITE.calls}</a>
                <br />
                <span className="muted">{SITE.address}</span>
              </p>
            </div>
            <div className="form-card">
              <span className="eyebrow">Request Free Consultation</span>
              <h3>Thanks for your interest. Book an Appointment?</h3>
              <AppointmentForm idPrefix="home-appointment" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
