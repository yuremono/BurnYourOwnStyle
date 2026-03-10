---
name: Cards
description: |
  My Style System の Cards コンポーネントを生成するスキル。ユーザーが「Cards」「Cards」「/Cards」「カードセクション」「カードグリッド」「カードレイアウト」「3 カラム」などと言った場合、または.card の集合体 UI 要素が必要な時に使用。
  指示形式：テキストでモディファイアクラス（col3, IsLayer, col4 など）と変数（--gap 20px, --wid 1200px など）を指定。
  例：`/Cards col3 --gap 20px` または `3 カラムでギャップ 20px`
argument-hint: "[col3 | col4 | IsGrow | IsFix | [IsLayer] "
allowed-tools: Read, Glob, Grep, Write, Edit
---

# Cards コンポーネント

このスキルは My Style System の Cards コンポーネントを生成・実装します。

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

```scss
:where(.Cards) {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);

    .item {
        width: var(--itemW);
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin-top: unset;

        img {
            width: 100%;
        }
    }
}
```

## 引数の指定方法

ユーザーから渡された引数 `$ARGUMENTS` を解析して、適切に変換します。

```
引数例：`/Cards col3 --gap 20px`
```

### モディファイア（第 1 引数）

クラス名に追加する修飾語：

| 引数 | 効果 | HTML 出力 |
|-----|------|----------|
| `col3` | 3 カラム | `class="Cards col3"` |
| `col4` | 4 カラム | `class="Cards col4"` |
| `IsFix` | 固定幅（var(--cardW) 指定） | `class="Cards IsFix"` |
| `IsGrow` | 伸縮 (flex:1) | `class="Cards IsGrow"` |
| `IsLayer` | 画像とテキストを重ねる（grid-aria:1/1） | `class="Cards col2 IsLayer"` |

## 実装ワークフロー

1. **ユーザー指示を解析**
   - `$ARGUMENTS` からモディファイアを抽出
   - `$ARGUMENTS` から変数値を抽出
   - 省略された引数はデフォルト値で補完する
   - 不明・矛盾がある場合は実装前にユーザーに確認する
   - 既存のコンポーネントがあれば利用する

2. **既存コンポーネントの確認**
   - `preview/src/components/Cards.tsx`などの既存コンポーネントを確認
   - **存在しない場合**：新しく作成する（??? 行目を参照）
   - **存在する場合**：そこを利用する（??? 行目を参照）

3. **クラスを構築**
   ```html
   <div class="Cards {{modifier_classes}}">
   ```

4. **Modifier, Value,変数を適用**
   ```html
   <div class="Cards col3 IsLayer" >
   ```

5. **デザインファイルを確認**
  - designs/{ファイル名}.pen
  - 指定レイヤーのデザインを視覚的に確認する
  - ファイルが存在しない場合はスキップする
  - フォントサイズの殆どは `difine` スキルにより変数定義されるため**Tailwind クラス不要**
  - 色の殆どは`difine` スキルにより変数定義されるため**変数を含む Tailwind クラスを使用**
  - カード型レイアウトとかけ離れていた場合は作業をストップしユーザーに確認する。
  - 色、余白、初期値以外のフォントサイズ、必要なら座標を取得する。

6. **Tailwind で装飾**

  - DOM 出力とデザインの見た目が一致しない場合は`difine`スキルが未実行の可能性が高い。ユーザーに確認すること。

7. (オプション：ユーザーの指示があった時) agent-browser で表示確認を行う
  - ブラウザのスクリーンショットを撮影
  - .pen/レイヤーとスクリーンショットを比較
  - 一致していなければ Tailwind クラスを書き換える
  - Tailwind クラスで再現不可能であればユーザーに報告する

## 実装例：基本の 3 カラム

**注意点**:
- `h3`、`p` にはフォントサイズのクラスをつけない。CSS セレクタで変数を使ってすでにスタイルが設定されている。
- `<img>` 要素にもクラス不要。`.Cards .item img` で `width: 100%` が設定済み。

**ユーザー指示**:
```
カーズユニットコルスリーパブリックイメージーズの 3 対 2 の画像を仮置きして
```

**引数解析**:
- モディファイア：`col3`

**生成 HTML**:
```html
<div class="Cards col3">
  <div class="item">
    <figure>
      <img alt="" src="/images/960x640.png" />
    </figure>
    <div>
      <h3>タイトル 1</h3>
      <p>説明文</p>
    </div>
  </div>
  <div class="item">...</div>
  <div class="item">...</div>
</div>
```

---

## 実装例：4 カラムレイヤーモード

**ユーザー指示**:
```
Cards col4 IsLayer
```

**引数解析**:
- モディファイア：`col4`、`IsLayer`

**生成 HTML**:
```html
<div class="Cards col4 IsLayer">
  <div class="item">
    <figure>
      <img alt="" src="https://picsum.photos/400/400" />
    </figure>
    <div>
      <h3>タイトル 1</h3>
      <p>説明文 1</p>
    </div>
  </div>
  ...
</div>
```

---

## 実装例：React コンポーネント

### A. 新規に Cards、Item コンポーネントを作成する場合

**ユーザー指示**:
```
カードユニット React コンポーネント作成
```

**生成 JSX**（ファイル：`preview/src/components/Cards.tsx`）:
```jsx
interface CardsProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Cards = ({ className = "", style, children }: CardsProps) => {
  return (
    <div className={`Cards ${className}`} style={style}>
      {children}
    </div>
  )
}

interface ItemProps {
  image?: string
  className?: string
  children: React.ReactNode
}

const Item = ({ image, className = "", children }: ItemProps) => {
  return (
    <div className={`item gap-0 ${className}`}>
      {image && <figure><img src={image} alt=""/></figure>}
      <div className="p-4 rounded-lg shadow-lg flex-1">
        {children}
      </div>
    </div>
  )
}

export { Cards, Item }
```

### B. 既存の Cards、Item コンポーネントを利用する場合

**生成 JSX**:
```jsx
<Cards className="col4 IsLayer" style={{ } as React.CSSProperties}>
  <Item image="https://picsum.photos/400/400">
    <div>
      <h3>タイトル 1</h3>
      <p>説明文 1</p>
    </div>
  </Item>
  ...
</Cards>
```

---

## 変数指定の詳細

### 標準的な指定方法

```
カードでコルサン ギャップ 20 ピクセル 幅 1200 ピクセル
```

→ `$ARGUMENTS` = `col3 --gap:20px --wid:1200px`

### パース処理

```
1. 第 1 要素 -> モディファイア（col3 等）
2. --gap XXXX -> CSS 変数
3. --wid XXXX -> CSS 変数
```

## クラス構造の詳細

```scss
.Cards {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap, 30px);

  @include where {
    // --- アイテム基本設定 (デフォルト：1 列 / Flex) ---
    .item {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin-top: unset;

      img {
        width: 100%;
      }
    }

    // --- モディファイア：レイヤー重ね合わせ (IsLayer) ---
    &.IsLayer {
      .item {
        display: grid;

        >* {
          grid-area: 1/1;
          z-index: 1;
        }

        figure {
          width: 100%;
          height: 100%;
          margin: 0;

          img {
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    // --- モディファイア：スマホ 2 列 (min2) ---
    &.IsGrow {
      .item {
        flex: 1;
        width: auto;
      }
    }

    // 固定幅
    &.IsFix {
      --itemW: 240px;

      .item {
        width: var(--itemW, 240px);
      }
    }

    // デフォルト（PC）: 指定カラム数
    @for $i from 1 through 6 {
      &.col#{$i} {
        --itemW: calc((100% - (var(--gap, 30px) * #{$i - 1})) / #{$i});

        .item {
          width: var(--itemW);
        }
      }
    }
  }
}
```

## レスポンシブ挙動

- **PC（>768px）**: 指定カラム数で表示（デフォルト：auto）
- **スマートフォン（≤640px）**:
  - デフォルト：1 列
  - `.min2` あり：2 列

## 設計思想

1. **カードの集合体として設計**
   - 単一カードではなく、複数カードをグループ化するコンポーネント
   - `.item` クラスが個々のカードを構成

2. **Flex レイアウト**
   - Value クラスで動的に幅を計算
