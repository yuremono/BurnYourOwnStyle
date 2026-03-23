/**
 * ScrollHint + 横スクロールコンテナの縦ホイール→横スクロール
 * 元: js/function.js 93–117 行
 */

import "scroll-hint/css/scroll-hint.css";
import ScrollHint from "scroll-hint";

const SELECTOR = ".__scrollX, .tbl_scroll";
const ATTR_HINT = "data-scroll-hint";
const WHEEL_ATTR = "data-scroll-wheel";

export type RuntimeDisconnect = { disconnect: () => void };

function prependHintIconToScrollX(root: Document | Element) {
	const base = root;
	base.querySelectorAll(".__scrollX").forEach((el) => {
		if (!(el instanceof HTMLElement)) return;
		const hint = el.querySelector(".scroll-hint-icon-wrap");
		if (hint) el.prepend(hint);
	});
}

export function initScrollX(
	root: Document | Element = document,
): RuntimeDisconnect {
	const base = root;

	const candidates = [...base.querySelectorAll(SELECTOR)].filter(
		(el): el is HTMLElement =>
			el instanceof HTMLElement && !el.hasAttribute(ATTR_HINT),
	);

	const wheelCleanups: Array<() => void> = [];

	if (candidates.length > 0) {
		try {
			new ScrollHint(candidates, {
				i18n: { scrollable: "スクロールできます" },
			});
			candidates.forEach((el) => el.setAttribute(ATTR_HINT, "1"));
		} catch {
			/* ScrollHint 初期化失敗時はホイールのみ */
		}
	}

	prependHintIconToScrollX(base);

	base.querySelectorAll(SELECTOR).forEach((el) => {
		if (!(el instanceof HTMLElement)) return;
		if (el.hasAttribute(WHEEL_ATTR)) return;
		el.setAttribute(WHEEL_ATTR, "1");

		const onWheel = (e: WheelEvent) => {
			if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
			const maxScrollLeft = el.scrollWidth - el.clientWidth;
			if (
				(el.scrollLeft <= 0 && e.deltaY < 0) ||
				(el.scrollLeft >= maxScrollLeft && e.deltaY > 0)
			) {
				return;
			}
			e.preventDefault();
			el.scrollLeft += e.deltaY;
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		wheelCleanups.push(() => el.removeEventListener("wheel", onWheel));
	});

	return {
		disconnect: () => {
			wheelCleanups.forEach((fn) => fn());
			base.querySelectorAll(`[${WHEEL_ATTR}]`).forEach((e) => {
				e.removeAttribute(WHEEL_ATTR);
			});
			base.querySelectorAll(`[${ATTR_HINT}]`).forEach((e) => {
				e.removeAttribute(ATTR_HINT);
			});
		},
	};
}
