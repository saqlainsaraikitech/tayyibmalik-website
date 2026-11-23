// Inline SVG icons (stroke style). No emoji icons, no icon font dependency.

const PATHS = {
  scales: (
    <>
      <path d="M12 3v18" />
      <path d="M8 21h8" />
      <path d="M4 7h16" />
      <path d="M7 7l-3 6a3.2 3.2 0 0 0 6 0L7 7z" />
      <path d="M17 7l-3 6a3.2 3.2 0 0 0 6 0l-3-6z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
      <path d="M8.5 11h7M8.5 14h4" />
    </>
  ),
  bank: (
    <>
      <path d="M3 21h18" />
      <path d="M4 10h16" />
      <path d="M12 3l9 7H3l9-7z" />
      <path d="M6.5 10v11M10.2 10v11M13.8 10v11M17.5 10v11" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.6" />
    </>
  ),
  tower: (
    <>
      <circle cx="12" cy="12" r="1.8" />
      <path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8" />
      <path d="M5.7 5.7a8.9 8.9 0 0 0 0 12.6M18.3 5.7a8.9 8.9 0 0 1 0 12.6" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V8l6-4.5L18 8v13" />
      <path d="M10 21v-5h4v5" />
      <path d="M10 11h.01M14 11h.01" />
    </>
  ),
  gavel: (
    <>
      <path d="M13.5 4.5l6 6" />
      <path d="M9.5 8.5l6 6" />
      <path d="M12 13L6 19" />
      <path d="M3 21h9" />
      <path d="M14.5 13.5l-2-2" />
    </>
  ),
  columns: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10M9.7 21V10M14.3 21V10M19 21V10" />
      <path d="M3 10l9-6.5L21 10" />
    </>
  ),
  helmet: (
    <>
      <path d="M4 16a8 8 0 0 1 6-7.7V6.5a2 2 0 0 1 4 0v1.8A8 8 0 0 1 20 16" />
      <path d="M2.5 16h19V19h-19z" />
    </>
  ),
  check: <path d="M4 12.5l5 5L20 6.5" />,
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </>
  ),
  up: <path d="M6 14l6-6 6 6" />,
  heart: (
    <path d="M12 20.5S4 15.5 4 9.8A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16 5a3.4 3.4 0 0 1 0 6.6" />
      <path d="M17.6 14.6a6.2 6.2 0 0 1 3.6 5.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  message: <path d="M21 12a9 9 0 1 1-4.3-7.7L21 3l-1.3 4A8.9 8.9 0 0 1 21 12z" />,
}

export default function Icon({ name, size = 22 }) {
  if (name === 'whatsapp') {
    // Official WhatsApp brand glyph (Font Awesome 6 Brands, vector = crisp at any size)
    return <i className="fa-brands fa-whatsapp" style={{ fontSize: size, lineHeight: 1, display: 'inline-block', verticalAlign: 'middle' }} aria-hidden="true" />
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
