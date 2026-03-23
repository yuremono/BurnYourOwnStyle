import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initClientRuntime } from "../lib/initClientRuntime";

/**
 * ルート変更時に DOM 初期化をやり直す（同一ページ内の再マウント対策で先に disconnect）
 */
export function useClientRuntime(enabled = true) {
	const location = useLocation();

	useEffect(() => {
		if (!enabled) return;
		const { disconnect } = initClientRuntime(document);
		return disconnect;
	}, [enabled, location.pathname]);
}
