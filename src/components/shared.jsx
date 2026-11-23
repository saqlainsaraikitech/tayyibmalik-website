import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COUNTERS, PRACTICES, SITE } from '../data'
import { useCardTilt, useInView } from '../hooks'
import Icon from '../icons'

export function SectionHead({ eyebrow, index, title, sub, center = false, dark = false }) {
  return (
    <div className={`section-head reveal${center ? ' section-head-center' : ''}${dark ? ' section-head-dark' : ''}`}>
      <span className="eyebrow">
        {index && <span className="eyebrow-index">{index}</span>}
        {eyebrow}
      </span>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}

export function PageBanner({ eyebrow, title, crumb }) {
  return (
    <section className="page-banner">
      <div className="banner-bg" />
      <div className="banner-glow" />
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <span>{crumb}</span>
        </p>
      </div>
    </section>
  )
}

// Odometer: each digit is a strip of 0-9 (twice, for an extra spin) that rolls
// up to its final digit. Digits further right roll a little longer, like a meter.
const DIGIT_STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function Odometer({ text, run, baseDelay }) {
  let digitIndex = 0
  return (
    <span className={`odometer${run ? ' run' : ''}`} aria-hidden="true">
      {[...text].map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} className="odo-sep">{ch}</span>
        const d = Number(ch)
        const order = digitIndex++
        return (
          <span key={i} className="odo-digit">
            <span
              className="odo-strip"
              style={{
                '--to': d + 10, // land in the second 0-9 run so it spins past once
                '--delay': `${baseDelay + order * 90}ms`,
              }}
            >
              {DIGIT_STRIP.map((n, k) => (
                <span key={k}>{n}</span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}

function Counter({ value, suffix, label, index }) {
  const [ref, inView] = useInView(0.4)
  const text = value.toLocaleString('en-US')
  return (
    <div className="counter reveal" ref={ref} style={{ transitionDelay: `${index * 110}ms` }}>
      <div className="counter-value" aria-label={`${text}${suffix}`}>
        <Odometer text={text} run={inView} baseDelay={index * 150} />
        <span aria-hidden="true">{suffix}</span>
      </div>
      <div className="counter-label">{label}</div>
    </div>
  )
}

export function Counters() {
  return (
    <section className="counters" aria-label="Firm results">
      <div className="container">
        {COUNTERS.map((c, i) => (
          <Counter key={c.label} index={i} {...c} />
        ))}
      </div>
    </section>
  )
}

export function Marquee() {
  const items = [...PRACTICES, ...PRACTICES]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((p, i) => (
          <span className="marquee-item" key={`${p.slug}-${i}`}>
            {p.name}
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-bg" />
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Talk to us! We promise we can help you!</span>
          <h2>You can trust us to get you the justice you deserve.</h2>
        </div>
        <Link className="btn btn-gold" to="/contact">
          <Icon name="calendar" size={17} />
          Free Consultancy
        </Link>
      </div>
    </section>
  )
}

export function AppointmentForm({ idPrefix }) {
  // '' | 'whatsapp' | 'email' — which channel the request was handed to.
  const [sent, setSent] = useState('')

  // No backend: the request is handed to WhatsApp (works on every phone and on
  // WhatsApp Web) or to the visitor's email app, already filled in.
  const submit = (e) => {
    e.preventDefault()
    const via = e.nativeEvent.submitter?.value === 'email' ? 'email' : 'whatsapp'
    const data = new FormData(e.currentTarget)
    const subject = `Appointment Request — ${data.get('category') || 'General'}`
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Case Category: ${data.get('category') || ''}`,
      '',
      'Case details:',
      data.get('message') || '',
    ].join('\n')
    if (via === 'whatsapp') {
      const text = `${subject}\n\n${body}`
      window.open(`${SITE.whatsappLink}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    } else {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
    setSent(via)
  }

  return (
    <form className="appointment-form" onSubmit={submit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${idPrefix}-name`}>Name</label>
          <input id={`${idPrefix}-name`} name="name" type="text" placeholder="Enter Name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-email`}>Email</label>
          <input id={`${idPrefix}-email`} name="email" type="email" placeholder="Type e-mail address" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-phone`}>Phone No</label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            placeholder="Phone No"
            pattern="^[0-9\-\+\s\(\)]*$"
            title="The value should only consist numbers and phone characters (-, +, (), etc)"
            required
            autoComplete="tel"
          />
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-category`}>Case Category</label>
          <select id={`${idPrefix}-category`} name="category" required defaultValue={PRACTICES[0].name}>
            {PRACTICES.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor={`${idPrefix}-message`}>Message</label>
          <textarea id={`${idPrefix}-message`} name="message" rows="5" placeholder="Write case details" required />
        </div>
      </div>
      <div className="form-submit-row">
        <button className="btn btn-gold btn-block" type="submit" value="whatsapp">
          <Icon name="whatsapp" size={17} />
          Send on WhatsApp
        </button>
        <button className="btn btn-ghost btn-block" type="submit" value="email">
          Send by Email
          <Icon name="arrow" size={17} />
        </button>
      </div>
      {sent && (
        <p className="form-success" role="status">
          {sent === 'whatsapp'
            ? 'Thank you. WhatsApp has opened with your appointment request filled in — just press send.'
            : `Thank you. Your email app should now open with your request addressed to ${SITE.email} — just press send.`}
        </p>
      )}
      <p className="form-note">
        Your details are filled into a WhatsApp or email message to the firm; nothing is sent until you press send.
        Prefer to call? <a href={`tel:${SITE.calls}`}>{SITE.calls}</a>
      </p>
    </form>
  )
}

// Premium practice card: 3D-render photo header with zoom + icon chip — no humans in images.
export function PracticeImageCard({ practice, index }) {
  const tiltRef = useCardTilt()
  return (
    // --stagger (not an inline transition-delay) so the delay applies only to the
    // scroll-in reveal and never makes the hover tilt feel laggy.
    <article ref={tiltRef} className="practice-card reveal" style={{ '--stagger': `${(index % 3) * 70}ms` }}>
      <span className="practice-glare" aria-hidden="true" />
      <Link className="practice-media" to={`/practice-area#${practice.slug}`} aria-label={practice.name}>
        <span className="practice-media-img">
          <img src={practice.img} alt={`${practice.name} — Tayyib Malik & Co.`} width="1200" height="675" loading="lazy" />
          <span className="practice-shine" aria-hidden="true" />
        </span>
        <span className="practice-chip">
          <Icon name={practice.icon} size={24} />
        </span>
        <span className="practice-num">{String(index + 1).padStart(2, '0')}</span>
      </Link>
      <div className="practice-body">
        <h3>
          <Link to={`/practice-area#${practice.slug}`}>{practice.name}</Link>
        </h3>
        <p>{practice.desc}</p>
        <Link className="card-link" to={`/practice-area#${practice.slug}`}>
          Learn more
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  )
}

// Premium team card: photo-first with name/role overlaid on the image, gold index, lift + zoom on hover.
export function TeamCard({ member, index }) {
  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <article className="team-card reveal" style={{ transitionDelay: `${(index % 3) * 70}ms` }}>
      <div className="team-media">
        {member.img ? (
          <img src={member.img} alt={`${member.name}, ${member.role}`} width="900" height="900" loading="lazy" />
        ) : (
          <div className="team-monogram" aria-label="Photo coming soon">
            <span className="team-monogram-mark">
              <Icon name="scales" size={54} />
            </span>
            <span className="team-monogram-initials">{initials}</span>
          </div>
        )}
        <span className="team-shine" aria-hidden="true" />
        <span className="team-num">{String(index + 1).padStart(2, '0')}</span>
        <div className="team-overlay">
          <h3>{member.name}</h3>
          <span className="team-name-rule" />
          <p className="team-role">{member.role}</p>
        </div>
      </div>
      <div className="team-body">
        <p>{member.bio}</p>
        <div className="team-foot">
          <span className="team-firm">
            <Icon name="scales" size={14} />
            Tayyib Malik &amp; Co.
          </span>
          <span className="team-rule" />
        </div>
      </div>
    </article>
  )
}

export function FounderCard({ member }) {
  return (
    <article className="founder-card reveal">
      <div className="founder-media">
        <img src={member.img} alt="M. Tayyib Malik, Advocate High Court" width="1024" height="1024" />
        <span className="founder-exp">
          <strong>10+</strong>
          <span>Years of Practice</span>
        </span>
      </div>
      <div className="founder-body">
        <span className="founder-badge">Founder &amp; Chief Executive</span>
        <h2>M. Tayyib Malik</h2>
        <p className="role-line">Advocate High Court</p>
        <p>{member.bio}</p>
        <p>
          Advocate of the High Courts of Pakistan and a seasoned litigation and corporate lawyer with over ten years
          of diverse experience in civil and commercial law. He has represented multinational clients before various
          judicial and quasi-judicial fora across Pakistan, providing strategic legal counsel and effective courtroom
          advocacy.
        </p>
        <div className="chip-row">
          <span className="chip">
            <strong>LLM</strong> International Trade Law
          </span>
          <span className="chip">
            <strong>LLB</strong>
          </span>
          <span className="chip">Islamabad High Court</span>
        </div>
        <div className="btn-row">
          <Link className="btn btn-gold" to="/about-tayyib-malik">
            About Tayyib Malik
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>
    </article>
  )
}
