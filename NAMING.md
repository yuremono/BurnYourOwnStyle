# ファイル名・識別子の命名（BYOS React）

TypeScript / React プロジェクト内の**ファイル名**と**エクスポート名**のルールをまとめる。  
Unit のクラス名・CSS は従来どおり [UNIT.md](./UNIT.md)・[STYLE.md](./STYLE.md) に従う。

---

## 1. コンポーネント（`src/components/`）

| 項目 | 規則 | 例 |
|------|------|-----|
| ファイル名 | **PascalCase**（コンポーネント名と一致） | `ImgText.tsx`, `PathDraw.tsx` |
| コンポーネント関数 | **PascalCase** | `function ImgText() {}` |
| そのファイル内の補助型・props 型 | コンポーネントに紐づくなら `XxxProps` など **PascalCase** | `ImgTextProps` |

**理由**: React の慣習で、JSX として使う識別子は PascalCase。ファイル名も一致させると import が読みやすい。

---

## 2. ページ（`src/pages/`）

| 項目 | 規則 | 例 |
|------|------|-----|
| ファイル名 | **当面は既存に合わせる**（小文字・`Preview.tsx` など混在可）。新規は **PascalCase** を推奨 | `Preview.tsx` |
| ページ用のルートコンポーネント | **PascalCase** | `function Preview() {}` |

ルート URL とファイル名の対応は `App.tsx` で決める。

---

## 3. クライアント用モジュール（`src/lib/`）

Vanilla DOM 初期化・ユーティリティ。**React コンポーネントではない**単位。

| 項目 | 規則 | 例 |
|------|------|-----|
| ファイル名 | **camelCase**（先頭小文字） | `header.ts`, `budoux.ts`, `initByosRuntime.ts` |
| 公開する関数 | **camelCase** | `initHeader`, `initByosRuntime` |

**理由**: 「関数・モジュールの束」として一般的な JS/TS の慣習に合わせる。Unit 名（`Header` など）とは別レイヤーとして区別しやすい。

---

## 4. カスタムフック（`src/hooks/`）

| 項目 | 規則 | 例 |
|------|------|-----|
| ファイル名 | **camelCase**。React の慣習どおり **`use` で始める** | `useByosRuntime.ts` |
| フック関数 | **`use` + 以降は内部語を PascalCase 連結**（慣習） | `useByosRuntime` |

**理由**: [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) とコミュニティの慣習。ファイル名は `use` 小文字始まりの **camelCase** とする。

---

## 5. エントリ・ルートだけのファイル（`src/main.tsx`, `src/App.tsx`）

| ファイル | 規則 | 理由のメモ |
|----------|------|------------|
| `App.tsx` | **PascalCase** | 中身のデフォルト export がルート **コンポーネント** `App` だから、名前とファイル名を揃える React の定番。 |
| `main.tsx` | **小文字**（エントリは慣習で lowercase） | Vite / bundler のテンプレでは `main.ts` / `index.ts` が多く、**コンポーネントではない**ブートストラップ用。 |

どちらも「一語」だが、**役割が違う**（コンポーネント vs エントリ）ので Pascal / 小文字の差が付きやすい。

---

## 6. 今後よく増えるカテゴリ（目安）

| カテゴリ | 置き場所の例 | ファイル名 |
|----------|----------------|--------------|
| 純粋関数・定数（日付、フォーマット） | `src/utils/` または `src/lib/` | **camelCase** |
| API クライアント | `src/api/` | **camelCase**（`client.ts`, `userApi.ts`） |
| 型だけ（`.d.ts` や `types.ts`） | `src/types/` | **camelCase** |
| テスト | 対象と並べる `*.test.ts` / `__tests__/` | 対象ファイル名に合わせる |
| スタイル（SCSS） | `src/scss/` | 既存ルール（アンダースコア接頭辞など） |

コンポーネントに近い **「画面ブロック」だけ切り出したがまだページではない**ものも、中身が JSX なら **PascalCase** ファイルで `components/` または `features/XXX/` に置くのが無難。

---

## 7. 一覧（ファイル名）

| 種別 | ファイル名 |
|------|------------|
| React コンポーネント | **PascalCase** |
| ページのルートコンポーネント | **PascalCase**（推奨） |
| `lib` の JS モジュール・`utils` | **camelCase** |
| カスタムフック | **camelCase**（`use` 接頭辞） |
| エントリ `main` | **小文字** `main.tsx` |

識別子（変数・関数）は従来どおり **camelCase**、型・クラス・コンポーネントは **PascalCase**（[CLAUDE.md](./CLAUDE.md) と整合）。
