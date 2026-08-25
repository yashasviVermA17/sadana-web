import { useEffect, useMemo, useRef, useState } from 'react'

const AUTOPLAY_MS = 3000

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
  const wheelLock = useRef(0)
  const touchStart = useRef({ x: 0, y: 0 })

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
      out.push(
        Array.from({ length: perView }, (_, i) => ({
          item: items[(start + i) % items.length],
          key: `${start}-${i}`,
        })),
      )
    }
    return out
  }, [items, perView])

  const onViewportClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    if (e.clientX - rect.left < rect.width / 2) {
      setPage((p) => (p - 1 + pageCount) % pageCount)
    } else {
      setPage((p) => (p + 1) % pageCount)
    }
  }

  const onWheel = (e) => {
    const now = Date.now()
    if (now - wheelLock.current < 900) return
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(delta) < 25) return
    wheelLock.current = now
    if (delta > 0) setPage((p) => (p + 1) % pageCount)
    else setPage((p) => (p - 1 + pageCount) % pageCount)
  }

  const onTouchStart = (e) => {
    touchStart.current.x = e.touches[0].clientX
    touchStart.current.y = e.touches[0].clientY
  }

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) setPage((p) => (p + 1) % pageCount)
      else setPage((p) => (p - 1 + pageCount) % pageCount)
    }
  }

  return (
    <div
      onMouseEnter={hoverable ? () => setPaused(true) : undefined}
      onMouseLeave={hoverable ? () => setPaused(false) : undefined}
    >
      <div
        className="cursor-pointer overflow-hidden"
        onClick={onViewportClick}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
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

      {pageCount > 1 && (() => {
        const MAX_DOTS = 5
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
                  className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                    i === dotIndex
                      ? 'w-5 bg-brand sm:w-7'
                      : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40 sm:w-2'
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
