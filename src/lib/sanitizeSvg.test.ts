import { describe, expect, it } from "vitest"
import { sanitizeSvgMarkup } from "./sanitizeSvg"

describe("sanitizeSvgMarkup", () => {
	it("script を除去する", () => {
		const dirty = `<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><circle r="1"/></svg>`
		const out = sanitizeSvgMarkup(dirty)
		expect(out).not.toMatch(/script/i)
		expect(out).toMatch(/circle/)
	})

	it("onerror 等のイベント属性を除去する", () => {
		const dirty = `<svg xmlns="http://www.w3.org/2000/svg"><rect onload="alert(1)" width="1" height="1"/></svg>`
		const out = sanitizeSvgMarkup(dirty)
		expect(out).not.toMatch(/onload/i)
	})

	it("< で始まらない入力は空文字", () => {
		expect(sanitizeSvgMarkup("plain")).toBe("")
	})

	it("安全な SVG は残す", () => {
		const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0"/></svg>`
		expect(sanitizeSvgMarkup(s).length).toBeGreaterThan(0)
	})
})
