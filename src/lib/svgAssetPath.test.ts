import { describe, expect, it } from "vitest"
import { assertSafeSvgAssetPath } from "./svgAssetPath"

describe("assertSafeSvgAssetPath", () => {
	it("通常のファイル名を通す", () => {
		expect(assertSafeSvgAssetPath("house-icon.svg")).toBe("house-icon.svg")
		expect(assertSafeSvgAssetPath("/foo.svg")).toBe("foo.svg")
	})

	it("パストラバーサルを拒否する", () => {
		expect(assertSafeSvgAssetPath("../secret.svg")).toBeNull()
		expect(assertSafeSvgAssetPath("a/../b.svg")).toBeNull()
	})

	it("空・危険な文字を拒否する", () => {
		expect(assertSafeSvgAssetPath("")).toBeNull()
		expect(assertSafeSvgAssetPath("  ")).toBeNull()
		expect(assertSafeSvgAssetPath("a\0b.svg")).toBeNull()
	})
})
