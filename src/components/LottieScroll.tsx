import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ComponentProps,
} from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

export type LottieScrollProps = {
	src: string;
	/** 再生開始（全フレームに対する割合）。例: 0.3 */
	segmentStartRatio: number;
	/** 再生終了（全フレームに対する割合）。例: 0.7 */
	segmentEndRatio: number;
	/**
	 * 自動再生の停止位置（segment 内の 0〜1）。例: 0.5 で区間のちょうど中間で止まる。
	 * スクロール連動では「キャンバス中心が画面縦中央」のときこのフレームになるよう合わせる。
	 */
	autoplayStopRatio: number;
	/**
	 * DotLottieReact のルート div に渡すクラス（`out` や `[--canvasH:100lvh]` など）。
	 * 先頭に Unit 名 `LottieScroll` が自動で付与される。
	 */
	className?: string;
} & Omit<
	ComponentProps<typeof DotLottieReact>,
	| "src"
	| "segment"
	| "dotLottieRefCallback"
	| "autoplay"
	| "loop"
	| "className"
>;

type SegmentBounds = {
	startF: number;
	endF: number;
	stopF: number;
};

function computeSegmentBounds(
	totalFrames: number,
	segmentStartRatio: number,
	segmentEndRatio: number,
	autoplayStopRatio: number,
): SegmentBounds | null {
	if (totalFrames <= 0) return null;
	const startF = Math.floor(totalFrames * segmentStartRatio);
	const endF = Math.min(Math.floor(totalFrames * segmentEndRatio), totalFrames - 1);
	const frameSpan = Math.max(0, endF - startF);
	const stopF = Math.round(startF + frameSpan * autoplayStopRatio);
	const clampedStop = Math.min(endF, Math.max(startF, stopF));
	return { startF, endF, stopF: clampedStop };
}

const FRAME_STOP_EPSILON = 0.5;

/**
 * DOM は DotLottieReact が出力する div（ラッパー）と canvas のみ。
 * 読み込み後: segment 内を自動再生して autoplayStopRatio の位置で停止 → 以降はスクロールで scrub。
 * スクロール時はキャンバス中心と画面縦中央のずれ（px）に応じてフレームが変わり、中央一致時に停止フレームになる。
 */
export function LottieScroll({
	src,
	segmentStartRatio,
	segmentEndRatio,
	autoplayStopRatio,
	className,
	...dotLottieProps
}: LottieScrollProps) {
	const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
	const [lottieSegment, setLottieSegment] = useState<[number, number] | undefined>(
		undefined,
	);
	const [phase, setPhase] = useState<"autoplay" | "scroll">("autoplay");
	const boundsRef = useRef<SegmentBounds>({
		startF: 0,
		endF: 0,
		stopF: 0,
	});

	const wrapperClassName = ["LottieScroll", className].filter(Boolean).join(" ");

	const updateFrameFromScroll = useCallback(() => {
		if (phase !== "scroll" || !dotLottie?.isLoaded) return;

		const canvas = dotLottie.canvas;
		if (
			!canvas ||
			typeof (canvas as HTMLCanvasElement).getBoundingClientRect !== "function"
		) {
			return;
		}
		const rect = (canvas as HTMLCanvasElement).getBoundingClientRect();
		const h = rect.height;
		if (h <= 0) return;

		const vh = window.innerHeight;
		const spanPx = Math.max(1, vh + h);
		const centerY = rect.top + h / 2;
		const viewportCenterY = vh / 2;
		const delta = centerY - viewportCenterY;

		const { startF, endF, stopF } = boundsRef.current;
		const frameSpan = Math.max(0, endF - startF);
		let frame = stopF - delta * (frameSpan / spanPx);
		frame = Math.min(endF, Math.max(startF, frame));

		dotLottie.setFrame(frame);
		dotLottie.pause();
	}, [dotLottie, phase]);

	useEffect(() => {
		if (!dotLottie) return;
		const syncSegment = () => {
			const total = dotLottie.totalFrames;
			const next = computeSegmentBounds(
				total,
				segmentStartRatio,
				segmentEndRatio,
				autoplayStopRatio,
			);
			if (!next) return;
			boundsRef.current = next;
			setLottieSegment([next.startF, next.endF]);
			setPhase("autoplay");
		};
		dotLottie.addEventListener("load", syncSegment);
		if (dotLottie.isLoaded) syncSegment();
		return () => dotLottie.removeEventListener("load", syncSegment);
	}, [dotLottie, segmentStartRatio, segmentEndRatio, autoplayStopRatio]);

	useEffect(() => {
		if (!dotLottie?.isLoaded || phase !== "autoplay" || !lottieSegment) return;
		const { stopF } = boundsRef.current;
		if (dotLottie.currentFrame >= stopF - FRAME_STOP_EPSILON) {
			dotLottie.setFrame(stopF);
			dotLottie.pause();
			queueMicrotask(() => setPhase("scroll"));
			return;
		}
		dotLottie.play();
	}, [dotLottie, lottieSegment, phase]);

	useEffect(() => {
		if (phase !== "scroll" || !dotLottie?.isLoaded) return;
		updateFrameFromScroll();
	}, [phase, dotLottie?.isLoaded, updateFrameFromScroll]);

	useEffect(() => {
		if (!dotLottie || phase !== "autoplay") return;
		const onFrame = () => {
			const { stopF } = boundsRef.current;
			if (dotLottie.currentFrame >= stopF - FRAME_STOP_EPSILON) {
				dotLottie.setFrame(stopF);
				dotLottie.pause();
				queueMicrotask(() => setPhase("scroll"));
			}
		};
		dotLottie.addEventListener("frame", onFrame);
		return () => dotLottie.removeEventListener("frame", onFrame);
	}, [dotLottie, phase]);

	useEffect(() => {
		window.addEventListener("scroll", updateFrameFromScroll, { passive: true });
		window.addEventListener("resize", updateFrameFromScroll);
		updateFrameFromScroll();
		return () => {
			window.removeEventListener("scroll", updateFrameFromScroll);
			window.removeEventListener("resize", updateFrameFromScroll);
		};
	}, [updateFrameFromScroll]);

	return (
		<DotLottieReact
			src={src}
			loop={false}
			autoplay={false}
			className={wrapperClassName}
			{...(lottieSegment ? { segment: lottieSegment } : {})}
			dotLottieRefCallback={setDotLottie}
			{...dotLottieProps}
		/>
	);
}
