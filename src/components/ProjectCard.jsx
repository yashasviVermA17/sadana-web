import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import TiltCard from './TiltCard'
import TiltImage from './TiltImage'

export default function ProjectCard({ project }) {
  return (
    <TiltCard className="h-full">
      <Link
        to={`/projects/${project.id}`}
        className="group relative block h-full overflow-hidden rounded-card border border-charcoal/10 bg-ivory shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-[0_24px_60px_-24px_rgb(200_90_50/0.35)]"
      >
        <div className="relative img-zoom aspect-[4/3] overflow-hidden">
          <TiltImage
            src={project.cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal backdrop-blur-sm">
            {project.category}
          </span>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-serif text-xl leading-snug text-cream">
                {project.title}
              </h3>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-cream shadow-lg transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
