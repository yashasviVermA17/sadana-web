import Reveal from './Reveal'
import { timeline } from '../data/site'

export default function Timeline({ dark = false }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <span
        className={`absolute left-[7px] top-1 bottom-1 w-px sm:left-1/2 sm:-translate-x-1/2 ${
          dark ? 'bg-cream/15' : 'bg-charcoal/10'
        }`}
        aria-hidden="true"
      />
      <div className="space-y-10 sm:space-y-14">
        {timeline.map((item, i) => {
          const left = i % 2 === 0
          return (
            <Reveal
              key={item.year}
              delay={i * 60}
              className={`relative flex gap-6 sm:w-1/2 ${
                left ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12 sm:text-left'
              } pl-8 sm:pl-12`}
            >
                <span
                  className={`absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 sm:left-auto ${
                    left
                      ? 'sm:-right-[7.5px]'
                      : 'sm:-left-[7.5px]'
                  } ${
                    dark
                      ? 'border-brand bg-charcoal'
                      : 'border-brand bg-ivory'
                  }`}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="font-serif text-3xl text-brand">{item.year}</span>
                  <p
                    className={`text-sm leading-relaxed ${
                      dark ? 'text-taupe' : 'text-stone'
                    }`}
                  >
                  {item.text}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
