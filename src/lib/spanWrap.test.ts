import { describe, expect, it } from "vitest"
import { initSpanWrap } from "./spanWrap"

describe("initSpanWrap", () => {
	it("テキストノード内の < をエスケープし、新たな要素として解釈されない", () => {
		document.body.innerHTML = ""
		const wrap = document.createElement("div")
		wrap.className = "JsLetter"
		const span = document.createElement("span")
		span.appendChild(document.createTextNode('<img src=x onerror=alert(1)>'))
		wrap.appendChild(span)
		document.body.appendChild(wrap)

		initSpanWrap(document.body)
		const el = document.querySelector(".JsLetter > span")!
		expect(el.querySelector("img")).toBeNull()
		expect(el.innerHTML).toContain("&lt;")
		expect(el.innerHTML).not.toMatch(/<img[^>]*onerror/i)
	})

	it("通常の文字は span で分割される", () => {
		document.body.innerHTML = '<div class="JsLetter"><span>ab</span></div>'
		initSpanWrap(document.body)
		const inner = document.querySelector(".JsLetter > span")!.innerHTML
		expect(inner).toMatch(/<span/)
		expect(inner).toContain("a")
		expect(inner).toContain("b")
	})
})
