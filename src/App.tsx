import { Cards, CardsItem } from "./components/Cards";
import { ImgText } from "./components/ImgText";
import { Panel, PanelItem } from "./components/Panel";
import { FlexR, FlexRImage } from "./components/FlexR";
import { Toggle, ToggleSummary, ToggleBody } from "./components/Toggle";
import { Hero, HeroItem, HeroBack } from "./components/Hero";

const HouseIcon = ({ className = "" }: { className?: string }) => (
	<svg viewBox="0 0 225 225" className={className}>
		<path
			d="M198.07001 398.97665c-27.02001 0-54.05001-5.44003-78.66001-16.05001-36.11999-15.46-67.76-42.26999-89.1-75.48999-1.17-1.82999-0.68-4.25 1.12-5.47001l22.75-15.42999-45.99-29.69-0.17 61.79001 8.5-5.62003c1.84-1.22 4.32-0.70999 5.54 1.13001 1.22 1.83999 0.71 4.32-1.13 5.54001l-10.82 7.16c-1.16 0.79001-4.83 2.44998-9.3-3.52002-0.53-0.69-0.81-1.53998-0.81-2.40997l0.2-71.41002c0-1.46001 0.81-2.81 2.09-3.5 1.29-0.7 2.85-0.64 4.08 0.16l54.39 35.11c0.55 0.35001 1 0.82999 1.32 1.4 2.01 3.57998 1.63 7.05001-0.97 8.82l-21.93 14.88001c20.43 30.38 49.9 54.86999 83.39 69.19998 34.60999 14.92001 74.18 19.18002 111.43999 11.99002 37.23-7.04001 72.40001-25.64999 99.02001-52.41 26.86999-26.57001 45.6-61.68 52.75-98.88001 0.06-0.31 0.14999-0.61 0.28-0.89l1.19-2.64c5.67001-32.05 3.06998-65.23999-7.54001-96.00999-10.98001-31.86-30.36999-60.38001-56.07999-82.49-38.72-33.3-88.09001-49.53-139.04-45.7-50.93 3.84-97.33 27.28-130.63 66.01-24.99 29.04999-40.53 64.44999-44.95 102.35999-0.26 2.19-2.23 3.76999-4.44 3.51-2.19-0.26-3.77-2.23999-3.51-4.43999 4.61-39.5 20.8-76.38001 46.83-106.65 34.7-40.35 83.03001-64.77 136.10001-68.76 53.05999-4 104.50999 12.91 144.86 47.61 26.76999 23.02 46.97998 52.74 58.41998 85.94 11.10998 32.22 13.79001 66.97998 7.77002 100.51999-0.06 0.32-0.16001 0.64-0.29001 0.94l-1.20001 2.67c-7.51999 38.59999-26.98999 75.00999-54.87 102.58-27.73001 27.86999-64.38 47.27002-103.17 54.61002-12.30999 2.38-24.86999 3.54998-37.42999 3.54998l-0.00999-0.01999z"
			fill="#30caca"
		/>
		<path
			d="M183.70999 195.10999l0-107.57998 36.59003 0-110.78002-87.53001-109.52 87.23 34.64 0.30001 0 107.57998 149.06999 0z"
			fill="#90e0e3"
		/>
		<path
			d="M187.7184 203.10999c-2.21001 0-4-1.79-4-4l0-107.57998c0-2.21 1.78999-4 4-4l25.08002 0-99.26001-78.43001-98.21999 78.22 23.37 0.21001c2.2 0.02 3.96 1.8 3.96 4l0 107.57998c0 2.21-1.79 4-4 4-2.21 0-4-1.79-4-4l0-103.61-30.68-0.26999c-1.69-0.01-3.19-1.09-3.75-2.69999-0.55-1.6-0.04-3.38 1.29-4.43001l109.52999-87.23c1.45-1.16 3.51001-1.16 4.97001 0l110.77999 87.53c1.33999 1.06 1.86001 2.84 1.30001 4.45-0.55999 1.61-2.08 2.69-3.77999 2.69l-32.59003 0 0 103.58c0 2.21-1.78999 4-4 4z"
			fill="#30caca"
		/>
		<path
			d="M26.44999 69.16999c-2.25 0-4.41999-0.89999-6.00999-2.48999l-17.95-17.95001c-3.32-3.32-3.32-8.69999 0-12.01999 3.32-3.32 8.7-3.32 12.02 0l11.93999 11.94 46.16-46.16c3.32-3.32 8.7-3.32 12.02001 0 3.32 3.32 3.32 8.7 0 12.02l-52.17 52.17c-1.59 1.59-3.76001 2.48999-6.01001 2.48999z"
			fill="#fff"
		/>
	</svg>
);

function App() {
	return (
		<main  className=" mt-[var(--head)]">
			{/* Hero セクション */}
			<Hero className="out text-white">
				<HeroBack image="https://picsum.photos/1920/960" />
				<HeroItem className="text-shadow-[var(--tsbk)]">
					<h1 className="font-bold   ">
						EACH FRAMEWORK PREVIEW
					</h1>
					<p className="mt-4">ヒーローコンポーネントのサンプル</p>
				</HeroItem>
			</Hero>

			{/* カーズセクション（pencil-new.pen から） */}
			<section className="wrapper into bg-[var(--bc)]  mt-0">
				<h2 className="text-center font-semibold mb-4">
					カーズセクション（pencil-new.pen から）
				</h2>
				<Cards className="col2">
					{/* カード 1: 相続登記 */}
					<CardsItem>
						<div className="p-6">
							<figure className="w-[240px] h-[240px] mb-6 mx-auto">
								<HouseIcon className="w-full h-full" />
							</figure>
							<h3 className="text-center mb-4">タイトル</h3>
							<p className="leading-[2.77] text-center mb-6">
								テキストテキストテキストテキストテキストテキストテキストテキスト
							</p>
							<div className="flex justify-center">
								<button className="border border-white/60 rounded-full px-10 py-3 hover:bg-white/10 transition-colors">
									相続登記について
								</button>
							</div>
						</div>
					</CardsItem>

					{/* カード 2: 相続放棄 */}
					<CardsItem>
						<div className="p-6">
							<figure className="w-[240px] h-[240px] mb-6 mx-auto">
								<HouseIcon className="w-full h-full" />
							</figure>
							<h3 className="text-center mb-4">タイトル</h3>
							<p className="leading-[2.77] text-center mb-6">
								テキストテキストテキストテキストテキストテキストテキストテキスト
							</p>
							<div className="flex justify-center">
								<button className="border border-white/60 rounded-full px-10 py-3 hover:bg-white/10 transition-colors">
									相続放棄について
								</button>
							</div>
						</div>
					</CardsItem>
				</Cards>
			</section>

			{/* 基本の 3 カラム */}
			<section className="wrapper">
				<h2 className="text-center font-semibold mb-4">
					基本 3 カラム - <code>class="Cards col3"</code>
				</h2>
				<Cards className="col3">
					<CardsItem image="/images/960x480.png">
						<h3 className="font-bold mb-2">カード 1</h3>
						<p>
							ここで Tailwind クラスを使って装飾できます。
							<code>bg-blue-500</code>、
							<code>hover:bg-blue-600</code> など。
						</p>
					</CardsItem>
					<CardsItem image="/images/960x480.png">
						<h3 className="font-bold mb-2">カード 2</h3>
						<p>
							Burn Your Own Style
							のクラスはレイアウト骨格のみ担当。
							<br />
							装飾は Tailwind で上書きできます。
						</p>
					</CardsItem>
					<CardsItem image="/images/960x480.png">
						<h3 className="font-bold mb-2">カード 3</h3>
						<p>
							<code>--gap: 30px</code> でカード間隔も制御可能。
							Tailwind の <code>gap-</code>{" "}
							クラスでも上書きできます。
						</p>
					</CardsItem>
				</Cards>
			</section>

			{/* Cards col4 IsLayer */}
			<section className="wrapper">
				<h2 className="text-center font-semibold mb-4">
					Cards col4 IsLayer
				</h2>
				<Cards className="col4 IsLayer">
					<CardsItem image="https://picsum.photos/400/400">
						<h3>タイトル 1</h3>
						<p>説明文 1</p>
					</CardsItem>
					<CardsItem image="https://picsum.photos/401/401">
						<h3>タイトル 2</h3>
						<p>説明文 2</p>
					</CardsItem>
					<CardsItem image="https://picsum.photos/402/402">
						<h3>タイトル 3</h3>
						<p>説明文 3</p>
					</CardsItem>
					<CardsItem image="https://picsum.photos/403/403">
						<h3>タイトル 4</h3>
						<p>説明文 4</p>
					</CardsItem>
				</Cards>
			</section>

			{/* ImgText セクション */}
			<section>
				<h2 className="text-center font-semibold mb-4">
					ImgText - 画像とテキスト横並び
				</h2>

				{/* 画像 30% の横並び */}
				<ImgText className="img30" image="/images/960x480.png">
					<h3 className="font-bold mb-2">ImgText 基本使い方</h3>
					<p>
						画像とテキストを横並びで配置。
						<br />
						ImgText クラスでレイアウトを制御。
					</p>
				</ImgText>
				<ImgText className="img40 IsRev" image="/images/960x480.png">
					<h3 className="font-bold mb-2">ImgText 基本使い方</h3>
					<p>
						画像とテキストを横並びで配置。
						<br />
						ImgText クラスでレイアウトを制御。
					</p>
				</ImgText>
			</section>

			{/* Panel セクション */}
			<section>
				<h2 className="text-center font-semibold mb-4">
					Panel - 縦並びコンテナ
				</h2>

				<Panel className="img40 IsFlow">
					<PanelItem image="/images/960x480.png">
						<h3 className="font-bold mb-2">ステップ 1</h3>
						<p>ご相談を伺います</p>
					</PanelItem>
					<PanelItem className="IsRev" image="/images/960x480.png">
						<h3 className="font-bold mb-2">ステップ 2</h3>
						<p>ご提案いたします</p>
					</PanelItem>
					<PanelItem image="/images/960x480.png">
						<h3 className="font-bold mb-2">ステップ 3</h3>
						<p>サポートいたします</p>
					</PanelItem>
				</Panel>
			</section>

			{/* Toggle セクション */}
			<section>
				<h2 className="text-center font-semibold mb-4">
					Toggle - 開閉コンテンツ
				</h2>

				<Toggle>
					<ToggleSummary>基本的なアコーディオンです</ToggleSummary>
					<ToggleBody>
						<span>本文コンテンツ</span>
					</ToggleBody>
				</Toggle>

				<Toggle className="IsQa">
					<ToggleSummary>
						これはどのような仕組みですか？
					</ToggleSummary>
					<ToggleBody>
						<p>
							summary と details タグを使った開閉コンテンツです。
						</p>
					</ToggleBody>
				</Toggle>
			</section>

			{/* FlexR セクション */}
			<section className="wrapper">
				<h2 className="text-center font-semibold mb-4">
					FlexR - 比率割付
				</h2>

				<FlexR className="Flex46">
					<FlexRImage image="/images/960x480.png" />
					<div>
						<h3 className="font-bold mb-2">Flex46</h3>
						<p>画像 4 割、本文 6 割で配置</p>
					</div>
				</FlexR>

				<FlexR className="Flex64">
					<FlexRImage image="https://picsum.photos/600/400" />
					<div>
						<h3 className="font-bold mb-2">Flex64</h3>
						<p>画像 6 割、本文 4 割で配置</p>
					</div>
				</FlexR>
			</section>
		</main>
	);
}

export default App;
