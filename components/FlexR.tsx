interface FlexRProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const FlexR = ({ className = "", style, children }: FlexRProps) => {
  return (
    <div className={`FlexR ${className}`} style={style}>
      {children}
    </div>
  )
}

interface FlexRImageProps {
  image?: string
  className?: string
}

const FlexRImage = ({ image, className = "" }: FlexRImageProps) => {
  return (
    <figure className={className}>
      {image && <img src={image} alt=""/>}
    </figure>
  )
}

export { FlexR, FlexRImage }
