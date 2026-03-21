import DOMPurify from "isomorphic-dompurify"

/**
 * figure に `dangerouslySetInnerHTML` する前に SVG マークアップをサニタイズする。
 * script / イベントハンドラ / 危険な url() 等を除去する。
 */
export function sanitizeSvgMarkup(raw: string): string {
	const trimmed = raw.trimStart()
	if (!trimmed.startsWith("<")) return ""

	const out = DOMPurify.sanitize(trimmed, {
		USE_PROFILES: { svg: true, svgFilters: true },
	})
	return out.trim()
}
