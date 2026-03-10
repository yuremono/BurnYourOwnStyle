# Unit クラスリファレンス

Burn Your Own Style システムの各 Unit クラスの使用法を記載します。

**設計思想・変数定義・基本構造については [`STYLE.md`](./STYLE.md) を参照してください。**

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

---

## 命名規則

**Value クラス指定**（ex: 小文字 + 数値）：

CSS 変数に値を渡すクラス。Tailwind クラスとは別物。

| クラス | 意味 |
|---|---|
| `.col3` `.col4` | カラム数 |
| `.img20` `.img30` | 画像比率 |

**Modifier クラス**（`Is*` 形式）：

Unit クラス毎に定義されている。パスカルケースで差別化。

| クラス | 効果 | 使用 Unit |
|---|---|---|
| `.IsRev` | 画像の位置を反転 (右に) | ImgText |
| `.IsLayer` | 画像とテキストを重ねる | Cards |
| `.IsFlow` | パネル間に矢印 | Panel |

**ブレイクポイント制御**：
- `.bp-sm`：スマートフォン用挙動

## エージェントワークフロー

### ユーザー指示の構文
```
[対象] を [スキル名] で、[Modifier...] 、[Value...] 、[--変数=値...] 、[出力形式] で
```

| 引数 | 必須 | 例 | 説明 |
|---|---|---|---|
| スキル名 | ✅ | `Cards` `Accordion` `Panel` | `.claude/skills/` 配下のスキル名（パスカルケース） |
| デザインファイル | ⬜ | `design.pen` | 指定があれば基本継続的に参照 |
| レイヤー名 | ⬜ | `MainVisual` | 指定があったデザインファイルから探す |
| Modifier | ⬜ | `.IsRev` `.IsLayer` | 状態・モードの切り替え。`Is`+ パスカルケース。複数指定可 |
| Value クラス | ⬜ | `col3` `img30` | CSS 変数への値渡し。複数指定可 |
| 出力形式 | ✅初回 | `React` `Astro` `HTML` | 初回必須、またはプロジェクトのデフォルトに従う、以後継続、 |
<!-- | CSS 変数 | ⬜ | `--gap=60px` `--wid=80%` | 指示頻度：低 変数を style タグで上書き | -->

## Tailwind CSS との併用

- Unit クラスで**レイアウト骨格**
- Tailwind で**装飾・色・細かいスタイル**を上書き

```html
<div class="Cards col3 ">
  <div class="item p-4 transition-shadow">
    <!-- Tailwind で装飾 -->
  </div>
</div>
```

---

## Unit 一覧

---

### `Cards`

一般的な横並びコンテナ (2~5 列程度)

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

#### 使用方法

**3 カラムのカード**：
```html
<div class="Cards col3">
  <div class="item">...</div>
  <div class="item">...</div>
  <div class="item">...</div>
</div>
```

**レイヤーモード（画像の上にテキスト）の 2 列カード**：
```html
<div class="Cards IsLayer col2">
  <div class="item">
    <figure>
      <img src="..." alt="">
    </figure>
    <div>
      <h3>タイトル</h3>
      <p>本文</p>
    </div>
  </div>
  <!-- 繰り返し -->
</div>
```

**ブレイクポイントを変更**：
```html
<div class="Cards col3 bp-sm">
  <!-- item -->
</div>
```

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
| `.IsRev` | 画像を左に配置 | `.Panel.item.IsRev` |

#### 使用方法

**矢印付きの流れ表現**：
```html
<div class="Panel IsFlow">
  <div class="item">...</div>
  <div class="item">...</div>
  <div class="item">...</div>
</div>
```

**40% 画像でアイテムを左配置**：
```html
<div class="Panel img40">
  <div class="item IsRev">
    <figure><img src="..." alt=""></figure>
    <div><h3>タイトル</h3></div>
  </div>
</div>
```

#### 関連変数

- `--rad`：角丸半径
- `--bc`, `--mc`, `--sc`：各色変数

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
他の数値も細かく設定済み。`scss/Ratiokit.scss`

#### Modifier クラス

| クラス | 説明 | 使用例 |
|--------|------|--------|
| `.IsRev` | 画像を右側に配置 | `.ImgText.IsRev` |

#### 使用方法

**30% 画像で画像を左配置（反転なし）**：
```html
<div class="ImgText img30">
  <figure>
    <img src="..." alt="">
  </figure>
  <div>
    <h3>タイトル</h3>
    <p>本文</p>
  </div>
</div>
```

**IsRev で画像を右に配置（スマホは IsRev 無しと同じ順番）**：
```html
<div class="ImgText img40 IsRev">
  <figure>
    <img src="..." alt="">
  </figure>
  <div>
    <h3>タイトル</h3>
    <p>本文</p>
  </div>
</div>
```

---

### `Accordion`

summary,details タグを使う開閉コンテンツ。css で完結するための工夫が必要なため Unit 化

#### 基本構造

```html
<details class="Accordion">
  <summary>見出し</summary>
  <div>
    <p>本文コンテンツ</p>
  </div>
</details>
```

#### Modifier クラス

| クラス | 説明 | 使用例 |
|--------|------|--------|
| `.IsQa` | Q&A の装飾付与 | `.Accordion.IsQa` |


**基本的なアコーディオン**

```html
<details class="Accordion">
  <summary>項目 1</summary>
  <div>
    <p>詳細コンテンツ</p>
  </div>
</details>
<details class="Accordion">
  <summary>項目 2</summary>
  <div>
    <p>詳細コンテンツ</p>
  </div>
</details>
```

**画像付きアコーディオン**

```html
<details class="Accordion">
  <summary>Q1 見出し</summary>
  <div>
    <div class="has_img">
      <figure>
        <img src="..." alt="">
      </figure>
      <div>
        <p>A 回答本文</p>
      </div>
    </div>
  </div>
</details>
```

#### 関連変数

- `--bc`, `--wh`：背景色（見出し、本文）
- `--mc`, `--ac`：Q/A ラベルカラー
- `--rad`：角丸半径
- `--imgW`：画像付き時の画像幅

---

### `FlexRatio`

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

- `--few`：第一要素の幅（自動計算）

---


