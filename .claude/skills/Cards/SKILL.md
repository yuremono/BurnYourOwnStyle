---
name: Cards
description:
    BYOS の Cards コンポーネントを生成するスキル。card の集合体 UI 要素が必要な時に使用。
    指示形式：テキストでModifierクラス（col3, IsLayer, col4 など）と変数（--gap 20px, --wid 1200px など）を指定。
    例：`/Cards col3 --gap 20px` または `3 カラムでギャップ 20px`
argument-hint: "[col3 | col4 | IsGrow | IsFix | [IsLayer] | img20 | img30 | img40 | img60]"
allowed-tools: Read, Glob, Grep, Write, Edit
component-variants: true
variant-naming: "{Base}{N}{Sub}"
new-component-triggers: "new, 新規, 新き, 別バージョン, 別の, 新たに, 新しく"
---

# Cards

このスキルは BYOS の Cards コンポーネントを生成・実装します。

## 前提

このスキルを実行する前に以下を読むこと：

- @STYLE.md
- @UNIT.md

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
      デザイン再現では文字色、背景色は text-[var(--MC)] bg-[var(--MC)] などを使用する。

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

- 明示的な番号: `Cards2`
- トリガーワード: 「新規コンポーネント」「別バージョン」「別の」「新たに」「新しく」

## 基本構造

```jsx
<Cards className="{{modifier_classes}}" style={{} as React.CSSProperties}>
  <CardsItem image="/images/960x480.png">
    <h3>カード 1</h3>
    <p>説明文</p>
  </CardsItem>
  </Cards>
  <CardsItem>...</CardsItem>
</Cards>
```

## 引数の指定方法

ユーザーから渡された引数 `$ARGUMENTS` を解析して、適切に変換します。

```
引数例：`/Cards col3 IsGrow`
```

### Modifier・Value クラス

クラス名に追加する修飾語：

| 引数      | 効果                                    | HTML 出力                    |
| --------- | --------------------------------------- | ---------------------------- |
| `col3`    | 3 カラム                                | `class="Cards col3"`         |
| `col4`    | 4 カラム                                | `class="Cards col4"`         |
| `IsFix`   | 固定幅（var(--cardW) 指定）             | `class="Cards IsFix"`        |
| `IsGrow`  | 伸縮 (flex:1)                           | `class="Cards IsGrow"`       |
| `IsLayer` | 画像とテキストを重ねる（grid-aria:1/1） | `class="Cards col2 IsLayer"` |

### CardsItem props

| props   | 説明                   |
| ------- | ---------------------- |
| `image` | 画像のパス（省略可能） |

## 実装手順

1. **ユーザー指示を解析**
    - `$ARGUMENTS` からValueクラスを抽出
    - `$ARGUMENTS` からModifierクラス抽出
    - `$ARGUMENTS` から変数を抽出
    - 既存のコンポーネントの有無
    - デザインファイルの指定の有無

2. **既存コンポーネントの確認**
    - `src/components/Cards.tsx` などの既存コンポーネントを確認
    - **存在しない場合**：新しく作成する
    - **存在する場合**：それを利用する

3. **マークアップする**

**前後のセクションを参考にしないこと**

    ```jsx
    <Cards className="Cards col3 IsLayer"style={{} as React.CSSProperties}> ...
    ```

**デザインがない場合ここで終了**
### 出力前チェック
- [ ] 指示にない変数指定がないか
- [ ] 指示にないTailwindクラスを付けていないか  
- [ ] 透明度・色など独自判断をしていないか

4. **デザインファイルを確認**

- designs/{ファイル名}.pen
- 指定レイヤーのデザインを視覚的に確認する。
- フォントサイズの殆どは `define` スキルにより変数定義されるため**Tailwind クラス不要**
- 色の殆どは`define` スキルにより変数定義されるため**変数を含む Tailwind クラスを使用**
- 色、余白、初期値以外のフォントサイズ、必要なら座標を取得する。

5. **Tailwind で装飾**

- DOM 出力とデザインの見た目が一致しない場合は`define`スキルが未実行の可能性が高い。ユーザーに確認すること。

7. (オプション：ユーザーの指示があった時) agent-browser で表示確認を行う

- ブラウザのスクリーンショットを撮影
- .pen/レイヤーとスクリーンショットを比較
- 一致していなければ Tailwind クラスを書き換える
- Tailwind クラスで再現不可能であればユーザーに報告する

---

## React コンポーネント構造

### Cards コンポーネント（`src/components/Cards.tsx`）

```tsx
interface CardsProps {
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

const Cards = ({ className = "", style, children }: CardsProps) => {
	return (
		<div className={`Cards ${className}`} style={style}>
			{children}
		</div>
	);
};

interface CardsItemProps {
	image?: string;
	className?: string;
	children: React.ReactNode;
}

const CardsItem = ({ image, className = "", children }: CardsItemProps) => {
	return (
		<div className={`item  ${className}`}>
			{image && (
				<figure>
					<img src={image} alt="" />
				</figure>
			)}
			<div className="">{children}</div>
		</div>
	);
};

export { Cards, CardsItem };
```

**props の説明**:

- `className`: 追加する CSS クラス（`col3`, `col4`, `IsLayer` 等）
- `children`: CardsItem 要素（複数指定可能）
- `image`: CardsItem 内の画像パス（省略可能）
- `style`: シリアル化可能なスタイルオブジェクト（`React.CSSProperties`）**指定がなければ空で記述する**

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

 ## クラス定義ファイル

 `src/scss/_03UNIT.scss`


