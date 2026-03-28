import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Footer minimalista.
 * - Línea que se dibuja de izquierda a derecha con ScrollTrigger
 * - Nombre, año y ciudad
 */
export default function Footer() {
  const lineRef = useRef(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.6,
        ease: 'power3.out',
        transformOrigin: 'left center',
        scrollTrigger: {
          trigger: line,
          start: 'top 95%',
          once: true,
        },
      }
    )
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: '#0d1117',
        padding: '3rem clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Línea que se dibuja con ScrollTrigger */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, #7c3aed 0%, rgba(124,58,237,0.2) 60%, transparent 100%)',
            marginBottom: '2.5rem',
          }}
        />

        {/* Contenido del footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ color: '#a78bfa' }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
              color: '#f1f5f9',
            }}
          >
            PowerStudio<span style={{ color: '#7c3aed' }}>.</span>
          </motion.a>

          {/* Links de navegación */}
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Proyectos', 'Contacto'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ color: '#a78bfa' }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#475569',
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Copyright + ciudad */}
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              color: '#334155',
            }}
          >
            © {year} · Madrid
          </span>
        </div>

        {/* Aviso legal minimalista */}
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: '0.72rem',
            letterSpacing: '0.02em',
            color: '#1e293b',
            marginTop: '2rem',
            textAlign: 'center',
          }}
        >
          Hecho con intención · Sin templates · Código propio
        </p>
      </div>
    </footer>
  )
}
