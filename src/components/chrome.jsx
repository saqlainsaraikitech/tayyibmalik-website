import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV, PRACTICES, SITE } from '../data'
import Icon from '../icons'

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-group">
          <span>
            <Icon name="phone" size={14} />
            <a href={`tel:${SITE.calls}`}>{SITE.calls}</a>
          </span>
          <span>
            <Icon name="mail" size={14} />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </span>
        </div>
        <div className="topbar-group topbar-addr">
          <span>
            <Icon name="pin" size={14} />
            {SITE.address}
          </span>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container">
        <Link className="logo" to="/" aria-label="Tayyib Malik & Co. — home" onClick={() => setOpen(false)}>
          <img
            src="/images/logo.png"
            alt="Tayyib Malik & Co. — Advocates & Corporate Consultants"
            width="1145"
            height="365"
            fetchPriority="high"
          />
        </Link>
        <nav className={`main-nav${open ? ' open' : ''}`} id="main-nav" aria-label="Main navigation">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
            Book an Appointment
          </Link>
        </nav>
        <Link className="btn btn-gold header-cta" to="/contact">
          <Icon name="calendar" size={17} />
          Book an Appointment
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    const value = email.trim()
    if (!value) return
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      'Newsletter Subscription',
    )}&body=${encodeURIComponent(`Please subscribe this email for legal updates: ${value}`)}`
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="footer-logo" to="/">
              <img
                src="/images/logo.png"
                alt="Tayyib Malik & Co. — Advocates & Corporate Consultants"
                width="1145"
                height="365"
                loading="lazy"
              />
            </Link>
            <ul className="footer-contact">
              <li>
                <span className="lbl">For Whatsapp:</span>{' '}
                <a className="wa-link" href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} />
                  {SITE.whatsapp}
                </a>
              </li>
              <li>
                <span className="lbl">For Calls &amp; SMS:</span> <a href={`tel:${SITE.calls}`}>{SITE.calls}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>{SITE.address}</li>
            </ul>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/practice-area">Practice Areas</Link></li>
              <li><Link to="/our-team">Our Team</Link></li>
              <li><Link to="/pro-bono-services">Pro Bono Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3>Practice Areas</h3>
            <ul className="footer-links">
              {PRACTICES.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link to={`/practice-area#${p.slug}`}>{p.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/practice-area">View all practice areas</Link>
              </li>
            </ul>
          </div>
          <div className="newsletter">
            <h3>Sign Up for Email Updates</h3>
            <p>Receive timely legal updates and professional insights directly to your inbox.</p>
            <form className="newsletter-form" onSubmit={subscribe}>
              <label className="visually-hidden" htmlFor="newsletter-email">
                Type e-mail address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type e-mail address"
                required
                autoComplete="email"
              />
              <button type="submit">Subscribe Now</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <div className="container">
          <span>&copy;{new Date().getFullYear()} Tayyib Malik &amp; Co. All Rights Reserved.</span>
          <span>
            Powered By{' '}
            <a href="https://digitalmax.pk" target="_blank" rel="noopener noreferrer">
              DigitalMax
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        className="whatsapp-float"
        href={`${SITE.whatsappLink}?text=${encodeURIComponent('Hello Tayyib Malik & Co., I need legal advice.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="whatsapp" size={22} />
        <span>WhatsApp Us</span>
      </a>
      <button
        className={`to-top${showTop ? ' show' : ''}`}
        type="button"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon name="up" size={22} />
      </button>
    </>
  )
}
