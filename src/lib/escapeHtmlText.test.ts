import { describe, expect, it } from "vitest"
import { escapeHtmlTextChar } from "./escapeHtmlText"

describe("escapeHtmlTextChar", () => {
	it("エスケープする文字を変換する", () => {
		expect(escapeHtmlTextChar("<")).toBe("&lt;")
		expect(escapeHtmlTextChar(">")).toBe("&gt;")
		expect(escapeHtmlTextChar("&")).toBe("&amp;")
		expect(escapeHtmlTextChar('"')).toBe("&quot;")
		expect(escapeHtmlTextChar("'")).toBe("&#39;")
	})

	it("通常の文字はそのまま", () => {
		expect(escapeHtmlTextChar("あ")).toBe("あ")
		expect(escapeHtmlTextChar("a")).toBe("a")
	})
})
