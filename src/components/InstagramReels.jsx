import { memo, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const REELS = [
  'https://www.instagram.com/reel/Db3FeVAAil0/',
  'https://www.instagram.com/reel/DaxnvCrEm_1/',
  'https://www.instagram.com/reel/DakxjnKCe7x/',
  'https://www.instagram.com/reel/DcBf8gsCbBQ/',
  'https://www.instagram.com/reel/DaDMlrSjQhG/',
  'https://www.instagram.com/reel/DZuoEzBghHx/',
  'https://www.instagram.com/reel/DZmTLGBxgBW/',
  'https://www.instagram.com/reel/DZcKHTzub_l/',
  'https://www.instagram.com/reel/DZNNQxyIuq8/',
]

function permalink(url) {
  return `${url}?utm_source=ig_embed&utm_campaign=loading`
}

function buildEmbedHtml(url) {
  const link = permalink(url)
  return `
<blockquote class="instagram-media" data-instgrm-permalink="${link}" data-instgrm-version="14">
  <a href="${link}" target="_blank" rel="noopener noreferrer">View this post on Instagram</a>
</blockquote>
`.trim()
}

function loadInstagramEmbedScript() {
  if (window.instgrm || document.getElementById('instagram-embed-js')) {
    return
  }
  const script = document.createElement('script')
  script.id = 'instagram-embed-js'
  script.src = 'https://www.instagram.com/embed.js'
  script.async = true
  script.onload = () => {}
  script.onerror = () => {}
  document.body.appendChild(script)
}

function useLoadEmbedScriptOnce() {
  useEffect(() => {
    loadInstagramEmbedScript()
  }, [])
}

function ReelSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1rem] bg-linen">
      <div className="reel-shimmer absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/80 text-brand shadow-soft backdrop-blur-sm">
          <Play className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}

const StaticEmbed = memo(function StaticEmbed({ html }) {
  return (
    <div
      className="reel-embed w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
})

function ReelEmbed({ url, html }) {
  const rootRef = useRef(null)
  const [stalled, setStalled] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const started = Date.now()
    let timer
    const tick = () => {
      if (!root) return
      if (root.querySelector('iframe')) {
        setStalled(false)
        return
      }
      setStalled(Date.now() - started > 12000)
      timer = window.setTimeout(tick, 1000)
    }
    timer = window.setTimeout(tick, 1500)
    return () => window.clearTimeout(timer)
  }, [html])

  return (
    <div className="relative">
      <div ref={rootRef}>
        <StaticEmbed html={html} />
      </div>
      {stalled && (
        <button
          type="button"
          onClick={() => window.open(permalink(url), '_blank', 'noopener')}
          aria-label="View reel on Instagram"
          className="absolute inset-0 z-10 grid place-items-center bg-charcoal/45 transition-colors duration-300 hover:bg-charcoal/55"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-brand shadow-card backdrop-blur-sm">
            <Play className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="mt-3 text-sm font-medium tracking-wide text-white">
            View on Instagram
          </span>
        </button>
      )}
    </div>
  )
}
function ReelCard({ url, active }) {
  const [embedHtml, setEmbedHtml] = useState(null)

  useEffect(() => {
    if (!active || embedHtml) return undefined
    const tryInject = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        setEmbedHtml(buildEmbedHtml(url))
        return true
      }
      return false
    }
    if (tryInject()) return undefined
    const interval = window.setInterval(() => {
      if (tryInject()) clearInterval(interval)
    }, 150)
    return () => clearInterval(interval)
  }, [active, embedHtml, url])

  return (
    <div className="reel-card relative h-full w-full overflow-hidden rounded-[1.25rem] border border-charcoal/10 bg-white p-2 shadow-card">
      {embedHtml ? (
        <ReelEmbed url={url} html={embedHtml} />
      ) : (
        <div className="aspect-[4/5] w-full">
          <ReelSkeleton />
        </div>
      )}
    </div>
  )
}

function ReelCarousel() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setReady(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setReady(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '1200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    let tries = 0
    const interval = window.setInterval(() => {
      tries += 1
      if (window.instgrm && window.instgrm.Embeds) {
        window.clearInterval(interval)
        window.setTimeout(() => {
          try {
            window.instgrm.Embeds.process()
          } catch {
            /* ignore */
          }
        }, 80)
        return
      }
      if (tries > 200) window.clearInterval(interval)
    }, 100)
    return () => window.clearInterval(interval)
  }, [ready])

  const viewportRef = useRef(null)
  const drag = useRef({ active: false, moved: 0, startX: 0, startOffset: 0 })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const maxRef = useRef(0)
  const wheelState = useRef({ target: 0 })
  const wheelAcc = useRef(0)
  const lastStep = useRef(0)
  const hoverRef = useRef(false)

  const slideStep = () => {
    const t = trackRef.current
    const first = t?.querySelector('.reel-slide')
    return first ? first.offsetWidth : (viewportRef.current?.clientWidth || 0)
  }

  const syncBounds = () => {
    const t = trackRef.current
    const vp = viewportRef.current
    if (!t || !vp) return
    maxRef.current = Math.max(0, t.scrollWidth - vp.clientWidth)
    wheelState.current.target = Math.max(0, Math.min(wheelState.current.target, maxRef.current))
  }

  useEffect(() => {
    syncBounds()
    window.addEventListener('resize', syncBounds)
    return () => window.removeEventListener('resize', syncBounds)
  }, [ready])

  const apply = (target) => {
    const t = trackRef.current
    if (!t) return
    wheelState.current.target = target
    t.style.transform = `translate3d(${-target}px,0,0)`
    setCanPrev(target > 0.5)
    setCanNext(target < maxRef.current - 0.5)
  }

  const animateTo = (target) => {
    const t = trackRef.current
    if (!t) return
    t.style.transition = 'transform 420ms cubic-bezier(0.22,1,0.36,1)'
    apply(target)
  }

  const goBy = (dir) => {
    const step = slideStep()
    if (!step) return
    const next = Math.max(0, Math.min(maxRef.current, wheelState.current.target + dir * step))
    animateTo(next)
  }

  const handleWheel = (e) => {
    if (drag.current.active || !hoverRef.current) return
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    let px = raw
    if (e.deltaMode === 1) px *= 16
    else if (e.deltaMode === 2) px *= (viewportRef.current?.clientHeight || 800)
    if (Math.abs(px) < 8) return
    const atStart = wheelState.current.target <= 0.5 && px < 0
    const atEnd = wheelState.current.target >= maxRef.current - 0.5 && px > 0
    if (atStart || atEnd) return
    e.preventDefault()
    if (Date.now() - lastStep.current < 500) return
    wheelAcc.current += px
    if (Math.abs(wheelAcc.current) < 60) return
    wheelAcc.current = 0
    lastStep.current = Date.now()
    goBy(px > 0 ? 1 : -1)
  }

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return undefined
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const t = trackRef.current
    if (t) t.style.transition = 'none'
    drag.current.active = true
    drag.current.moved = 0
    drag.current.startX = e.clientX
    drag.current.startOffset = wheelState.current.target
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    if (d.moved < 8) return
    const next = Math.max(0, Math.min(maxRef.current, d.startOffset - dx))
    apply(next)
  }

  const endDrag = () => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    const step = slideStep()
    if (!step) return
    const target = wheelState.current.target
    const snapped = Math.max(0, Math.min(maxRef.current, Math.round(target / step) * step))
    animateTo(snapped)
  }

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={viewportRef}
        onMouseEnter={() => {
          hoverRef.current = true
        }}
        onMouseLeave={() => {
          hoverRef.current = false
        }}
        className="relative overflow-hidden"
      >
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
          className="flex cursor-grab select-none items-start active:cursor-grabbing"
        >
          {REELS.map((url) => (
            <div
              key={url}
              className="reel-slide w-full shrink-0 pr-5 sm:w-1/2 sm:pr-6 lg:w-1/3 lg:pr-8"
            >
              <ReelCard url={url} active={ready} />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-16" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-16" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-10" />
        <div aria-hidden="true" className="absolute inset-y-0 right-0 z-10 w-10" />
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goBy(-1)}
          disabled={!canPrev}
          aria-label="Previous reels"
          className="grid h-12 w-12 place-items-center rounded-full border-2 border-charcoal/20 bg-white text-charcoal shadow-md transition-colors duration-300 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:border-charcoal/10 disabled:text-charcoal/30"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goBy(1)}
          disabled={!canNext}
          aria-label="Next reels"
          className="grid h-12 w-12 place-items-center rounded-full border-2 border-charcoal/20 bg-white text-charcoal shadow-md transition-colors duration-300 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:border-charcoal/10 disabled:text-charcoal/30"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function InstagramReels() {
  useLoadEmbedScriptOnce()

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-none px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow="Instagram Reels"
          title="See It. Feel It. Love It."
          text="Discover our latest spaces, designs and interior inspirations."
          className="max-w-2xl"
        />
        <Reveal className="mt-10">
          <ReelCarousel />
        </Reveal>
      </div>
    </section>
  )
}
