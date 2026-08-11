import { useEffect, useRef, useState } from 'react'
import { TiltContext } from './TiltContext'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function TiltCard({ children, className = '', maxTilt = 12 }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const reducedRef = useRef(false)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const handleMouseMove = (e) => {
    if (reducedRef.current) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -maxTilt,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * maxTilt,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <TiltContext.Provider value={tilt}>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: `transform 0.35s ${EASE}`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </TiltContext.Provider>
  )
}
