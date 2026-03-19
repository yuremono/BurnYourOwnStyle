# タイトル左固定（position: sticky）レイアウト リファレンス

エージェントが編集できない CSS 設計の知見と、FlexR を用いた sticky タイトルレイアウトのベストプラクティス。いずれ専用クラスまたは専用ユニットの実装をする可能性あり。

---

## CSS 設計上の注意（編集禁止領域）

**`overflow-x: hidden` と `position: sticky` の関係**

- `html` と `body` の**両方**に `overflow-x: hidden` を付けると、`position: sticky` が**無効**になる
- `body` のみ、または `html` のみに指定すれば有効
- **現在の運用**: `body` タグのみに `overflow-x: hidden` を指定

---

## リファレンスコード（test2.tsx Flow セクション）

ユーザー直接修正版。ベストプラクティスとして参照する。

```tsx
{/* Flow - h2 左 sticky、コンテンツ右 */}
<section className="" style={{} as React.CSSProperties}>
	<FlexR
		className="Flex37 wrapper into  bg-slate-100 items-start h-auto"
		style={{} as React.CSSProperties}
	>
		<div className="md:sticky top-[var(--MY)]  ">
			<h2 className="  font-bold text-2xl text-slate-900">
				<span className="sub block mr-0">Flow</span> ご利用の流れ
			</h2>
		</div>
		<Panel className="img40 IsFlow mt-0" style={{} as React.CSSProperties}>
			<PanelItem image={getAssetPath("/images/picsum/010.jpg")}>
				<h3 className="font-bold mb-2 text-slate-900">1. 予約</h3>
				<p className="text-slate-700">
					Web または電話で希望日時を予約してください。
				</p>
			</PanelItem>
			<PanelItem
				className="IsRev"
				image={getAssetPath("/images/picsum/011.jpg")}
			>
				<h3 className="font-bold mb-2 text-slate-900">2. 撮影</h3>
				<p className="text-slate-700">
					機材のセットアップから撮影まで、スタッフがサポートします。
				</p>
			</PanelItem>
			<PanelItem image={getAssetPath("/images/picsum/012.jpg")}>
				<h3 className="font-bold mb-2 text-slate-900">3. 納品</h3>
				<p className="text-slate-700">
					現像・レタッチのオプションもご用意しています。
				</p>
			</PanelItem>
                        ...
		</Panel>
	</FlexR>
</section>
```

---

## Tips（実装時の注意点）

### 1. コンポーネントの制約

- **FlexR** は `div` と `section` を使い分けられない
- そのため、無駄に `section` でラップしている構造になりがち
- 上記リファレンス構造を作るのがベストプラクティス

### 2. FlexR へのクラス指定

- **wrapper** と **into** を FlexR コンポーネントに**直接**付与する
- 外側の section には wrapper/into を付けない

### 3. FlexR の中身

- FlexR の直下には何でも入れられる
- h2 を FlexR の直下に置いても問題ないが、**sticky の挙動**と**h2 の見た目**は分離するとよい（div でラップ）
- Panel を FlexR の直下にそのまま入れることも可能

### 4. 縦余白のリセット

- **wrapper** クラスはデフォルトで 2 番目以降の要素に基本縦余白（`--MY`）を付与する
- Panel 側で `mt-0` を指定してリセットする

### 5. position: sticky の指定

- FlexR 内の片方の要素に sticky を付ける場合:
    - Tailwind の `sticky` と適切な `top` プロパティを付与
    - `top-[var(--MY)]` でナビ高さを考慮
- **shrink-0** と **width** 指定はケースによる（今回の例では不要だった）
- FlexR 直下の要素に width を指定するのは**間違い**。FlexR が中身の幅を制御する

### 6. レスポンシブ（モバイル）

- FlexR のモバイル用ブレークポイントは Tailwind の **md** と一致
- `md:sticky` を使用して、PC のみ sticky にする

### 7. 親要素の height

- **必須**: sticky を付ける要素の**親**に `h-auto` を指定する
- FlexR に `h-auto` を付与する

---

## 将来の拡張

- 専用クラスまたは専用ユニットの実装を検討
