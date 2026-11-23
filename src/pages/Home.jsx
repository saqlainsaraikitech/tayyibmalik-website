import { Link } from 'react-router-dom'
import { FOUNDER_SHORT_BIO, HELP_ITEMS, PRACTICES, SITE } from '../data'
import { usePageTitle, useReveal } from '../hooks'
import Icon from '../icons'
import {
  AppointmentForm,
  Counters,
  CtaBand,
  Marquee,
  PracticeImageCard,
  SectionHead,
} from '../components/shared'

export default function Home() {
  usePageTitle('Tayyib Malik & Co. | Advocates & Corporate Consultants — Islamabad')
  const ref = useReveal()

  return (
    <main ref={ref}>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="hero-mark" aria-hidden="true">
          <Icon name="scales" size={420} />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light anim" style={{ '--d': '0ms' }}>
              <span className="eyebrow-index">Est. Islamabad</span>
              Advocates &amp; Corporate Consultants
            </span>
            <h1 className="anim" style={{ '--d': '90ms' }}>
              Tayyib Malik <em>&amp; Co.</em>
            </h1>
            <p className="hero-lead anim" style={{ '--d': '180ms' }}>{SITE.heroIntro}</p>
            <div className="hero-actions anim" style={{ '--d': '270ms' }}>
              <Link className="btn btn-gold" to="/contact">
                <Icon name="calendar" size={17} />
                Free Consultancy
              </Link>
              <Link className="btn btn-outline-gold" to="/practice-area">
                Explore Practice Areas
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <ul className="hero-trust anim" style={{ '--d': '360ms' }}>
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
          <div className="hero-visual anim-visual" style={{ '--d': '200ms' }}>
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
              <div className="frame frame-small">
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
              {HELP_ITEMS.map((item) => (
                <article className="help-row reveal" key={item.num}>
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
                  src="/images/appointment.jpg"
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
