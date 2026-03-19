interface StickProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Stick = ({ className = "", style, children }: StickProps) => {
  return (
    <div className={`Stick ${className}`} style={style}>
      {children}
    </div>
  )
}

interface StickImageProps {
  image?: string
  imageAlt?: string
  className?: string
}

const StickImage = ({ image, imageAlt = "", className = "" }: StickImageProps) => {
  return (
    <figure className={className}>
      {image && <img src={image} alt={imageAlt}/>}
    </figure>
  )
}

export { Stick, StickImage }
