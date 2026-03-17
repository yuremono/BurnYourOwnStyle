# BYOS React アーキテクチャ

Burn Your Own Style プロジェクトの全体像。

---

## システム概要図

```mermaid
graph TB
    subgraph Goals[目的]
        A[個人スタイルの再利用]
        B[エージェントによる効率化]
        C[一貫性のあるUI/UX]
    end

    subgraph Core[中核システム]
        UNIT[Unitシステム]
        SKILL[スキル]
        PEN[pencil.dev]
        TW[Tailwind CSS]
    end

    subgraph Frameworks[対応フレームワーク]
        F1[Astro]
        F2[Next.js]
        F3[SvelteKit]
        F4[Vue]
        F5[Vite]
        F6[React]
    end

    UNIT --> SKILL
    UNIT --> PEN
    UNIT --> TW
    SKILL --> PEN

    A --> UNIT
    B --> SKILL
    C --> UNIT
```

---

## Unit と周辺システムの関係

```mermaid
graph LR
    subgraph Unit_System[Unitシステム]
        direction TB
        U1[ImgText]
        U2[Panel]
        U3[Cards]
        U4[Toggle]
        U5[Hero]
        U6[FlexR]
    end

    subgraph Styling[スタイリング]
        SCSS[SCSSソース]
        TW[Tailwind CSS<br/>装飾・微調整]
    end

    subgraph Design[デザイン]
        PEN[.penファイル]
    end

    subgraph Output[出力]
        HTML[HTML/Astro]
        JSX[React/JSX]
        VUE[Vue]
        SVELTE[Svelte]
    end

    PEN --> Unit_System
    Unit_System --> SCSS
    SCSS --> Output
    Unit_System --> Output
    TW --> Output

    style Unit_System fill:#e1f5fe
    style Styling fill:#fff3e0
    style Design fill:#f3e4f5
    style Output fill:#f8fff0
```

---

## ワークフロー図

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant CC as Claude Code
    participant S as スキル
    participant P as pencil.dev
    participant F as ファイル出力

    U->>CC: 指示（Unit名 + オプション）
    CC->>S: SKILL.md を参照
    S->>CC: 実装ルールを返す
    alt P 存在時
        CC->>P: デザインデータを取得
        P->>CC: レイヤー情報を返す
    end
    CC->>F: コンポーネント/スタイル生成
    alt 表示確認時
        CC->>F: プレビュー構築
        F->>U: ブラウザで確認
    end
```

---

## ディレクトリ構成

```mermaid
graph TD
    subgraph Root[プロジェクトルート]
        CLAUDE[CLAUDE.md]
        README[README.md]
        STYLE[STYLE.md]
        UNIT[UNIT.md]
        ARCH[ARCHITECTURE.md]
    end

    subgraph SCSS[scss/]
        T1[_10template.scss]
        T2[scss/globals.scss]
        T3[その他]
    end

    subgraph Skills[.claude/skills/]
        S1[Cards/]
        S2[Hero/]
        S3[ImgText/]
        S4[Panel/]
        S5[Toggle/]
        S6[FlexR/]
    end

    subgraph Design[designes/]
        D1[*.pen]
    end

    subgraph Docs[docs/]
        DOC1[partial-merge-guide.md]
    end

    Root --> SCSS
    Root --> Skills
    Root --> Design
    Root --> Docs
```

---

## Unit 一覧

| Unit | 用途 | スキル |
|------|------|--------|
| ImgText | 画像とテキストの横並び | `/ImgText` |
| Panel | 縦並びコンテナ | `/Panel` |
| Cards | カードグリッド | `/Cards` |
| Toggle | 開閉コンテンツ | `/Toggle` |
| Hero | メインビジュアル | `/Hero` |
| FlexR | 比率分割レイアウト | `/FlexR` |

---

## 役割分担

| 役割 | 担当 |
|------|------|
| レイアウト骨格 | **Unit** |
| 装飾・色・微調整 | **Tailwind CSS** |
| デザイン参照 | **pencil.dev (.pen)** |
| 実装ルール | **スキル (SKILL.md)** |
