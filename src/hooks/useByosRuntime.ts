import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initByosRuntime } from "../lib/initByosRuntime";

/**
 * ルート変更時に BYOS の DOM 初期化をやり直す（同一ページ内の再マウント対策で先に disconnect）
 */
export function useByosRuntime(enabled = true) {
	const location = useLocation();

	useEffect(() => {
		if (!enabled) return;
		const { disconnect } = initByosRuntime(document);
		return disconnect;
	}, [enabled, location.pathname]);
}
