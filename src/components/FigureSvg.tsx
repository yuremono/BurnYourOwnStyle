import React from "react"

/** figure 直下に SVG を置く。public/images/svg/ のパスを指定するか、SVG 文字列を直接渡す。 */
interface FigureSvgProps {
	/** public/images/svg/ からの相対パス（例: "house-icon.svg"）または SVG 文字列 */
	src: string
	className?: string
}

const svgCache: Record<string, string> = {}

const FigureSvg = ({ src, className = "" }: FigureSvgProps) => {
	const [svg, setSvg] = React.useState<string | null>(svgCache[src] ?? null)

	React.useEffect(() => {
		if (svgCache[src]) {
			setSvg(svgCache[src])
			return
		}
		// SVG 文字列か URL か判定（< で始まれば SVG 文字列）
		if (src.trimStart().startsWith("<")) {
			svgCache[src] = src
			setSvg(src)
			return
		}
		const url = `${import.meta.env.BASE_URL}images/svg/${src.replace(/^\//, "")}`
		fetch(url)
			.then((r) => r.text())
			.then((text) => {
				svgCache[src] = text
				setSvg(text)
			})
			.catch(() => setSvg(null))
	}, [src])

	if (!svg) return null
	return <figure className={className} dangerouslySetInnerHTML={{ __html: svg }} />
}

export { FigureSvg }
