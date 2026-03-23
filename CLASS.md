# class 設計書

**設計思想・変数定義・基本構造については [`STYLE.md`](./STYLE.md) を参照。**

---

## classの命名規則

**Value class指定**（ex: 小文字 + 数値）：

CSS 変数に値を渡すclass。**例外的にPascalCaseを使用しない**。

| class | 意味 |
|---|---|
| `.col3` `.col4` | カラム数 |
| `.img20` `.img30` | 画像比率 |

**Modifier class**（`Is*` 形式）：

Unit class毎に定義されている。

| class | 効果 | 使用 Unit |
|---|---|---|
| `.IsRev` | 画像の位置を反転 (右に) | ImgText |
| `.IsLayer` | 画像とテキストを重ねる | Cards |
| `.IsFlow` | パネル間に矢印 | Panel |

**Intersection class**（`Js*` 形式）：

`src/scss/_08intersection.scss`で定義。

| class | 効果 |
|---|---|
| `.JsBottom` | 画面に入ったら下から出現 |

**Break Point**（Tailwind準拠のkebab-case）：
- `.bp-sm`：デフォルトのBP(Unitにより異なる)を`sm`に変更

## Tailwind CSS

**装飾・調整**でのみ使用する。

## エージェントワークフロー

### /Build Skill

`.claude/skills/Build/SKILL.md` 参照

---

## class 一覧

**role 解説**: 
container : children 前提のレイアウト
wrapper : 囲む事で効果がある or 子要素に影響を与える
component : 一体型 UI 部品
effect : 囲む事で js 処理や css の効果を付与する
wrapper 以外は wrapper で囲むことが多い。wrapper を wrapperで囲むことは少ないが禁止ではない
ex. `.Wrap` > h2 + `.Flex46` + `.Stick` 

| class | role | required children | has component | modifiers & values | common combinations |
|-------|------|----------|---------------|-------------------|-------|
| `.Cards` | container | `.item` | true | `.col1`–`.col6` `.IsLayer` `.IsGrow` `.IsFix` `.IsIcon` `.IsRow` `.IsShift` `.bp-sm` `.min2` | wrapper > `.Cards` |
| `.Panel` | container | `.item` | true | `.img20` `.img30` `.img40` `.img50` `.IsFlow` `.bp-sm` `.item.IsRev` |  wrapper > `.Panel` |
| `.ImgText` | container | `figure` + `>div` | true | `.img10`–`.img100` `.IsRev` `.bp-sm` | wrapper > `.ImgText` |
| `.Toggle` | component | `summary` `.ToggleIcon` | true | `.IsQa` `.has_img` `.bp-sm` (on `.has_img`) | wrapper > `.Toggle` |
| `.Flex55` `.Flex46` `.Flex64` `.Flex37` `.Flex73` `.Flex28` `.Flex82` | wrapper | 2 direct children | true | `.bp-sm` `--few` | FlexR > image + container |
| `.Wrap` | wrapper | - | false | - | wrapper + `.Hero` + wrapper |
| `.Hero` | wrapper | `.back` + `.item` | true | - | wrapper + `.Hero` + wrapper |
| `.Stick` | wrapper, effect | `.StickItem` + `.StickScr` | true | `.IsRev` | `.Stick`>image+container |
| `.RgbShift` | effect | auto insert | true | `IsBeat` | wrapper>`RgbShift`+component |
| `.PathDraw` | effect |  `path` in `svg` | true | `--PDS` `--PES` `--PVM`  | wrapper > `.PathDraw` + container |
| `.BorderDraw` | effect | auto insert | false | `.IsDown` `--PVM` `--PDS` | `.Panel` > `.item.BorderDraw` |
