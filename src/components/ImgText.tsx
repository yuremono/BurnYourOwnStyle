interface ImgTextProps {
  image?: string
  imageAlt?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const ImgText = ({ image, imageAlt = "", className = "", style, children }: ImgTextProps) => {
  return (
    <div className={`ImgText ${className}`} style={style}>
        {image && <figure><img src={image} alt={imageAlt}/></figure>}
        <div>
        {children}
        </div>
    </div>
  )
}

export { ImgText }
