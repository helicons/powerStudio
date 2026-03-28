import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Datos de los proyectos (placeholder) ─────────────────── */
const PROJECTS = [
  {
    id: 1,
    name:     'Lumina Studio',
    category: 'Branding · Web',
    // Gradiente que simula una imagen — look editorial
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1a2235 100%)',
    accent:   '#4338ca',
    year:     '2024',
    featured: true,  // primer card ocupa ancho completo
  },
  {
    id: 2,
    name:     'Forma Estudio',
    category: 'E-commerce · UX',
    gradient: 'linear-gradient(135deg, #1a2235 0%, #1e3a5f 60%, #0f172a 100%)',
    accent:   '#0369a1',
    year:     '2024',
    featured: false,
  },
  {
    id: 3,
    name:     'Nórdica',
    category: 'Landing · Web App',
    gradient: 'linear-gradient(135deg, #1a2235 0%, #2d1b69 60%, #0d1117 100%)',
    accent:   '#6d28d9',
    year:     '2023',
    featured: false,
  },
]

/* ─── Tarjeta de proyecto ──────────────────────────────────── */
function ProjectCard({ project, index, isFeatured }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const imgRef  = useRef(null)

  // Entrada con ScrollTrigger — fade + translateY con stagger
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0, y: 70 },
      {
        opacity:  1,
        y:        0,
        duration: 1,
        ease:     'power3.out',
        delay:    index * 0.12,
        scrollTrigger: {
          trigger: el,
          start:   'top 88%',
          once:    true,
        },
      }
    )
  }, [index])

  // Zoom de imagen en hover (GSAP complementa Framer Motion)
  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    gsap.to(img, {
      scale:    hovered ? 1.06 : 1,
      duration: 0.7,
      ease:     'power3.out',
    })
  }, [hovered])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
      style={{
        position:    'relative',
        aspectRatio: isFeatured ? '16/7' : '4/3',
        overflow:    'hidden',
        cursor:      'pointer',
        borderRadius: 0, // look editorial: esquinas rectas
      }}
    >
      {/* ── Imagen placeholder (gradiente con geometría sutil) ── */}
      <div
        ref={imgRef}
        style={{
          position:   'absolute',
          inset:      0,
          background: project.gradient,
          zIndex:     0,
        }}
      >
        {/* Líneas geométricas decorativas en el placeholder */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}
          viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="320" cy="60"  r="140" fill="none" stroke="white" strokeWidth="0.5"/>
          <circle cx="320" cy="60"  r="90"  fill="none" stroke="white" strokeWidth="0.5"/>
          <circle cx="320" cy="60"  r="40"  fill="none" stroke="white" strokeWidth="0.5"/>
          <line x1="0" y1="150" x2="400" y2="150" stroke="white" strokeWidth="0.3"/>
          <line x1="200" y1="0"  x2="200" y2="300" stroke="white" strokeWidth="0.3"/>
        </svg>
      </div>

      {/* ── Número de proyecto (fondo) ── */}
      <span
        style={{
          position:    'absolute',
          top:         '1.2rem',
          left:        '1.5rem',
          fontFamily:  'Syne, sans-serif',
          fontWeight:  800,
          fontSize:    '0.7rem',
          letterSpacing: '0.2em',
          color:       'rgba(255,255,255,0.2)',
          zIndex:      1,
        }}
      >
        0{project.id}
      </span>

      {/* ── Año ── */}
      <span
        style={{
          position:    'absolute',
          top:         '1.2rem',
          right:       '1.5rem',
          fontFamily:  'DM Sans, sans-serif',
          fontWeight:  300,
          fontSize:    '0.7rem',
          letterSpacing: '0.1em',
          color:       'rgba(255,255,255,0.2)',
          zIndex:      1,
        }}
      >
        {project.year}
      </span>

      {/* ── Overlay hover con Framer Motion ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position:        'absolute',
          inset:           0,
          backgroundColor: 'rgba(124, 58, 237, 0.88)',
          zIndex:          2,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 14, scale: hovered ? 1 : 0.95 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.6rem',
          }}
        >
          <span
            style={{
              fontFamily:    'DM Sans, sans-serif',
              fontWeight:    500,
              fontSize:      '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         '#f1f5f9',
            }}
          >
            Ver proyecto
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9h10M10 5l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Info del proyecto (parte inferior) ── */}
      <div
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          padding:    '1.8rem 1.5rem 1.5rem',
          zIndex:     3,
          background: 'linear-gradient(to top, rgba(13,17,23,0.95) 0%, transparent 100%)',
        }}
      >
        <p
          style={{
            fontFamily:    'DM Sans, sans-serif',
            fontWeight:    400,
            fontSize:      '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         '#a78bfa',
            marginBottom:  '0.35rem',
          }}
        >
          {project.category}
        </p>
        <h3
          style={{
            fontFamily:    'Syne, sans-serif',
            fontWeight:    700,
            fontSize:      isFeatured ? '1.8rem' : '1.3rem',
            letterSpacing: '-0.02em',
            color:         '#f1f5f9',
            lineHeight:    1,
          }}
        >
          {project.name}
        </h3>
      </div>
    </div>
  )
}

/* ─── Sección completa de Proyectos ───────────────────────── */
export default function Projects() {
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const lineRef     = useRef(null)

  // Animar título, subtítulo y línea decorativa al hacer scroll
  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current].filter(Boolean)
    gsap.fromTo(
      els,
      { opacity: 0, y: 60 },
      {
        opacity:  1,
        y:        0,
        duration: 1.1,
        ease:     'power3.out',
        stagger:  0.12,
        scrollTrigger: {
          trigger: els[0],
          start:   'top 88%',
          once:    true,
        },
      }
    )

    // Línea horizontal del header de sección
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX:          1,
          duration:        1.4,
          ease:            'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: lineRef.current,
            start:   'top 90%',
            once:    true,
          },
        }
      )
    }
  }, [])

  const featured  = PROJECTS.find(p => p.featured)
  const secondary = PROJECTS.filter(p => !p.featured)

  return (
    <section
      id="proyectos"
      style={{
        padding:         '9rem clamp(1.5rem, 5vw, 4rem)',
        backgroundColor: '#0d1117',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ── Header de sección ── */}
        <div style={{ marginBottom: '5rem' }}>
          {/* Línea decorativa sobre el título */}
          <div
            ref={lineRef}
            style={{
              width:      '48px',
              height:     '1px',
              background: '#7c3aed',
              marginBottom: '1.5rem',
            }}
          />

          <div
            style={{
              display:    'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap:   'wrap',
              gap:        '1.5rem',
            }}
          >
            <h2
              ref={titleRef}
              style={{
                fontFamily:    'Syne, sans-serif',
                fontWeight:    800,
                fontSize:      'clamp(52px, 8vw, 108px)',
                letterSpacing: '-0.03em',
                lineHeight:    0.92,
                color:         '#f1f5f9',
              }}
            >
              Work
            </h2>

            <p
              ref={subtitleRef}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 300,
                fontSize:   '0.9rem',
                color:      '#94a3b8',
                maxWidth:   '260px',
                lineHeight: 1.7,
                paddingBottom: '0.3rem',
              }}
            >
              Proyectos seleccionados<br />de los últimos 12 meses.
            </p>
          </div>
        </div>

        {/* ── Grid editorial ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5px', background: 'rgba(255,255,255,0.04)' }}>

          {/* Card destacada — ancho completo */}
          {featured && (
            <div style={{ background: '#0d1117' }}>
              <ProjectCard project={featured} index={0} isFeatured />
            </div>
          )}

          {/* Dos cards secundarias en fila */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap:                 '1.5px',
              background:          'rgba(255,255,255,0.04)',
            }}
          >
            {secondary.map((project, i) => (
              <div key={project.id} style={{ background: '#0d1117' }}>
                <ProjectCard project={project} index={i + 1} isFeatured={false} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Link "Ver todos" ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '3rem', textAlign: 'right' }}
        >
          <a
            href="#"
            data-cursor-hover
            style={{
              fontFamily:    'DM Sans, sans-serif',
              fontWeight:    400,
              fontSize:      '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         '#94a3b8',
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.5rem',
              borderBottom:  '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '0.2rem',
              transition:    'color 0.3s ease, border-color 0.3s ease',
            }}
          >
            Ver todos los proyectos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
