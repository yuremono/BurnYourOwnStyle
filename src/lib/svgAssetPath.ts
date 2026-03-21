/**
 * `public/images/svg/` からの相対パスとして安全なものだけ通す（パストラバーサル防止）
 */
export function assertSafeSvgAssetPath(relative: string): string | null {
	const n = relative
		.replace(/^\//, "")
		.replace(/\\/g, "/")
		.trim()
	if (!n || n.includes("..") || n.includes("\0")) return null
	return n
}
