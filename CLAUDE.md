# Burn Your Own Style プロジェクトルール

## このプロジェクトについて

Web 制作の全ての作業をエージェントに任せることを目標としたプロジェクトです。

＊Burn Your Own Styleがプロジェクト名、`project root`の4桁の数字は開始日を表す。

---

## モード

現在のモード: **DEVELOPMENT**

| モード | 動作 |
|---|---|
| DEVELOPMENT | ドキュメント整備・システム設計を行う為、ユーザー指示に柔軟に従う |
| PRODUCTION | 本番運用。ユーザー指示に従い`ワークフロー`を実行する |

---

## 設計思想

### 命名規則

| 種別 | 規則 |
|------|------|
| class name,component | **PascalCase** |
| CSS variables | **1単語 / 大文字略語** |
| `lib`・`utils` modules | **camelCase** |
| custom hooks | **camelCase**|

### 基本概念

CustomClass: `/src/scss`で定義されたプロジェクト固有のclass
CustomClass の role:
- Container : 特定のclass,tagを持つ子要素を使用する前提のコンテナ、クラスセット
- Component : 役割とスタイルがほぼ確定しているUI component
- Wrapper : 囲む事で効果がある or 子要素に影響を与える
- Effect :  js 処理や css の効果を付与する。全ての role と併用可能


### Tailwind.css との役割分担

**基本方針**CustomClass = 構造(section,Wrapper,Container)を構成、Tailwind = 装飾、微調整

**詳細は [STYLE.md](./STYLE.md) を参照**

---

## ファイル構成

```
PROJECT_ROOT/
├── .claude/skills/        # コンポーネント実装スキル
│   ├── Build/
│   │   └── SKILL.md
│   └── ...
├── designs/                 # pencil.dev デザインファイル
├── src/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   └── scss/globals.scss    # Unit を含むスタイルのエントリ（ビルドで読み込み）
├── js/                      # 参照用
├── scss/                    # 参照用（ルート直下・別系統ソース）
├── CLAUDE.md                # エージェント用プロジェクトルール
├── STYLE.md                 # 設計思想・変数設計
└── UNIT.md                  # Unit クラスリファレンス
```

---

## pencil.dev

あらかじめ用意された.penファイルを元にUIを実装する。
ユーザーの指示、`/PC`スキルにより指定されたレイヤー内データを把握する。
ファイルやレイヤー指定がない場合はUnitの基本構造を実装し、**細部の装飾は行わない。**

### ワークフロー

`/Build`スキル実行により行動する。`.claude/skills/Build/SKILL.md`を参照

---

## 基本原則

- **Read してから Write/Edit**: 初めて編集するファイルは編集する前に必ず内容を読む
- **Edit が失敗したら Write ツールで書換える** Edit ツールは LF 形式のファイルのみ対応（CRLF 形式だと編集失敗）
-  **Tailwind CSS v3** のみ（v4 系は使用しない）。詳細は [`STYLE.md`](./STYLE.md) の「Tailwind CSS のバージョン」。
- **開発サーバー**は `vite.config.ts`どおりポート **3000**
- **テスト**: `npm run test`（Vitest）。`npm run test:watch` でウォッチ。
- **CI**: `.github/workflows/ci.yml` で `lint` → `test` → `build` を実行。

## Prohibitions

<important if="creating or editing files">
- Please rethink whether the user's tone suggests still in the research, consideration, or deliberation stage.
- Never decide ClassName and ComponentName autonomously — always propose and get approval first
- Never use the project name in any identifier
- Replace any username in paths with a placeholder such as `{PROJECT_ROOT}`
- Never hardcode secrets — use environment variables or config files instead
</important>

<important if="overwriting, deleting, or resetting">
- Please rethink whether the user's tone suggests still in the research, consideration, or deliberation stage.
- Do not remove comments without approval
- Do not proceed on assumption
</important>

---

## 誤変換に注意

ユーザー発言に不自然な単語や文章があったら `voice-input-patterns.md` を確認、追記すること。

## プロジェクトルールまとめ

| ドキュメント | 説明 |
|------------|------|
| [STYLE.md]| 設計思想・変数設計・基本構造 |
| [CLASS.md]| CustomClassリファレンス・詳細使用方法 |
| [`src/scss`](./src/scss) | 本リポジトリの CSS 定義（編集禁止） |