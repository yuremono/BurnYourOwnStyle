# My Style System - 各フレームワーク向け設定ガイド

## 本ガイドの目的

My Style System（SCSS）の CSS が、**Tailwind CSS のutility クラスよりも先に適用される**ように、各フレームワークで適切に設定する手順を記載します。

## 基本原理

### CSS の適用順序

```
1. My Style System CSS（.Cards, .Accordion など）
2. Tailwind CSS（@tailwind base/components/utilities）
3. JSX/コンポーネント内の className（Tailwind クラス）
```

**重要なポイント：**
- `@tailwind` ディレクティブは CSS ファイルの**最後**に配置
- Tailwind のクラスが My Style System を**上書きできる**ように制御

---

## 共通ファイル構成

全てのフレームワークで共通のディレクトリ構成：

```
src/
├── scss/                        # My Style System 定義
│   ├── _variables.scss          # 変数定義
│   └── _Units.scss              # MSSのcss定義
├── styles/
│   └── globals.css              # Tailwind 指令 + My Style System 読み込み
├── components/
│   ├── Cards.tsx                # Cards コンポーネント
│   └── Accordion.tsx            # Accordion コンポーネント
└── [フレークワーク依存]/        # ページ・レイアウト
```

### globals.css（共通）

```css
/* My Style System CSS */
@use '../scss/variables';
@use '../scss/Units';

/* Tailwind CSS - 最後に読み込んで、My Style System より優先、上書き */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 1. Vite + React

### インストール

```bash
npm create vite@latest myapp -- --template react-ts
cd myapp
npm install
npm install -D tailwindcss postcss autoprefixer sass
npx tailwindcss init -p
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/globals.css";`,
      },
    },
  },
})
```

### scss/_variables.scss（例）

```scss
/* globals.css を自動インポートするために、scss ファイル内で以下を使用 */
@use "../styles/globals.css";
```
```

### styles/globals.css

```css
/* ⚠️ 重要：@tailwind は必ず最後に配置 */

/* My Style System - Cards Unit */
@use '@/scss/_Cards.scss';
@use '@/scss/_Accordion.scss';

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### main.tsx

```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'  // globals.css をインポート

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### App.tsx

```tsx
import { Cards, Item } from './components/Cards'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">My Style System Preview</h1>

      {/* My Style System + Tailwind 併用 */}
      <div className="Cards col3" style={{ '--gap': '30px' } as React.CSSProperties}>
        <Item>
          <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg">
            Cards
          </div>
        </Item>
        {/* ... */}
      </div>
    </div>
  )
}

export default App
```

---

## 2. Next.js

### インストール

```bash
npx create-next-app@latest myapp --src-dir --tailwind --eslint
cd myapp
npm install -D sass
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### src/app/globals.css

```css
/* ⚠️ 重要：My Style System を最初に、@tailwind を最後に */

/* My Style System */
@use '@/scss/_Cards.scss';
@use '@/scss/_Accordion.scss';

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ROOT のレイアウト調整（Next.js デフォルト削除） */
#root {
  max-width: none;
  margin: 0;
  padding: 0;
}
```

### src/app/layout.tsx

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Style System',
  description: 'My Style System Preview',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
```

### src/app/page.tsx

```tsx
import { Cards, Item } from '@/components/Cards'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          My Style System Preview
        </h1>

        <div className="Cards col3" style={{ '--gap': '30px' } as React.CSSProperties}>
          <Item>
            <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
              <h2 className="text-2xl font-bold">Card 1</h2>
              <p className="text-blue-100">Tailwind で装飾可能</p>
            </div>
          </Item>
          <Item>
            <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg hover:bg-green-600 transition-colors">
              <h2 className="text-2xl font-bold">Card 2</h2>
              <p className="text-green-100">My Style System と併用</p>
            </div>
          </Item>
          <Item>
            <div className="bg-purple-500 text-white p-8 rounded-lg shadow-lg hover:bg-purple-600 transition-colors">
              <h2 className="text-2xl font-bold">Card 3</h2>
              <p className="text-purple-100">CSS 変数で制御</p>
            </div>
          </Item>
        </div>
      </div>
    </main>
  )
}
```

### 追加設定（.env.local）

```
NEXT_PUBLIC_APP_ROOT=/src
```

---

## 3. Astro

### インストール

```bash
npm create astro@latest myapp
cd myapp
npm install -D @astrojs/tailwind sass
```

### astro.config.mjs

```js
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,  // My Style System と競合防止
    }),
    react(),
  ],
})
```

### src/styles/globals.css

```css
/* ⚠️ 重要：@tailwind directives は最後に */

/* My Style System */
@use '../scss/_Cards.scss';
@use '../scss/_Accordion.scss';

/* Tailwind（Astro 用） */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

### src/layouts/Layout.astro

```astro
---
interface Props {
  title: string;
}

const { title } = Astrpo.props;
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/astro.svg" />
    <title>{title}</title>
    <link rel="stylesheet" href="/styles/globals.css" />
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  #root {
    margin: 0;
    padding: 0;
  }
</style>
```

### src/pages/index.astro

```astro
---
import Layout from '../layouts/Layout.astro';
import { Cards, Item } from '../components/Cards.astro';
---

<Layout title="My Style System">
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">
        My Style System Preview
      </h1>

      <div class="Cards col3" style={{ '--gap': '30px' }}>
        <Item>
          <div class="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
            <h2 class="text-2xl font-bold">Card 1</h2>
            <p class="text-blue-100">Tailwind で装飾可能</p>
          </div>
        </Item>
      </div>
    </div>
  </div>
</Layout>
```

---

## 4. Vue（Vite + Vue 3）

### インストール

```bash
npm create vue@latest myapp
cd myapp
npm install -D tailwindcss postcss autoprefixer sass
```

### tailwind.config.js

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### vite.config.ts

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/globals.css';`,
      },
    },
  },
})
```

### src/styles/globals.css

```css
/* My Style System */
@use '@/scss/_Cards.scss';
@use '@/scss/_Accordion.scss';

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/main.ts

```ts
import { createApp } from 'vue'
import './styles/globals.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### src/App.vue

```vue
<script setup lang="ts">
import { Cards, Item } from './components/Cards.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">My Style System Preview</h1>

      <div class="Cards col3" :style="{ '--gap': '30px' }">
        <Item>
          <div class="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
            <h2 class="text-2xl font-bold">Card 1</h2>
            <p class="text-blue-100">Tailwind で装飾可能</p>
          </div>
        </Item>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Vue scoped CSS は追加する場合はここに */
</style>
```

---

## 5. Svelte（Vite + Svelte 5）

### インストール

```bash
npm create svelte@latest myapp
cd myapp
npm install -D tailwindcss postcss autoprefixer sass
npx tailwindcss init -p
```

### tailwind.config.js

```js
export default {
  content: [
    './src/**/*.{svelte,js,ts,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/globals.css";`,
      },
    },
  },
})
```

### src/styles/globals.css

```css
/* My Style System */
@use '@/scss/_Cards.scss';
@use '@/scss/_Accordion.scss';

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/app.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My Style System</title>
    %sveltekit.head%
  </body>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

### src/routes/+layout.svelte

```svelte
<script lang="ts">
  import { Cards, Item } from '$lib/components/Cards.svelte';
</script>

<div class="min-h-screen bg-gray-100 p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">My Style System Preview</h1>

    <div class="Cards col3" style="--gap: 30px">
      <Item>
        <div class="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
          <h2 class="text-2xl font-bold">Card 1</h2>
          <p class="text-blue-100">Tailwind で装飾可能</p>
        </div>
      </Item>
    </div>
  </div>
</div>
```

---

## 6. 11ty（Eleventy）

### インストール

```bash
npm create @11ty/eleventy@latest myapp
cd myapp
npm install -D tailwindcss postcss autoprefixer sass
```

### .eleventy.js

```js
const sass = require('sass');

module.exports = function(eleventyConfig) {
  // SCSS 変換
  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', {
    synth: 'sass',
    compile: (inputContent, inputPath) => {
      return sass.compileString(inputContent).css;
    }
  });

  // 静的ファイルコピー
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    passthroughFileCopy: true
  };
};
```

### package.json

```json
{
  "scripts": {
    "build:scss": "sass src/scss:dist/assets/css",
    "build:tailwind": "tailwindcss -i src/styles/globals.css -o dist/assets/css/globals.css --minify",
    "build": "npm run build:scss && npm run build:tailwind && 11ty"
  },
  "devDependencies": {
    "sass": "^1.77.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19"
  }
}
```

### src/styles/globals.css

```css
/* My Style System */
@use '../scss/_Cards.scss';
@use '../scss/_Accordion.scss';

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### src/pages/index.njk

```html
---
layout: layouts/base.njk
title: My Style System
---

<div class="min-h-screen bg-gray-100 p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">My Style System Preview</h1>

    <div class="Cards col3" style="--gap: 30px">
      <div class="item">
        <div class="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
          <h2 class="text-2xl font-bold">Card 1</h2>
          <p class="text-blue-100">Tailwind で装飾可能</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### src/layouts/base.njk

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }}</title>
  <link rel="stylesheet" href="/assets/css/globals.css">
</head>
<body>
  {{ content | safe }}
</body>
</html>
```

---

## クリティカルポイント：CSS 順序の検証

### 常に確認すべきこと

1. **globals.css の最後**に `@tailwind utilities` が来ているか
2. My Style System の CSS が `@tailwind` よりも**前に**配置されているか
3. ブラウザの検証ツールで：
   - `.Cards` クラス → `scss` または `App.css` が参照される
   - Tailwind クラス（`bg-blue-500` など）→ Tailwind CSS が参照される

### 検証スクリプト

```javascript
// verify-css-order.js
const puppeteer = require('puppeteer');

async function verify() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  const cardsGap = await page.evaluate(() => {
    const el = document.querySelector('.Cards');
    return window.getComputedStyle(el).gap;
  });

  console.log('.Cards gap:', cardsGap);
  console.log(cardsGap === '30px' ? '✅ My Style System が優先' : '❌ Tailwind が優先');

  await browser.close();
}

verify();
```

---

## トラブルシューティング

### 問題 1：Tailwind クラスで My Style System　のシングルクラス を上書きできない

**原因：** `@tailwind` が CSS ファイルの先頭に配置されている

**解決：** `@tailwind` を CSS ファイルの**最後**に移動

### 問題 2：SCSS ファイルが読み込まれない

**原因：** `@use` パスが間違っている

**解決：**
- Vite/Next.js：`@import '@/scss/_Cards.scss'`
- Astro：`@import 'scss/_Cards.scss'`

### 問題 3：Tailwind クラスが効かない

**原因：** `content` 設定がファイルパスを含んでいない

**解決：** `tailwind.config.js` の `content` に正しいパスを指定

### 問題 4：ビルド後にも Tailwind が適用されない

**原因：** SCSS → CSS コンパイル後に Tailwind が再処理されていない

**解決：** 11ty の場合、ビルド順序を `scss` → `tailwind` → `11ty` に修正

---

## リファレンス

| 設定ファイル | Vite | Next.js | Astro | Vue | Svelte | 11ty |
|-------------|------|---------|-------|-----|--------|------|
| tailwind.config.js | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| postcss.config.js | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ |
| vite.config.ts | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| next.config.js | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| astro.config.mjs | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| .eleventy.js | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## まとめ

1. **共通構成**：`scss/` + `styles/globals.css` を全てのフレームワークで共有
2. **CSS 順序**：My Style System → Tailwind の順で `globals.css` を配置
3. **`@tailwind`**：常に `globals.css` の**最後**に配置
4. **フレームワーク固有**：ビルド設定のみを変更、CSS 設定は共通

これで、どのフレームワークでも My Style System と Tailwind CSS が正しく連携します。
