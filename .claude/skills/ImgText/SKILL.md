---
name: ImgText
description: |
  My Style System の ImgText コンポーネントを生成するスキル。ユーザーが「ImgText」「ImgText」「/ImgText」「画像とテキスト」「画像横並び」「image-text」などと言った場合、または画像とテキストの横並びレイアウトが必要な時に使用。
  指示形式：テキストでモディファイアクラス（IsRev など）と Value クラス（img30, img40 など）、スタイル属性を指定。
  例：`/ImgText img30 IsRev` または `画像 30% 反転`
argument-hint: "[img30 | img40 | img60 | IsRev]"
allowed-tools: Read, Glob, Grep, Write, Edit
---

# ImgText コンポーネント

このスキルは My Style System の ImgText コンポーネントを生成・実装します。

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

```html
<div class="ImgText {{modifier_classes}}" style="{} as React.CSSProperties">
  <figure>
    <img alt="" src="..." />
  </figure>
  <div>
    <h3>タイトル</h3>
    <p>説明文</p>
  </div>
</div>
```

## 引数の指定方法

ユーザーから渡された引数 `$ARGUMENTS` を解析して、適切に変換します。

```
引数例：`/ImgText img30 IsRev`
```

### Value クラス（画像比率）

`Ratiokit.scss` に細かい数値も定義済み：

| クラス | 説明 |
|--------|------|
| `.img60` | 画像幅 60% |
| `.img40` | 画像幅 40% |
| `.img30` | 画像幅 30% |
| `.img20` | 画像幅 20% |

### Modifier クラス

| 引数 | 効果 | HTML 出力 |
|-----|------|----------|
| `IsRev` | 画像を右側に配置 | `class="ImgText IsRev"` |

## 実装ワークフロー

1. **ユーザー指示を解析**
   - `$ARGUMENTS` から Value クラスを抽出（img30 等）
   - `$ARGUMENTS` から Modifier を抽出（IsRev 等）
   - 省略された引数はデフォルト値で補完する
   - 不明・矛盾がある場合は実装前にユーザーに確認する

2. **既存コンポーネントの確認**
   - `src/components/ImgText.tsx` の既存コンポーネントを確認
   - **存在する場合**：そこを利用する

3. **クラスを構築**
   ```html
   <ImgText className="{{value_classes}} {{modifier_classes}}" style={{} as React.CSSProperties}>
   ```

4. **スタイル属性の付与**
   - `style={{} as React.CSSProperties}` を付与する準備は完了
   - ただしカスタムプロパティの変更は行わない

5. **デザインファイルを確認**
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

## 実装例：基本の画像横並び（画像 30%）

**ユーザー指示**:
```
ImgText img30
```

**引数解析**:
- Value クラス：`img30`

**生成 JSX**:
```jsx
<ImgText
  className="img30"
  image="/images/960x480.png"
  style={{} as React.CSSProperties}
>
  <h3 className="font-bold mb-2">ImgText 基本使い方</h3>
  <p>
    画像とテキストを横並びで配置。
    <br />
    ImgText クラスでレイアウトを制御。
  </p>
</ImgText>
```

## 実装例：反転モード（画像を右に）

**ユーザー指示**:
```
ImgText img40 IsRev
```

**引数解析**:
- Value クラス：`img40`
- Modifier：`IsRev`

**生成 JSX**:
```jsx
<ImgText
  className="img40 IsRev"
  image="/images/960x480.png"
  style={{} as React.CSSProperties}
>
  <h3 className="font-bold mb-2">ImgText 基本使い方</h3>
  <p>
    画像とテキストを横並びで配置。
    <br />
    ImgText クラスでレイアウトを制御。
  </p>
</ImgText>
```

## React コンポーネント構造

### ImgText コンポーネント（`src/components/ImgText.tsx`）

```tsx
interface ImgTextProps {
  image?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const ImgText = ({ image, className = "", style, children }: ImgTextProps) => {
  return (
    <div className={`ImgText ${className}`} style={style}>
        {image && <figure><img src={image} alt=""/></figure>}
        <div className="">
        {children}
        </div>
    </div>
  )
}

export { ImgText }
```

**props の説明**:
- `image`: 画像のパス（省略可能）
- `className`: 追加する CSS クラス（`img30`, `img40`, `IsRev` 等）
  - `img20`（画像 20%）, `img30`（画像 30%）, `img40`（画像 40%）, `img60`（画像 60%）
  - `IsRev`：画像を右側に配置（反転）
- `style`: シリアル化可能なスタイルオブジェクト（`React.CSSProperties`）
- `children`: テキストコンテンツ（`h3`, `p` 等）

## クラス構造の詳細

```scss
.ImgText {
  display: flex;
  gap: var(--gap, 30px);

  @include where {
    // --- 基本設定 ---
    figure {
      width: var(--imgW, 30%);
      margin: 0;
      flex-shrink: 0;

      img {
        width: 100%;
        height: auto;
      }
    }

    > div {
      flex: 1;
      margin-top: unset;
    }

    // --- モディファイア：反転（画像を右に） ---
    &.IsRev {
      flex-direction: rtl;

      figure {
        margin-left: auto;
      }

      > div {
        margin-right: auto;
      }
    }
  }
}
```

## レスポンシブ挙動

- **PC（>768px）**: 指定の画像比率で横並び
- **スマートフォン（≤640px）**:
  - 自動で 1 列に折り返される
  - `.IsRev` の場合もスマホでは通常順序に戻る（flex-direction を解除）

## 設計思想

1. **画像とテキストの横並び専用**
   - 単一の画像 + テキストペアを表現する
   - 複数組み合わせたい場合は `Panel` コンポーネントを使用

2. **画像比率を固定**
   - `--imgW` 変数で画像の幅を制御
   - テキスト側は自動的に残りの幅を確保

3. **IsRev で順序を反転**
   - スマホでは自動的に通常の順序に戻る
   - レスポンシブ対応済み

4. **シンプル API**
   - 画像とテキストを一つのコンポーネントで完結
   - `Item` サブコンポーネントは不要
