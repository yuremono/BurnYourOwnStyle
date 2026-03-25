interface ImgTextProps {
	className?: string
	style?: React.CSSProperties
	children: React.ReactNode
}

const ImgText = ({ className = "", style, children }: ImgTextProps) => {
	return (
		<div className={`ImgText ${className}`} style={style}>
			{children}
		</div>
	)
}

export { ImgText }
