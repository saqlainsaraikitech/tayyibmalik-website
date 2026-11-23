// All content verbatim from the live WordPress site (tayyibmalik.co), extracted 17 Nov 2026.
// Only template leftovers were fixed: case-category dropdown, "Muhammd" typo, lorem text.

export const SITE = {
  name: 'Tayyib Malik & Co.',
  tagline: 'Advocates & Corporate Consultants',
  email: 'info@tayyibmalik.co',
  whatsapp: '+923417171786',
  whatsappLink: 'https://wa.me/923417171786',
  calls: '+923339991007',
  address: "Office No.1, 3rd Floor, Silver City Plaza, (Soneri Bank's Building), G-11, Markaz Islamabad",
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Office+No.1%2C+3rd+Floor%2C+Silver+City+Plaza%2C+G-11+Markaz+Islamabad',
  heroIntro:
    'is a leading law firm based in Islamabad, Pakistan providing high-quality legal and corporate advisory services at national and international levels. With a team of experienced advocates, barristers, and consultants, the Firm offers strategic legal solutions in corporate, civil, constitutional, and commercial matters, ensuring professional excellence, integrity, and client-focused representation.',
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/our-team', label: 'Our Team' },
  { to: '/pro-bono-services', label: 'Pro Bono Services' },
  { to: '/practice-area', label: 'Practice Area' },
  { to: '/contact', label: 'Contact Us' },
]

export const COUNTERS = [
  { value: 1364, suffix: '+', label: 'Matters Handled' },
  { value: 1450, suffix: '+', label: 'Legal Matters Advised' },
  { value: 95, suffix: '%', label: 'Client Retention Rate' },
]

export const PRACTICES = [
  {
    slug: 'labor-laws',
    name: 'Labor Laws',
    img: '/images/practice-labor-3d.jpg',
    icon: 'helmet',
    desc: 'Protecting the rights of employees and employers by ensuring fair wages, safe workplaces, and lawful employment practices.',
  },
  {
    slug: 'dispute-resolution',
    name: 'Dispute Resolution',
    img: '/images/practice-dispute-3d.jpg',
    icon: 'chat',
    desc: 'Resolving conflicts efficiently through negotiation, mediation, arbitration, and other alternative legal methods.',
  },
  {
    slug: 'banking-law',
    name: 'Banking Law',
    img: '/images/practice-banking-3d.jpg',
    icon: 'bank',
    desc: 'Regulating financial institutions, banking operations, loans, and compliance with financial laws and regulations.',
  },
  {
    slug: 'criminal-law',
    name: 'Criminal Law',
    img: '/images/practice-criminal-3d.jpg',
    icon: 'shield',
    desc: 'Defending or prosecuting individuals accused of criminal offenses while ensuring justice under the law.',
  },
  {
    slug: 'cyber-laws',
    name: 'Cyber Laws',
    img: '/images/practice-cyber-3d.jpg',
    icon: 'lock',
    desc: 'Addressing legal issues related to digital crimes, data protection, cybersecurity, and online transactions.',
  },
  {
    slug: 'telecommunications-laws',
    name: 'Telecommunications Laws',
    img: '/images/practice-telecom-3d.jpg',
    icon: 'tower',
    desc: 'Governing communication networks, licensing, regulatory compliance, and digital infrastructure operations.',
  },
  {
    slug: 'construction-energy-law',
    name: 'Construction & Energy Law',
    img: '/images/practice-construction-3d.jpg',
    icon: 'building',
    desc: 'Managing legal matters related to construction projects, infrastructure development, and energy sector regulations.',
  },
  {
    slug: 'litigation',
    name: 'Litigation',
    img: '/images/practice-litigation-3d.jpg',
    icon: 'gavel',
    desc: 'Representing clients in court proceedings to protect their rights and achieve favorable legal outcomes.',
  },
  {
    slug: 'corporate-commercial-law',
    name: 'Corporate & Commercial Law',
    img: '/images/practice-corporate-3d.jpg',
    icon: 'columns',
    desc: 'Advising businesses on corporate governance, contracts, mergers, and commercial transactions to ensure legal compliance and growth.',
  },
]

// Team order EXACTLY as on the live site. Tayyib Malik first — the firm is his.
export const TEAM = [
  {
    name: 'M. Tayyib Malik',
    role: 'Advocate High Court',
    img: '/images/team-tayyib.jpg',
    founder: true,
    bio: 'A seasoned legal professional with extensive experience in corporate, civil, and constitutional matters, providing strategic and result-oriented legal representation.',
  },
  {
    name: 'Hazrat Younas',
    role: 'Advocate High Court',
    img: '/images/team-younas.jpg',
    bio: 'A seasoned legal professional with over 12 years of experience in corporate, commercial, and civil law, providing strategic legal counsel, effective representation, and practical solutions to individuals, businesses, and organizations. Recognized for a client-focused approach, meticulous legal analysis, and a commitment to delivering results with integrity and professionalism.',
  },
  {
    name: 'Touqeer Ahmed Bhatti',
    role: 'Advocate High Court',
    img: '/images/team-touqeer.jpg',
    bio: 'Specializes in litigation and advisory services, representing clients with a strong focus on procedural accuracy and effective legal strategy.',
  },
  {
    name: 'Syed Wafa Abbass Gillani',
    role: 'Advocate High Court',
    img: '/images/team-gillani.jpg',
    bio: 'Experienced in handling complex legal disputes, offering practical legal solutions with a commitment to professional excellence.',
  },
  {
    name: 'Hafiz Usman Ghani',
    role: 'Advocate High Court',
    img: '/images/team-usman.jpg',
    bio: 'Provides comprehensive legal representation in civil and corporate matters, known for thorough case preparation and client-focused advocacy.',
  },
  {
    name: 'Iqra Naz',
    role: 'Advocate High Court',
    img: null, // no photo on the live site (Elementor placeholder) — premium monogram instead
    bio: 'Actively involved in litigation and legal research, delivering diligent representation with a detail-oriented and professional approach.',
  },
  {
    name: 'Haris Rizwan Bhatti',
    role: 'Advocate High Court',
    img: '/images/team-haris.jpg',
    bio: 'Focused on litigation and dispute resolution, assisting clients with effective legal strategies across multiple jurisdictions.',
  },
  {
    name: 'Adnan Mehmood',
    role: 'Advocate High Court',
    img: '/images/team-adnan.jpg',
    bio: 'Offers legal services in civil and commercial matters, supporting clients with clear legal advice and courtroom advocacy.',
  },
  {
    name: 'Abdul Basit',
    role: 'Advocate',
    img: '/images/team-basit.jpg',
    bio: 'Engaged in legal research and litigation support, assisting in case management and procedural matters with professional competence.',
  },
  {
    name: 'Moiz Malik',
    role: 'Advocate',
    img: '/images/team-moiz.jpg',
    bio: 'Provides legal assistance in litigation and advisory matters, contributing to case preparation and client representation.',
  },
  {
    name: 'Jawad Ahmed',
    role: 'Advocate',
    img: '/images/team-jawad.jpg',
    bio: 'Actively involved in legal drafting and litigation support, assisting in the effective handling of legal proceedings.',
  },
  {
    name: 'Mian Mudassir Hassan',
    role: 'Advocate High Court',
    img: '/images/team-mudassir.jpg',
    bio: 'Mian Mudassir Hassan is an Advocate of the High Court, holding academic qualifications in Bachelor of Laws (LL.B.) and Master of Laws (LL.M.) with a specialization in Human Rights Law. He has been actively engaged in the legal profession since 2019, practicing in Islamabad, Pakistan.',
  },
]

export const FOUNDER_SHORT_BIO =
  'Advocate of the High Courts of Pakistan and a seasoned litigation and corporate lawyer with over ten years of diverse experience in civil and commercial law. He has represented multinational clients before various judicial and quasi-judicial fora across Pakistan, providing strategic legal counsel and effective courtroom advocacy.'

export const HELP_ITEMS = [
  {
    num: '01',
    title: 'Strategic Legal Advisory',
    text: 'We provide practical and result-oriented legal advice, helping clients navigate complex legal and regulatory challenges with confidence.',
  },
  {
    num: '02',
    title: 'Dispute Resolution & Representation',
    text: 'Our Firm represents clients before courts, tribunals, and regulatory authorities, ensuring strong advocacy at all jurisdictional levels.',
  },
  {
    num: '03',
    title: 'Corporate & Commercial Support',
    text: 'We assist businesses with corporate structuring, compliance, contracts, and transactions, enabling sustainable growth and risk management.',
  },
]

export const ABOUT_PARAS = [
  'Tayyib Malik & Co. is an established law firm based in Islamabad, Pakistan, recognized nationally and internationally for its comprehensive legal and corporate advisory services. The Firm comprises a highly qualified team of barristers, advocates, solicitors, and chartered accountants with extensive experience across multiple areas of law.',
  'The Firm\u2019s objective is to maintain a strong global outreach, enabling it to assist clients across various jurisdictions by delivering practical, cost-effective, and expert legal solutions tailored to their specific requirements. Tayyib Malik & Co. is committed to providing a one-stop legal service platform, supported by its professional dedication and national as well as international accessibility through direct and associated presence across different regions of Pakistan.',
  'The Firm adopts a synergistic and integrated approach in the delivery of its services, ensuring comprehensive and cutting-edge legal assistance while consistently adhering to the highest standards of professional ethics and integrity. Its team of experienced legal professionals is well-equipped to represent clients in corporate, civil, and constitutional litigation at all jurisdictional levels, ranging from large-scale corporate, banking, and taxation disputes to matters involving the protection of individual rights.',
]

export const CONSULTANCY_SERVICES = [
  'Legal advice and opinions',
  'Drafting, review, and negotiation of concession and implementation agreements',
  'Power purchase and fuel supply agreements',
  'Construction and equipment supply contracts',
  'Loan and security documentation',
  'Joint venture and shareholders\u2019 agreements',
  'Fund management matters',
  'Legislative drafting',
  'Corporate governance advisory',
  'Due diligence exercises',
  'Vetting of legal and financial documentation',
]

export const FOUNDER_BIO_PARAS = [
  'Muhammad Tayyib Malik, Advocate High Court, is a seasoned litigation and trial lawyer and the Founder & Chief Executive of the Firm, with over ten years of intensive courtroom practice before the Islamabad High Court, other Provincial High Courts, and District Courts across Pakistan.',
  'He holds an LLB and an LLM in International Trade Law from the International Islamic University, Islamabad, and a Master\u2019s degree in Political Science from the University of the Punjab, Lahore.',
  'Mr. Malik has successfully argued and won numerous complex, technical, and high-stake cases, earning recognition for his forceful advocacy, strategic case management, and effective handling of constitutional, criminal, corporate, and commercial disputes.',
  'His experience as a Law Intern at the Senate of Pakistan (2016\u20132018) further strengthens his command over legislative interpretation and complex statutory litigation, while his LLM research on the Alternative Dispute Resolution Act, 2017 reflects his depth in dispute resolution and enforcement mechanisms.',
]

export const FOUNDER_EXPERTISE = [
  'Constitutional Litigation',
  'Criminal Litigation',
  'Corporate and Commercial Disputes',
  'Election Laws',
  'Trade and Anti-Dumping Laws',
  'Consumer Protection',
  'Human Rights',
  'Alternative Dispute Resolution',
]

export const FOUNDER_SKILLS = [
  'Trial Advocacy',
  'Legal Research',
  'Cross-Examination',
  'Drafting of Pleadings',
  'Negotiation',
  'Arbitration',
]

export const PRO_BONO_GROUPS = [
  { icon: 'users', label: 'Families of jailed persons' },
  { icon: 'heart', label: 'Widows' },
  { icon: 'shield', label: 'Women facing legal issues' },
  { icon: 'scales', label: 'Needy and underprivileged individuals' },
]

export const DONATE_POINTS = [
  'Free legal representation',
  'Court fee assistance for deserving cases',
  'Legal awareness initiatives',
  'Welfare support for affected families',
]

export const BANK = {
  bank: 'Meezan Bank',
  title: 'LEGAL AID & WELFARE SERVICES',
  iban: 'PK54MEZN0003110114793210',
  branch: 'G-11 Markaz, Islamabad',
}
