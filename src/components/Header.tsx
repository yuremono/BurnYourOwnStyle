import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

function NavUl() {
	return (
		<ul>
			<li>
				<Link to="/">ホーム</Link>
			</li>
			<li>
				<Link to="/test">test</Link>
			</li>
			<li>
				<Link to="/test2">test2</Link>
			</li>
			<li className="drop" aria-expanded="false">
				<a className="droplink drop_toggle" tabIndex={-1}>
					ドロップ
				</a>
				<button
					type="button"
					className="dropbtn drop_toggle"
					aria-label="サブメニューを開閉"
				/>
				<ul aria-hidden="true" aria-label="close">
					<li>
						<a href="#">子リンク</a>
					</li>
				</ul>
			</li>
		</ul>
	);
}

/**
 * LOCAL.html 準拠のヘッダー（#navsp は clone せず JSX で二重化）
 */
export function Header() {
	const innerStyle = { "--innerBG": "var(--WH)" } as CSSProperties;

	return (
		<div id="header" className="h  upInit" style={innerStyle}>
			<div className="h_inner">
				<div className="h_logo [--logoW:180px]" >
					<Link to="/">BYOS</Link>
				</div>
				<button
					type="button"
					className="h_menu menu_toggle burger"
					aria-expanded="false"
					aria-pressed="false"
					aria-controls="nav"
					aria-label="menu open"
				>
					<span className="bar1" />
					<span className="bar2" />
					<span className="bar3" />
				</button>
				<div className="h_items fix-tab">
					<a className="textlink __tel" href="tel:000-000-0000">
                                        tel.000-000-0000
					</a>
					<a className="btn" href="#contact">
						Contact
					</a>
				</div>
				<nav
					className="h_nav"
					id="nav"
					role="navigation"
					aria-label="main navigation"
				>
					<NavUl />
					<div className="focus_trap menu_toggle" tabIndex={0} />
				</nav>
				<nav
					id="navsp"
					className="nav"
					role="navigation"
					aria-label="main navigation (mobile overlay)"
				>
					<div className="nav_inner">
						<NavUl />
					</div>
				</nav>
			</div>
			<div className="h_pagetop">
				<a href="#">ページトップ</a>
			</div>
		</div>
	);
}
