import ProjectCard from './ProjectCard'

export default function ProjectGrid({ items, className = '' }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 ${className}`}>
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
