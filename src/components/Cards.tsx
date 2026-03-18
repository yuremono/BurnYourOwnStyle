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
  /** figure 内に表示するカスタム要素（SVG コンポーネント・インライン SVG など） */
  svg?: React.ReactNode
  className?: string
  children: React.ReactNode
}

const CardsItem = ({ image, imageAlt = "", svg, className = "", children }: CardsItemProps) => {
  const figureContent = svg ?? (image && <img src={image} alt={imageAlt} />)
  return (
    <div className={`item  ${className}`}>
      {figureContent && (svg ? figureContent : <figure>{figureContent}</figure>)}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

export { Cards, CardsItem }
