import { useEffect, useMemo, useState } from 'react'

const AUTOPLAY_MS = 15000

function getPerView() {
  if (typeof window === 'undefined') return 4
  const w = window.innerWidth
  if (w < 640) return 1
  if (w < 1024) return 2
  return 4
}

export default function LogoCarousel({ items, renderItem }) {
  const [perView, setPerView] = useState(getPerView)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

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

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
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
        <div className="mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2">
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
      )}
    </div>
  )
}
