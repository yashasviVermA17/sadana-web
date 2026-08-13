import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

function processInstagramEmbeds() {
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process()
  }
}

function loadInstagramEmbedScript() {
  if (window.instgrm || document.getElementById('instagram-embed-js')) {
    return
  }
  const script = document.createElement('script')
  script.id = 'instagram-embed-js'
  script.src = 'https://www.instagram.com/embed.js'
  script.async = true
  script.onload = processInstagramEmbeds
  script.onerror = () => {}
  document.body.appendChild(script)
}

function useInstagramEmbeds() {
  useEffect(() => {
    let alive = true
    const poll = () => {
      if (!window.instgrm) return
      clearInterval(interval)
      if (alive) processInstagramEmbeds()
    }
    const interval = window.setInterval(poll, 250)
    processInstagramEmbeds()
    loadInstagramEmbedScript()
    return () => {
      alive = false
      clearInterval(interval)
    }
  }, [])
}

function ReelEmbed({ url }) {
  return (
    <div
      className="reel-embed aspect-[9/16] w-full"
      dangerouslySetInnerHTML={{ __html: buildEmbedHtml(url) }}
    />
  )
}

function ReelCarousel() {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollByPage = (dir) => {
    const el = trackRef.current
    if (!el) return
    const item = el.querySelector('.reel-slide')
    const step = item ? item.offsetWidth + 28 : el.clientWidth
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="reel-scroll -mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {REELS.map((url) => (
          <div
            key={url}
            className="reel-slide w-full shrink-0 snap-start pr-7 sm:w-1/2 lg:w-1/3 lg:pr-8"
          >
            <ReelEmbed url={url} />
          </div>
        ))}
      </div>

      {canPrev && (
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous reels"
          className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-charcoal/10 bg-ivory/95 text-charcoal shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      {canNext && (
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Next reels"
          className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-charcoal/10 bg-ivory/95 text-charcoal shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-brand hover:text-brand"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default function InstagramReels() {
  useInstagramEmbeds()

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-none py-16 sm:py-20 lg:py-24">
        <div className="px-5 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Instagram Reels"
            title="See It. Feel It. Love It."
            text="Discover our latest spaces, designs and interior inspirations."
            className="max-w-2xl"
          />
        </div>
        <Reveal className="mt-10">
          <ReelCarousel />
        </Reveal>
      </div>
    </section>
  )
}
