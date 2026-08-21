import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { contact, whatsappUrl } from '../data/site'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-none px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1.2fr]">
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-taupe">
              SADANA Decor & Interior — all types of interior & exterior products under
              one roof. Premium, durable and modern solutions for homes, offices and
              commercial spaces across India.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-linen">
              Visit Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-taupe">
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
            </ul>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={`tel:+91${contact.phone.lines[0].replace(/\s/g, '')}`}
                aria-label="Call Sadana Decor"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-smoke transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with Sadana Decor on WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-smoke transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/sadanadecor/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Sadana Decor on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-smoke transition-colors duration-300 hover:border-brand hover:text-brand"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-fog">
            © {year} SADANA Decor & Interior. All rights reserved.
          </p>
          <p className="text-xs text-fog">
            Vijay Nagar, Indore (M.P.) — Interior & Exterior Products Under One Roof.
          </p>
        </div>
      </div>
    </footer>
  )
}
