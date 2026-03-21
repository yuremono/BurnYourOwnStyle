/**
 * MV 動画・YouTube: ビューポート連動
 * 元: js/function.js 407–448 行
 */

const SELECTOR = ".video_container,.video_container2";
const ATTR = "data-byos-video-io";
const THRESHOLD = 0.1;

export type ByosDisconnect = { disconnect: () => void };

export function initVideo(root: Document | Element = document): ByosDisconnect {
	const base = root;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const container = entry.target;
				if (!(container instanceof HTMLElement)) continue;

				const video = container.querySelector("video");
				if (entry.isIntersecting) {
					if (
						video &&
						video.dataset.src &&
						!video.getAttribute("src")
					) {
						video.setAttribute("src", video.dataset.src);
						video.load();
					}
					if (video && typeof video.play === "function") {
						video.play().catch(() => {});
					}
				} else {
					if (video && typeof video.pause === "function") {
						video.pause();
					}
				}

				const iframe = container.querySelector("iframe");
				if (iframe?.src.includes("youtube.com")) {
					const command = entry.isIntersecting ? "playVideo" : "pauseVideo";
					iframe.contentWindow?.postMessage(
						JSON.stringify({
							event: "command",
							func: command,
							args: "",
						}),
						"https://www.youtube.com",
					);
				}
			}
		},
		{ threshold: THRESHOLD },
	);

	base.querySelectorAll(SELECTOR).forEach((el) => {
		if (!(el instanceof HTMLElement)) return;
		if (el.hasAttribute(ATTR)) return;
		el.setAttribute(ATTR, "1");
		observer.observe(el);
	});

	return {
		disconnect: () => {
			observer.disconnect();
			base.querySelectorAll(`[${ATTR}]`).forEach((e) => {
				e.removeAttribute(ATTR);
			});
		},
	};
}
