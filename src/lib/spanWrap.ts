/**
 * .JsLetter > span 内テキストを1文字ずつ span で囲む
 * 元: js/function.js 326–367 行付近
 */

import { escapeHtmlTextChar } from "./escapeHtmlText";

const ATTR_DONE = "data-span-wrap";

class SpanWrap {
	private target: HTMLElement;
	private nodes: ChildNode[];
	private globalIndex: { count: number };

	constructor(target: HTMLElement, globalIndex: { count: number }) {
		this.target = target;
		this.nodes = [...target.childNodes];
		this.globalIndex = globalIndex;
		this.convert();
	}

	private convert() {
		let spanWrapText = "";
		for (const node of this.nodes) {
			if (node.nodeType === 3) {
				const text = (node.textContent ?? "").replace(/\r?\n/g, "");
				spanWrapText += text.split("").reduce((acc, v) => {
					const delay = (this.globalIndex.count * 0.075).toFixed(2);
					const span = `<span style="--char-index:${this.globalIndex.count}; transition-delay:${delay}s;">${escapeHtmlTextChar(v)}</span>`;
					this.globalIndex.count++;
					return acc + span;
				}, "");
			} else if (node instanceof HTMLElement) {
				spanWrapText += node.outerHTML;
			}
		}
		this.target.innerHTML = spanWrapText.replace(/\n/, "");
	}
}

const SELECTOR = ".JsLetter > span";

export type RuntimeDisconnect = { disconnect: () => void };

export function initSpanWrap(
	root: Document | Element = document,
): RuntimeDisconnect {
	const base = root;
	const globalIndex = { count: 0 };

	base.querySelectorAll(SELECTOR).forEach((el) => {
		if (!(el instanceof HTMLElement)) return;
		if (el.hasAttribute(ATTR_DONE)) return;
		el.setAttribute(ATTR_DONE, "1");
		new SpanWrap(el, globalIndex);
	});

	return {
		disconnect: () => {
			/* StrictMode 二重実行で二重ラップしないよう、属性は外さない */
		},
	};
}
