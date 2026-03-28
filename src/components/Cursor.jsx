import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Cursor personalizado de dos capas:
 * - Dot: sigue al ratón directamente (sin lag)
 * - Ring: sigue con un leve delay para dar sensación de inercia
 */
export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Posición raw del ratón
    let mx = window.innerWidth  / 2
    let my = window.innerHeight / 2

    // Posición suavizada del ring (lerp manual)
    let rx = mx, ry = my

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY

      // Dot sigue al instante
      gsap.set(dot, { x: mx, y: my })
    }

    // Animación del ring con lerp en cada frame
    const ticker = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      gsap.set(ring, { x: rx, y: ry })
    }

    window.addEventListener('mousemove', onMouseMove)
    gsap.ticker.add(ticker)

    // Agrandar el ring cuando el cursor entra en elementos interactivos
    const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]')
    const onEnter = () => {
      gsap.to(ring, { width: 64, height: 64, borderColor: 'rgba(124,58,237,0.8)', duration: 0.3, ease: 'power2.out' })
      gsap.to(dot,  { scale: 0, duration: 0.2 })
    }
    const onLeave = () => {
      gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(124,58,237,0.5)', duration: 0.3, ease: 'power2.out' })
      gsap.to(dot,  { scale: 1, duration: 0.2 })
    }

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(ticker)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
