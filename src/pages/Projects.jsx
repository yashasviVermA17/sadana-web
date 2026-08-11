import { useSearchParams } from 'react-router-dom'
import CategoryFilter from '../components/CategoryFilter'
import ProjectGrid from '../components/ProjectGrid'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import PageHero from '../components/PageHero'
import { projectCategories, projectsByCategory } from '../data/projects'
import { useUI } from '../context/UIContext'
import imgHero from '../assets/project hero image 2.jpg'

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const { openQuote } = useUI()
  const active = params.get('category') || 'All'
  const items = projectsByCategory(active)

  const setCategory = (category) => {
    if (category === 'All') setParams({})
    else setParams({ category })
  }

  return (
    <>
      <PageHero
        image={imgHero}
        fit="contain"
        breadcrumb={[{ label: 'Projects' }]}
        eyebrow="Our Projects"
        title="Spaces we designed, delivered and stand behind"
        subtitle="A selection of residential, commercial, hospitality, office and retail spaces — each delivered turnkey by our in-house design and execution team."
      />

      <section className="mx-auto max-w-none px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="mb-8">
          <CategoryFilter categories={projectCategories} active={active} onChange={setCategory} />
        </Reveal>

        <Reveal className="mb-8 flex items-center justify-between gap-4">
          <p className="text-sm text-stone">
            <span className="font-medium text-charcoal">{items.length}</span>{' '}
            {items.length === 1 ? 'project' : 'projects'} in {active}
          </p>
        </Reveal>

        {items.length > 0 ? (
          <Reveal>
            <ProjectGrid items={items} />
          </Reveal>
        ) : (
          <Reveal className="flex flex-col items-center gap-4 rounded-card border border-dashed border-charcoal/20 py-20 text-center">
            <p className="text-stone">No projects in this category yet.</p>
            <Button variant="outline" onClick={() => setParams({})}>
              View All Projects
            </Button>
          </Reveal>
        )}

        <Reveal className="mt-16 rounded-card border border-charcoal/10 bg-mist p-8 text-center sm:p-12">
          <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">
            Planning a project of your own?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone">
            Every project here started with a conversation. Tell us about your space,
            timeline and budget — we’ll send a detailed proposal within a week.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Button onClick={openQuote}>Start Your Project</Button>
            <Button to="/contact" variant="outline">
              Talk to Our Team
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
