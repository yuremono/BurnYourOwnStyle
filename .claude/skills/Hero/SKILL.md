---
name: Hero
description: |
  BYOS の Hero コンポーネントを生成するスキル。ユーザーが「Hero」「ヒーロー」「メインビジュアル」「ファーストビュー」「MV」などと言った場合、または背景画像の上にコンテンツを重ねる UI 要素が必要な時に使用。
  指示形式：テキストで画像パスと変数を指定。
  例：`/Hero /images/hero-bg.jpg` または `メインビジュアル 背景画像は /images/main.jpg`
argument-hint: "[image_path] "
allowed-tools: Read, Glob, Grep, Write, Edit
component-variants: true
variant-naming: "{Base}{N}{Sub}"
new-component-triggers: "new, 新規, 新き, 別バージョン, 別の, 新たに, 新しく"
---

# Hero コンポーネント

このスキルは BYOS の Hero コンポーネントを生成・実装します。

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
  - ユーザーが明示的に「新規コンポーネント」「別バージョン」「Cards2」等を指定した場合のみ作成
  - デフォルトは既存コンポーネントを再利用

## コンポーネント分岐ルール

### 分岐条件
- 同じ Unit だがデザインが大きく異なる
- Tailwind 装飾がコンポーネント内に含まれる必要がある

### 命名規則
- 親: `{Unit}{N}` 例: `Cards2`
- 子: `{Unit}{N}{Sub}` 例: `Cards2Item`, `Cards2Summary`
- N は 1 桁の連番（2〜9）

### 判断方法
ユーザーが以下を指定した場合のみ新規作成：
- `new` 引数: `/Cards new`
- 明示的な番号: `/Cards2`
- トリガーワード: 「新規コンポーネント」「別バージョン」「別の」「新たに」「新しく」

## 基本構造

```jsx
<Hero className="{{modifier_classes}}" style={{} as React.CSSProperties}>
  <HeroBack image="/images/hero-bg.jpg" />
  <HeroItem>
    <h1>メインタイトル</h1>
    <p>サブテキスト</p>
  </HeroItem>
</Hero>
```

## 引数の指定方法

ユーザーから渡された引数 `$ARGUMENTS` を解析して、適切に変換します。

```
引数例：`/Hero /images/hero-bg.jpg `
```

### HeroBack props

| props | 説明 |
|-----|------|
| `image` | 画像のパス（省略可能） |

### HeroItem props

| props | 説明 |
|-----|------|
| `children` | コンテンツ（タイトル、テキスト等） |

## 実装ワークフロー

1. **ユーザー指示を解析**
   - `$ARGUMENTS` から画像パスを抽出
   - `$ARGUMENTS` から変数値を抽出
   - 省略された引数はデフォルト値で補完する
   - 不明・矛盾がある場合は実装前にユーザーに確認する
   - 既存のコンポーネントがあれば利用する

2. **既存コンポーネントの確認**
   - `src/components/Hero.tsx` などの既存コンポーネントを確認
   - **存在しない場合**：新しく作成する
   - **存在する場合**：そこを利用する

3. **クラスを構築**
   ```jsx
   <Hero className="{{modifier_classes}}" style={{} as React.CSSProperties}>
   ```

4. **背景画像とコンテンツを配置**
   ```jsx
   <Hero className="Hero" style={{} as React.CSSProperties}>
     <HeroBack image="/images/hero-bg.jpg" />
     <HeroItem>
       <h1>タイトル</h1>
     </HeroItem>
   </Hero>
   ```

5. **デザインファイルを確認**
  - designs/{ファイル名}.pen
  - 指定レイヤーのデザインを視覚的に確認する
  - ファイルが存在しない場合はスキップする
  - フォントサイズの殆どは `define` スキルにより変数定義されるため**Tailwind クラス不要**
  - 色の殆どは`define` スキルにより変数定義されるため**変数を含む Tailwind クラスを使用**

6. **Tailwind で装飾**

  - DOM 出力とデザインの見た目が一致しない場合は`define`スキルが未実行の可能性が高い。ユーザーに確認すること。

7. (オプション：ユーザーの指示があった時) agent-browser で表示確認を行う
  - ブラウザのスクリーンショットを撮影
  - .pen/レイヤーとスクリーンショットを比較
  - 一致していなければ Tailwind クラスを書き換える
  - Tailwind クラスで再現不可能であればユーザーに報告する

## 実装例：基本のヒーローセクション

**ユーザー指示**:
```
Hero /images/hero-bg.jpg
```

**引数解析**:
- 画像パス：`/images/hero-bg.jpg`

**生成 JSX**:
```jsx
<Hero className="" style={{} as React.CSSProperties}>
  <HeroBack image="/images/hero-bg.jpg" />
  <HeroItem>
    <h1 className="font-bold text-[var(--wh)]">メインタイトル</h1>
    <p className="text-[var(--wh)]">サブテキスト</p>
  </HeroItem>
</Hero>
```
## React コンポーネント構造

### Hero コンポーネント（`src/components/Hero.tsx`）

```tsx
interface HeroProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Hero = ({ className = "", style, children }: HeroProps) => {
  return (
    <div className={`Hero ${className}`} style={style}>
      {children}
    </div>
  );
};

interface HeroItemProps {
  className?: string;
  children: React.ReactNode;
}

const HeroItem = ({ className = "", children }: HeroItemProps) => {
  return (
    <div className={`item ${className}`}>
      {children}
    </div>
  );
};

interface HeroBackProps {
  image?: string;
  className?: string;
}

const HeroBack = ({ image, className = "" }: HeroBackProps) => {
  return (
    <figure className={`back ${className}`}>
      {image && <img src={image} alt="" />}
    </figure>
  );
};

export { Hero, HeroItem, HeroBack };
```

**props の説明**:
- `className`: 追加する CSS クラス
- `style`: シリアル化可能なスタイルオブジェクト（`React.CSSProperties`）
- `children`: HeroBack と HeroItem 要素
- `image`: HeroBack 内の背景画像パス

## クラス構造の詳細

```scss
:where(.Hero) {
        display: grid;
        >* {
                grid-area: 1/1;
                z-index: 1;
        }
        :where(.back){
                width: 100%;
                > img{
                        width: 100%;
                        object-fit: cover;
                        @include max-md {
                                aspect-ratio: 1;
                        }
                }
        } 
        .item {
                margin-top: unset;
                align-content: center;
                padding-block: var(--PX);
                padding-inline: var(--into);
        } 
}
```

### 標準的な指定方法

```
ヒーローセクション 背景は /images/hero.jpg 
```

→ `$ARGUMENTS` = `/images/hero.jpg `

### パース処理

```
1. 画像パス -> HeroBack image prop
```

## 設計思想

1. **Grid レイヤー構造として設計**
   - 背景画像（HeroBack）とコンテンツ（HeroItem）を重ねる
   - CSS Grid の `grid-area: 1/1` で同一位置に配置

2. **関心の分離**
   - `Hero`: レイアウトコンテナ（grid 設定）
   - `HeroBack`: 背景画像専用
   - `HeroItem`: コンテンツ専用

3. **Tailwind で柔軟にカスタマイズ**
   - 高さ、余白、位置合わせは Tailwind クラスで制御
   - `min-h-screen`, `content-end`, `text-right` 等

4. **セマンティックな HTML**
   - 背景画像は装飾目的のため `figure` と `alt=""` を使用
   - コンテンツは意味を持つため `.item` 内に配置
