import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { stats } from '../data/site'

function Counter({ value, dark }) {
  const target = parseInt(value, 10)
  const suffix = value.slice(target.toString().length)
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    let raf
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          const start = performance.now()
          const duration = 1800
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(target * eased))
            if (progress < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])

  return (
    <span
      ref={ref}
      className={`font-serif text-4xl tracking-tight sm:text-5xl ${
        dark ? 'text-cream' : 'text-charcoal'
      }`}
    >
      {count}
      {suffix}
    </span>
  )
}

export default function StatsSection({ dark = false, className = '' }) {
  return (
    <section
      className={`${dark ? 'bg-charcoal text-cream' : 'bg-mist'} ${className}`}
    >
      <div className="mx-auto max-w-none px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-8">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className="relative flex flex-col items-center gap-1.5 px-2 text-center"
            >
              <Counter value={stat.value} dark={dark} />
              <span
                className={`text-xs font-medium uppercase tracking-[0.18em] ${
                  dark ? 'text-taupe' : 'text-stone'
                }`}
              >
                {stat.label}
              </span>
              {i > 0 && (
                <span
                  className="absolute left-0 top-2 hidden h-12 w-px bg-charcoal/10 sm:block"
                  aria-hidden="true"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
