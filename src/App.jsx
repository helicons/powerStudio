import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor  from './components/Cursor'
import Navbar  from './components/Navbar'
import Hero    from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer  from './components/Footer'

// Registrar plugins de GSAP una sola vez
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // ── Inicializar Lenis smooth scroll ──────────────────────────
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Conectar Lenis al ticker de GSAP para que ScrollTrigger
    // use siempre la posición interpolada del smooth scroll
    const tickerCallback = (time) => {
      lenis.raf(time * 1000) // GSAP da segundos, Lenis quiere ms
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Notificar a ScrollTrigger en cada frame de Lenis
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
    }
  }, [])

  return (
    <>
      {/* Cursor personalizado */}
      <Cursor />

      <main>
        <Navbar />
        <Hero />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
