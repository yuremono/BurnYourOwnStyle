import React, { useId } from "react";

export interface RgbShiftProps {
	className?: string;
	style?: React.CSSProperties;
	/** インライン SVG や任意の子要素（img モードと同時指定しない） */
	children?: React.ReactNode;
	/** PNG / JPEG / WebP / GIF 等の URL（指定時は内部で同一画像を3枚重ねる） */
	src?: string;
	/** `src` 使用時の img alt（装飾のみなら空文字可） */
	alt?: string;
	/** R を左、B を右へずらす量（px）。G は中央 */
	shift?: number;
	/** 縦方向のずれ（px）。R は -shiftY、B は +shiftY */
	shiftY?: number;
	/** `role="img"` 時の説明（子が複製されるためラッパーに付与するのが安全） */
	ariaLabel?: string;
}

/**
 * 黒背景上で R/G/B をわずかにずらし、加算（screen）で重ねるクロマシフト風。
 * 一致時は白に近づき、ずれがあると赤／青の縁が見える。
 */
const RgbShift = ({
	className = "",
	children,
	src,
	alt = "",
	ariaLabel,
}: RgbShiftProps) => {
	const rawId = useId().replace(/:/g, "");
	const filterBase = `RgbShiftF-${rawId}`;
	const scope = `RgbShift-${rawId}`;

	if (!src && children == null) {
		return null;
	}



	return (
		<div
			className={`RgbShift ${className}`}
			data-rgb-scope={scope}
			role={ariaLabel ? "img" : undefined}
			aria-label={ariaLabel}
		>
			<svg
				width="0"
				height="0"
				style={{ position: "absolute", overflow: "hidden" }}
				aria-hidden
			>
				<defs>
					<filter
						id={`${filterBase}-r`}
						colorInterpolationFilters="sRGB"
					>
						<feColorMatrix
							type="matrix"
							values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
						/>
					</filter>
					<filter
						id={`${filterBase}-g`}
						colorInterpolationFilters="sRGB"
					>
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
						/>
					</filter>
					<filter
						id={`${filterBase}-b`}
						colorInterpolationFilters="sRGB"
					>
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
						/>
					</filter>
				</defs>
			</svg>

			<div className="RgbShiftStack">
				{src ? (
					<>
						<img
							className="RgbShiftLayer RgbShiftR RgbShiftImg"
							src={src}
							alt=""
							aria-hidden
							draggable={false}
							style={{ filter: `url(#${filterBase}-r)` }}
						/>
						<img
							className="RgbShiftLayer RgbShiftG RgbShiftImg"
							src={src}
							alt=""
							aria-hidden
							draggable={false}
							style={{ filter: `url(#${filterBase}-g)` }}
						/>
						<img
							className="RgbShiftLayer RgbShiftB RgbShiftImg"
							src={src}
							alt={alt}
							draggable={false}
							style={{ filter: `url(#${filterBase}-b)` }}
						/>
					</>
				) : (
					<>
						<div
							className="RgbShiftLayer RgbShiftR"
							style={{ filter: `url(#${filterBase}-r)` }}
							aria-hidden
						>
							{children}
						</div>
						<div
							className="RgbShiftLayer RgbShiftG"
							style={{ filter: `url(#${filterBase}-g)` }}
							aria-hidden
						>
							{children}
						</div>
						<div
							className="RgbShiftLayer RgbShiftB"
							style={{ filter: `url(#${filterBase}-b)` }}
							aria-hidden
						>
							{children}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export { RgbShift };
