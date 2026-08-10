import { useEffect, useRef, useState } from 'react'
import { Quote, Star } from 'lucide-react'
import Reveal from './Reveal'

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Homeowner, Vijay Nagar',
    initial: 'R',
    review:
      'Sadana Decor transformed our home completely. The material quality and the finishing are on another level.',
  },
  {
    name: 'Priya Mehta',
    role: 'Homeowner, Indore',
    initial: 'P',
    review:
      'The entire experience was smooth and professional. The team understood exactly what we wanted and delivered beautifully.',
  },
  {
    name: 'Amit Jain',
    role: 'Business Owner, Indore',
    initial: 'A',
    review:
      'Excellent collection and excellent service. The quality of the interior materials exceeded our expectations.',
  },
  {
    name: 'Neha Verma',
    role: 'Homeowner, Vijay Nagar',
    initial: 'N',
    review:
      'Our living space looks completely different now. The design suggestions and material selection were excellent.',
  },
  {
    name: 'Rohit Agarwal',
    role: 'Homeowner, Indore',
    initial: 'R',
    review:
      'From material selection to installation, everything was handled professionally. Highly recommended.',
  },
  {
    name: 'Kavita Gupta',
    role: 'Homeowner, Indore',
    initial: 'K',
    review:
      'Beautiful materials, great finishing and a very helpful team. Sadana Decor made the entire process easy.',
  },
]

function TestimonialContent({ data }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 text-center">
      <Quote
        className="h-11 w-11 text-brand sm:h-12 sm:w-12"
        fill="currentColor"
        strokeWidth={0}
        aria-hidden="true"
      />
      <div className="mt-4 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 text-brand sm:h-6 sm:w-6"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-charcoal sm:text-2xl lg:text-[1.7rem]">
        {data.review}
      </p>
      <div className="mt-7 flex items-center justify-center gap-3.5">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand font-serif text-2xl text-cream shadow-soft">
          {data.initial}
        </span>
        <span className="text-left">
          <span className="block font-semibold text-charcoal">{data.name}</span>
          <span className="mt-0.5 block text-sm text-stone">{data.role}</span>
        </span>
      </div>
    </div>
  )
}

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(indexRef.current)
      setTransitioning(true)
      setIndex((i) => (i + 1) % testimonials.length)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!transitioning) return undefined
    const id = setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
    }, 500)
    return () => clearTimeout(id)
  }, [transitioning])

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            Testimonials
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-[1.12] text-charcoal sm:text-4xl lg:text-[2.75rem]">
            Happy <span className="italic text-brand">Customers.</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="mx-auto max-w-[1160px] rounded-[2rem] border border-charcoal/8 bg-gradient-to-br from-ivory via-ivory to-brand-soft/50 p-6 shadow-soft sm:p-10 lg:p-14">
            <div className="relative min-h-[390px] sm:min-h-[340px] lg:min-h-[320px]">
              {prev !== null && (
                <div key={`prev-${prev}`} className="testimonial-leave absolute inset-0">
                  <TestimonialContent data={testimonials[prev]} />
                </div>
              )}
              <div
                key={`current-${index}`}
                className={`absolute inset-0 ${transitioning ? 'testimonial-enter' : ''}`}
              >
                <TestimonialContent data={testimonials[index]} />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
              {testimonials.map((t, i) => (
                <span
                  key={t.name}
                  className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                    i === index ? 'w-7 bg-brand' : 'w-2 bg-charcoal/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
