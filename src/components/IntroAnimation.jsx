import { useEffect, useRef, useState } from 'react'
import { useUI } from '../context/UIContext'
import logoImage from '../assets/logo 2.jpg'

const FIRST_LOAD_KEY = 'sd-intro-played'
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function getTimings() {
  const mobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches
  return mobile
    ? { reveal: 280, tagline: 1080, transition: 1980, complete: 2880 }
    : { reveal: 340, tagline: 1240, transition: 2280, complete: 3350 }
}

function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return !sessionStorage.getItem(FIRST_LOAD_KEY)
}

export default function IntroAnimation() {
  const { finishIntro, startHomeReveal } = useUI()
  const [shouldRender] = useState(shouldPlayIntro)
  const [isIntroVisible, setIsIntroVisible] = useState(true)
  const [logoReveal, setLogoReveal] = useState(false)
  const [taglineReveal, setTaglineReveal] = useState(false)
  const [logoTransition, setLogoTransition] = useState(false)
  const [homepageReveal, setHomepageReveal] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const [logoReady, setLogoReady] = useState(false)
  const [logoStyle, setLogoStyle] = useState(null)
  const logoRef = useRef(null)
  const playedRef = useRef(false)
  const timingsRef = useRef(getTimings())

  useEffect(() => {
    if (!shouldRender) return undefined
    const el = logoRef.current
    if (el && el.complete) {
      setLogoReady(true)
      return undefined
    }
    const safety = setTimeout(() => setLogoReady(true), 1500)
    return () => clearTimeout(safety)
  }, [shouldRender])

  useEffect(() => {
    if (!shouldRender) {
      startHomeReveal()
      return
    }
    if (!logoReady || playedRef.current) return undefined
    playedRef.current = true

    const { reveal, tagline, transition, complete } = timingsRef.current

    const tReveal = setTimeout(() => setLogoReveal(true), reveal)
    const tTagline = setTimeout(() => setTaglineReveal(true), tagline)
    const tTransition = setTimeout(() => {
      setLogoTransition(true)
      setHomepageReveal(true)
      startHomeReveal()

      setLogoStyle({
        transform: 'translate(0px, -4px) scale(1)',
        transition: 'none',
      })

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = logoRef.current
          const headerLogo = document.querySelector('[data-header-logo]')
          if (!el || !headerLogo) return
          const from = el.getBoundingClientRect()
          const to = headerLogo.getBoundingClientRect()
          const scale = to.width / from.width
          const dx = to.left + to.width / 2 - (from.left + from.width / 2)
          const dy = to.top + to.height / 2 - (from.top + from.height / 2)
          setLogoStyle({
            transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
            transition: `transform 0.95s ${EASE}`,
          })
        })
      })
    }, transition)
    const tComplete = setTimeout(() => {
      sessionStorage.setItem(FIRST_LOAD_KEY, '1')
      setIntroComplete(true)
      setIsIntroVisible(false)
      finishIntro()
    }, complete)

    return () => {
      clearTimeout(tReveal)
      clearTimeout(tTagline)
      clearTimeout(tTransition)
      clearTimeout(tComplete)
      playedRef.current = false
    }
  }, [shouldRender, logoReady, finishIntro, startHomeReveal])

  useEffect(() => {
    if (!isIntroVisible || !shouldRender) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => {
      document.body.style.overflow = 'hidden'
    })
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prev
    }
  }, [isIntroVisible, shouldRender])

  if (!shouldRender || introComplete) return null

  const classes = ['intro-overlay']
  if (logoReveal) classes.push('phase-reveal')
  if (taglineReveal) classes.push('phase-tagline')
  if (logoTransition) classes.push('phase-leave')

  return (
    <div
      className={classes.join(' ')}
      data-reveal={homepageReveal ? 'home' : 'intro'}
      aria-hidden="true"
    >
      <div className="intro-bg" />
      <div className="intro-stage">
        <div className="intro-frame">
          <div className="intro-halo" />
          <img
            ref={logoRef}
            className="intro-logo"
            src={logoImage}
            alt=""
            draggable="false"
            onLoad={() => setLogoReady(true)}
            onError={() => setLogoReady(true)}
            style={logoStyle || undefined}
          />
        </div>
        <div className="intro-brand">SADANA DECOR</div>
        <p className="intro-tagline">Elegant Spaces. Thoughtfully Designed.</p>
      </div>
    </div>
  )
}
