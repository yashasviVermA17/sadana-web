import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { products } from '../data/products'
import { getProductShopSlug } from '../data/filters'

const MIN_ITEMS = 6

function repeatForMarquee(items) {
  if (items.length === 0) return items
  const out = []
  while (out.length < MIN_ITEMS) out.push(...items)
  return out
}

function getTranslateX(el) {
  if (!el) return 0
  const m = getComputedStyle(el).transform
  if (!m || m === 'none') return 0
  const values = m.match(/[-+]?[\d.]+/g)
  if (!values) return 0
  return values.length >= 13 ? parseFloat(values[12]) || 0 : parseFloat(values[4]) || 0
}

function MarqueeRow({ items, reverse = false, duration = 42, showNav = false }) {
  const set = repeatForMarquee(items)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const dragRef = useRef(null)
  const offsetRef = useRef(0)
  const resumeTimer = useRef(null)
  const drag = useRef({ active: false, startX: 0, moved: 0, frozen: 0, step: 340, span: 0 })

  if (set.length === 0) return null

  const applyOffset = (v) => {
    offsetRef.current = v
    if (dragRef.current) dragRef.current.style.transform = `translate3d(${v}px, 0, 0)`
  }

  const clearTransition = () => {
    if (dragRef.current) dragRef.current.style.transition = ''
  }

  const pause = () => {
    clearTimeout(resumeTimer.current)
    setPaused(true)
  }

  const resume = () => {
    clearTimeout(resumeTimer.current)
    if (drag.current.active) return
    if (offsetRef.current !== 0) {
      dragRef.current.style.transition = 'transform 420ms cubic-bezier(0.22,1,0.36,1)'
      applyOffset(0)
      resumeTimer.current = setTimeout(() => {
        clearTransition()
        setPaused(false)
        if (trackRef.current) trackRef.current.style.animationPlayState = ''
      }, 450)
    } else {
      setPaused(false)
      if (trackRef.current) trackRef.current.style.animationPlayState = ''
    }
  }

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    clearTimeout(resumeTimer.current)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    const el = trackRef.current
    if (el) el.style.animationPlayState = 'paused'
    setPaused(true)
    const d = drag.current
    d.active = true
    d.moved = 0
    d.startX = e.clientX
    d.frozen = getTranslateX(el)
    const setEl = dragRef.current?.querySelector('.marquee-set')
    d.span = setEl ? setEl.offsetWidth : 0
    const first = setEl?.firstElementChild
    const second = setEl?.children[1]
    d.step =
      first && second
        ? second.offsetLeft - first.offsetLeft
        : (first?.offsetWidth || 340) + 20
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    const min = d.frozen - d.span
    const max = d.frozen + d.span
    let eff = d.frozen + dx
    eff = Math.min(max, Math.max(min, eff))
    applyOffset(eff - d.frozen)
  }

  const onPointerUp = (e) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    const dx = e.clientX - d.startX
    const min = d.frozen - d.span
    const max = d.frozen + d.span
    let eff = d.frozen + dx
    eff = Math.min(max, Math.max(min, eff))
    if (d.moved < 8) {
      applyOffset(0)
    } else {
      let target = Math.round(eff / d.step) * d.step
      target = Math.min(max, Math.max(min, target))
      dragRef.current.style.transition = 'transform 380ms cubic-bezier(0.22,1,0.36,1)'
      applyOffset(target - d.frozen)
      resumeTimer.current = setTimeout(clearTransition, 400)
    }
    resumeTimer.current = setTimeout(resume, 3000)
  }

  const nudge = (dir) => {
    clearTimeout(resumeTimer.current)
    const el = trackRef.current
    if (el) el.style.animationPlayState = 'paused'
    setPaused(true)
    const d = drag.current
    d.active = false
    d.frozen = getTranslateX(el)
    const setEl = dragRef.current?.querySelector('.marquee-set')
    d.span = setEl ? setEl.offsetWidth : 0
    const first = setEl?.firstElementChild
    const second = setEl?.children[1]
    d.step =
      first && second
        ? second.offsetLeft - first.offsetLeft
        : (first?.offsetWidth || 340) + 20
    const min = d.frozen - d.span
    const max = d.frozen + d.span
    let target = d.frozen + dir * d.step
    target = Math.min(max, Math.max(min, target))
    dragRef.current.style.transition = 'transform 380ms cubic-bezier(0.22,1,0.36,1)'
    applyOffset(target - d.frozen)
    resumeTimer.current = setTimeout(clearTransition, 400)
    resumeTimer.current = setTimeout(resume, 4000)
  }

  const wheelRef = useRef(0)
  const wheelTimer = useRef(null)
  const marqueeRef = useRef(null)

  const handleWheel = (e) => {
    const deltaX = Math.abs(e.deltaX)
    const deltaY = Math.abs(e.deltaY)
    const horizontal = e.shiftKey || deltaX > deltaY
    if (!horizontal) return
    e.preventDefault()
    clearTimeout(wheelTimer.current)
    clearTimeout(resumeTimer.current)
    const el = trackRef.current
    if (el) el.style.animationPlayState = 'paused'
    setPaused(true)
    const d = drag.current
    if (!d.active) {
      d.active = true
      d.moved = 0
      d.frozen = getTranslateX(el)
      const setEl = dragRef.current?.querySelector('.marquee-set')
      d.span = setEl ? setEl.offsetWidth : 0
      const first = setEl?.firstElementChild
      const second = setEl?.children[1]
      d.step =
        first && second
          ? second.offsetLeft - first.offsetLeft
          : (first?.offsetWidth || 340) + 20
    }
    wheelRef.current += e.deltaX || e.deltaY
    const min = d.frozen - d.span
    const max = d.frozen + d.span
    let eff = d.frozen + wheelRef.current
    eff = Math.min(max, Math.max(min, eff))
    dragRef.current.style.transition = 'none'
    applyOffset(eff - d.frozen)
    wheelTimer.current = setTimeout(() => {
      d.active = false
      let target = Math.round(eff / d.step) * d.step
      target = Math.min(max, Math.max(min, target))
      dragRef.current.style.transition = 'transform 380ms cubic-bezier(0.22,1,0.36,1)'
      applyOffset(target - d.frozen)
      resumeTimer.current = setTimeout(() => {
        clearTransition()
        resumeTimer.current = setTimeout(resume, 2500)
      }, 400)
    }, 120)
  }

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return undefined
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="relative">
      <div
        ref={marqueeRef}
        className="marquee select-none"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (drag.current.moved > 8) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = 0
          }
        }}
      >
      <div ref={dragRef} className="marquee-drag">
        <div
          ref={trackRef}
          className={`marquee-track${reverse ? ' reverse' : ''}${paused ? ' paused' : ''}`}
          style={{ '--marquee-duration': `${duration}s` }}
        >
          {[0, 1].map((dup) => (
            <div className="marquee-set" key={dup} aria-hidden={dup === 1}>
              {set.map((product) => {
                const shopSlug = getProductShopSlug(product)
                return (
                <Link
                  key={`${dup}-${product.id}`}
                  to={shopSlug ? `/products/${shopSlug}` : '/products'}
                  draggable={false}
                  className="group w-[280px] shrink-0 overflow-hidden rounded-card border border-charcoal/10 bg-ivory transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card sm:w-[340px]"
                >
                  <div className="relative img-zoom aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-serif text-lg text-charcoal transition-colors duration-300 group-hover:text-brand">
                      {product.name}
                    </h3>
                  </div>
                </Link>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>

      {showNav && (
        <>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Previous products"
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-charcoal/10 bg-ivory/95 text-charcoal shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Next products"
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-charcoal/10 bg-ivory/95 text-charcoal shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}

export default function CollectionSlider() {
  const rows = [
    {
      label: 'Wall Finishes',
      cats: ['Wall Finishes'],
      reverse: false,
      duration: 38,
      showNav: true,
    },
    {
      label: 'Ceilings & Flooring',
      cats: ['Ceilings', 'Flooring'],
      reverse: true,
      duration: 46,
      showNav: true,
    },
    {
      label: 'Doors, Furnishings & Outdoor',
      cats: ['Doors & Panels', 'Soft Furnishings', 'Exterior & Outdoor'],
      reverse: false,
      duration: 54,
      showNav: true,
    },
  ]

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Our Collection"
          title="Everything You Need to Decorate"
          text="Drag or swipe any row to browse — tap once to pause, click a piece to explore its category on the products page."
          className="max-w-2xl"
        />

        <div className="mt-12 space-y-6">
          {rows.map((row) => {
            const items = products.filter((p) => row.cats.includes(p.category))
            return (
              <Reveal key={row.label}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
                    {row.label}
                  </h3>
                  <span className="hidden text-xs text-stone/70 sm:block">
                    {items.length} products
                  </span>
                </div>
                <MarqueeRow
                  items={items}
                  reverse={row.reverse}
                  duration={row.duration}
                  showNav={row.showNav}
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
