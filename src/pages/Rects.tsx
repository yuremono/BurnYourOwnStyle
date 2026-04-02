import { useCallback, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { Footer } from "../components/Footer";
import { useClientRuntime } from "../hooks/useClientRuntime";
import type { Rect } from "../lib/rects";
import { rects } from "../lib/rects";
import { Toggle, ToggleSummary, ToggleBody } from "../components/Toggle";

/** プレビュー枠の幅:高さ（`RandomRects` の aspect-ratio と `rects` の重なり判定の parentAspect に使用）※数値は変更しないこと */
const W = 2;

/** 同上（高さ側の比） */
const H = 1;

/** プレビュー枠とコピー用 HTML の共通クラス（コピー側には aspect は含めない） */
const RANDOM_RECTS_WRAP_CLASS = "RandomRects relative bg-white";

/** % 用の文字列（Tailwind arbitrary に埋め込み） */
function fmtPct(n: number): string {
	const s = n.toFixed(4).replace(/\.?0+$/, "");
	return s === "" ? "0" : s;
}

/** 変数・style なしの Tailwind のみ（プレビューとコピペで共通） */
function rectItemClassList(r: Rect): string {
	const [aw, ah] = r.aspectRatio;
	return [
		"item",
		"bg-[--GR]",
		`left-[${fmtPct(r.left)}%]`,
		`top-[${fmtPct(r.top)}%]`,
		`w-[${fmtPct(r.width)}%]`,
		`aspect-[${aw}/${ah}]`,
	].join(" ");
}

function rectToMarkup(r: Rect): string {
	return `<div class="${rectItemClassList(r)}"></div>`;
}

/** ラッパー＋各矩形（アスペクト比はプレビュー用 style のみ。マークアップ文字列には含めない） */
function randomRectsMarkup(list: Rect[]): string {
	const inner = list.map((r) => rectToMarkup(r)).join("\n");
	return `<div class="${RANDOM_RECTS_WRAP_CLASS}">\n${inner}\n</div>`;
}

/** プレビュー用（動的 % は JIT に乗らないことがあるため style で指定） */
function rectPreviewStyle(r: Rect): CSSProperties {
	return {
		left: `${r.left}%`,
		top: `${r.top}%`,
		width: `${r.width}%`,
		aspectRatio: `${r.aspectRatio[0]} / ${r.aspectRatio[1]}`,
	};
}

function Rects() {
	const [count, setCount] = useState(4);
	const [minWidthPct, setMinWidthPct] = useState(30);

	const [list, setList] = useState(() =>
		rects({
			parentAspect: [W, H],
			n: 4,
			minWidthPct: 30,
		}),
	);

	const again = useCallback(() => {
		const n = Math.max(1, Math.min(99, Math.floor(Number(count)) || 4));
		const rawMw = Number(minWidthPct);
		const mw = Math.min(
			100,
			Math.max(0, Number.isFinite(rawMw) ? rawMw : 30),
		);
		setList(
			rects({
				parentAspect: [W, H],
				n,
				minWidthPct: mw,
			}),
		);
	}, [count, minWidthPct]);

	const markup = useMemo(() => randomRectsMarkup(list), [list]);

	useClientRuntime();
	return (
		<>
			<header
				id="header"
				className="h   [--innerBG:unset] [--head:120px]"
			>
				<div className="h_inner">
					<div className="h_logo Eng [--logoW:180px] dswh">
						<Link to="/">Brand Name</Link>
					</div>
					<div className="h_items fix-tab flex flex-wrap items-center gap-3">
						<label className="flex items-center gap-2 text-sm">
							<span className="whitespace-nowrap">最小幅 %</span>
							<input
								type="number"
								min={1}
								max={100}
								step={0.1}
								value={minWidthPct}
								onChange={(e) =>
									setMinWidthPct(Number(e.target.value))
								}
								className="w-20 rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-900"
							/>
						</label>
						<label className="flex items-center gap-2 text-sm">
							<span className="whitespace-nowrap">個数</span>
							<input
								type="number"
								min={1}
								max={99}
								step={1}
								value={count}
								onChange={(e) =>
									setCount(Number(e.target.value))
								}
								className="w-16 rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-900"
							/>
						</label>
						<button type="button" onClick={again} className="btn ">
							再生成
						</button>
					</div>
				</div>
			</header>
			<main className=" bg-[--BC]   py-[--head] [--MY:1em] overflow-hidden [--head:120px]">
				<h1 className="mx-auto  h2FZ relative z-10 MY">
					Random Rects Generator
					<span className="text-sm budoux">
						いいバランスの時にコピーしてそのまま使う為の物です。left/top
						は中心。幅は
						%、高さはアスペクト比。重なる場合は数回リトライ失敗で中止。
					</span>
				</h1>

				<div
					className={RANDOM_RECTS_WRAP_CLASS}
					style={{ aspectRatio: `${W} / ${H}` }}
				>
					{list.map((r, i) => (
						<div
							key={`${r.left}-${r.top}-${r.width}-${r.aspectRatio[0]}-${r.aspectRatio[1]}-${i}`}
							className="item bg-[--GR]"
							style={rectPreviewStyle(r)}
						/>
					))}
				</div>

				<Toggle className="bg-[--WH]">
					<ToggleSummary>HTML（CustomClass設定済み）</ToggleSummary>
					<ToggleBody>
						<pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-neutral-700">
							{markup}
						</pre>
					</ToggleBody>
				</Toggle>
			</main>

			<Footer />
		</>
	);
}

export default Rects;
