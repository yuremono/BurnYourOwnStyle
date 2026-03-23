# Burn Your Own Style プロジェクトルール

## このプロジェクトについて

Web 制作の全ての作業をエージェントに任せることを目標としたプロジェクトです。

＊Burn Your Own Styleがプロジェクト名、`current directory`の4桁の数字は開始日を表す。

---

## モード

現在のモード: **DEVELOPMENT**

| モード | 動作 |
|---|---|
| DEVELOPMENT | ドキュメント整備・システム設計のみ。ユーザー指示に従う |
| PRODUCTION | 本番運用。ユーザー指示に従い`ワークフロー`を実行する |

人間の開発者は [README.md](./README.md) の「想定するワークフロー」に従ってよい。上記の DEVELOPMENT は**エージェント向けの制約**として読む。

## Unit（ユニット）

本システム固有の概念。**CSSクラス名・スキル名・コンポーネント名を兼ねる単位**を指す。

**詳細は [UNIT.md](./UNIT.md) を参照**

---

## 設計思想

### 1. 命名規則

- クラス名・コンポーネント名はパスカルケース 例: ImgText, ToggleSummary
- 変数名は 1単語 or 大文字の略語 or キャメルケース 例： var(--wid), var(--PX)
- **ファイル名**（コンポーネント / lib / hooks / エントリの別）は [NAMING.md](./NAMING.md) を参照

### 2. Tailwind.css との役割分担

**基本方針**：Unit = レイアウトを構成、Tailwind = 装飾、微調整

**詳細は [STYLE.md](./STYLE.md) を参照**

---

## ファイル構成

```
PROJECT_ROOT/
├── .claude/skills/        # コンポーネント実装スキル
│   ├── Cards/
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

あらかじめ用意された.penファイルを元にUnitを実装する。
ユーザーの指示、Unitスキルにより指定されたレイヤー内データを把握する。
ファイルやレイヤー指定がない場合はUnitの基本構造を実装し、**細部の装飾は行わない。**

### ワークフロー

スキル実行により行動する。詳細はUnit毎の`.claude/skills/{スキル名}/SKILL.md` に記載

1. **ユーザー指示を解析**
2. **デザインファイルを確認** (あれば)
3. **コンポーネント作成、プレヴューを構築**
4. (オプション：ユーザーの指示があった時) agent-browser で表示確認を行う

---

## 基本原則

1. **Read してから Write/Edit**: 初めて編集するファイルは編集する前に必ず内容を読む
2. **Edit が失敗したら Write ツールで書換える** Edit ツールは LF 形式のファイルのみ対応（CRLF 形式だと編集失敗）

スタック上のスタイルは **Tailwind CSS v3** のみ（v4 系は使用しない）。詳細は [`STYLE.md`](./STYLE.md) の「Tailwind CSS のバージョン」。

- **開発サーバー**は [`vite.config.ts`](./vite.config.ts) どおりポート **3000**（`verify-css.cjs` / `verify-override.cjs` も同じ URL を参照）。
- **テスト**: `npm run test`（Vitest）。`npm run test:watch` でウォッチ。
- **CI**: `.github/workflows/ci.yml` で `lint` → `test` → `build` を実行。

## 禁止事項

### 実行前チェックリスト
以下に該当する操作は実行を停止し、ユーザーに確認せよ。

- ファイルを新規作成・編集しようとしている → 調査・確認・検討段階ならストップ
- 名前（クラス名・コンポーネント名・Unit名）を自分で決めようとしている → 必ずユーザーに提案して承認を得てから進め
- ケバブケースを使おうとしている → Tailwind以外はパスカルケースを使う
- Tailwindクラスを書こうとしている → デザインデータまたはユーザーの指示が無ければ使わない
- シークレット（APIキー、パスワード、トークン）をコードに直書きしようとする → 環境変数や設定ファイルを使用しろ
- 削除・上書き・git reset系の操作をしようとしている → ユーザーがOKしたかもう一度考えろ
- ファイルを書き換え、削除しようとしている → ユーザーがOKしたかもう一度考えろ
- パスにユーザー名が含まれている → {PROJECT_ROOT}等のプレースホルダーに置き換えよ
- コメントを消そうとしている → ユーザーがOKしたかもう一度考えろ

---

## 誤変換に注意

ユーザー発言に不自然な単語や文章があったら `voice-input-patterns.md` を確認、追記すること。

## プロジェクトルールまとめ

| ドキュメント | 説明 |
|------------|------|
| [STYLE.md]| 設計思想・変数設計・基本構造 |
| [UNIT.md]| Unitクラスリファレンス・詳細使用方法 |
| [NAMING.md] | ファイル名・hooks・lib モジュールの命名 |
| [CLAUDE.md] | エージェント用プロジェクトルール |
| [/.claude/skills/{SkillName}/SKILL.md] | UNIT実装手順 |
| [`src/scss`](./src/scss) | 本リポジトリの CSS 定義（編集禁止） |

// LINK https://github.com/yuremono/BurnYourOwnStyle
