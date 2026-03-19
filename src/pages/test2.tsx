import { Link } from "react-router-dom";
// import { Cards, CardsItem } from "../components/Cards";
// import { ImgText } from "../components/ImgText";
import { Panel, PanelItem } from "../components/Panel";
import { Toggle, ToggleSummary, ToggleBody } from "../components/Toggle";
import { Hero, HeroItem, HeroBack } from "../components/Hero";
import { Image } from "../components/Image";
// import { FlexR } from "../components/FlexR";
import { Stick } from "../components/Stick";

const getAssetPath = (path: string) => {
	if (path.startsWith("http")) return path;
	return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
};

function Test2() {
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

			<main className="min-h-screen bg-slate-50">
			{/* Hero - out で画面幅 */}
			<Hero className="out text-white">
				<HeroBack image={getAssetPath("/images/picsum/003.jpg")} />
				<HeroItem className="text-shadow-[var(--tsbk)]">
					<h1 className="font-bold  tracking-tight drop-shadow-lg Ser">
						小路のカフェへようこそ
					</h1>
					<p className="mt-4  md:text-amber-50 font-light">
						自家焙煎のコーヒーと手作りパンで、ひとときを。
					</p>
				</HeroItem>
			</Hero>

			{/* Stick Unit、 */}
			<section className="" style={{  } as React.CSSProperties} >
				<Stick className=" out    items-start img1-1 [--item:50%] [--shift:25%]" style={{  } as React.CSSProperties}>
                                        <h2 className=" StickItem  font-bold md:min-h-[100lvh] content-center">
                                                <span className="sub block mr-0">Flow</span> ご利用の流れ
                                        </h2>
                                        <Panel className="StickScr img40 IsFlow " style={{  } as React.CSSProperties}>
                                                <PanelItem className="items-center" image={getAssetPath("/images/picsum/010.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  予約</h3>
                                                        <p className="text-slate-700">Web または電話で希望日時を予約してください。</p>
                                                </PanelItem>
                                                <PanelItem className="IsRev items-center" image={getAssetPath("/images/picsum/011.jpg")} >
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  撮影</h3>
                                                        <p className="text-slate-700">機材のセットアップから撮影まで、スタッフがサポートします。</p>
                                                </PanelItem>
                                                <PanelItem className="items-center" image={getAssetPath("/images/picsum/010.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  予約</h3>
                                                        <p className="text-slate-700">Web または電話で希望日時を予約してください。</p>
                                                </PanelItem>
                                                <PanelItem className="IsRev items-center" image={getAssetPath("/images/picsum/011.jpg")} >
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  撮影</h3>
                                                        <p className="text-slate-700">機材のセットアップから撮影まで、スタッフがサポートします。</p>
                                                </PanelItem>
                                        </Panel>
				</Stick>
			</section>
			{/*Stick Unit、2*/}
			<section className="" style={{  } as React.CSSProperties} >
                                <Stick className="IsRev out   items-start " style={{} as React.CSSProperties}>
                                        <Image
                                                className="StickItem sticky min-h-[100lvh] content-center img2-1"
                                                image={getAssetPath("/images/960x640.png")} />
                                        <Panel className="StickScr img40 IsFlow img1-1" style={{  } as React.CSSProperties}>
                                                <PanelItem className="items-center" image={getAssetPath("/images/picsum/010.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  予約</h3>
                                                        <p className="text-slate-700">Web または電話で希望日時を予約してください。</p>
                                                </PanelItem>
                                                <PanelItem className="IsRev items-center" image={getAssetPath("/images/picsum/011.jpg")} >
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  撮影</h3>
                                                        <p className="text-slate-700">機材のセットアップから撮影まで、スタッフがサポートします。</p>
                                                </PanelItem>
                                                <PanelItem className="items-center" image={getAssetPath("/images/picsum/010.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  予約</h3>
                                                        <p className="text-slate-700">Web または電話で希望日時を予約してください。</p>
                                                </PanelItem>
                                                <PanelItem className="IsRev items-center" image={getAssetPath("/images/picsum/011.jpg")} >
                                                        <h3 className="font-bold mb-2 text-slate-900"><span className="sub block ">Step 01</span>  撮影</h3>
                                                        <p className="text-slate-700">機材のセットアップから撮影まで、スタッフがサポートします。</p>
                                                </PanelItem>
                                        </Panel>
				</Stick>
			</section>
			{/* Flow - h2 左 sticky、コンテンツ右 */}
			{/* <section className="" style={{  } as React.CSSProperties} >
				<FlexR className="Flex37 wrapper into  bg-slate-100 items-start " style={{ } as React.CSSProperties}>
					<div className="md:sticky top-[var(--MY)]  ">
						<h2 className="  font-bold text-slate-900">
							<span className="sub block mr-0">Flow</span> ご利用の流れ
						</h2>
					</div>
                                        <Panel className="img40 IsFlow mt-0" style={{  } as React.CSSProperties}>
                                                <PanelItem image={getAssetPath("/images/picsum/010.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900">1. 予約</h3>
                                                        <p className="text-slate-700">Web または電話で希望日時を予約してください。</p>
                                                </PanelItem>
                                                <PanelItem
                                                        className="IsRev"
                                                        image={getAssetPath("/images/picsum/011.jpg")}
                                                >
                                                        <h3 className="font-bold mb-2 text-slate-900">2. 撮影</h3>
                                                        <p className="text-slate-700">機材のセットアップから撮影まで、スタッフがサポートします。</p>
                                                </PanelItem>
                                                <PanelItem image={getAssetPath("/images/picsum/012.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900">3. 納品</h3>
                                                        <p className="text-slate-700">現像・レタッチのオプションもご用意しています。</p>
                                                </PanelItem>
                                                <PanelItem image={getAssetPath("/images/picsum/010.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900">1. 予約</h3>
                                                        <p className="text-slate-700">Web または電話で希望日時を予約してください。</p>
                                                </PanelItem>
                                                <PanelItem
                                                        className="IsRev"
                                                        image={getAssetPath("/images/picsum/011.jpg")}
                                                >
                                                        <h3 className="font-bold mb-2 text-slate-900">2. 撮影</h3>
                                                        <p className="text-slate-700">機材のセットアップから撮影まで、スタッフがサポートします。</p>
                                                </PanelItem>
                                                <PanelItem image={getAssetPath("/images/picsum/012.jpg")}>
                                                        <h3 className="font-bold mb-2 text-slate-900">3. 納品</h3>
                                                        <p className="text-slate-700">現像・レタッチのオプションもご用意しています。</p>
                                                </PanelItem>
                                        </Panel>
				</FlexR>
			</section> */}
                        

			{/* FAQ - Toggle IsQa */}
			<section className="wrapper into ">
				<h2 className="text-center font-bold text-slate-900 mb-12">
					<span className="sub block mr-0">FAQ</span> よくある質問
				</h2>
				<div className="wid" style={{ "--wid": "720px" } as React.CSSProperties}>
					<Toggle className="IsQa">
						<ToggleSummary>初めてでも利用できますか？</ToggleSummary>
						<ToggleBody>
							<p className="text-slate-700">
								はい。機材の使い方やライティングのアドバイスも行っています。お気軽にご相談ください。
							</p>
						</ToggleBody>
					</Toggle>
					<Toggle className="IsQa">
						<ToggleSummary>機材の持ち込みは可能ですか？</ToggleSummary>
						<ToggleBody>
							<p className="text-slate-700">
								可能です。カメラ・レンズ・ストロボなど、ご自身の機材をお持ち込みいただけます。
							</p>
						</ToggleBody>
					</Toggle>
					<Toggle className="IsQa">
						<ToggleSummary>キャンセルポリシーは？</ToggleSummary>
						<ToggleBody>
							<p className="text-slate-700">
								前日まで：無料。当日：50% のキャンセル料が発生します。詳細は予約時にご確認ください。
							</p>
						</ToggleBody>
					</Toggle>
				</div>
			</section>
			{/* FAQ - Toggle IsQa */}
			<section className="wrapper into ">
				<h2 className="text-center font-bold text-slate-900 mb-12">
					<span className="sub block mr-0">FAQ</span> よくある質問
				</h2>
				<div className="wid" style={{ "--wid": "720px" } as React.CSSProperties}>
					<Toggle className="IsQa">
						<ToggleSummary>初めてでも利用できますか？</ToggleSummary>
						<ToggleBody>
							<p className="text-slate-700">
								はい。機材の使い方やライティングのアドバイスも行っています。お気軽にご相談ください。
							</p>
						</ToggleBody>
					</Toggle>
					<Toggle className="IsQa">
						<ToggleSummary>機材の持ち込みは可能ですか？</ToggleSummary>
						<ToggleBody>
							<p className="text-slate-700">
								可能です。カメラ・レンズ・ストロボなど、ご自身の機材をお持ち込みいただけます。
							</p>
						</ToggleBody>
					</Toggle>
					<Toggle className="IsQa">
						<ToggleSummary>キャンセルポリシーは？</ToggleSummary>
						<ToggleBody>
							<p className="text-slate-700">
								前日まで：無料。当日：50% のキャンセル料が発生します。詳細は予約時にご確認ください。
							</p>
						</ToggleBody>
					</Toggle>
				</div>
			</section>
			</main>

			{/* Footer */}
			<footer className="wrapper into bg-slate-950 text-slate-200 py-12">
				<div className="text-center">
					<p className="font-semibold mb-4">NEXUS STUDIO</p>
					<Link to="/" className="text-slate-400 hover:text-white font-medium transition-colors">
						← Preview ページへ戻る
					</Link>
				</div>
			</footer>
		</>
	);
}

export default Test2;
