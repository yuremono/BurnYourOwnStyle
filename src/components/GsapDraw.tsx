import gsap from "gsap";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** CodePen ミラー（本番は Club GreenSock のファイルに差し替え推奨） */
const DEFAULT_DRAW_SVG_PLUGIN_SRC =
	"https://assets.codepen.io/16327/DrawSVGPlugin3.min.js";

declare global {
	interface Window {
		/** DrawSVG スクリプトが参照するグローバル */
		gsap?: typeof gsap;
		DrawSVGPlugin?: object;
	}
}

let drawSvgPluginPromise: Promise<void> | null = null;

function ensureDrawSVGPlugin(gsapCore: typeof gsap, src: string): Promise<void> {
	if (drawSvgPluginPromise) return drawSvgPluginPromise;

	drawSvgPluginPromise = new Promise((resolve, reject) => {
		window.gsap = gsapCore;

		if (window.DrawSVGPlugin) {
			gsapCore.registerPlugin(window.DrawSVGPlugin);
			resolve();
			return;
		}

		const existing = document.querySelector(`script[data-gsap-drawsvg="1"]`);
		if (existing) {
			existing.addEventListener("load", () => {
				if (window.DrawSVGPlugin) gsapCore.registerPlugin(window.DrawSVGPlugin);
				resolve();
			});
			existing.addEventListener("error", () => reject(new Error("DrawSVGPlugin load error")));
			return;
		}

		const script = document.createElement("script");
		script.src = src;
		script.async = true;
		script.dataset.gsapDrawsvg = "1";
		script.onload = () => {
			if (window.DrawSVGPlugin) gsapCore.registerPlugin(window.DrawSVGPlugin);
			resolve();
		};
		script.onerror = () => reject(new Error(`DrawSVGPlugin failed: ${src}`));
		document.head.appendChild(script);
	});

	return drawSvgPluginPromise;
}

function clamp01(t: number) {
	return Math.max(0, Math.min(1, t));
}

function readVar(el: HTMLElement, name: string, fallback: number) {
	const raw = getComputedStyle(el).getPropertyValue(name).trim();
	const n = parseFloat(raw);
	return Number.isFinite(n) ? n : fallback;
}

export interface GsapDrawProps {
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
	/** 線として DrawSVG する要素（既定: path） */
	pathSelector?: string;
	/** DrawSVGPlugin のスクリプト URL（省略時は CodePen ミラー） */
	drawPluginSrc?: string;
	/** true のときスクロール連動を行わない（プラグインのみ読み込み） */
	paused?: boolean;
}

/**
 * 子に置いたインライン SVG 内のパスを、スクロールに連動して DrawSVG するラッパー。
 * レイアウト・線の見た目は CSS（親の className / 子の SVG）側で指定する。
 *
 * オプション用 CSS 変数（ラッパー要素に指定）:
 * - --LineArtDrawSpan（既定 0.3）… 描画レンジ = vh × 値
 * - --LineArtEraseSpan（既定 0.7）… 消去レンジ
 * - --LineArtVMid（既定 0.5）… 「描き切り」の基準（ビューポート高さに対する比率）
 */
const GsapDraw = ({
	className = "",
	style,
	children,
	pathSelector = "path",
	drawPluginSrc = DEFAULT_DRAW_SVG_PLUGIN_SRC,
	paused = false,
}: GsapDrawProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [pluginReady, setPluginReady] = useState(false);
	const tickingRef = useRef(false);

	useEffect(() => {
		let cancelled = false;
		ensureDrawSVGPlugin(gsap, drawPluginSrc)
			.then(() => {
				if (!cancelled) setPluginReady(true);
			})
			.catch(() => {
				if (!cancelled) setPluginReady(false);
			});
		return () => {
			cancelled = true;
		};
	}, [drawPluginSrc]);

	const updateDrawSVG = useCallback(() => {
		const root = rootRef.current;
		if (!root || !pluginReady || paused) return;

		const paths = root.querySelectorAll<SVGPathElement>(pathSelector);
		if (!paths.length) {
			tickingRef.current = false;
			return;
		}

		const vh = window.innerHeight;
		const drawSpanMul = readVar(root, "--LineArtDrawSpan", 0.3);
		const eraseSpanMul = readVar(root, "--LineArtEraseSpan", 0.7);
		const vMidRatio = readVar(root, "--LineArtVMid", 0.5);

		const rect = root.getBoundingClientRect();
		const elCY = rect.top + rect.height / 2;
		const vMid = vh * vMidRatio;

		const drawSpan = vh * drawSpanMul;
		const pDraw = clamp01((vh - elCY) / drawSpan);

		let drawVal: string;
		if (elCY > vMid) {
			drawVal = `${pDraw * 100}%`;
		} else {
			const eraseSpan = vh * eraseSpanMul;
			const pErase = clamp01((vMid - elCY) / eraseSpan);
			drawVal = `${pErase * 100}% 100%`;
		}

		paths.forEach((path: SVGPathElement) => {
			gsap.set(path, { drawSVG: drawVal } as gsap.TweenVars);
		});

		tickingRef.current = false;
	}, [pathSelector, pluginReady, paused]);

	useLayoutEffect(() => {
		if (!pluginReady || paused) return;

		const onScrollOrResize = () => {
			if (tickingRef.current) return;
			tickingRef.current = true;
			requestAnimationFrame(updateDrawSVG);
		};

		updateDrawSVG();
		window.addEventListener("scroll", onScrollOrResize, { passive: true });
		window.addEventListener("resize", onScrollOrResize);

		return () => {
			window.removeEventListener("scroll", onScrollOrResize);
			window.removeEventListener("resize", onScrollOrResize);
		};
	}, [pluginReady, paused, updateDrawSVG]);

	return (
		<div ref={rootRef}  className={`GsapDraw ${className}`}style={style} role="presentation">
			{children}
		</div>
	);
};

export { GsapDraw };
