import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/Button'
import Lightbox from '../components/Lightbox'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { useUI } from '../context/UIContext'
import { getProjectImageGroup } from '../data/imageGroups'

export default function ProjectGroupDetail() {
  const { id } = useParams()
  const group = getProjectImageGroup(id)
  const [lightbox, setLightbox] = useState(null)
  const { openLightbox, closeLightbox } = useUI()

  const open = (i) => {
    setLightbox(i)
    openLightbox()
  }
  const close = useCallback(() => {
    setLightbox(null)
    closeLightbox()
  }, [closeLightbox])
  const prev = useCallback(
    () => setLightbox((i) => (group ? (i - 1 + group.images.length) % group.images.length : 0)),
    [group],
  )
  const next = useCallback(
    () => setLightbox((i) => (group ? (i + 1) % group.images.length : 0)),
    [group],
  )

  if (!group) {
    return (
      <section className="mx-auto flex max-w-none flex-col items-center px-5 py-32 text-center sm:px-6">
        <h1 className="font-serif text-4xl text-charcoal">Collection not found</h1>
        <p className="mt-4 text-stone">The gallery you’re looking for doesn’t exist.</p>
        <Button to="/projects" className="mt-8">
          Back to Projects
        </Button>
      </section>
    )
  }

  return (
    <>
      <section data-hero>
        <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden sm:h-[60vh] lg:h-[68vh]">
          <img
            src={group.cover}
            alt={group.title}
            className="img-settle block h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-charcoal/25"
            aria-hidden="true"
          />

          <div className="relative mx-auto flex h-full w-full max-w-none flex-col items-start justify-end px-5 pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">
            <Reveal>
              <Breadcrumb
                light
                items={[{ label: 'Projects', to: '/projects' }, { label: group.title }]}
              />
            </Reveal>
            <Reveal delay={100}>
              <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:mt-6 sm:text-xs">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                Photo Collection
              </span>
            </Reveal>
            <Reveal delay={160}>
              <h1 className="mt-3 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-cream sm:mt-4 sm:text-5xl lg:text-[4.25rem]">
                {group.title}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:mt-6 sm:text-lg">
                {group.count} {group.count === 1 ? 'image' : 'images'} in this collection — click any
                photo to view it fullscreen.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-none px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeading eyebrow="Gallery" title={group.title} />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {group.images.map((image, i) => {
            const featured = group.count > 2 && (i === 0 || i === group.count - 1)
            return (
              <Reveal
                key={image.filename}
                delay={i * 60}
                className={featured ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Open ${group.title} — view ${i + 1} fullscreen`}
                  className="group relative img-zoom block w-full cursor-zoom-in overflow-hidden rounded-card text-left"
                >
                  <img
                    src={image.url}
                    alt={`${group.title} — view ${i + 1}`}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                      featured ? 'aspect-[2/1]' : 'aspect-square'
                    }`}
                  />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-charcoal/45 text-cream opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-14 text-center">
          <Button to="/projects" variant="outline">
            Back to Projects
          </Button>
        </Reveal>
      </section>

      <Lightbox
        images={group.images.map((image) => image.url)}
        index={lightbox}
        onClose={close}
        onPrev={prev}
        onNext={next}
        alt={group.title}
      />
    </>
  )
}
