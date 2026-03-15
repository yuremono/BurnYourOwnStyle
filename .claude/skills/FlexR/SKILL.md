---
name: FlexR
description: |
  BYOS の FlexR コンポーネントを生成するスキル。ユーザーが「FlexR」「FlexR」「/FlexR」「比率割付」「2 分割」「2 種類コンテンツ比率」などと言った場合、または 2 種類のコンテンツを比率で配置する必要がある時に使用。
  指示形式：テキストでクラス名（Flex55, Flex46, Flex64, Flex37, Flex73, Flex28, Flex82 等）とスタイル属性を指定。
  例：`/Flex46` または `4 対 6 に分割`
argument-hint: "[Flex55 | Flex46 | Flex64 | Flex37 | Flex73 | Flex28 | Flex82]"
allowed-tools: Read, Glob, Grep, Write, Edit
component-variants: true
variant-naming: "{Base}{N}{Sub}"
new-component-triggers: "new, 新規, 新き, 別バージョン, 別の, 新たに, 新しく"
---

# FlexR コンポーネント

このスキルは BYOS の FlexR コンポーネントを生成・実装します。

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
  - ユーザーが明示的に「新規コンポーネント」「別バージョン」「FlexR2」等を指定した場合のみ作成
  - デフォルトは既存コンポーネントを再利用

## コンポーネント分岐ルール

### 分岐条件
- 同じ Unit だがデザインが大きく異なる
- Tailwind 装飾がコンポーネント内に含まれる必要がある

### 命名規則
- 親: `{Unit}{N}` 例: `FlexR2`
- 子: `{Unit}{N}{Sub}` 例: `FlexR2Image`, `FlexR2Body`
- N は 1 桁の連番（2〜9）

### 判断方法
ユーザーが以下を指定した場合のみ新規作成：
- `new` 引数: `/FlexR new`
- 明示的な番号: `/FlexR2`
- トリガーワード: 「新規コンポーネント」「別バージョン」「別の」「新たに」「新しく」

## 基本構造

```jsx
<FlexR className="{{ratio_class}}" style={{} as React.CSSProperties}>
  <FlexRImage image="/images/path.png" />
  <div>
    <h3>タイトル</h3>
    <p>本文</p>
  </div>
</FlexR>
```

## 引数の指定方法

ユーザーから渡された引数 `$ARGUMENTS` を解析して、適切に変換します。

```
引数例：`/Flex46`
```

### クラス一覧（比率を表すクラス名）

| クラス | 左：右比率 | 説明 |
|--------|-----------|------|
| `.Flex55` | 50%:50% | 等分 |
| `.Flex46` | 40%:60% | 画像 4 割、本文 6 割 |
| `.Flex64` | 60%:40% | 画像 6 割、本文 4 割 |
| `.Flex37` | 30%:70% | 画像 3 割、本文 7 割 |
| `.Flex73` | 70%:30% | 画像 7 割、本文 3 割 |
| `.Flex28` | 20%:80% | 画像 2 割、本文 8 割 |
| `.Flex82` | 80%:20% | 画像 8 割、本文 2 割 |

## 実装ワークフロー

1. **ユーザー指示を解析**
   - `$ARGUMENTS` から比率クラスを抽出（Flex55, Flex46 等）
   - 省略された引数はデフォルト値で補完する
   - 不明・矛盾がある場合は実装前にユーザーに確認する

2. **既存コンポーネントの確認**
   - `src/components/FlexR.tsx` の既存コンポーネントを確認
   - **存在する場合**：そこを利用する

3. **クラスを構築**
   ```jsx
   <FlexR className="{{ratio_class}}" style={{} as React.CSSProperties}>
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

## 実装例：40% 画像・60% 本文（Flex46）

**ユーザー指示**:
```
Flex46
```

**引数解析**:
- クラス：`Flex46`

**生成 JSX**:
```jsx
<FlexR className="Flex46" style={{} as React.CSSProperties}>
  <FlexRImage image="/images/960x480.png" />
  <div>
    <h3 className="font-bold mb-2">Flex46</h3>
    <p>画像 4 割、本文 6 割で配置</p>
  </div>
</FlexR>
```

## 実装例：60% 画像・40% 本文（Flex64）

**ユーザー指示**:
```
Flex64
```

**引数解析**:
- クラス：`Flex64`

**生成 JSX**:
```jsx
<FlexR className="Flex64" style={{} as React.CSSProperties}>
  <FlexRImage image="https://picsum.photos/600/400" />
  <div>
    <h3 className="font-bold mb-2">Flex64</h3>
    <p>画像 6 割、本文 4 割で配置</p>
  </div>
</FlexR>
```

## React コンポーネント構造

### FlexR コンポーネント（`src/components/FlexR.tsx`）

```tsx
interface FlexRProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const FlexR = ({ className = "", style, children }: FlexRProps) => {
  return (
    <div className={`FlexR ${className}`} style={style}>
      {children}
    </div>
  )
}

interface FlexRImageProps {
  image?: string
  className?: string
}

const FlexRImage = ({ image, className = "" }: FlexRImageProps) => {
  return (
    <figure className={className}>
      {image && <img src={image} alt=""/>}
    </figure>
  )
}

export { FlexR, FlexRImage }
```

**props の説明**:
- `FlexR`:
  - `className`: 比率クラス（Flex55, Flex46, Flex64 等）
  - `style`: シリアル化可能なスタイルオブジェクト（`React.CSSProperties`）
  - `children`: 2 要素（FlexRImage と div の順序）
- `FlexRImage`:
  - `image`: 画像のパス
  - `className`: 追加する CSS クラス（省略可能）

## クラス構造の詳細

```scss
.FlexR {
  display: flex;
  gap: var(--gap);

  @include where {
    // --- 基本設定 ---
    figure {
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

    // --- 比率クラス ---
    // Flex55: 等分（50%:50%）
    &.Flex55 {
      --few: 50%;
    }

    // Flex46: 40%:60%
    &.Flex46 {
      --few: calc((100% - var(--gap)) / 2.5);
    }

    // Flex64: 60%:40%
    &.Flex64 {
      --few: calc((100% - var(--gap)) * 0.6);
    }

    // Flex37: 30%:70%
    &.Flex37 {
      --few: calc((100% - var(--gap)) / 3.33);
    }

    // Flex73: 70%:30%
    &.Flex73 {
      --few: calc((100% - var(--gap)) * 0.7);
    }

    // Flex28: 20%:80%
    &.Flex28 {
      --few: calc((100% - var(--gap)) / 5);
    }

    // Flex82: 80%:20%
    &.Flex82 {
      --few: calc((100% - var(--gap)) * 0.8);
    }

    // 各要素の幅を計算
    > *:first-child {
      width: var(--few);
    }
  }
}
```

## レスポンシブ挙動

- **PC（>768px）**: 指定の比率で 2 分割表示
- **スマートフォン（≤640px）**:
  - 自動で 1 列に折り返される（figure が上、div が下）

## 変数

- `--few`: 第一要素（figure）の幅（自動計算）
- `--gap`: 要素間のギャップ

## 設計思想

1. **2 種類コンテンツの比率制御**
   - figure（画像）と div（テキスト）の比率をクラス名で指定
   - Flex46 = 画像 4 割、本文 6 割

2. **すべて round された見た目**
   - 実際には--gap を大きい要素から差し引く
   - Flex55 は等分

3. **細かい調整は--few で上書き**
   - 25% など細かい調整は近いクラスを選び--few を上書き可能

4. **シンプル API**
   - クラス名で比率を指定するだけ
