import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preview from "./pages/Preview";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path="/" element={<Preview />} />
				<Route path="/test" element={<Test />} />
				<Route path="/test2" element={<Test2 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
