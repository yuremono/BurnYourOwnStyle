interface ImgTextProps {
  image?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const ImgText = ({ image, className = "", style, children }: ImgTextProps) => {
  return (
    <div className={`ImgText ${className}`} style={style}>
        {image && <figure><img src={image} alt=""/></figure>}
        <div className="">
        {children}
        </div>
    </div>
  )
}

export { ImgText }
