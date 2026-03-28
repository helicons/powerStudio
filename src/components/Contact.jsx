import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────
   Contact — CTA sección full-width
   - Titular con reveal de clip-path (GSAP ScrollTrigger)
   - Botones WhatsApp + Email con Framer Motion whileHover
───────────────────────────────────────────────────────────── */
export default function Contact() {
  const titleRef   = useRef(null)
  const subtitleRef = useRef(null)
  const decorRef   = useRef(null)

  useEffect(() => {
    const title    = titleRef.current
    const subtitle = subtitleRef.current
    if (!title) return

    // ── Reveal del título con clip-path ──────────────────────
    // Parte de completamente clipeado (invisible) a visible
    gsap.fromTo(
      title,
      {
        clipPath: 'inset(0 0 100% 0)',
        y: 30,
      },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 82%',
          once: true,
        },
      }
    )

    // ── Subtítulo fade-in ─────────────────────────────────────
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    // ── Línea decorativa ─────────────────────────────────────
    if (decorRef.current) {
      gsap.fromTo(
        decorRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: decorRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="contacto"
      style={{
        position:        'relative',
        backgroundColor: '#111827',
        padding:         '9rem clamp(1.5rem, 5vw, 4rem)',
        overflow:        'hidden',
      }}
    >
      {/* ── Línea decorativa superior ── */}
      <div
        ref={decorRef}
        style={{
          position:    'absolute',
          top:         0,
          left:        0,
          right:       0,
          height:      '1px',
          background:  'linear-gradient(90deg, #7c3aed, transparent)',
        }}
      />

      {/* ── Círculo de fondo decorativo ── */}
      <div
        style={{
          position:     'absolute',
          right:        '-15vw',
          top:          '50%',
          transform:    'translateY(-50%)',
          width:        '55vw',
          height:       '55vw',
          borderRadius: '50%',
          border:       '1px solid rgba(124, 58, 237, 0.06)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position:     'absolute',
          right:        '-8vw',
          top:          '50%',
          transform:    'translateY(-50%)',
          width:        '35vw',
          height:       '35vw',
          borderRadius: '50%',
          border:       '1px solid rgba(124, 58, 237, 0.08)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth:  '860px',
          margin:    '0 auto',
          textAlign: 'center',
          position:  'relative',
          zIndex:    1,
        }}
      >
        {/* ── Etiqueta de sección ── */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display:       'inline-block',
            fontFamily:    'DM Sans, sans-serif',
            fontWeight:    300,
            fontSize:      '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         '#7c3aed',
            marginBottom:  '2.5rem',
          }}
        >
          Contacto
        </motion.span>

        {/* ── Titular con clip-path reveal ── */}
        <h2
          ref={titleRef}
          style={{
            fontFamily:    'Syne, sans-serif',
            fontWeight:    800,
            fontSize:      'clamp(40px, 6.5vw, 86px)',
            letterSpacing: '-0.03em',
            lineHeight:    1.05,
            color:         '#f1f5f9',
            marginBottom:  '1.8rem',
          }}
        >
          ¿Tienes un<br />
          <span style={{ color: '#7c3aed' }}>proyecto?</span>
        </h2>

        {/* ── Subtítulo ── */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily:  'DM Sans, sans-serif',
            fontWeight:  300,
            fontSize:    'clamp(15px, 1.8vw, 19px)',
            color:       '#94a3b8',
            lineHeight:  1.7,
            marginBottom: '3.5rem',
            maxWidth:    '480px',
            margin:      '0 auto 3.5rem',
          }}
        >
          Respondo en menos de 24h.<br />Primera consulta gratis.
        </p>

        {/* ── Botones CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display:    'flex',
            gap:        '1rem',
            justifyContent: 'center',
            flexWrap:   'wrap',
          }}
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            whileHover={{
              scale:     1.04,
              boxShadow: '0 0 40px rgba(124, 58, 237, 0.55)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '0.75rem',
              padding:      '1.1rem 2.5rem',
              background:   '#7c3aed',
              color:        '#f1f5f9',
              fontFamily:   'DM Sans, sans-serif',
              fontWeight:   500,
              fontSize:     '0.95rem',
              letterSpacing: '0.02em',
            }}
          >
            {/* Icono WhatsApp */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:hola@tunombre.com"
            data-cursor-hover
            whileHover={{
              scale:     1.04,
              boxShadow: '0 0 40px rgba(124, 58, 237, 0.2)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '0.75rem',
              padding:      '1.1rem 2.5rem',
              background:   'transparent',
              color:        '#f1f5f9',
              fontFamily:   'DM Sans, sans-serif',
              fontWeight:   500,
              fontSize:     '0.95rem',
              letterSpacing: '0.02em',
              border:       '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {/* Icono Email */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Email
          </motion.a>
        </motion.div>

        {/* ── Texto de confianza ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily:    'DM Sans, sans-serif',
            fontWeight:    300,
            fontSize:      '0.8rem',
            letterSpacing: '0.04em',
            color:         '#475569',
            marginTop:     '2.5rem',
          }}
        >
          Sin compromiso · NDA disponible · Facturas a empresa
        </motion.p>
      </div>
    </section>
  )
}
