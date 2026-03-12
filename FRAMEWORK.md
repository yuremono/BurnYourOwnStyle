# BurnYourOwnStyle - 各フレームワーク向け設定ガイド

## 本ガイドの目的

Unitクラス が、**Tailwind CSS の utility クラスよりも先に適用される**ように、各フレームワークで適切に設定する手順を記載します。

## 基本原理

### CSS の適用順序

```
1. Unit クラス（.Cards, .Toggle など）
2. Tailwind CSS（@tailwind base/components/utilities）
3. JSX/コンポーネント内の className（Tailwind クラス）
```

**重要なポイント：**

- **CSS 分離原則**: RatioKit.css（Unit 専用）と Tailwind CSS は**完全に分離**
- **適用順序が最優先**: `RatioKit.css`（Unit）が先に読み込まれ、Tailwind が Unit を上書き可能
- **@tailwind はフレームワーク固有**: RatioKit.css には記述せず、各フレームワークの設定内で追加

### 各フレームワークでの CSS 読み込み方法

| フレームワーク | RatioKit.css | Tailwind CSS | 適用順序 |
|--------------|--------------|--------------|----------|
| **Vite + React** | `RatioKit.css` を `<link>` | `postcss.config.js` で処理 | Link → Tailwind |
| **Vite + Vue** | `RatioKit.css` を `<link>` | `postcss.config.js` で処理 | Link → Tailwind |
| **Astro** | `<link>` で読み込む | `<style is:global>` にて注入 | Link → Style |
| **Next.js** | `globals.css` で`@import` | `globals.css` にて注入 | @import 順に適用 |
| **Svelte** | `app.html` にて読み込み | `app.html` にて注入 | Link → Style |
| **11ty** | PostCSS でコンパイル | PostCSS で処理 | 静的 HTML に埋め込み |

---

## 共通設定

### プロジェクト構成

```
src/
├── RatioKit.css         # RatioKit.scss をコンパイルした CSS
├── main.tsx             # エントリーポイント
└── App.tsx              # アプリケーション
```

### コンパイル

```bash
npx sass ../../scss/RatioKit.scss ./src/RatioKit.css
```

### index.html 読み込み

```html
<link rel="stylesheet" href="/src/RatioKit.css" />
```

---

## フレームワーク別設定

| フレームワーク | エントリー     | CSS 読み込み | 設定ファイル                          |
| -------------- | -------------- | ------------ | ------------------------------------- |
| Vite + React   | `main.tsx`     | `<link>`     | tailwind.config.js, postcss.config.js |
| Next.js        | `layout.tsx`   | `<link>`     | tailwind.config.js，postcss.config.js |
| Astro          | `Layout.astro` | `<link>`     | astro.config.mjs, @astrojs/tailwind   |
| Vue            | `main.ts`      | `<link>`     | tailwind.config.js, postcss.config.js |
| Svelte         | `app.html`     | `<link>`     | tailwind.config.js, postcss.config.js |
| 11ty           | `base.njk`     | `<link>`     | .eleventy.js                          |

---

## Vite + React（参考）

### インストール

```bash
npm create vite@latest preview -- --template react-ts
cd preview
npm install
npm install -D tailwindcss postcss autoprefixer sass
npx tailwindcss init -p
```

### tailwind.config.js

```js
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: { extend: {} },
	plugins: [],
};
```

### postcss.config.js

```js
export default {
	plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

### index.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- Preconnect (パフォーマンス) -->
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

		<!-- SEO 基本 -->
		<meta name="description" content="ページの説明" />
		<meta name="author" content="著作者名" />
		<link rel="canonical" href="https://example.com/page" />

		<!-- Open Graph (SNS 共有) -->
		<meta property="og:title" content="ページタイトル" />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://example.com/page" />
		<meta property="og:image" content="https://example.com/ogp.png" />

		<!-- Twitter -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:site" content="@アカウント名" />

		<title>preview</title>

		<!-- フavicon -->
		<link rel="icon" type="image/x-icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

		<!-- CSS -->
		<link rel="stylesheet" href="/src/RatioKit.css" />
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>
```

### main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### App.tsx

```tsx
import { Cards, Item } from "./components/Cards";

function App() {
	return (
		<div className="wrapper ">
			<h2 className="">Unit</h2>
			<div
				className="Cards col3"
				style={{ "--gap": "30px" } as React.CSSProperties}
			>
				<Item>
					<div className="p-4 rounded">Card 1</div>
				</Item>
				<Item>
					<div className="p-4 rounded">Card 2</div>
				</Item>
				<Item>
					<div className="p-4 rounded">Card 3</div>
				</Item>
			</div>
		</div>
	);
}

export default App;
```

---

## 注意点

1. **CSS 順序**: `RatioKit.css` 内で `@tailwind` が**最後**に来ていることを確認
2. **コンパイル**: 開発前に SCSS → CSS のコンパイルを実行
3. **Tailwind 設定**: `content` パスを各フレームワークに合わせて調整
4. **PostCSS**: Tailwind 処理のため postcss.config.js の設定が必要

---

## トラブルシューティング

### Tailwind クラスが効かない

**原因**: `@tailwind` が CSS ファイルの先頭に配置されている

**解決**: `@tailwind base/components/utilities` をファイル**最後**に移動

### Source Map が表示されない

**原因**: コンパイルオプションに未設定

**解決**: `npx sass --embed-source-map ...` で再コンパイル

---

## まとめ

1. **共通構成**: `RatioKit.css`（コンパイル済み）を配置
2. **CSS 順序**: Unit → Tailwind の順
3. **index.html**: `<link>` で直接読み込み
4. **フレームワーク固有**: 設定ファイルのみ調整

これで、どのフレームワークでも Unit と Tailwind CSS が正しく連携します。
