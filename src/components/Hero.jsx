import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────
   Hero v2 — Layout editorial left-aligned
   - Texto outline gigante ("DISEÑO") como capa de fondo del título
   - Mezcla de pesos y tamaños en el titular
   - Texto vertical rotado en el lateral derecho
   - Strip de stats en la parte inferior
   - Three.js partículas (igual que v1)
   - GSAP split-text + CTA magnético
───────────────────────────────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef(null)
  const ghostRef = useRef(null)   // el texto outline gigante de fondo
  const line1Ref = useRef([])     // palabras línea 1
  const line2Ref = useRef([])     // palabras línea 2
  const line3Ref = useRef(null)   // línea 3 accent
  const subRef = useRef(null)
  const btnRef = useRef(null)
  const statsRef = useRef([])
  const vertRef = useRef(null)
  const lineDecRef = useRef(null)

  // ── Three.js: partículas de fondo ──────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const COUNT = 260
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    const offsets = new Float32Array(COUNT)

    const c1 = new THREE.Color('#2d1b69')
    const c2 = new THREE.Color('#4c1d95')
    const c3 = new THREE.Color('#5b21b6')

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      const col = [c1, c2, c3][Math.floor(Math.random() * 3)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
      speeds[i] = 0.2 + Math.random() * 0.8
      offsets[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.065, vertexColors: true, transparent: true, opacity: 0.55, sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let animId
    const clock = new THREE.Clock()
    const posArr = geometry.attributes.position.array

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3
        posArr[ix] += Math.sin(t * speeds[i] * 0.3 + offsets[i]) * 0.001
        posArr[ix + 1] += Math.cos(t * speeds[i] * 0.2 + offsets[i]) * 0.0008
      }
      geometry.attributes.position.needsUpdate = true
      particles.rotation.y = t * 0.016
      particles.rotation.x = Math.sin(t * 0.07) * 0.035
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      geometry.dispose(); material.dispose(); renderer.dispose()
    }
  }, [])

  // ── GSAP: timeline de entrada ──────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Texto ghost outline: entra desde la izquierda + fade
    if (ghostRef.current) {
      gsap.set(ghostRef.current, { x: -60, opacity: 0 })
      tl.to(ghostRef.current, { x: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }, 0)
    }

    // Línea decorativa horizontal
    if (lineDecRef.current) {
      gsap.set(lineDecRef.current, { scaleX: 0 })
      tl.to(lineDecRef.current, { scaleX: 1, duration: 1, ease: 'power3.out', transformOrigin: 'left' }, 0.2)
    }

    // Palabras línea 1 — desde abajo con stagger
    const w1 = line1Ref.current.filter(Boolean)
    if (w1.length) {
      gsap.set(w1, { y: '110%', opacity: 0 })
      tl.to(w1, { y: '0%', opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.08 }, 0.15)
    }

    // Palabras línea 2
    const w2 = line2Ref.current.filter(Boolean)
    if (w2.length) {
      gsap.set(w2, { y: '110%', opacity: 0 })
      tl.to(w2, { y: '0%', opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.08 }, 0.3)
    }

    // Línea 3 accent
    if (line3Ref.current) {
      gsap.set(line3Ref.current, { y: '110%', opacity: 0 })
      tl.to(line3Ref.current, { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' }, 0.42)
    }

    // Subtítulo y texto vertical
    const laterEls = [subRef.current, vertRef.current].filter(Boolean)
    gsap.set(laterEls, { opacity: 0, y: 16 })
    tl.to(laterEls, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, 0.85)

    // Stats — cada stat con stagger
    const stats = statsRef.current.filter(Boolean)
    if (stats.length) {
      gsap.set(stats, { opacity: 0, y: 20 })
      tl.to(stats, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 1.1)
    }
  }, [])

  // ── GSAP: CTA magnético ────────────────────────────────────
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    const onMove = (e) => {
      const r = btn.getBoundingClientRect()
      gsap.to(btn, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.28,
        y: (e.clientY - (r.top + r.height / 2)) * 0.28,
        duration: 0.5, ease: 'power2.out',
      })
    }
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave) }
  }, [])

  // Datos del titular — separados para animar individualmente
  const words1 = ['Diseño', 'web']
  const words2 = ['que']

  const stats = [
    { value: '3+', label: 'Años' },
    { value: '40+', label: 'Proyectos' },
    { value: '72h', label: 'Entrega media' },
    { value: '★★★★★', label: 'Clientes' },
  ]

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#0d1117',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      {/* ── Canvas Three.js ── */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
      />

      {/* ── Viñeta radial ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 80% at 30% 50%, transparent 20%, #0d1117 75%)',
      }} />

      {/* ── Texto OUTLINE GIGANTE de fondo — capa decorativa ── */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-2vw',
          top: '50%',
          transform: 'translateY(-52%)',
          zIndex: 1,
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(120px, 18vw, 260px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
          // texto solo con stroke, sin relleno — el efecto "ghost"
          color: 'transparent',
          WebkitTextStroke: '1px rgba(124, 58, 237, 0.12)',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        STUDIO
      </div>

      {/* ── Contenido principal ── */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', width: '100%' }}>

        {/* Etiqueta + línea horizontal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.8rem' }}>
          <div
            ref={lineDecRef}
            style={{ width: '40px', height: '1px', background: '#7c3aed', flexShrink: 0 }}
          />
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#7c3aed',
          }}>
            Freelance · Madrid · 2024
          </span>
        </div>

        {/* ── Bloque titular + texto vertical ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3rem' }}>

          {/* Titular */}
          <div style={{ flex: 1 }}>

            {/* Línea 1: "Diseño web" — gran tamaño, peso 800 */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: '0.25em', flexWrap: 'wrap' }}>
                {words1.map((word, i) => (
                  <span
                    key={i}
                    ref={(el) => (line1Ref.current[i] = el)}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(54px, 8.5vw, 112px)',
                      letterSpacing: '-0.035em',
                      lineHeight: 0.95,
                      color: '#f1f5f9',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Línea 2: "que" — mismo tamaño pero en outline con stroke */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: '0.25em', alignItems: 'center', flexWrap: 'wrap' }}>
                {words2.map((word, i) => (
                  <span
                    key={i}
                    ref={(el) => (line2Ref.current[i] = el)}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(54px, 8.5vw, 112px)',
                      letterSpacing: '-0.035em',
                      lineHeight: 0.95,
                      // outline / ghost — sutil contraste tipográfico
                      color: 'transparent',
                      WebkitTextStroke: '2px rgba(241,245,249,0.3)',
                    }}
                  >
                    {word}
                  </span>
                ))}

                {/* "impacta." — accent sólido, mismo tamaño */}
                <div style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <span
                    ref={line3Ref}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(54px, 8.5vw, 112px)',
                      letterSpacing: '-0.035em',
                      lineHeight: 0.95,
                      color: '#7c3aed',
                    }}
                  >
                    impacta.
                  </span>
                </div>
              </div>
            </div>

            {/* Línea 3: tagline secundaria — peso ligero, tamaño medio */}
            <motion.p
              ref={subRef}
              initial={{ opacity: 0 }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                color: '#94a3b8',
                marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                maxWidth: '440px',
                lineHeight: 1.65,
              }}
            >
              Webs premium entregadas en días, no semanas.
              <br />Primera consulta gratis. Sin compromiso.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <a
                ref={btnRef}
                href="#contacto"
                data-cursor-hover
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2.5rem',
                  background: '#7c3aed',
                  color: '#f1f5f9',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.92rem',
                  letterSpacing: '0.03em',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                Hablemos
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Link secundario "Ver proyectos" */}
              <a
                href="#proyectos"
                data-cursor-hover
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.82rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#475569',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '2px',
                }}
              >
                Ver trabajo
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* ── Texto vertical rotado — lateral derecho ── */}
          <div
            ref={vertRef}
            style={{
              display: 'none',    // oculto en mobile — activado en desktop via style tag
              flexShrink: 0,
              alignSelf: 'center',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#334155',
              paddingBottom: '1rem',
            }}
            className="hero-vertical-text"
          >
            Diseñador web freelance · Madrid · España
          </div>
        </div>
      </div>

      {/* ── Strip de stats — parte inferior ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: '1.5rem clamp(1.5rem, 6vw, 5rem)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 4vw, 4rem)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}
          >
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
              letterSpacing: '-0.02em',
              color: '#f1f5f9',
            }}>
              {stat.value}
            </span>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#475569',
            }}>
              {stat.label}
            </span>
          </div>
        ))}

        {/* Separador flex + scroll indicator a la derecha */}
        <div style={{ marginLeft: 'auto' }}>
          <ScrollIndicator />
        </div>
      </div>

      {/* ── CSS para desktop: mostrar texto vertical ── */}
      <style>{`
        @media (min-width: 900px) {
          .hero-vertical-text { display: flex !important; }
        }
      `}</style>
    </section>
  )
}

/* ─── Scroll indicator ────────────────────────────────────── */
function ScrollIndicator() {
  const lineRef = useRef(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    gsap.fromTo(line,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.2, ease: 'power2.inOut', repeat: -1, repeatDelay: 0.4, delay: 2.5, yoyo: true }
    )
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: '9px',
        letterSpacing: '0.22em', color: '#334155', textTransform: 'uppercase',
      }}>
        Scroll
      </span>
      <div style={{ width: '1px', height: '44px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div
          ref={lineRef}
          style={{ width: '100%', height: '100%', background: '#7c3aed', transformOrigin: 'top center' }}
        />
      </div>
    </div>
  )
}
