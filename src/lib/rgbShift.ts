/**
 * RgbShift - CSS クラスベースのクロマシフト効果
 * .RgbShift クラスが付与された要素に対して DOM 操作を行い、
 * RGB 分離フィルター効果を適用する
 */

let idCounter = 0;

const generateId = (): string => {
	idCounter += 1;
	return `RgbShift-${Date.now()}-${idCounter}`;
};

const createSvgFilters = (filterBase: string): SVGSVGElement => {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "0");
	svg.setAttribute("height", "0");
	svg.setAttribute("aria-hidden", "true");
	(svg.style as CSSStyleDeclaration).position = "absolute";
	(svg.style as CSSStyleDeclaration).overflow = "hidden";

	const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

	// R フィルター
	const filterR = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"filter",
	);
	filterR.setAttribute("id", `${filterBase}-r`);
	filterR.setAttribute("color-interpolation-filters", "sRGB");
	const matrixR = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"feColorMatrix",
	);
	matrixR.setAttribute("type", "matrix");
	matrixR.setAttribute(
		"values",
		"1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
	);
	filterR.appendChild(matrixR);

	// G フィルター
	const filterG = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"filter",
	);
	filterG.setAttribute("id", `${filterBase}-g`);
	filterG.setAttribute("color-interpolation-filters", "sRGB");
	const matrixG = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"feColorMatrix",
	);
	matrixG.setAttribute("type", "matrix");
	matrixG.setAttribute(
		"values",
		"0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
	);
	filterG.appendChild(matrixG);

	// B フィルター
	const filterB = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"filter",
	);
	filterB.setAttribute("id", `${filterBase}-b`);
	filterB.setAttribute("color-interpolation-filters", "sRGB");
	const matrixB = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"feColorMatrix",
	);
	matrixB.setAttribute("type", "matrix");
	matrixB.setAttribute(
		"values",
		"0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
	);
	filterB.appendChild(matrixB);

	defs.appendChild(filterR);
	defs.appendChild(filterG);
	defs.appendChild(filterB);
	svg.appendChild(defs);

	return svg;
};

const processRgbShift = (element: HTMLElement): void => {
	// 既に処理済みならスキップ
	if (element.dataset.rgbShiftProcessed === "true") {
		return;
	}

	const rawId = generateId();
	const filterBase = `RgbShiftF-${rawId}`;
	const scope = rawId;

	// SVG フィルターを先頭に追加
	const svgFilters = createSvgFilters(filterBase);
	element.insertBefore(svgFilters, element.firstChild);

	// data-src 属性がある場合は画像モード
	const src = element.dataset.src;
	const alt = element.dataset.alt || "";

	// Stack コンテナを作成
	const stack = document.createElement("div");
	stack.className = "RgbShiftStack";

	if (src) {
		// 画像モード: 3つの img を生成
		const imgR = document.createElement("img");
		imgR.className = "RgbShiftLayer RgbShiftR RgbShiftImg";
		imgR.src = src;
		imgR.alt = "";
		imgR.draggable = false;
		(imgR.style as CSSStyleDeclaration).filter = `url(#${filterBase}-r)`;

		const imgG = document.createElement("img");
		imgG.className = "RgbShiftLayer RgbShiftG RgbShiftImg";
		imgG.src = src;
		imgG.alt = "";
		imgG.draggable = false;
		(imgG.style as CSSStyleDeclaration).filter = `url(#${filterBase}-g)`;

		const imgB = document.createElement("img");
		imgB.className = "RgbShiftLayer RgbShiftB RgbShiftImg";
		imgB.src = src;
		imgB.alt = alt;
		imgB.draggable = false;
		(imgB.style as CSSStyleDeclaration).filter = `url(#${filterBase}-b)`;

		stack.appendChild(imgR);
		stack.appendChild(imgG);
		stack.appendChild(imgB);
	} else {
		// 子要素モード: 子要素を3つに複製
		const children = Array.from(element.children).filter(
			(child) =>
				!(child instanceof SVGSVGElement) ||
				!child.hasAttribute("aria-hidden"),
		);

		if (children.length === 0) {
			return;
		}

		// 元の子要素を退避
		const fragment = document.createDocumentFragment();
		children.forEach((child) => fragment.appendChild(child));

		// 3つのレイヤーを作成
		const layerR = document.createElement("div");
		layerR.className = "RgbShiftLayer RgbShiftR";
		(layerR.style as CSSStyleDeclaration).filter = `url(#${filterBase}-r)`;
		layerR.setAttribute("aria-hidden", "true");

		const layerG = document.createElement("div");
		layerG.className = "RgbShiftLayer RgbShiftG";
		(layerG.style as CSSStyleDeclaration).filter = `url(#${filterBase}-g)`;
		layerG.setAttribute("aria-hidden", "true");

		const layerB = document.createElement("div");
		layerB.className = "RgbShiftLayer RgbShiftB";
		(layerB.style as CSSStyleDeclaration).filter = `url(#${filterBase}-b)`;
		layerB.setAttribute("aria-hidden", "true");

		// 各レイヤーに子要素を複製
		children.forEach((child) => {
			layerR.appendChild(child.cloneNode(true));
			layerG.appendChild(child.cloneNode(true));
			layerB.appendChild(child.cloneNode(true));
		});

		stack.appendChild(layerR);
		stack.appendChild(layerG);
		stack.appendChild(layerB);
	}

	element.appendChild(stack);
	element.dataset.rgbShiftProcessed = "true";
	element.dataset.rgbScope = scope;
};

/**
 * DOM 内の .RgbShift 要素を初期化
 */
export const initRgbShift = (): void => {
	document.querySelectorAll(".RgbShift").forEach((el) => {
		if (el instanceof HTMLElement) {
			processRgbShift(el);
		}
	});
};

/**
 * MutationObserver で動的に追加される .RgbShift 要素も処理
 */
export const observeRgbShift = (): void => {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					if (node.classList.contains("RgbShift")) {
						processRgbShift(node);
					}
					node.querySelectorAll(".RgbShift").forEach((el) => {
						if (el instanceof HTMLElement) {
							processRgbShift(el);
						}
					});
				}
			});
		});
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
};

/**
 * 初期化（DOMContentLoaded で実行）
 */
export const setupRgbShift = (): void => {
	initRgbShift();
	observeRgbShift();
};
