import { Link } from "react-router-dom";
import { Cards, CardsItem } from "../components/Cards";
import { FigureSvg } from "../components/FigureSvg";
import { ImgText } from "../components/ImgText";
import { Panel, PanelItem } from "../components/Panel";
import { FlexR, FlexRImage } from "../components/FlexR";
import { Toggle, ToggleSummary, ToggleBody } from "../components/Toggle";
import { Hero, HeroItem, HeroBack } from "../components/Hero";
import { getAssetPath } from "../lib/assetPath";

function Preview() {
	return (
		<>
			{/* ナビゲーション */}
			<header className="w-full fixed top-0 left-0 z-50 bg-[--background]  ">
				<div className=" flex items-center  px-6 min-h-[--MY]">
					<Link
						to="/"
						className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
					>
						← Preview
					</Link>
					<div className="flex items-center gap-4 ml-auto">
						<Link
							to="/test"
							className="text-slate-500 hover:text-slate-700 transition-colors"
						>
							test
						</Link>
						<Link
							to="/test2"
							className="text-slate-500 hover:text-slate-700 transition-colors"
						>
							test2
						</Link>
					</div>
				</div>
			</header>
			<main className="">
				{/* ナビゲーション */}
				<nav className="w-full fixed top-0 left-0 z-50 bg-[--background]  ">
					<div className=" flex items-center  px-6 min-h-[--MY]">
						<Link
							to="/"
							className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
						>
							← Preview
						</Link>
						<div className="flex items-center gap-4 ml-auto">
							<Link
								to="/test"
								className="text-slate-500 hover:text-slate-700 transition-colors"
							>
								test
							</Link>
							<Link
								to="/test2"
								className="text-slate-500 hover:text-slate-700 transition-colors"
							>
								test
							</Link>
						</div>
					</div>
				</nav>

				{/* Hero セクション */}
				<Hero className="out text-white">
					<HeroBack image={getAssetPath("/images/picsum/003.jpg")} />
					<HeroItem className="text-shadow-[--tsbk]">
						<h1 className="font-bold   ">EACH FRAMEWORK PREVIEW</h1>
						<p className="mt-4 text-xl">
							ヒーローコンポーネントのサンプル
						</p>
					</HeroItem>
				</Hero>

				{/* カーズセクション（pencil-new.pen から） */}
				<section className="Wrap into bg-[--BC] mt-0 useSvgIcons">
					<h2 className="text-center font-semibold mb-4">
						カーズセクション（pencil-new.pen から）
					</h2>
					<Cards className="col2 IsIcon img1-1">
						<CardsItem
							svg={
								<FigureSvg src="house-icon.svg" className="" />
							}
						>
							<h3 className="text-center mb-4">タイトル</h3>
							<p className=" text-center mb-6">
								テキストテキストテキストテキストテキストテキストテキストテキスト
							</p>
							<div className="flex justify-center">
								<button className="border border-[--MC] rounded-full px-10 py-3 hover:bg-[--SC] transition-colors">
									TitleTitle
								</button>
							</div>
						</CardsItem>
						<CardsItem
							svg={
								<FigureSvg src="house-icon.svg" className="" />
							}
						>
							<h3 className="text-center mb-4">タイトル</h3>
							<p className=" text-center mb-6">
								テキストテキストテキストテキストテキストテキストテキストテキスト
							</p>
							<div className="flex justify-center">
								<button className="border border-[--MC] rounded-full px-10 py-3 hover:bg-[--SC] transition-colors">
									TitleTitle
								</button>
							</div>
						</CardsItem>
					</Cards>
				</section>

				{/* 基本の 3 カラム */}
				<section className="">
					<h2 className="text-center font-semibold mb-4">
						基本 3 カラム - <code>class="Cards col3"</code>
					</h2>
					<Cards className="col3 IsIcon img1-1">
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3 className="font-bold mb-2">カード 1</h3>
							<p>
								ここで Tailwind クラスを使って装飾できます。
								<code>bg-blue-500</code>、
								<code>hover:bg-blue-600</code> など。
							</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/005.jpg")}
						>
							<h3 className="font-bold mb-2">カード 2</h3>
							<p>
								Burn Your Own Style
								のクラスはレイアウト骨格のみ担当。
								<br />
								装飾は Tailwind で上書きできます。
							</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/006.jpg")}
						>
							<h3 className="font-bold mb-2">カード 3</h3>
							<p>
								<code>--gap: 30px</code>{" "}
								でカード間隔も制御可能。 Tailwind の{" "}
								<code>gap-</code> クラスでも上書きできます。
							</p>
						</CardsItem>
					</Cards>
				</section>

				{/* Cards col4 IsLayer */}
				<section className="Wrap">
					<h2 className="text-center font-semibold mb-4">
						Cards col4 IsLayer
					</h2>
					<Cards className="col4 IsLayer">
						<CardsItem
							image={getAssetPath("/images/picsum/007.jpg")}
						>
							<h3>タイトル 1</h3>
							<p>説明文 1</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/008.jpg")}
						>
							<h3>タイトル 2</h3>
							<p>説明文 2</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/009.jpg")}
						>
							<h3>タイトル 3</h3>
							<p>説明文 3</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/010.jpg")}
						>
							<h3>タイトル 4</h3>
							<p>説明文 4</p>
						</CardsItem>
					</Cards>
				</section>

				{/* ImgText セクション */}
				<section className="Wrap into">
					<h2 className="text-center font-semibold mb-4">
						ImgText - 画像とテキスト横並び
					</h2>

					{/* 画像 30% の横並び */}
					<ImgText
						className="img30"
						image={getAssetPath("/images/picsum/011.jpg")}
					>
						<h3 className="font-bold mb-2">ImgText 基本使い方</h3>
						<p>
							画像とテキストを横並びで配置。
							<br />
							ImgText クラスでレイアウトを制御。
						</p>
					</ImgText>
					<ImgText
						className="img40 IsRev"
						image={getAssetPath("/images/picsum/012.jpg")}
					>
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
						<PanelItem
							image={getAssetPath("/images/picsum/013.jpg")}
						>
							<h3 className="font-bold mb-2">ステップ 1</h3>
							<p>ご相談を伺います</p>
						</PanelItem>
						<PanelItem
							className="IsRev"
							image={getAssetPath("/images/picsum/014.jpg")}
						>
							<h3 className="font-bold mb-2">ステップ 2</h3>
							<p>ご提案いたします</p>
						</PanelItem>
						<PanelItem
							image={getAssetPath("/images/picsum/015.jpg")}
						>
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
						<ToggleSummary>
							基本的なアコーディオンです
						</ToggleSummary>
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
								summary と details
								タグを使った開閉コンテンツです。
							</p>
						</ToggleBody>
					</Toggle>
				</section>

				{/* FlexR セクション */}
				<section className="Wrap">
					<h2 className="text-center font-semibold mb-4">
						FlexR - 比率割付
					</h2>

					<FlexR className="Flex55 into">
						<div>
							<h3 className="font-bold mb-2">Flex55</h3>
							<p>画像 4 割、本文 6 割で配置</p>
						</div>
						<FlexRImage
							image={getAssetPath("/images/picsum/016.jpg")}
						/>
					</FlexR>

					<FlexR className="Flex64">
						<FlexRImage
							image={getAssetPath("/images/picsum/017.jpg")}
						/>
						<div className="PX">
							<h3 className="font-bold mb-2">Flex64</h3>
							<p>画像 6 割、本文 4 割で配置</p>
						</div>
					</FlexR>
				</section>

				{/* テストセクション - Cards col4 IsLayer */}
				<section
					className="Wrap into  bg-[--GR]"
					style={{} as React.CSSProperties}
				>
					<h2 className="text-center font-semibold mb-4 text-white">
						テストセクション - Cards col4 IsLayer
					</h2>
					<Cards
						className="col4 IsLayer"
						style={{ "--gap": "0rem" } as React.CSSProperties}
					>
						<CardsItem
							image={getAssetPath("/images/picsum/018.jpg")}
						>
							<h3 className="text-white">タイトル A</h3>
							<p className="text-white/80">説明文 A</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/019.jpg")}
						>
							<h3 className="text-white">タイトル B</h3>
							<p className="text-white/80">説明文 B</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/020.jpg")}
						>
							<h3 className="text-white">タイトル C</h3>
							<p className="text-white/80">説明文 C</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/001.jpg")}
						>
							<h3 className="text-white">タイトル D</h3>
							<p className="text-white/80">説明文 D</p>
						</CardsItem>
					</Cards>
				</section>

				<section className=" ">
					<h2 className="text-center font-semibold mb-4 ">テスト</h2>
					<Cards className=" IsFix">
						<CardsItem
							image={getAssetPath("/images/picsum/002.jpg")}
						>
							<h3>カード 1</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
					</Cards>
				</section>
				<section className="Wrap into bg-[--BC]">
					<h2 className="text-center font-semibold mb-4 ">テスト</h2>
					<Cards className=" IsGrow">
						<CardsItem
							image={getAssetPath("/images/picsum/002.jpg")}
						>
							<h3>カード 1</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
					</Cards>
				</section>
				<section className=" ">
					<h2 className="text-center font-semibold mb-4 ">テスト</h2>
					<Cards className="col4 IsIcon img1-1">
						<CardsItem
							image={getAssetPath("/images/picsum/002.jpg")}
						>
							<h3>カード 1</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
					</Cards>
				</section>
				<section className="Wrap into  bg-[--BC]">
					<h2 className="text-center font-semibold mb-4 ">テスト</h2>
					<Cards className="col2 IsRow">
						<CardsItem
							image={getAssetPath("/images/picsum/002.jpg")}
						>
							<h3>カード 1</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
					</Cards>
				</section>
				<section className="">
					<h2 className="text-center font-semibold mb-4 ">テスト</h2>
					<Cards className="col4 IsShift">
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 1</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3>カード 2</h3>
							<p>説明文</p>
						</CardsItem>
					</Cards>
				</section>
			</main>
		</>
	);
}

export default Preview;
