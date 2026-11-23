import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { FloatingButtons, Footer, Header, TopBar } from './components/chrome'
import Home from './pages/Home'
import { About, Contact, Founder, NotFound, Practice, ProBono, Team } from './pages/pages'

function ScrollManager() {
  const { pathname, hash, search } = useLocation()

  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  // Keep one canonical URL form: /about/ -> /about (old WordPress links still land correctly).
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return <Navigate to={pathname.slice(0, -1) + search + hash} replace />
  }
  return null
}

function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollManager />
      <div className="scroll-progress" aria-hidden="true" />
      <TopBar />
      <Header />
      <div className="page-fade" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practice-area" element={<Practice />} />
          <Route path="/our-team" element={<Team />} />
          <Route path="/about-tayyib-malik" element={<Founder />} />
          <Route path="/pro-bono-services" element={<ProBono />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pro-bono" element={<Navigate to="/pro-bono-services" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <FloatingButtons />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
