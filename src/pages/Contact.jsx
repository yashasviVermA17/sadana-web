import { Mail, MapPin, MessageCircle, Phone, Clock } from 'lucide-react'
import Button from '../components/Button'
import ContactCard from '../components/ContactCard'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import TiltCard from '../components/TiltCard'
import TiltImage from '../components/TiltImage'
import { useUI } from '../context/UIContext'
import { contact, mapEmbedUrl, whatsappUrl } from '../data/site'
import imgShowroom from '../assets/products/Victara panel.jpg'
import imgHero from '../assets/contact us image.png'

export default function Contact() {
  const { openQuote } = useUI()

  const cards = [
    { icon: MapPin, title: contact.showroom.title, lines: contact.showroom.lines },
    { icon: Phone, title: contact.phone.title, lines: contact.phone.lines },
    { icon: MessageCircle, title: contact.whatsapp.title, lines: contact.whatsapp.lines },
    { icon: Clock, title: contact.hours.title, lines: contact.hours.lines },
  ]

  return (
    <>
      <PageHero
        image={imgHero}
        breadcrumb={[{ label: 'Contact' }]}
        eyebrow="Get in Touch"
        title="Let's talk about your space"
        subtitle="Showroom visits, site calls, material samples and project enquiries — whichever way you prefer, we're a message away."
      >
        <Reveal delay={280}>
          <p className="mt-6 inline-flex flex-wrap items-center gap-3 text-sm text-cream/75">
            <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
            {contact.showroom.lines.join(', ')}
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-none px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <ContactCard icon={card.icon} title={card.title} lines={card.lines} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-card border border-charcoal/10">
              <iframe
                title="SADANA Decor & Interior Showroom — Vijay Nagar, Indore"
                src={mapEmbedUrl}
                className="h-[340px] w-full border-0 sm:h-[440px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-card bg-charcoal p-7 text-cream sm:p-9">
              <div>
                <h2 className="font-serif text-2xl">Prefer to chat right now?</h2>
                <p className="mt-3 text-sm leading-relaxed text-taupe">
                  Skip the forms — message our team directly on WhatsApp and get an
                  answer during showroom hours.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  href={whatsappUrl}
                  target="_blank"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Chat on WhatsApp
                </Button>
                <Button onClick={openQuote} variant="outlineLight" size="lg" className="w-full">
                  Request a Quote
                </Button>
              </div>

              <div className="flex flex-col gap-1 border-t border-white/12 pt-6 text-sm text-taupe">
                <p className="font-medium text-cream">{contact.hours.lines[0]}</p>
                <p>{contact.hours.lines[1]}</p>
                <p className="mt-3 flex items-center gap-2 text-cream">
                  <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                  {contact.email.lines[0]}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-none px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                Finding Us
              </span>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
                In the heart of Vijay Nagar, Indore
              </h2>
              <p className="mt-5 text-base leading-relaxed text-stone">
                Opposite Retina Hospital in Vijay Nagar, with easy access from Scheme
                No. 54. Walk-ins welcome through the week — call ahead on{' '}
                {contact.phone.lines[0]} and we’ll have samples ready for you.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-stone">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <span>
                    {contact.showroom.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                  {contact.phone.lines[0]}
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-brand" aria-hidden="true" />
                  WhatsApp: {contact.whatsapp.lines[0]}
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                  Email: {contact.email.lines[0]}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <TiltCard className="img-zoom overflow-hidden rounded-card shadow-soft">
                <TiltImage
                  src={imgShowroom}
                  alt="SADANA Decor & Interior showroom"
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover"
                />
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
