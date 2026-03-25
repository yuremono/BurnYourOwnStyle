interface PanelItemProps {
	className?: string
	children: React.ReactNode
}

const PanelItem = ({ className = "", children }: PanelItemProps) => {
	return (
		<div className={`item ${className}`}>
			{children}
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
