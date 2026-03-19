import { Link } from "react-router-dom";
import { Cards, CardsItem } from "../components/Cards";
import { ImgText } from "../components/ImgText";
import { Panel, PanelItem } from "../components/Panel";
import { FlexR, FlexRImage } from "../components/FlexR";
import { Toggle, ToggleSummary, ToggleBody } from "../components/Toggle";
import { Hero, HeroItem, HeroBack } from "../components/Hero";

const getAssetPath = (path: string) => {
	if (path.startsWith("http")) return path;
	return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
};

function Test() {
	return (
		<>
			{/* ナビゲーション */}
			<header className="w-full fixed top-0 left-0 z-50 bg-[var(--background)]  ">
				<div className=" flex items-center  px-6 min-h-[var(--MY)]">
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

			<main className="min-h-screen bg-amber-50">
				{/* ナビゲーション */}
				<nav className="w-full fixed top-0 left-0 z-50 bg-[var(--background)]  ">
					<div className=" flex items-center  px-6 min-h-[var(--MY)]">
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

				{/* Hero - out で画面幅 */}
				<Hero className="out text-white">
					<HeroBack image={getAssetPath("/images/picsum/003.jpg")} />
					<HeroItem className="text-shadow-[var(--tsbk)]">
						<h1 className="font-bold text-4xl md:text-5xl tracking-tight drop-shadow-lg Ser">
							小路のカフェへようこそ
						</h1>
						<p className="mt-4 text-xl md:text-2xl text-amber-50 font-light">
							自家焙煎のコーヒーと手作りパンで、ひとときを。
						</p>
					</HeroItem>
				</Hero>

				{/* About - ImgText img40 IsRev / img30 で店の紹介 */}
				<section className="wrapper into py-16">
					<h2 className="text-center font-bold text-2xl text-amber-900 mb-12">
						<span className="sub">About</span> 小路カフェについて
					</h2>
					<ImgText
						className="img40 IsRev"
						image={getAssetPath("/images/picsum/011.jpg")}
						style={{ "--gap": "2rem" } as React.CSSProperties}
					>
						<h3 className="font-bold mb-4 text-lg text-amber-900">
							街角で見つけた、小さな憩いの場
						</h3>
						<p className="text-amber-800/90 leading-relaxed">
							小路カフェは、駅から徒歩5分の静かな路地にあります。
							毎朝、店主が焙煎した豆で淹れるコーヒーと、
							パン職人がその日に焼いたパンをご提供しています。
						</p>
					</ImgText>
					<ImgText
						className="img30"
						image={getAssetPath("/images/picsum/012.jpg")}
						style={{ "--gap": "2rem" } as React.CSSProperties}
					>
						<h3 className="font-bold mb-4 text-lg text-amber-900">
							こだわりの豆選び
						</h3>
						<p className="text-amber-800/90 leading-relaxed">
							エチオピア、グアテマラ、コロンビアなど、
							産地ごとの個性を大切にした豆を厳選。
							浅煎りから深煎りまで、お好みに合わせてお選びいただけます。
						</p>
					</ImgText>
				</section>

				{/* Menu - Cards col4 IsLayer */}
				<section className="wrapper into py-16 bg-amber-100/50">
					<h2 className="text-center font-bold text-2xl text-amber-900 mb-12">
						<span className="sub">Menu</span> メニュー
					</h2>
					<Cards
						className="col4 IsLayer"
						style={{ "--gap": "1.5rem" } as React.CSSProperties}
					>
						<CardsItem
							image={getAssetPath("/images/picsum/007.jpg")}
						>
							<h3 className="font-semibold text-white drop-shadow-md">
								ブレンドコーヒー
							</h3>
							<p className="text-amber-50/95 text-sm">¥480</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/008.jpg")}
						>
							<h3 className="font-semibold text-white drop-shadow-md">
								カフェラテ
							</h3>
							<p className="text-amber-50/95 text-sm">¥550</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/009.jpg")}
						>
							<h3 className="font-semibold text-white drop-shadow-md">
								クロワッサン
							</h3>
							<p className="text-amber-50/95 text-sm">¥380</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/010.jpg")}
						>
							<h3 className="font-semibold text-white drop-shadow-md">
								チーズケーキ
							</h3>
							<p className="text-amber-50/95 text-sm">¥520</p>
						</CardsItem>
					</Cards>
				</section>

				{/* Features - Cards col3 IsShift */}
				<section className="wrapper into py-16">
					<h2 className="text-center font-bold text-2xl text-amber-900 mb-12">
						<span className="sub">Features</span> 小路カフェの特徴
					</h2>
					<Cards
						className="col3 IsShift"
						style={{ "--gap": "2rem" } as React.CSSProperties}
					>
						<CardsItem
							image={getAssetPath("/images/picsum/004.jpg")}
						>
							<h3 className="font-bold mb-2 text-amber-900">
								自家焙煎
							</h3>
							<p className="text-amber-800/90 text-sm">
								店内で焙煎した豆を、その日のうちに提供。鮮度の違いを実感してください。
							</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/005.jpg")}
						>
							<h3 className="font-bold mb-2 text-amber-900">
								手作りパン
							</h3>
							<p className="text-amber-800/90 text-sm">
								毎朝6時から焼き上げるパン。バターの香りが店内に広がります。
							</p>
						</CardsItem>
						<CardsItem
							image={getAssetPath("/images/picsum/006.jpg")}
						>
							<h3 className="font-bold mb-2 text-amber-900">
								ゆったり空間
							</h3>
							<p className="text-amber-800/90 text-sm">
								席数は少なめ。本を読みながら、ゆっくり過ごしていただけます。
							</p>
						</CardsItem>
					</Cards>
				</section>

				{/* Process - Panel img40 IsFlow */}
				<section className="wrapper into py-16 bg-amber-100/30">
					<h2 className="text-center font-bold text-2xl text-amber-900 mb-12">
						<span className="sub">Process</span>{" "}
						コーヒーができるまで
					</h2>
					<Panel
						className="img40 IsFlow"
						style={{ "--gap": "1.5rem" } as React.CSSProperties}
					>
						<PanelItem
							image={getAssetPath("/images/picsum/013.jpg")}
						>
							<h3 className="font-bold mb-2 text-amber-900">
								1. 豆の選定
							</h3>
							<p className="text-amber-800/90">
								産地と焙煎度を吟味し、厳選した豆のみを使用します。
							</p>
						</PanelItem>
						<PanelItem
							className="IsRev"
							image={getAssetPath("/images/picsum/014.jpg")}
						>
							<h3 className="font-bold mb-2 text-amber-900">
								2. 焙煎
							</h3>
							<p className="text-amber-800/90">
								店内の焙煎機で、注文に合わせて焙煎。香り立つ瞬間をお届けします。
							</p>
						</PanelItem>
						<PanelItem
							image={getAssetPath("/images/picsum/015.jpg")}
						>
							<h3 className="font-bold mb-2 text-amber-900">
								3. 抽出
							</h3>
							<p className="text-amber-800/90">
								ハンドドリップで、一杯ずつ丁寧に淹れています。
							</p>
						</PanelItem>
					</Panel>
				</section>

				{/* FAQ - Toggle IsQa */}
				<section className="wrapper into py-16">
					<h2 className="text-center font-bold text-2xl text-amber-900 mb-12">
						<span className="sub">FAQ</span> よくある質問
					</h2>
					<div
						className="wid"
						style={{ "--wid": "720px" } as React.CSSProperties}
					>
						<Toggle className="IsQa">
							<ToggleSummary>
								営業時間は何時からですか？
							</ToggleSummary>
							<ToggleBody>
								<p className="text-amber-800/90">
									平日は8:00〜18:00、土日祝は9:00〜17:00の営業です。定休日は水曜日です。
								</p>
							</ToggleBody>
						</Toggle>
						<Toggle className="IsQa">
							<ToggleSummary>予約は必要ですか？</ToggleSummary>
							<ToggleBody>
								<p className="text-amber-800/90">
									基本的に予約は不要です。ただし、4名様以上のご利用の場合は事前にご連絡いただけるとスムーズです。
								</p>
							</ToggleBody>
						</Toggle>
						<Toggle className="IsQa">
							<ToggleSummary>
								豆の販売はしていますか？
							</ToggleSummary>
							<ToggleBody>
								<p className="text-amber-800/90">
									はい。店内で焙煎した豆を100g単位で販売しています。挽き方もご指定いただけます。
								</p>
							</ToggleBody>
						</Toggle>
					</div>
				</section>

				{/* Access - FlexR Flex46 / Flex64 */}
				<section className="wrapper into py-16 bg-amber-900 text-amber-50">
					<h2 className="text-center font-bold text-2xl mb-12">
						<span className="sub">Access</span> アクセス
					</h2>
					<FlexR
						className="Flex46 into"
						style={{ "--gap": "2rem" } as React.CSSProperties}
					>
						<div className="PX">
							<h3 className="font-bold mb-4 text-lg">
								小路カフェ KOMICHI CAFE
							</h3>
							<p className="text-amber-100/90 mb-2">
								〒100-0001 東京都千代田区小路1-2-3
							</p>
							<p className="text-amber-100/90 mb-2">
								JR〇〇駅 徒歩5分
							</p>
							<p className="text-amber-100/90">
								Tel: 03-1234-5678
							</p>
							<p className="mt-4 text-sm text-amber-200/80">
								平日 8:00〜18:00 / 土日祝 9:00〜17:00
							</p>
							<p className="text-sm text-amber-200/80">
								定休日：水曜日
							</p>
						</div>
						<FlexRImage
							image={getAssetPath("/images/picsum/016.jpg")}
						/>
					</FlexR>
					<FlexR
						className="Flex64 into mt-8"
						style={{ "--gap": "2rem" } as React.CSSProperties}
					>
						<FlexRImage
							image={getAssetPath("/images/picsum/017.jpg")}
						/>
						<div className="PX">
							<h3 className="font-bold mb-4 text-lg">
								店内の様子
							</h3>
							<p className="text-amber-100/90">
								窓際の席からは路地の緑が眺められます。雨の日は特に、コーヒーと本が似合う空間です。
							</p>
						</div>
					</FlexR>
				</section>
			</main>
			{/* Footer */}
			<footer className="wrapper into bg-amber-950 text-amber-100 py-12">
				<div className="text-center">
					<p className="font-semibold mb-4">KOMICHI CAFE</p>
					<Link
						to="/"
						className="text-amber-200 hover:text-white font-medium transition-colors"
					>
						← Preview ページへ戻る
					</Link>
				</div>
			</footer>
		</>
	);
}

export default Test;
