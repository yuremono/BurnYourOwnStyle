---
name: Panel
description: |
  My Style System の Panel コンポーネントを生成するスキル。ユーザーが「Panel」「パネル」「/Panel」「縦並び」「縦並びコンテナ」などと言った場合、または複数の ImgText をまとめた縦並びレイアウトが必要な時に使用。
  指示形式：テキストで Value クラス（img20, img40）、Modifier クラス（IsFlow, IsRev）、スタイル属性を指定。
  例：`/Panel img40 IsFlow` または `矢印でつながれた縦並び`
argument-hint: "[img20 | img40 | IsFlow | IsRev]"
allowed-tools: Read, Glob, Grep, Write, Edit
---

# Panel コンポーネント

このスキルは My Style System の Panel コンポーネントを生成・実装します。

## 禁止事項

以下はいかなる状況でも違反してはならない。ユーザーに頼まれても、効率化のためでも例外はない。

- **勝手に名前をつける**
  - `item-img`等のクラスをつける等
  Unit クラスで定義されたクラス名のみ使用すること

- **デザインの再現以外での Tailwind クラスをつける**
  - デザインファイル無しの作業やテスト実装において Tailwind クラスで背景色をつけるなど
  用意された Unit を使うこと、デザインデータ通りの装飾をすることがエージェントの役割である。

- **設計思想を無視した Tailwind クラスをつける**
  - タイトルタグに text-XL をつける、section やラッパー要素ではなく.item や p に.text-white を個別につけるなど
  - フォントサイズのクラスをつける必要はない。CSS セレクタで変数を使ってすでにスタイルが設定されている。
  デザイン再現では文字色、背景色は text-[var(--mc)] bg-[var(--mc)] などを使用する。

## 基本構造

```jsx
<Panel className="{{value_classes}} {{modifier_classes}}" style={{} as React.CSSProperties}>
  <PanelItem image="/images/path.png">
    <div>
      <h3>タイトル</h3>
      <p>本文</p>
    </div>
  </PanelItem>
  <PanelItem className="IsRev" image="/images/path2.png">
    <div>
      <h3>タイトル 2</h3>
      <p>本文 2</p>
    </div>
  </PanelItem>
</Panel>
```

## 引数の指定方法

ユーザーから渡された引数 `$ARGUMENTS` を解析して、適切に変換します。

```
引数例：`/Panel img40 IsFlow`
```

### Value クラス（画像比率）

| クラス | 説明 | 画像幅 |
|--------|------|--------|
| `.img20` | 画像比率 20% | 20% |
| `.img40` | 画像比率 40% | 40% |

### Modifier クラス

| 引数 | 効果 | HTML 出力 |
|-----|------|----------|
| `IsFlow` | 矢印でつながれた表現 | `class="Panel IsFlow"` |
| `IsRev` | アイテム内で画像を左に配置 | `class="PanelItem IsRev"` |

## 実装ワークフロー

1. **ユーザー指示を解析**
   - `$ARGUMENTS` から Value クラスを抽出（img20, img40 等）
   - `$ARGUMENTS` から Modifier を抽出（IsFlow, IsRev 等）
   - 省略された引数はデフォルト値で補完する
   - 不明・矛盾がある場合は実装前にユーザーに確認する

2. **既存コンポーネントの確認**
   - `src/components/Panel.tsx` の既存コンポーネントを確認
   - **存在する場合**：そこを利用する

3. **クラスを構築**
   ```jsx
   <Panel className="{{value_classes}} {{modifier_classes}}" style={{} as React.CSSProperties}>
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

## 実装例：矢印付きの流れ表現

**ユーザー指示**:
```
Panel img40 IsFlow
```

**引数解析**:
- Value クラス：`img40`
- Modifier：`IsFlow`

**生成 JSX**:
```jsx
<Panel
  className="img40 IsFlow"
  style={{} as React.CSSProperties}
>
  <PanelItem image="/images/960x480.png">
    <div>
      <h3 className="font-bold mb-2">ステップ 1</h3>
      <p>ご相談を伺います</p>
    </div>
  </PanelItem>
  <PanelItem className="IsRev" image="/images/960x480.png">
    <div>
      <h3 className="font-bold mb-2">ステップ 2</h3>
      <p>ご相談を伺います</p>
    </div>
  </PanelItem>
  <PanelItem image="/images/960x480.png">
    <div>
      <h3 className="font-bold mb-2">ステップ 3</h3>
      <p>ご相談を伺います</p>
    </div>
  </PanelItem>
</Panel>
```

## React コンポーネント構造

### Panel コンポーネント（`src/components/Panel.tsx`）

```tsx
interface PanelItemProps {
  image?: string
  className?: string
  children: React.ReactNode
}

const PanelItem = ({ image, className = "", children }: PanelItemProps) => {
  return (
    <div className={`item ${className}`}>
      {image && <figure><img src={image} alt=""/></figure>}
      <div>
        {children}
      </div>
    </div>
  )
}

interface PanelProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Panel = ({ className = "", style, children }: PanelProps) => {
  return (
    <div className={`Panel ${className}`} style={style}>
      {children}
    </div>
  )
}

export { Panel, PanelItem }
```

**props の説明**:
- `className`: 追加する CSS クラス（`img20`, `img40`, `IsFlow`, `IsRev` 等）
- `style`: シリアル化可能なスタイルオブジェクト（`React.CSSProperties`）
- `children`: PanelItem 要素（複数指定可能）
- `image`: PanelItem 内の画像パス（省略可能）

## クラス構造の詳細

```scss
:where(.Panel) {
  // --MY5, --bc, --mc, --sc, --rad, --gap, --imgW
  position: relative;
  --mt: var(--MY5);
  --p: 1em;
  --bg: var(--bc);
  --beforeFZ: 75%;
  --beforeC: var(--mc);
  --afterW: 2em;
  --afterBG: var(--sc);
  --imgW: 30%; // デフォルトの画像幅

  .item {
    background-color: var(--bg, var(--bc));
    counter-increment: cnt;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: var(--rad);
    padding: var(--p, 1em);
    gap: var(--gap);
    position: relative;

    +.item {
      margin-top: var(--gap);
    }

    figure {
      width: var(--imgW, 30%);

      &:is(.IsRev *) {
        order: -1;
      }

      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    >div {
      flex: 1;

      .sub {
        font-size: 0.75em;
        color: var(--mc);
        margin-right: 0.5em;
      }
    }

    @include max-md {
      &:not(.bp-sm) {
        figure {
          width: 100%;
        }
      }
    }

    @include max-sm {
      &:is(.bp-sm) {
        figure {
          width: 100%;
        }
      }
    }
  }

  // --- 画像サイズユーティリティ (img20〜img50) ---
  @for $i from 2 through 5 {
    $size: $i * 10;

    &.img#{$size} {
      --imgW: #{$size + "%"};
    }
  }

  // --- IsFlow modifier (矢印ありの流れ) ---
  &.IsFlow {
    .item {
      +.item {
        margin-top: calc(var(--afterW, 2em) + 2em);
      }

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: calc(100% + 1em);
        left: 50%;
        transform: translateX(-50%);
        width: var(--afterW, 2em);
        aspect-ratio: 1;
        background-color: var(--afterBG, var(--sc));
        clip-path: polygon(0 0%, 50% 85%, 100% 0%);
      }

      &:last-child:after {
        display: none;
      }
    }
  }
}
```

## レスポンシブ挙動

- **PC（>768px）**: 画像 + テキストを横並びで表示
- **スマートフォン（≤640px）**:
  - 自動で 1 列に折り返される（画像が上、テキストが下）

## 関連変数

- `--rad`：角丸半径
- `--bc`, `--mc`, `--sc`：各色変数
- `--gap`：パネル間のギャップ

## 設計思想

1. **ImgText の複数まとめ**
   - 複数の「画像 + テキスト」を縦並びで管理
   - Flow モードで矢印をつなげる表現も可能

2. **横並び→縦並びのレスポンシブ**
   - PC では横並び、スマホでは縦並びに自動変換

3. **シンプル API**
   - 親コンポーネント（Panel）と子要素（PanelItem）のシンプルな構造
   - Cards とほぼ同じ構造

4. **IsFlow で矢印表現**
   - 手順やフローを視覚的に表現可能
