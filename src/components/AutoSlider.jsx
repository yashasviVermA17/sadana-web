import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const GAP = 24
const AUTOPLAY_MS = 2000
const SLIDE_MS = 800
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const DEFAULT_VISIBLE = { base: 1.2, sm: 2.4, lg: 3, xl: 3 }

function getVisible(config) {
  if (typeof window === 'undefined') return config.xl
  const w = window.innerWidth
  if (w < 640) return config.base
  if (w < 1024) return config.sm
  if (w < 1280) return config.lg
  return config.xl
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function canHover() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
}

export default function AutoSlider({
  items,
  renderItem,
  className = '',
  itemClassName = '',
  visible = DEFAULT_VISIBLE,
  autoplay = true,
}) {
  const count = items.length
  const viewportRef = useRef(null)
  const indexRef = useRef(0)
  const resumeTimer = useRef(null)
  const [index, setIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(() => {
    if (typeof window === 'undefined') return 0
    const v = getVisible(visible)
    return Math.max(0, (window.innerWidth - (v - 1) * GAP) / v)
  })
  const [noAnim, setNoAnim] = useState(false)
  const [paused, setPaused] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [scrollable, setScrollable] = useState(true)

  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current
      if (!el) return
      const v = getVisible(visible)
      const cw = Math.max(0, (el.clientWidth - (v - 1) * GAP) / v)
      setCardWidth(cw)
      setScrollable(count * (cw + GAP) - GAP > el.clientWidth + 1)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [visible, count])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  const pauseForTap = () => {
    setPaused(true)
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), 4000)
  }

  const resetAtStart = useCallback(() => {
    setNoAnim(true)
    setIndex(0)
    requestAnimationFrame(() => requestAnimationFrame(() => setNoAnim(false)))
  }, [])

  const step = useCallback(() => {
    if (indexRef.current + 1 > count) resetAtStart()
    else setIndex(indexRef.current + 1)
  }, [count, resetAtStart])

  const goNext = useCallback(() => {
    setPaused(false)
    setResetKey((k) => k + 1)
    step()
  }, [step])

  const goPrev = useCallback(() => {
    setPaused(false)
    setResetKey((k) => k + 1)
    if (indexRef.current === 0) {
      setNoAnim(true)
      setIndex(count)
      requestAnimationFrame(() => requestAnimationFrame(() => setNoAnim(false)))
    } else {
      setIndex(indexRef.current - 1)
    }
  }, [count])

  const jumpTo = useCallback(
    (target) => {
      setPaused(false)
      setResetKey((k) => k + 1)
      if (indexRef.current === count) {
        setNoAnim(true)
        setIndex(0)
        requestAnimationFrame(() => {
          setNoAnim(false)
          setIndex(target)
        })
      } else {
        setIndex(target)
      }
    },
    [count],
  )

  useEffect(() => {
    if (!autoplay || !scrollable || prefersReducedMotion() || paused) return undefined
    const id = setInterval(step, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [autoplay, scrollable, paused, step, resetKey])

  const dragState = useRef({ active: false, startX: 0, moved: 0 })

  const onDragStart = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    pauseForTap()
    dragState.current.active = true
    dragState.current.startX = e.clientX
    dragState.current.moved = 0
    setDragOffset(0)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  const onDragMove = (e) => {
    const d = dragState.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    setDragOffset(dx)
  }

  const onDragEnd = (e) => {
    const d = dragState.current
    if (!d.active) return
    d.active = false
    const dx = d.startX - e.clientX
    setDragOffset(0)
    if (d.moved < 8) return
    if (Math.abs(dx) > 40) {
      if (dx > 0) goNext()
      else goPrev()
    }
  }

  const wheelAcc = useRef(0)
  const wheelTimer = useRef(null)
  const viewportWrapRef = useRef(null)

  const handleWheel = (e) => {
    const deltaX = Math.abs(e.deltaX)
    const deltaY = Math.abs(e.deltaY)
    const horizontal = e.shiftKey || deltaX > deltaY
    if (!horizontal) return
    e.preventDefault()
    pauseForTap()
    clearTimeout(wheelTimer.current)
    wheelAcc.current += e.deltaX || e.deltaY
    wheelTimer.current = setTimeout(() => {
      if (wheelAcc.current > 24) goNext()
      else if (wheelAcc.current < -24) goPrev()
      wheelAcc.current = 0
    }, 90)
  }

  useEffect(() => {
    const el = viewportWrapRef.current
    if (!el) return undefined
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const maxVisible = Math.ceil(
    Math.max(visible.base, visible.sm, visible.lg, visible.xl),
  )
  let loopItems = items
  if (scrollable && count > 0) {
    const repeats = Math.max(1, Math.ceil((count + maxVisible) / count))
    loopItems = Array.from({ length: repeats }, () => items).flat()
  }

  const offset = index * (cardWidth + GAP)
  const active = index % count

  return (
    <>
      <div className="relative" ref={viewportWrapRef}>
        <div
          ref={viewportRef}
          className={`overflow-hidden select-none ${className}`}
          onMouseEnter={() => {
            if (canHover()) setPaused(true)
          }}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <div
            className={`flex will-change-transform ${scrollable ? '' : 'justify-start'}`}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${dragOffset - offset}px)`,
              transition:
                dragState.current.active || noAnim
                  ? 'none'
                  : `transform ${SLIDE_MS}ms ${EASE}`,
            }}
          >
            {loopItems.map((item, i) => (
              <div
                key={i}
                style={{ width: cardWidth }}
                className={`shrink-0 ${itemClassName}`}
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>

        {scrollable && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-charcoal/10 bg-ivory/95 text-charcoal shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-charcoal/10 bg-ivory/95 text-charcoal shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand sm:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {scrollable && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to ${item?.name || `slide ${i + 1}`}`}
              onClick={() => jumpTo(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active ? 'w-7 bg-brand' : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            />
          ))}
        </div>
      )}
    </>
  )
}
