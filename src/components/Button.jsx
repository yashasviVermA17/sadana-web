import { Link } from 'react-router-dom'

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-60'

const variants = {
  primary:
    'bg-brand text-cream hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-card active:translate-y-0',
  dark: 'bg-charcoal text-cream hover:bg-charcoal-soft hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-slate bg-transparent text-charcoal hover:border-brand hover:text-brand hover:-translate-y-0.5 active:translate-y-0',
  outlineLight:
    'border border-cream/40 bg-transparent text-cream hover:border-brand hover:bg-brand hover:text-cream hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-charcoal hover:text-brand',
  white: 'bg-ivory text-charcoal hover:bg-linen hover:-translate-y-0.5 active:translate-y-0',
}

const sizes = {
  sm: 'px-5 py-2.5 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  target,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
