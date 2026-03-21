/**
 * アセットパスの解決ユーティリティ
 */

export const getAssetPath = (path: string): string => {
	if (path.startsWith("http")) return path;
	return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
};
