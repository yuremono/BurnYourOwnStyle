# Unit クラスリファレンス

Burn Your Own Style システムの各 Unit クラスの使用法を記載します。

**設計思想・変数定義・基本構造については [`STYLE.md`](./STYLE.md) を参照。**

---

## Unitの命名規則

**Value クラス指定**（ex: 小文字 + 数値）：

CSS 変数に値を渡すクラス。**例外的にパスカルケースを使用しない**。

| クラス | 意味 |
|---|---|
| `.col3` `.col4` | カラム数 |
| `.img20` `.img30` | 画像比率 |

**Modifier クラス**（`Is*` 形式）：

Unit クラス毎に定義されている。

| クラス | 効果 | 使用 Unit |
|---|---|---|
| `.IsRev` | 画像の位置を反転 (右に) | ImgText |
| `.IsLayer` | 画像とテキストを重ねる | Cards |
| `.IsFlow` | パネル間に矢印 | Panel |

**ブレイクポイント制御**：
- `.bp-sm`：デフォルトのBP(Unitにより異なる)を`sm`に変更

## エージェントワークフロー

### ユーザー指示の構文
```
[対象] を [スキル名] で、[Modifier...] 、[Value...] 、[--変数=値...] 
```

| 引数 | 必須 | 例 | 説明 |
|---|---|---|---|
| スキル名 | ✅ | `Cards` `Toggle` `Panel` | `.claude/skills/` 配下のスキル名（パスカルケース） |
| デザインファイル | ⬜ | `design.pen` | 指定があれば基本継続的に参照 |
| レイヤー名 | ⬜ | `MainVisual` | 指定があったデザインファイルから探す |
| Modifier | ⬜ | `.IsRev` `.IsLayer` | 状態・モードの切り替え。`Is`+ パスカルケース。複数指定可 |
| Value クラス | ⬜ | `col3` `img30` | CSS 変数への値渡し。複数指定可 |
| CSS 変数 | ⬜ | `--gap=60px` `--wid=80%` | **指示頻度：低** 変数を style タグで上書き |

## Tailwind CSS との併用

- Unit クラスで**レイアウト骨格**
- Tailwind で**デザインを再現。装飾・色・細かいスタイル**

---

## Unit 一覧

---

### `Cards`

一般的な横並びアイテムを内包するコンテナ (2~5 列程度)

#### 基本構造

```html
<div class="Cards col3">
  <div class="item">
    <img src="..." alt="">
    <div>
      <h3>タイトル</h3>
      <p>本文</p>
    </div>
  </div>
  <!-- item を繰り返し -->
</div>
```

#### Value クラス

| クラス | 説明 |
|--------|------|
| `.col2` | 2 列表示 |
| `.col3` | 3 列表示 |
| `.col4` | 4 列表示 |

#### Modifier クラス

| クラス | 説明 | 使用例 |
|--------|------|--------|
| `.IsLayer` | 画像とテキストを重ねる | `.Cards.IsLayer.col3` |
| `.IsGrow` | スマホで自動調整（flex:1） | `.Cards.IsGrow.col3` |
| `.IsFix` | 固定幅 --itemW:???px | `.Cards.IsFix` |
| `.bp-sm` | ブレイクポイントを変更 | `.Cards.col3.bp-sm` |

---

### `Panel`

一般的な縦並びコンテナ。ImgText を複数まとめたものに近い。画像使用は任意

#### 基本構造

```html
<div class="Panel">
  <div class="item">
    <figure>
      <img src="..." alt="">
    </figure>
    <div>
      <span class="sub">見出し</span>
      <h3>タイトル</h3>
      <p>本文</p>
    </div>
  </div>
  <!-- item を繰り返し -->
</div>
```

#### Value クラス

| クラス | 説明 | 画像幅 |
|--------|------|--------|
| `.img20` | 画像比率 20% | 20% |
| `.img40` | 画像比率 40% | 40% |

#### Modifier クラス

| クラス | 説明 | 使用例 |
|--------|------|--------|
| `.IsFlow` | 矢印でつながれた表現 | `.Panel.IsFlow` |
| `.IsRev` | 画像の位置を反転（右に）。ImgText の `.IsRev` と同様 | `.Panel.item.IsRev` |

---

### `ImgText`

画像 + テキスト横並びコンテナ。画像比率を Value クラスで可変

#### 基本構造

```html
<div class="ImgText">
  <figure>
    <img src="..." alt="">
  </figure>
  <div>
    <h3>タイトル</h3>
    <p>本文</p>
  </div>
</div>
```

#### Value クラス

| クラス | 説明 |
|--------|------|
| `.img60` | 画像幅 60% |
| `.img40` | 画像幅 40% |
| `.img30` | 画像幅 30% |
| `.img20` | 画像幅 20% |
他の数値も細かく設定済み。比率・幅の定義は **`src/scss/`** を参照（プロジェクト直下の `scss/` は参照用）。

#### Modifier クラス

| クラス | 説明 | 使用例 |
|--------|------|--------|
| `.IsRev` | 画像を右側に配置 | `.ImgText.IsRev` |

---

### `Toggle`

summary,details タグを使う開閉コンテンツ。css で完結するための工夫が必要なため Unit 化

#### 基本構造

```html
<details class="Toggle">
  <summary>見出し</summary>
  <div>
    <p>本文コンテンツ</p>
  </div>
</details>
```

#### Modifier クラス

| クラス | 説明 | 使用例 |
|--------|------|--------|
| `.IsQa` | Q&A の装飾付与 | `.Toggle.IsQa` |

---

### `FlexR`

クラス名が比率を表す。2 種類のコンテンツの比率を制御するラッパー。
全て round された見た目を表し実際は--gap を大きい要素から差し引く (Flex55 は等分)。
25% など細かい調整は近いクラスを選び--few を上書きする。

#### クラス一覧

| クラス | 左：右比率 | 使用例 |
|--------|-----------|--------|
| `.Flex55` | 50%:50% | `.Flex55` |
| `.Flex46` | 40%:60% | `.Flex46` |
| `.Flex64` | 60%:40% | `.Flex64` |
| `.Flex37` | 30%:70% | `.Flex37` |
| `.Flex73` | 70%:30% | `.Flex73` |
| `.Flex28` | 20%:80% | `.Flex28` |
| `.Flex82` | 80%:20% | `.Flex82` |

#### 使用方法

**40% 画像・60% 本文（Flex46）**：
```html
<div class="Flex46">
  <figure>
    <img src="..." alt="">
  </figure>
  <div>
    <h3>タイトル</h3>
    <p>本文</p>
  </div>
</div>
```

#### 変数

- `--few`：FlexR 小さい要素側の幅。各 Flex クラスで既定値が入り、上書き可（例は README・STYLE の変数表参照）

---

### `Hero`

主に画面幅で表示する画像とテキストが重なるセクション。Grid レイヤー構造として設計され、背景画像（HeroBack）とコンテンツ（HeroItem）を重ねる。

#### 基本構造

```html
<div class="Hero">
  <figure class="back">
    <img src="..." alt="">
  </figure>
  <div class="item">
    <h1>メインタイトル</h1>
    <p>サブテキスト</p>
  </div>
</div>
```

#### React コンポーネント

```jsx
<Hero className="" style={{}}>
  <HeroBack image="/images/hero-bg.jpg" />
  <HeroItem>
    <h1>メインタイトル</h1>
    <p>サブテキスト</p>
  </HeroItem>
</Hero>
```

#### コンポーネント構成

| コンポーネント | 役割 | props |
|---------------|------|-------|
| `Hero` | レイアウトコンテナ（grid 設定） | `className`, `style`, `children` |
| `HeroBack` | 背景画像専用 | `image`, `className` |
| `HeroItem` | コンテンツ専用 | `className`, `children` |

#### Value クラス

未定

#### Modifier クラス

未定

#### 設計思想

1. **Grid レイヤー構造**: 背景画像とコンテンツを `grid-area: 1/1` で同一位置に配置
2. **関心の分離**: Hero（レイアウト）、HeroBack（背景）、HeroItem（コンテンツ）で役割を分離
3. **セマンティックな HTML**: 背景画像は装飾目的のため `figure` と `alt=""` を使用

#### レスポンシブ挙動

- **PC（>768px）**: 背景画像とコンテンツを重ねて表示
- **スマートフォン（≤640px）**: 背景画像は正方形アスペクト比に変更

---
---