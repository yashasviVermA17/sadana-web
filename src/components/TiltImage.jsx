import { useTilt } from './TiltContext'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function TiltImage({ src, alt, className = '', parallax = 1.4, zoom = 1.14, ...rest }) {
  const { x, y } = useTilt()

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        transform: `translate3d(${x * -parallax}px, ${y * parallax}px, 0) scale(${zoom})`,
        transition: `transform 0.35s ${EASE}`,
        willChange: 'transform',
      }}
      {...rest}
    />
  )
}
