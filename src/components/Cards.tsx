interface CardsProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Cards = ({ className = "", style, children }: CardsProps) => {
  return (
    <div className={`Cards ${className}`} style={style}>
      {children}
    </div>
  )
}

interface CardsItemProps {
  image?: string
  imageAlt?: string
  className?: string
  children: React.ReactNode
}

const CardsItem = ({ image, imageAlt = "", className = "", children }: CardsItemProps) => {
  return (
    <div className={`item  ${className}`}>
      {image && <figure><img src={image} alt={imageAlt}/></figure>}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

export { Cards, CardsItem }
