/** テキストを HTML 文脈で安全に差し込むためのエスケープ（span 内テキスト用） */
const ESCAPE: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
}

export function escapeHtmlTextChar(ch: string): string {
	return ESCAPE[ch] ?? ch
}
