import { useCallback, useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import AutoSlider from '../components/AutoSlider'
import Lightbox from '../components/Lightbox'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { useUI } from '../context/UIContext'
import { getProject, relatedProjects } from '../data/projects'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProject(id)
  const [lightbox, setLightbox] = useState(null)
  const { openLightbox, closeLightbox } = useUI()

  const gallery = useMemo(() => {
    if (!project) return []
    const seen = new Set()
    return project.gallery.filter((img) => {
      if (seen.has(img)) return false
      seen.add(img)
      return true
    })
  }, [project])

  const open = (i) => {
    setLightbox(i)
    openLightbox()
  }
  const close = useCallback(() => {
    setLightbox(null)
    closeLightbox()
  }, [closeLightbox])
  const prev = useCallback(
    () => setLightbox((i) => (gallery.length ? (i - 1 + gallery.length) % gallery.length : 0)),
    [gallery],
  )
  const next = useCallback(
    () => setLightbox((i) => (gallery.length ? (i + 1) % gallery.length : 0)),
    [gallery],
  )

  if (!project) {
    return (
      <section className="mx-auto flex max-w-none flex-col items-center px-5 py-32 text-center sm:px-6">
        <h1 className="font-serif text-4xl text-charcoal">Project not found</h1>
        <p className="mt-4 text-stone">The project you’re looking for doesn’t exist.</p>
        <Button to="/projects" className="mt-8">
          Back to Projects
        </Button>
      </section>
    )
  }

  const related = relatedProjects(project)

  return (
    <>
      <section data-hero>
        <div className="relative h-[65vh] min-h-[440px] w-full overflow-hidden sm:h-[70vh] lg:h-[78vh]">
        <img
          src={project.cover}
          alt={project.title}
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
              items={[
                { label: 'Projects', to: '/projects' },
                { label: project.title },
              ]}
            />
          </Reveal>
          <Reveal delay={100}>
            <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:mt-6 sm:text-xs">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              {project.category}
            </span>
          </Reveal>
          <Reveal delay={160}>
            <h1 className="mt-3 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-cream sm:mt-4 sm:text-5xl lg:text-[4.25rem]">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:mt-6 sm:text-lg">
              {project.short}
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/70 sm:mt-7">
              <span>{project.scope}</span>
              <span className="h-1 w-1 rounded-full bg-cream/40" aria-hidden="true" />
              <span>Completed {project.year}</span>
            </div>
          </Reveal>
        </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-none px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading eyebrow="Related Projects" title="More like this" />
          <Reveal className="mt-10">
            <AutoSlider
              items={related}
              itemClassName="h-full"
              visible={{ base: 1.1, sm: 2.2, lg: 3, xl: 3 }}
              renderItem={(project) => <ProjectCard project={project} />}
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-none px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal className="mt-14">
          <SectionHeading eyebrow="Gallery" title="Our Project" />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {gallery.map((img, i) => {
            const featured = i === 0 || i === gallery.length - 1
            return (
              <Reveal
                key={img}
                delay={i * 60}
                className={featured ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Open ${project.title} — view ${i + 1} fullscreen`}
                  className="group relative img-zoom block w-full cursor-zoom-in overflow-hidden rounded-card text-left"
                >
                  <img
                    src={img}
                    alt={`${project.title} — view ${i + 1}`}
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
      </section>

      <Lightbox
        images={gallery}
        index={lightbox}
        onClose={close}
        onPrev={prev}
        onNext={next}
        alt={project.title}
      />
    </>
  )
}
