import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTOPLAY_MS = 3000
const SWIPE_THRESHOLD = 40

function getPerView() {
  if (typeof window === 'undefined') return 6
  const w = window.innerWidth
  if (w < 640) return 2
  if (w < 1024) return 3
  return 6
}

export default function LogoCarousel({ items, renderItem }) {
  const [perView, setPerView] = useState(getPerView)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoverable] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(hover: hover)').matches,
  )
  const dragRef = useRef({ startX: 0, dragging: false })

  const pageCount = Math.max(1, Math.ceil(items.length / perView))

  const goNext = () => setPage((p) => Math.min(p + 1, pageCount - 1))
  const goPrev = () => setPage((p) => Math.max(p - 1, 0))

  useEffect(() => {
    const onResize = () => setPerView(getPerView())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1))
  }, [pageCount])

  useEffect(() => {
    if (paused || pageCount <= 1) return undefined
    const id = setInterval(() => setPage((p) => (p + 1) % pageCount), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, pageCount])

  const pages = useMemo(() => {
    const out = []
    for (let start = 0; start < items.length; start += perView) {
      const pageItems = []
      for (let i = 0; i < perView; i++) {
        const idx = start + i
        if (idx < items.length) {
          pageItems.push({ item: items[idx], key: `${start}-${i}` })
        }
      }
      out.push(pageItems)
    }
    return out
  }, [items, perView])

  const onPointerDown = (e) => {
    dragRef.current.startX = e.clientX
    dragRef.current.dragging = true
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerUp = (e) => {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    const dx = e.clientX - dragRef.current.startX
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  const onTouchStart = (e) => {
    dragRef.current.startX = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - dragRef.current.startX
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      e.stopPropagation()
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  const onWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(delta) < 15) return
    if (delta > 0) goNext()
    else goPrev()
  }

  return (
    <div
      onMouseEnter={hoverable ? () => setPaused(true) : undefined}
      onMouseLeave={hoverable ? () => setPaused(false) : undefined}
      className="relative"
    >
      <div
        className="overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, gi) => (
            <div key={gi} className="flex w-full shrink-0">
              {group.map(({ item, key }) => (
                <div
                  key={key}
                  className="shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  {renderItem(item)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className={`absolute left-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 -translate-x-1/2 place-items-center rounded-full border border-charcoal/10 bg-white/90 text-charcoal shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md focus:outline-none sm:h-10 sm:w-10 ${
              page === 0 ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className={`absolute right-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-charcoal/10 bg-white/90 text-charcoal shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md focus:outline-none sm:h-10 sm:w-10 ${
              page === pageCount - 1 ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {pageCount > 1 && (() => {
        const MAX_DOTS = 3
        const dotCount = Math.min(pageCount, MAX_DOTS)
        const dotIndex = Math.round((page / (pageCount - 1)) * (dotCount - 1))
        return (
          <div className="mt-8 flex justify-center" style={{ whiteSpace: 'nowrap' }}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: dotCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(Math.round((i / (dotCount - 1)) * (pageCount - 1)))}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === dotIndex}
                  className={`rounded-full transition-all duration-300 focus:outline-none ${
                    i === dotIndex
                      ? 'h-2 w-7 bg-brand sm:h-2.5 sm:w-8'
                      : 'h-2 w-2 bg-charcoal/20 hover:bg-charcoal/40'
                  }`}
                />
              ))}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
