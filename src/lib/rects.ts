/**
 * 親を 100%×100% とみなし、矩形をすべて % で乱数生成する（px は使わない）。
 * left/top は中心位置（CSS で translate(-50%, -50%) する前提）。
 */

/** 1 個の矩形（left/top/width は親に対する %。height は aspectRatio で決める） */
export type Rect = {
	left: number;
	top: number;
	width: number;
	aspectRatio: readonly [number, number];
};

/** 作る矩形の個数 */
const COUNT = 4;

/** 1 個の矩形を置くとき、重なったらやり直す最大回数（この回数で置けなければその個はスキップ） */
const MAX_TRY = 6;

/**
 * ランダム時に等確率で選ぶ [横, 縦]（`itemAspect` 未指定時）
 */
const RATIOS: readonly (readonly [number, number])[] = [
	[1, 1],
	[2, 3],
	[3, 2],
	[16, 9],
	[9, 16],
	[4, 3],
	[3, 4],
	[2, 1],
	[1, 2],
	[16, 10],
	[10, 16],
	[3, 1],
	[1, 3],
];

/** UI のセレクト用（ラベルと固定比。`aspect` が null のときはランダム＝`RATIOS`） */
export const ITEM_ASPECT_OPTIONS: readonly {
	id: string;
	label: string;
	aspect: readonly [number, number] | null;
}[] = [
	{ id: "random", label: "ランダム（混在）", aspect: null },
	{ id: "1-1", label: "1:1", aspect: [1, 1] },
	{ id: "2-3", label: "2:3", aspect: [2, 3] },
	{ id: "3-2", label: "3:2", aspect: [3, 2] },
	{ id: "16-9", label: "16:9", aspect: [16, 9] },
	{ id: "9-16", label: "9:16", aspect: [9, 16] },
	{ id: "4-3", label: "4:3", aspect: [4, 3] },
	{ id: "3-4", label: "3:4", aspect: [3, 4] },
	{ id: "2-1", label: "2:1", aspect: [2, 1] },
	{ id: "1-2", label: "1:2", aspect: [1, 2] },
	{ id: "16-10", label: "16:10", aspect: [16, 10] },
	{ id: "10-16", label: "10:16", aspect: [10, 16] },
	{ id: "3-1", label: "3:1", aspect: [3, 1] },
	{ id: "1-3", label: "1:3", aspect: [1, 3] },
];

/**
 * 長辺のランダムの下限に足す値（内部は 0.1% 単位の整数。200 = 20.0%）
 * 式: Math.floor(Math.random() * SPAN) + BASE_MIN
 */
const BASE_MIN = 300;

/**
 * 長辺に加える乱数の幅（0〜79 を加える）。旧式の「親幅の 1/10」を % 論理に合わせた値
 */
const SPAN = 0;

/** 内部計算の分解能（1000 = 100.0%） */
const U = 1000;

type Opt = {
	n?: number;
	/** 親コンテナの幅:高さ（重なり判定のため。プレビュー枠の aspect-ratio と合わせる） */
	parentAspect?: readonly [number, number];
	/**
	 * 矩形の最小幅（親の幅に対する %）。未指定時は BASE_MIN から換算（30% 相当）
	 */
	minWidthPct?: number;
	/**
	 * 各矩形の [横, 縦] を固定する。未指定時は `RATIOS` から毎回ランダム。
	 */
	itemAspect?: readonly [number, number];
};

/** 論理親サイズ上での AABB（重なり判定用） */
function bbox(
	centerLeftPct: number,
	centerTopPct: number,
	widthPct: number,
	aspect: readonly [number, number],
	parentW: number,
	parentH: number,
) {
	const [aw, ah] = aspect;
	const cw = (parentW * widthPct) / 100;
	const ch = cw * (ah / aw);
	const cx = (parentW * centerLeftPct) / 100;
	const cy = (parentH * centerTopPct) / 100;
	return {
		left: cx - cw / 2,
		right: cx + cw / 2,
		top: cy - ch / 2,
		bottom: cy + ch / 2,
	};
}

function overlaps(
	a: Rect,
	b: Rect,
	parentW: number,
	parentH: number,
): boolean {
	const A = bbox(a.left, a.top, a.width, a.aspectRatio, parentW, parentH);
	const B = bbox(b.left, b.top, b.width, b.aspectRatio, parentW, parentH);
	return A.left < B.right && A.right > B.left && A.top < B.bottom && A.bottom > B.top;
}

function anyOverlapWith(
	candidate: Rect,
	placed: Rect[],
	parentW: number,
	parentH: number,
): boolean {
	for (const p of placed) {
		if (overlaps(candidate, p, parentW, parentH)) {
			return true;
		}
	}
	return false;
}

/** 内部整数（0〜1000 = 0〜100%）をそのままのスケールの Rect に（中心座標・幅・アスペクト比） */
function toRect(
	centerLeftU: number,
	centerTopU: number,
	widthU: number,
	aspect: readonly [number, number],
): Rect {
	return {
		left: centerLeftU / 10,
		top: centerTopU / 10,
		width: widthU / 10,
		aspectRatio: aspect,
	};
}

/**
 * 親を幅 100%・高さ 100% としたときの矩形を乱数生成する。
 * - left/top は中心が親の 0〜100% の範囲に入るよう乱数（はみ出しは許容しないのは座標だけ）
 * - 幅は従来どおり BASE_MIN / SPAN から決め、高さは aspectRatio に任せる（未指定時は RATIOS からランダム）
 * - 重なりは親の実アスペクト比を使って判定（opt.parentAspect）
 */
export function rects(opt?: Opt): Rect[] {
	const n = opt?.n ?? COUNT;
	const [pW, pH] = opt?.parentAspect ?? [1, 1];

	/** 最小幅（0.1% 単位の内部整数）。BASE_MIN と opt.minWidthPct のどちらか大きい方を使う */
	const minWidthU =
		opt?.minWidthPct != null
			? Math.round(Math.min(100, Math.max(0, opt.minWidthPct)) * 10)
			: BASE_MIN;

	const out: Rect[] = [];

	for (let i = 0; i < n; i++) {
		let placed = false;
		for (let t = 0; t < MAX_TRY && !placed; t++) {
			const aspect =
				opt?.itemAspect ??
				RATIOS[Math.floor(Math.random() * RATIOS.length)]!;
			const baseSize = Math.floor(Math.random() * SPAN) + minWidthU;

			const rwU =
				aspect[0] > aspect[1]
					? baseSize
					: Math.floor((baseSize * aspect[0]) / aspect[1]);

			const widthU = rwU;

			/** 中心の left/top は親の内側（0〜100%）だけランダム */
			const centerLeftU = Math.floor(Math.random() * (U + 1));
			const centerTopU = Math.floor(Math.random() * (U + 1));

			const candidate = toRect(centerLeftU, centerTopU, widthU, aspect);
			if (anyOverlapWith(candidate, out, pW, pH)) {
				continue;
			}

			out.push(candidate);
			placed = true;
		}
	}

	return out;
}
