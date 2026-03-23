/**
 * .budoux 要素に BudouX の HTML 処理を適用
 * 元: js/function.js 83–85 行（CDN の budoux-ja の代わりに npm）
 */

import { loadDefaultJapaneseParser } from "budoux";

const ATTR = "data-budoux";

export type RuntimeDisconnect = { disconnect: () => void };

export function initBudoux(
	root: Document | Element = document,
): RuntimeDisconnect {
	const base = root;
	const parser = loadDefaultJapaneseParser();

	base.querySelectorAll(".budoux").forEach((el) => {
		if (!(el instanceof HTMLElement)) return;
		if (el.hasAttribute(ATTR)) return;
		el.setAttribute(ATTR, "1");
		parser.applyToElement(el);
	});

	return {
		disconnect: () => {
			base.querySelectorAll(`[${ATTR}]`).forEach((el) => {
				el.removeAttribute(ATTR);
			});
		},
	};
}
