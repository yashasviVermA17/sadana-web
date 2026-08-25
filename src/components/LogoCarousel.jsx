import { useEffect, useMemo, useRef, useState } from 'react'

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
  const touchRef = useRef({ startX: 0, startY: 0 })

  const pageCount = Math.max(1, Math.ceil(items.length / perView))

  useEffect(() => {
    const onResize = () => setPerView(getPerView())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setPage((p) => (p < pageCount ? p : 0))
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
        if (idx >= items.length) break
        pageItems.push({ item: items[idx], key: `${start}-${i}` })
      }
      out.push(pageItems)
    }
    return out
  }, [items, perView])

  const onTouchStart = (e) => {
    touchRef.current.startX = e.touches[0].clientX
    touchRef.current.startY = e.touches[0].clientY
  }

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX
    const dy = e.changedTouches[0].clientY - touchRef.current.startY
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      e.stopPropagation()
      if (dx < 0) setPage((p) => Math.min(p + 1, pageCount - 1))
      else setPage((p) => Math.max(p - 1, 0))
    }
  }

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    touchRef.current.startX = e.clientX
    touchRef.current.moved = false
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerUp = (e) => {
    if (e.pointerType !== 'mouse') return
    const dx = e.clientX - touchRef.current.startX
    if (Math.abs(dx) > SWIPE_THRESHOLD && !touchRef.current.moved) {
      touchRef.current.moved = true
      if (dx < 0) setPage((p) => Math.min(p + 1, pageCount - 1))
      else setPage((p) => Math.max(p - 1, 0))
    }
  }

  return (
    <div
      onMouseEnter={hoverable ? () => setPaused(true) : undefined}
      onMouseLeave={hoverable ? () => setPaused(false) : undefined}
    >
      <div
        className="overflow-hidden"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
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
        <div className="mt-8 flex justify-center" style={{ whiteSpace: 'nowrap' }}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === page}
                className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                  i === page
                    ? 'w-5 bg-brand sm:w-7'
                    : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40 sm:w-2'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
