---
name: Toggle
description: |
  BYOS の Toggle コンポーネントを生成するスキル。ユーザーが「Toggle」「Toggle」「/Toggle」「アコーディオン」「開閉コンテンツ」「summary details」などと言った場合、または開閉コンテンツが必要な時に使用。
  指示形式：テキストで Modifier クラス（IsQa）とスタイル属性を指定。
  例：`/Toggle IsQa` または `Q&A 形式のアコーディオン`
argument-hint: "[IsQa]"
allowed-tools: Read, Glob, Grep, Write, Edit
component-variants: true
variant-naming: "{Base}{N}{Sub}"
new-component-triggers: "new, 新規, 新き, 別バージョン, 別の, 新たに, 新しく"
---

# Toggle コンポーネント

このスキルは BYOS の Toggle コンポーネントを生成・実装します。

## 禁止事項

以下はいかなる状況でも違反してはならない。ユーザーに頼まれても、効率化のためでも例外はない。

- **勝手に名前をつける**  
  Unit クラスで定義されたクラス名のみ使用すること

- **デザインの再現以外での Tailwind クラスをつける**
  - デザインファイル無しの作業やテスト実装において Tailwind クラスで背景色をつけるなど
  用意された Unit を使うこと、デザインデータ通りの装飾をすることがエージェントの役割である。

- **設計思想を無視した Tailwind クラスをつける**
  - タイトルタグに text-XL をつける、section やラッパー要素ではなく.item や p に.text-white を個別につけるなど
  - フォントサイズのクラスをつける必要はない。CSS セレクタで変数を使ってすでにスタイルが設定されている。
  デザイン再現では文字色、背景色は text-[var(--mc)] bg-[var(--mc)] などを使用する。

- **勝手にコンポーネント分岐を作成する**
  - ユーザーが明示的に「新規コンポーネント」「別バージョン」「Toggle2」等を指定した場合のみ作成
  - デフォルトは既存コンポーネントを再利用

## コンポーネント分岐ルール

### 分岐条件
- 同じ Unit だがデザインが大きく異なる
- Tailwind 装飾がコンポーネント内に含まれる必要がある

### 命名規則
- 親: `{Unit}{N}` 例: `Toggle2`
- 子: `{Unit}{N}{Sub}` 例: `Toggle2Summary`, `Toggle2Body`
- N は 1 桁の連番（2〜9）

### 判断方法
ユーザーが以下を指定した場合のみ新規作成：
- `new` 引数: `/Toggle new`
- 明示的な番号: `/Toggle2`
- トリガーワード: 「新規コンポーネント」「別バージョン」「別の」「新たに」「新しく」

## 基本構造

```jsx
<Toggle style={{} as React.CSSProperties}>
  <ToggleSummary>見出し</ToggleSummary>
  <ToggleBody>
    <p>本文コンテンツ</p>
  </ToggleBody>
</Toggle>
```

**props の説明**:
- `className`: 追加する CSS クラス（`IsQa` 等）
- `style`: シリアル化可能なスタイルオブジェクト（`React.CSSProperties`）
- `children`: ToggleSummary, ToggleBody 要素

## 引数の指定方法

ユーザーから渡された引数 `$ARGUMENTS` を解析して、適切に変換します。

```
引数例：`/Toggle IsQa`
```

### Modifier クラス

| 引数 | 効果 | HTML 出力 |
|-----|------|----------|
| `IsQa` | Q&A の装飾付与 | `class="Toggle IsQa"` |

## 実装ワークフロー

1. **ユーザー指示を解析**
   - `$ARGUMENTS` から Modifier を抽出（IsQa 等）
   - 省略された引数はデフォルト値で補完する
   - 不明・矛盾がある場合は実装前にユーザーに確認する

2. **既存コンポーネントの確認**
   - `src/components/Toggle.tsx` の既存コンポーネントをチェック
   - **存在する場合**：そこを利用する

3. **クラスを構築**
   ```jsx
   <Toggle className="{{modifier_classes}}" style={{} as React.CSSProperties}>
   ```

4. **スタイル属性の付与**
   - `style={{} as React.CSSProperties}` を付与する準備は完了
   - ただしカスタムプロパティの変更は行わない

5. **デザインファイルの確認**
  - designs/{ファイル名}.pen
  - 指定レイヤーのデザインを視覚的に確認する
  - ファイルが存在しない場合はスキップする
  - フォントサイズの殆どは `define` スキルにより変数定義されるため**Tailwind クラス不要**
  - 色の殆どは`define` スキルにより変数定義されるため**変数を含む Tailwind クラスを使用**
  - カード型レイアウトとかけ離れていた場合は作業をストップしユーザーに確認する。
  - 色、余白、初期値以外のフォントサイズ、必要なら座標を取得する。

6. **Tailwind で装飾**
  - DOM 出力とデザインの見た目が一致しない場合は`define`スキルが未実行の可能性が高い。ユーザーに確認すること。

7. (オプション：ユーザーの指示があった時) agent-browser で表示確認を行う
  - ブラウザのスクリーンショットを撮影
  - .pen/レイヤーとスクリーンショットを比較
  - 一致していなければ Tailwind クラスを書き換える
  - Tailwind クラスで再現不可能であればユーザーに報告する

## 実装例：基本的なアコーディオン

**ユーザー指示**:
```
Toggle で開閉コンテンツを作成
```

**引数解析**:
- Modifier：なし（デフォルト）

**生成 JSX**:
```jsx
<Toggle style={{} as React.CSSProperties}>
  <ToggleSummary>基本的なアコーディオンです</ToggleSummary>
  <ToggleBody>
    <span>本文コンテンツ</span>
  </ToggleBody>
</Toggle>
```

**複数項目**:
```jsx
<>
  <Toggle style={{} as React.CSSProperties}>
    <span>項目 1 の詳細</span>
  </Toggle>
  <Toggle style={{} as React.CSSProperties}>
    <span>項目 2 の詳細</span>
  </Toggle>
  <Toggle style={{} as React.CSSProperties}>
    <span>項目 3 の詳細</span>
  </Toggle>
</>
```

## 実装例：Q&A 形式

**ユーザー指示**:
```
Toggle IsQa
```

**引数解析**:
- Modifier：`IsQa`

**生成 JSX**:
```jsx
<Toggle className="IsQa" style={{} as React.CSSProperties}>
  <ToggleSummary>Q1: これはどのような仕組みですか？</ToggleSummary>
  <ToggleBody>
    <p>A1: summary と details タグを使った開閉コンテンツです。</p>
  </ToggleBody>
</Toggle>
<Toggle className="IsQa" style={{} as React.CSSProperties}>
  <ToggleSummary>Q2: ToggleSummary は何ですか？</ToggleSummary>
  <ToggleBody>
    <p>A2: 見出し部分用のコンポーネントです</p>
  </ToggleBody>
</Toggle>
```

## React コンポーネント構造

### Toggle コンポーネント（`src/components/Toggle.tsx`）

```tsx
import { CaretDownIcon } from "@phosphor-icons/react";

interface ToggleProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Toggle = ({ className = "", style, children }: ToggleProps) => {
  return (
    <details className={`Toggle ${className}`} style={style}>
      {children}
    </details>
  );
};

interface ToggleSummaryProps {
  children: React.ReactNode;
  className?: string;
}

const ToggleSummary = ({ children, className = "" }: ToggleSummaryProps) => {
  return (
    <summary className={`ToggleSummary ${className}`}>
      {children}
      <CaretDownIcon className="ToggleIcon" />
    </summary>
  );
};

interface ToggleBodyProps {
  children?: React.ReactNode;
  className?: string;
}

const ToggleBody = ({ children, className = "" }: ToggleBodyProps) => {
  return <div className={className}>{children}</div>;
};

export { Toggle, ToggleSummary, ToggleBody };
```

### アイコンについて
- `@phosphor-icons/react` パッケージを使用（Tree Shaking 対応）
- `CaretDownIcon` が `ToggleSummary` 内に自動的に追加される
- クラス名は `ToggleIcon`（パスカルケース）

**props の説明**:
- `className`: 追加する CSS クラス（`IsQa` 等）
- `style`: シリアル化可能なスタイルオブジェクト（`React.CSSProperties`）
- `children`: ToggleSummary, ToggleBody 要素

## サブコンポーネント

### ToggleSummary
`<summary>` 要素をラップ。className で custom styling 可能。

### ToggleBody
本文コンテンツ用 `<div>` をラップ。className で custom styling 可能。

## クラス構造の詳細

```scss
.Toggle {
  summary {
    cursor: pointer;
    padding: var(--rad);
    background-color: var(--bc);
    list-style: none;
    position: relative;

    &::-webkit-details-marker {
      display: none;
    }

    // 矢印アイコン（React コンポーネント）
    .ToggleIcon {
      font-size: 1.5em;
      position: absolute;
      right: 1em;
      top: 50%;
      translate: 0 -50%;
      transition: 0.4s;
    }
  }

  // 開閉時のアイコン回転
  &[open] summary .ToggleIcon {
    scale: 1 -1;
  }

  > div {
    padding: var(--rad);
    background-color: var(--wh);
  }

  // --- Modifier: Q&A 装飾 ---
  &.IsQa {
    summary::before {
      content: "Q";
      // ... Q ラベルスタイル
    }

    > div::before {
      content: "A";
      // ... A ラベルスタイル
    }
  }
}
```

## 関連変数

- `--bc`, `--wh`：背景色（見出し、本文）
- `--mc`, `--ac`：Q/A ラベルカラー
- `--rad`：角丸半径
- `--imgW`：画像付き時の画像幅

## 設計思想

1. **summary, details 原生機能活用**
   - セマンティックな開閉コンテンツ
   - CSS で完結するための工夫が必要

2. **Phosphor Icons 採用**
   - `@phosphor-icons/react` を使用（Tree Shaking 対応）
   - CDN 方式ではなく React コンポーネント方式
   - `CaretDownIcon` が ToggleSummary に内蔵される

3. **IsQa で Q&A 装飾**
   - Q/A ラベルが付与される
   - open 時にアイコンが反転するアニメーション

4. **画像付き対応**
   - 本文内に.has_img を使って画像を埋め込める

5. **シンプル API**
   - details タグをラップするだけの単純な構造
