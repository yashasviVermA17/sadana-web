import { useEffect, useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { useUI } from '../context/UIContext'
import { whatsappUrl } from '../data/site'
import Button from './Button'

const inputClasses =
  'w-full rounded-xl border border-charcoal/15 bg-mist/60 px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-stone/60 focus:border-brand focus:bg-ivory focus:ring-2 focus:ring-brand/20'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal">
        {label}
      </span>
      {children}
    </label>
  )
}

export default function QuoteModal() {
  const { quoteOpen, closeQuote } = useUI()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  useEffect(() => {
    if (!quoteOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') closeQuote()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [quoteOpen, closeQuote])

  useEffect(() => {
    if (quoteOpen) setSubmitted(false)
  }, [quoteOpen])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!quoteOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-label="Request a quote">
      <div
        className="overlay-anim fixed inset-0 bg-charcoal/55 backdrop-blur-sm"
        onClick={closeQuote}
        aria-hidden="true"
      />

      <div className="modal-anim relative w-full max-w-lg overflow-hidden rounded-2xl bg-ivory shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-charcoal/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Get Quote
            </p>
            <h3 className="mt-1 font-serif text-2xl text-charcoal">Request a Quote</h3>
          </div>
          <button
            type="button"
            onClick={closeQuote}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-stone transition-colors duration-200 hover:bg-mist hover:text-charcoal"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-6 sm:px-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-soft">
                <CheckCircle2 className="h-8 w-8 text-brand" aria-hidden="true" />
              </span>
              <h4 className="font-serif text-xl text-charcoal">Enquiry received</h4>
              <p className="max-w-sm text-sm leading-relaxed text-stone">
                Thank you, {form.name || 'friend'}. Our design team will get back to
                you within one working day. Need a faster reply?
              </p>
              <Button href={whatsappUrl} target="_blank" variant="outline" className="mt-1">
                Chat on WhatsApp
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your Name">
                  <input required type="text" value={form.name} onChange={update('name')} placeholder="Aarav Sharma" className={inputClasses} />
                </Field>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className={inputClasses} />
                </Field>
              </div>

              <Field label="Phone">
                <input required type="tel" value={form.phone} onChange={update('phone')} placeholder="91799 79797" className={inputClasses} />
              </Field>

              <Field label="Requirement / Message">
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us about your space, timeline and budget..."
                  rows={4}
                  className={`${inputClasses} resize-none`}
                />
              </Field>

              <Button type="submit" size="lg" className="w-full">
                Submit Enquiry
              </Button>
              <p className="text-center text-xs text-stone">
                Prefer WhatsApp?{' '}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand hover:underline"
                >
                  Chat with us here
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
