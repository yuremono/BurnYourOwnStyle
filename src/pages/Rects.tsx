import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { Footer } from "../components/Footer";
import { useClientRuntime } from "../hooks/useClientRuntime";
import type { Rect } from "../lib/rects";
import { ITEM_ASPECT_OPTIONS, rects } from "../lib/rects";
import { Toggle, ToggleSummary, ToggleBody } from "../components/Toggle";

/** プレビュー枠とコピー用 HTML の共通クラス（コピー側には aspect は含めない） */
const RANDOM_RECTS_WRAP_CLASS = "RandomRects relative bg-white";

/** ラッパー高さ（幅に対する %）。1〜200 に収める（aspect-ratio 100/X の X） */
function clampWrapperHeightPct(n: number): number {
	const raw = Number(n);
	const v = Number.isFinite(raw) ? raw : 50;
	return Math.min(200, Math.max(1, v));
}

function rectsOptsFromState(args: {
	count: number;
	minWidthPct: number;
	wrapperHeightPct: number;
	itemAspectId: string;
}) {
	const n = Math.max(1, Math.min(99, Math.floor(Number(args.count)) || 4));
	const rawMw = Number(args.minWidthPct);
	const mw = Math.min(
		100,
		Math.max(0, Number.isFinite(rawMw) ? rawMw : 30),
	);
	const h = clampWrapperHeightPct(args.wrapperHeightPct);
	const preset = ITEM_ASPECT_OPTIONS.find((o) => o.id === args.itemAspectId);
	const itemAspect = preset?.aspect ?? undefined;
	return {
		parentAspect: [100, h] as const,
		n,
		minWidthPct: mw,
		...(itemAspect ? { itemAspect } : {}),
	};
}

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
	const [wrapperHeightPct, setWrapperHeightPct] = useState(50);
	const [itemAspectId, setItemAspectId] = useState("random");

	/** 再生成で確定した個数・最小幅（枠の高さ/アイテム比の即時同期はこの値を使う） */
	const regenParamsRef = useRef({ count: 4, minWidthPct: 30 });
	const skipLayoutSyncEffect = useRef(true);

	const [list, setList] = useState(() =>
		rects(rectsOptsFromState({
			count: 4,
			minWidthPct: 30,
			wrapperHeightPct: 50,
			itemAspectId: "random",
		})),
	);

	const again = useCallback(() => {
		const n = Math.max(1, Math.min(99, Math.floor(Number(count)) || 4));
		const rawMw = Number(minWidthPct);
		const mw = Math.min(
			100,
			Math.max(0, Number.isFinite(rawMw) ? rawMw : 30),
		);
		regenParamsRef.current = { count: n, minWidthPct: mw };
		setList(rects(rectsOptsFromState({
			count: n,
			minWidthPct: mw,
			wrapperHeightPct,
			itemAspectId,
		})));
	}, [count, minWidthPct, wrapperHeightPct, itemAspectId]);

	/** ラッパー高さ%・アイテム比の変更時のみ再抽選（個数・最小幅は再生成で確定した値を維持） */
	useEffect(() => {
		if (skipLayoutSyncEffect.current) {
			skipLayoutSyncEffect.current = false;
			return;
		}
		const { count: n, minWidthPct: mw } = regenParamsRef.current;
		setList(rects(rectsOptsFromState({
			count: n,
			minWidthPct: mw,
			wrapperHeightPct,
			itemAspectId,
		})));
	}, [wrapperHeightPct, itemAspectId]);

	const markup = useMemo(() => randomRectsMarkup(list), [list]);

	const wrapperStyle = useMemo(() => {
		const x = clampWrapperHeightPct(wrapperHeightPct);
		return { aspectRatio: `100 / ${x}` } as const;
	}, [wrapperHeightPct]);

	useClientRuntime();
	return (
		<>
			<header
				id="header"
				className="h   [--innerBG:unset] [--head:120px] [--innerPX:0px] [--logoPX:--PX]"
			>
				<div className="h_inner">
					<div className="h_logo Eng [--logoW:180px] dswh">
						<Link to="/">Brand Name</Link>
					</div>
					<div className="h_items fix-tab items-center gap-0 w-1/2 flex-wrap">
						<label className="flex items-center gap-2   w-1/2 ">
							<span className="whitespace-nowrap">枠の高さ（幅の%）</span>
							<input
								type="number"
								min={1}
								max={200}
								step={1}
								value={wrapperHeightPct}
								onChange={(e) =>
									setWrapperHeightPct(Number(e.target.value))
								}
								className="w-20 rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-900"
							/>
						</label>
						<label className="flex items-center gap-2   w-1/2 ">
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
						<label className="flex items-center gap-2   w-1/2 ">
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
						<Toggle className="Toggle text-sm max-w-full [&_.ToggleSummary]:py-1">
							<ToggleSummary>アイテムのアスペクト比</ToggleSummary>
							<ToggleBody className="pt-2 pb-1">
								<label className="flex flex-wrap items-center gap-2">
									<span className="whitespace-nowrap text-neutral-600">
										プリセット
									</span>
									<select
										value={itemAspectId}
										onChange={(e) =>
											setItemAspectId(e.target.value)
										}
										className="min-w-[10rem] max-w-full rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-900"
									>
										{ITEM_ASPECT_OPTIONS.map((o) => (
											<option key={o.id} value={o.id}>
												{o.label}
											</option>
										))}
									</select>
								</label>
							</ToggleBody>
						</Toggle>
					</div>
				</div>
			</header>
			<main className=" bg-[--BC]   py-[--head] [--MY:1em] overflow-hidden [--head:120px] [--wid:100%]">
				<h1 className="mx-auto  h2FZ relative z-10 MY">
					Random Rects Generator&nbsp;
					<span className="text-sm budoux">
						いいバランスの時にコピーしてそのまま使う為の物です。left/top
						は中心。幅は
						%、高さはアスペクト比。重なる場合は数回リトライ失敗で中止。
					</span>
				</h1>

				<div
					className={RANDOM_RECTS_WRAP_CLASS}
					style={wrapperStyle}
				>
					{list.map((r, i) => (
						<div
							key={`${r.left}-${r.top}-${r.width}-${r.aspectRatio[0]}-${r.aspectRatio[1]}-${i}`}
							className="item bg-[--GR]"
							style={rectPreviewStyle(r)}
						/>
					))}
				</div>

				<Toggle className="bg-[--WH] mt-8">
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
