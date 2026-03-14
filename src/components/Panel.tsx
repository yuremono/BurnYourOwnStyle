interface PanelItemProps {
  image?: string
  className?: string
  children: React.ReactNode
}

const PanelItem = ({ image, className = "", children }: PanelItemProps) => {
  return (
    <div className={`item ${className}`}>
      {image && <figure><img src={image} alt=""/></figure>}
      <div>
        {children}
      </div>
    </div>
  )
}

interface PanelProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Panel = ({ className = "", style, children }: PanelProps) => {
  return (
    <div className={`Panel ${className}`} style={style}>
      {children}
    </div>
  )
}

export { Panel, PanelItem }
