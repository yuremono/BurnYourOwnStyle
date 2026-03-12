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
  className?: string
  children: React.ReactNode
}

const CardsItem = ({ image, className = "", children }: CardsItemProps) => {
  return (
    <div className={`item gap-0 ${className}`}>
      {image && <figure><img src={image} alt=""/></figure>}
      <div className="p-4 rounded-lg shadow-lg flex-1">
        {children}
      </div>
    </div>
  )
}

export { Cards, CardsItem }
