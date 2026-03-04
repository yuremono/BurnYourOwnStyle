import { Cards, Item } from './components/Cards';
// import './App.css';

function App() {
  return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Cards プレビュー - Tailwind CSS 上書きテスト
				</h1>

				{/* 基本の 3 カラム */}
				<section className="mb-12">
					<h2 className="text-xl font-semibold mb-4">
						基本 3 カラム - <code>class="Cards col3"</code>
					</h2>
					<div
						className="Cards col3"
						style={{ "--gap": "30px" } as React.CSSProperties}
					>
						<Item>
							<div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
								<h3 className="text-2xl font-bold mb-2">
									カード 1
								</h3>
								<p className="text-blue-100">
									ここで Tailwind クラスを使って装飾できます。
									<code>bg-blue-500</code>、
									<code>hover:bg-blue-600</code> など。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-green-500 text-white p-8 rounded-lg shadow-lg hover:bg-green-600 transition-colors">
								<h3 className="text-2xl font-bold mb-2">
									カード 2
								</h3>
								<p className="text-green-100">
									Burn Your Own Style
									のクラスはレイアウト骨格のみ担当。
									<br />
									装飾は Tailwind で上書きできます。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-purple-500 text-white p-8 rounded-lg shadow-lg hover:bg-purple-600 transition-colors">
								<h3 className="text-2xl font-bold mb-2">
									カード 3
								</h3>
								<p className="text-purple-100">
									<code>--gap: 30px</code>{" "}
									でカード間隔も制御可能。 Tailwind の{" "}
									<code>gap-</code> クラスでも上書きできます。
								</p>
							</div>
						</Item>
					</div>
				</section>

				{/* Gap20 で 3 カラム */}
				<section className="mb-12">
					<h2 className="text-xl font-semibold mb-4">
						Gap20 で 3 カラム -{" "}
						<code>class="Cards col3" style="--gap: 20px"</code>
					</h2>
					<div
						className="Cards col3"
						style={{ "--gap": "20px" } as React.CSSProperties}
					>
						<Item>
							<div className="bg-red-500 text-white p-6 rounded-md shadow-md">
								<h3 className="text-xl font-bold">
									Gap20 カード 1
								</h3>
								<p className="text-red-100">
									ギャップが 20px に縮小されています。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-yellow-500 text-white p-6 rounded-md shadow-md">
								<h3 className="text-xl font-bold">
									Gap20 カード 2
								</h3>
								<p className="text-yellow-100">
									よりコンパクトなレイアウト。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-pink-500 text-white p-6 rounded-md shadow-md">
								<h3 className="text-xl font-bold">
									Gap20 カード 3
								</h3>
								<p className="text-pink-100">
									Tailwind の color utility
									もそのまま使えます。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-indigo-500 text-white p-6 rounded-md shadow-md">
								<h3 className="text-xl font-bold">
									Gap20 カード 4
								</h3>
								<p className="text-indigo-100">
									4 つ目のカードも表示されます（4
									カラム分余白）。
								</p>
							</div>
						</Item>
					</div>
				</section>

				{/* 4  カラム */}
				<section className="mb-12">
					<h2 className="text-xl font-semibold mb-4">
						4 カラム - <code>class="Cards col4"</code>
					</h2>
					<div
						className="Cards col4"
						style={
							{
								"--gap": "40px",
								"--wid": "1200px",
							} as React.CSSProperties
						}
					>
						<Item>
							<div className="bg-teal-500 text-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
								<h3 className="text-3xl font-bold mb-2">
									4 カラム
								</h3>
								<p className="text-teal-100">
									幅広の 4 カラムレイアウト。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-orange-500 text-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
								<h3 className="text-3xl font-bold mb-2">
									カード 2
								</h3>
								<p className="text-orange-100">
									Tailwind の <code>shadow-xl</code>、
									<code>hover:shadow-2xl</code> も効きます。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-cyan-500 text-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
								<h3 className="text-3xl font-bold mb-2">
									カード 3
								</h3>
								<p className="text-cyan-100">
									gradient-bg も使えます。
								</p>
							</div>
						</Item>
						<Item>
							<div className="bg-fuchsia-500 text-white p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
								<h3 className="text-3xl font-bold mb-2">
									カード 4
								</h3>
								<p className="text-fuchsia-100">
									font-size や font-weight 制御も可能。
								</p>
							</div>
						</Item>
					</div>
				</section>

				{/* IsLayer モード */}
				<section className="mb-12">
					<h2 className="text-xl font-semibold mb-4">
						IsLayer モード - <code>Cards col2 IsLayer</code>
					</h2>
					<div
						className="Cards col2 IsLayer"
						style={
							{
								"--gap": "30px",
								"--wid": "1000px",
							} as React.CSSProperties
						}
					>
						<Item>
							<figure className="overflow-hidden rounded-lg">
								<img
									src="https://picsum.photos/400/300?random=1"
									alt="イメージ 1"
									className="w-full h-64 object-cover"
								/>
							</figure>
							<div className="content p-6 bg-white/90 backdrop-blur-sm rounded-lg">
								<h3 className="text-2xl font-bold text-gray-800 mb-2">
									レイヤー 1
								</h3>
								<p className="text-gray-600">
									レイヤーモードでは画像とテキストを重ねられます。
									<br />
									Tailwind の <code>
										backdrop-blur
									</code> や <code>bg-white/90</code>{" "}
									も使用可能。
								</p>
							</div>
						</Item>
						<Item>
							<figure className="overflow-hidden rounded-lg">
								<img
									src="https://picsum.photos/400/300?random=2"
									alt="イメージ 2"
									className="w-full h-64 object-cover"
								/>
							</figure>
							<div className="content p-6 bg-black/70 text-white rounded-lg">
								<h3 className="text-2xl font-bold mb-2">
									レイヤー 2
								</h3>
								<p className="text-gray-300">
									<code>absolute</code>
									で画像上にテキストを配置。
									<br />
									装飾は Tailwind で自由自在。
								</p>
							</div>
						</Item>
					</div>
				</section>
			</div>
		</div>
  );
}

export default App;
