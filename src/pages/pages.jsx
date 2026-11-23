import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ABOUT_PARAS,
  BANK,
  CONSULTANCY_SERVICES,
  DONATE_POINTS,
  FOUNDER_BIO_PARAS,
  FOUNDER_EXPERTISE,
  FOUNDER_SKILLS,
  PRACTICES,
  PRO_BONO_GROUPS,
  SITE,
  TEAM,
} from '../data'
import { usePageTitle, useReveal } from '../hooks'
import Icon from '../icons'
import {
  AppointmentForm,
  Counters,
  CtaBand,
  FounderCard,
  PageBanner,
  SectionHead,
  TeamCard,
} from '../components/shared'

export function About() {
  usePageTitle('About Us | Tayyib Malik & Co.')
  const ref = useReveal()
  return (
    <main ref={ref}>
      <PageBanner eyebrow="About Us" title="About Tayyib Malik & Co." crumb="About" />
      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="frame">
              <img
                src="/images/about-firm.jpg"
                alt="Tayyib Malik & Co. — legal team at work"
                width="1536"
                height="1024"
              />
            </div>
            <div>
              <SectionHead
                eyebrow="About Our Law Firm"
                index="01"
                title={
                  <>
                    Comprehensive legal &amp; <em>corporate advisory</em> services
                  </>
                }
              />
              <p className="body-lg">{ABOUT_PARAS[0]}</p>
              <p>{ABOUT_PARAS[1]}</p>
            </div>
          </div>
          <div className="narrow reveal">
            <p className="lead">{ABOUT_PARAS[2]}</p>
          </div>
        </div>
      </section>
      <section className="section section-cream">
        <div className="container">
          <SectionHead
            eyebrow="Corporate Consultancy"
            index="02"
            title={
              <>
                Specialized consultancy for <em>valued clients</em>
              </>
            }
            sub="In addition to litigation, Tayyib Malik & Co. provides specialized corporate consultancy services to its valued clients, including major multinational and domestic organizations. The Firm undertakes, inter alia:"
          />
          <ul className="check-grid reveal">
            {CONSULTANCY_SERVICES.map((s) => (
              <li key={s}>
                <Icon name="check" size={20} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="muted reveal">— along with other related legal and financial services.</p>
        </div>
      </section>
      <Counters />
      <CtaBand />
    </main>
  )
}

export function Practice() {
  usePageTitle('Practice Areas | Tayyib Malik & Co.')
  const ref = useReveal()
  return (
    <main ref={ref}>
      <PageBanner eyebrow="Practice Area" title="Practice Areas" crumb="Practice Area" />
      <section className="section section-tight-top">
        <div className="container">
          <SectionHead
            eyebrow="What We Do"
            index="01"
            title={
              <>
                Gain the insights, advice and tools to achieve your{' '}
                <em>mission-critical priorities</em>
              </>
            }
            sub="Strategic legal solutions in corporate, civil, constitutional, and commercial matters — with professional excellence, integrity, and client-focused representation."
          />
          {PRACTICES.map((p, i) => (
            <article className="practice-detail reveal" id={p.slug} key={p.slug}>
              <div className="practice-detail-media">
                <img src={p.img} alt={`${p.name} — Tayyib Malik & Co.`} width="1200" height="675" loading="lazy" />
                <span className="practice-detail-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <span className="eyebrow">
                  <span className="eyebrow-index">{String(i + 1).padStart(2, '0')}</span>
                  Practice Area
                </span>
                <h2>{p.name}</h2>
                <p className="lead">{p.desc}</p>
                <div className="btn-row">
                  <Link className="btn btn-navy" to="/contact">
                    Book a Consultation
                    <Icon name="arrow" size={17} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  )
}

export function Team() {
  usePageTitle('Our Team | Tayyib Malik & Co.')
  const ref = useReveal()
  const [founder, ...rest] = TEAM
  return (
    <main ref={ref}>
      <PageBanner eyebrow="Our Team" title="Meet Our Team" crumb="Our Team" />
      <section className="section section-cream section-tight-top">
        <div className="container">
          <SectionHead
            eyebrow="The Firm's People"
            index="01"
            title={
              <>
                Led by the Founder, <em>driven by expertise</em>
              </>
            }
            sub="A highly qualified team of barristers, advocates, solicitors, and chartered accountants with extensive experience across multiple areas of law — led by the Firm's Founder."
          />
          <FounderCard member={founder} />
          <div className="team-grid">
            {rest.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}

export function Founder() {
  usePageTitle('Muhammad Tayyib Malik — Advocate High Court | Tayyib Malik & Co.')
  const ref = useReveal()
  return (
    <main ref={ref}>
      <PageBanner eyebrow="About Tayyib Malik" title="Muhammad Tayyib Malik" crumb="About Tayyib Malik" />
      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="portrait-frame">
              <img
                src="/images/tayyib-portrait.jpg"
                alt="Muhammad Tayyib Malik, Advocate High Court"
                width="768"
                height="768"
              />
              <span className="portrait-badge">Founder &amp; CEO</span>
            </div>
            <div>
              <SectionHead
                eyebrow="Founder & Chief Executive of the Firm"
                index="01"
                title={
                  <>
                    Muhammad Tayyib <em>Malik</em>
                  </>
                }
              />
              <p className="role-line">Advocate High Court</p>
              <p className="body-lg">{FOUNDER_BIO_PARAS[0]}</p>
              <p>{FOUNDER_BIO_PARAS[1]}</p>
              <div className="chip-row">
                <span className="chip">
                  <strong>LLB</strong>
                </span>
                <span className="chip">
                  <strong>LLM</strong> International Trade Law — IIU Islamabad
                </span>
                <span className="chip">
                  <strong>Master&rsquo;s</strong> Political Science — University of the Punjab
                </span>
                <span className="chip">
                  <strong>Law Intern</strong> Senate of Pakistan (2016&ndash;2018)
                </span>
              </div>
            </div>
          </div>
          <div className="narrow reveal">
            <p className="lead">{FOUNDER_BIO_PARAS[2]}</p>
            <p style={{ marginTop: 16 }}>{FOUNDER_BIO_PARAS[3]}</p>
          </div>
        </div>
      </section>
      <section className="section section-cream">
        <div className="container">
          <SectionHead
            eyebrow="Litigation Expertise"
            index="02"
            title={
              <>
                Areas of <em>expertise</em>
              </>
            }
            sub="Supported by strong professional skills in trial advocacy, legal research, cross-examination, drafting of pleadings, negotiation, and arbitration."
          />
          <ul className="check-grid reveal">
            {FOUNDER_EXPERTISE.map((e) => (
              <li key={e}>
                <Icon name="check" size={20} />
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <div className="chip-row reveal" style={{ marginTop: 28 }}>
            {FOUNDER_SKILLS.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}

export function ProBono() {
  usePageTitle('Pro Bono Services | Tayyib Malik & Co.')
  const ref = useReveal()
  const [copied, setCopied] = useState(false)

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(BANK.iban)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = BANK.iban
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } catch {
        /* noop */
      }
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main ref={ref}>
      <PageBanner eyebrow="Pro Bono Services" title="Pro Bono Services" crumb="Pro Bono Services" />
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Tayyib Malik & Co. — Law Firm"
            index="01"
            title={
              <>
                Free legal aid, for those who <em>need it most</em>
              </>
            }
            sub="At Tayyib Malik & Co., we provide free legal aid to the people below. We are committed to ensuring access to justice for all, regardless of financial status."
          />
          <div className="aid-grid">
            {PRO_BONO_GROUPS.map((g) => (
              <div className="aid-card reveal" key={g.label}>
                <span className="aid-icon">
                  <Icon name={g.icon} size={32} />
                </span>
                <h3>{g.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-cream section-tight-top">
        <div className="container">
          <div className="split reveal">
            <div className="bank-card">
              <span className="eyebrow">Support Our Mission</span>
              <h3>Bank Details</h3>
              <p className="bank-intro">
                Your donations help us continue providing free legal services to those in need.
              </p>
              <dl className="bank-rows">
                <div className="bank-row">
                  <dt>Bank Name</dt>
                  <dd>{BANK.bank}</dd>
                </div>
                <div className="bank-row">
                  <dt>Account Title</dt>
                  <dd>{BANK.title}</dd>
                </div>
                <div className="bank-row">
                  <dt>IBAN</dt>
                  <dd>
                    <span className="iban-row">
                      {BANK.iban}
                      <button className="copy-btn" type="button" onClick={copyIban}>
                        <Icon name="copy" size={15} />
                        <span>{copied ? 'Copied!' : 'Copy IBAN'}</span>
                      </button>
                    </span>
                  </dd>
                </div>
                <div className="bank-row">
                  <dt>Branch</dt>
                  <dd>{BANK.branch}</dd>
                </div>
              </dl>
            </div>
            <div>
              <SectionHead
                eyebrow="Why Donate?"
                index="02"
                title={
                  <>
                    Your contribution <em>directly supports</em>
                  </>
                }
              />
              <ul className="donate-list">
                {DONATE_POINTS.map((d) => (
                  <li key={d}>
                    <Icon name="check" size={20} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="btn-row">
                <Link className="btn btn-navy" to="/contact">
                  Request Free Legal Aid
                  <Icon name="arrow" size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}

export function Contact() {
  usePageTitle('Contact Us | Tayyib Malik & Co.')
  const ref = useReveal()
  return (
    <main ref={ref}>
      <PageBanner eyebrow="Contact Us" title="Contact Us" crumb="Contact Us" />
      <section className="section section-tight-top">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card reveal">
              <Icon name="mail" size={28} />
              <h3>Contact us via Email</h3>
              <p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
            <div className="contact-card reveal">
              <Icon name="whatsapp" size={28} />
              <h3>For Whatsapp</h3>
              <p>
                <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer">
                  {SITE.whatsapp}
                </a>
              </p>
            </div>
            <div className="contact-card reveal">
              <Icon name="phone" size={28} />
              <h3>For Calls &amp; SMS</h3>
              <p>
                <a href={`tel:${SITE.calls}`}>{SITE.calls}</a>
              </p>
            </div>
            <div className="contact-card reveal">
              <Icon name="pin" size={28} />
              <h3>Office Address</h3>
              <p>
                {SITE.address}
                <br />
                <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </p>
            </div>
          </div>
          <div className="split reveal">
            <div className="frame">
              <img
                src="/images/contact-photo.jpg"
                alt="Muhammad Tayyib Malik in the firm library"
                width="1024"
                height="1024"
                loading="lazy"
              />
            </div>
            <div className="form-card">
              <span className="eyebrow">Request Free Consultation</span>
              <h3>Thanks for your interest. Book an Appointment?</h3>
              <AppointmentForm idPrefix="contact-appointment" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export function NotFound() {
  usePageTitle('Page Not Found | Tayyib Malik & Co.')
  return (
    <main>
      <section className="section">
        <div className="container not-found">
          <span className="eyebrow">404 — Page Not Found</span>
          <h1>This page does not exist.</h1>
          <p className="lead">
            The page you are looking for may have moved. Please return to the home page or contact the firm directly.
          </p>
          <div className="btn-row btn-row-center">
            <Link className="btn btn-navy" to="/">
              Back to Home
            </Link>
            <Link className="btn btn-ghost" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
