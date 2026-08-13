import { memo, useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const REELS = [
  'https://www.instagram.com/reel/Db3FeVAAil0/',
  'https://www.instagram.com/reel/DblLm_8jcCA/',
  'https://www.instagram.com/reel/DbYOCS0DTUm/',
  'https://www.instagram.com/reel/DbSdC2EmK1K/',
  'https://www.instagram.com/reel/DbI1Je8oPSg/',
  'https://www.instagram.com/reel/DaxnvCrEm_1/',
  'https://www.instagram.com/reel/DakxjnKCe7x/',
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

  const drag = useRef({ active: false, dragging: false, startX: 0, startY: 0, scrollLeft: 0 })
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const el = trackRef.current
    if (!el) return
    drag.current.active = true
    drag.current.dragging = false
    drag.current.startX = e.clientX
    drag.current.startY = e.clientY
    drag.current.scrollLeft = el.scrollLeft
  }

  const onPointerMove = (e) => {
    const d = drag.current
    const el = trackRef.current
    if (!d.active || !el) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.dragging) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      d.dragging = true
      setDragging(true)
      try {
        el.setPointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }
    el.scrollLeft = d.scrollLeft - dx
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    if (drag.current.dragging) {
      drag.current.dragging = false
      setDragging(false)
    }
  }

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`reel-scroll -mx-5 flex cursor-grab select-none items-start overflow-x-auto px-5 active:cursor-grabbing sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8${dragging ? '' : ' snap-x snap-mandatory'}`}
      >
        {REELS.map((url) => (
          <div
            key={url}
            className="reel-slide w-full shrink-0 snap-start pr-5 sm:w-1/2 sm:pr-6 lg:w-1/3 lg:pr-8"
          >
            <ReelCard url={url} active={ready} />
          </div>
        ))}
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
