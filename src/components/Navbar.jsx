import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

/**
 * Navbar fija.
 * - Transparente en top, fondo difuminado al hacer scroll (Framer Motion)
 * - Links con underline dibujado por GSAP (scaleX 0→1)
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  // Refs para las líneas decorativas de los links
  const underlineRefs = useRef([])

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animar underline del link con GSAP
  const handleEnter = (i) => {
    gsap.to(underlineRefs.current[i], {
      scaleX: 1,
      duration: 0.35,
      ease: 'power3.out',
      transformOrigin: 'left center',
    })
  }
  const handleLeave = (i) => {
    gsap.to(underlineRefs.current[i], {
      scaleX: 0,
      duration: 0.25,
      ease: 'power2.in',
      transformOrigin: 'right center',
    })
  }

  const links = [
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
        // Transición suave al hacer scroll
        backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
        backgroundColor: scrolled
          ? 'rgba(13, 17, 23, 0.75)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* ── Logo / Nombre ── */}
      <a
        href="#"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: '1.2rem',
          color: '#f1f5f9',
          letterSpacing: '-0.02em',
        }}
      >
        PowerStudio
        <span style={{ color: '#7c3aed' }}>.</span>
      </a>

      {/* ── Links de navegación ── */}
      <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            style={{
              position: 'relative',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#94a3b8',
            }}
          >
            {link.label}

            {/* Underline controlado por GSAP */}
            <span
              ref={(el) => (underlineRefs.current[i] = el)}
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: 0,
                width: '100%',
                height: '1px',
                background: '#7c3aed',
                transform: 'scaleX(0)',
                transformOrigin: 'left center',
              }}
            />
          </a>
        ))}
      </nav>
    </motion.nav>
  )
}
