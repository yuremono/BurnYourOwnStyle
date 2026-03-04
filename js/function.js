// document.addEventListener('DOMContentLoaded', () => {//開発用scroll位置管理
//     if ('scrollRestoration' in history) {
//         history.scrollRestoration = 'manual';
//     }
//     window.addEventListener('beforeunload', function () {
//         sessionStorage.setItem('scrollY', window.scrollY);
//     });
//     window.addEventListener('load', function () {
//         const scrollY = sessionStorage.getItem('scrollY');
//         if (scrollY !== null) {
//             window.scrollTo(0, parseInt(scrollY, 10));
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', () => {// img タグに lazy
    const images = document.querySelectorAll('#contents img');
    images.forEach(img => {
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            img.src = dataSrc; // data-srcがあればsrcに設定
        }
        img.setAttribute('loading', 'lazy');
    });
});
document.addEventListener('DOMContentLoaded', () => {//cssスライダー最後で止まり画面外でリセット
    const mvSnap = document.querySelector('.mv_snap');
    if (mvSnap) {
        const slideCount = mvSnap.children.length;
        mvSnap.style.setProperty('--count', slideCount);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });
        observer.observe(mvSnap);
    }
});
document.addEventListener('DOMContentLoaded', () => {//パンくず.pan1 ポリシーサイト名.website_name
    const POLICY_TEXT = document.querySelector('.f_copy > span')?.textContent || '';
    const websiteNames = document.querySelectorAll('.website_name');
    if (websiteNames.length && POLICY_TEXT) {
        websiteNames.forEach(el => {
            el.textContent = POLICY_TEXT;  // テキストのみ
            // el.innerHTML = POLICY_TEXT; // HTMLごと入れる
        });
    }
    const HOME_TEXT = (document.querySelector('.f_copy>span')?.textContent || '') + "ホーム";// トップページのリンクテキストを設定
    const H1 = document.querySelector('.title1 h1>span  ');// h1を指定している要素を取得
    // const H1 = document.querySelector('.title1 h1 span:first-of-type ');// h1を指定している要素を取得
    const CURRENT_PAGE_URL = location.href;// 現在のurlを取得
    const HOME_PAGE_URL = `https://${location.host}`;// トップページのurlを取得
    const PAN = document.querySelector('pan');// パンくずを表示させる要素を取得
    // const HOME_TEXT = document.querySelector('.f_copy>span ').textContent;// トップページのリンクテキストを設定
    if (H1 && PAN) {
        const H1_TEXT = H1.textContent || '';// 現在のh1テキストからリンクテキストを設定
        const BREADCRUMB_HTML = `
        <ul itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList">
            <li itemprop="itemListElement" itemscope="itemscope" itemtype="https://schema.org/ListItem">
                <meta itemprop="position" content="1">
                <a itemprop="item" itemscope="itemscope" itemtype="http://schema.org/Thing" href="${HOME_PAGE_URL}" itemid="${HOME_PAGE_URL}">
                    <meta itemprop="name" content="${HOME_TEXT}">
                    ${HOME_TEXT}
                </a>
            </li>
            <li aria-hidden="true" class="breadcrumb-separator">›</li>
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <meta itemprop="position" content="2">
                <span itemprop="name">${H1_TEXT}</span>
            </li>
        </ul>
        `
        PAN.insertAdjacentHTML('afterbegin', BREADCRUMB_HTML);
    }
});

document.addEventListener('DOMContentLoaded', () => {// その他クラス処理
    
    document.querySelectorAll('.budoux').forEach(el => {// autoPhrase(文節改行)
        el.innerHTML = `<budoux-ja>${el.innerHTML}</budoux-ja>`;
    });

    document.querySelectorAll('.policy-trigger, .policy-wrap').forEach(el => {// ポリシートグル
        el.addEventListener('click', e => {
            e.currentTarget.classList.toggle('active');
        });
    });

    try {//horizontal scroll ＆scroll-hintはCDN「 横スクロール＞できます」表示 
        new ScrollHint('.__scrollX, .tbl_scroll', {
            i18n: {
                scrollable: 'スクロールできます'
            }
        });
        let scrollElement = document.querySelectorAll(".__scrollX, .tbl_scroll");
        document.querySelectorAll('.__scrollX').forEach(el => {
            const hint = el.querySelector('.scroll-hint-icon-wrap');
            if (hint) el.prepend(hint);
        });
        scrollElement.forEach((el) => {// スクロールヒントとは別処理、マウス上下スクロールを横スクロールに
            el.addEventListener("wheel", (e) => {
                if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
                let maxScrollLeft = el.scrollWidth - el.clientWidth;
                if (
                    (el.scrollLeft <= 0 && e.deltaY < 0) ||
                    (el.scrollLeft >= maxScrollLeft && e.deltaY > 0)
                )
                    return;
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            });
        });
    } catch (error) { console.log(error); }

});

document.addEventListener('DOMContentLoaded', () => {//navigation ヘッダーナビゲーション sp用ナビはh_navを複製
    try {

        // sp用($menu以下)のナビゲーション
        const hNav = document.querySelector('.h_nav');
        const navSp = hNav.cloneNode(true);
        navSp.id = 'navsp';
        navSp.setAttribute('role', 'navigation');
        navSp.setAttribute('aria-label', 'main navigation');
        navSp.classList.remove('h_nav');
        navSp.classList.add('nav');

        const navInner = document.createElement('div');
        navInner.className = 'nav_inner';
        navInner.innerHTML = navSp.innerHTML;
        navSp.innerHTML = '';
        navSp.appendChild(navInner);

        hNav.parentNode.insertBefore(navSp, hNav.nextSibling);

        const menu = document.querySelector(".h_menu");
        const navPc = document.querySelector(".h_nav");
        const navLinks = document.querySelectorAll(".h_nav a");
        const contents = document.querySelector("#contents");
        const nSp = document.querySelector("#navsp");
        const nUl = document.querySelector("#navsp ul");
        const toggleBtns = document.querySelectorAll(".menu_toggle, .nav a:not(.nopointer,.drop_toggle)");
        const contactLinks = document.querySelectorAll(".h_items a");
        const dropToggles = document.querySelectorAll(".drop_toggle");
        const gHeader = document.querySelector("#global_header");
        const header = document.querySelector('#header');
        const focusTrap = document.querySelector('.focus_trap');

        const btnPress = () => {//メニューボタン押した時の変化
            navPc.inert = navPc.inert === true ? false : true;
            nSp.classList.toggle("show");
            nUl.classList.toggle("show");
            menu.ariaPressed = menu.ariaPressed === "true" ? "false" : "true";
            menu.ariaExpanded = menu.ariaExpanded === "true" ? "false" : "true";
            menu.ariaLabel =
                menu.ariaLabel === "menu open" ?
                    "menu close" :
                    "menu open";
            header.classList.toggle("active");
            menu.classList.toggle("active");
        };
        // btnPress();

        navLinks.forEach((el) => {
            el.addEventListener("click", () => {
                setTimeout(() => {
                    el.blur();
                }, 600);
            });
        });
        contactLinks.forEach((el) => {
            el.addEventListener("click", () => {
                if (header.classList.contains("active")) {
                    btnPress();
                }
            });
        });
        toggleBtns.forEach((el) => {
            el.addEventListener("click", () => {
                btnPress();
            });
        });
        focusTrap.addEventListener("focus", () => {
            menu.focus();
        });
        window.onkeyup = function (event) {
            if (event.keyCode == '27' && menu.ariaPressed === "true") {
                btnPress();
            }
        }
        // window.addEventListener("keydown", () => {
        //     if (menu.ariaPressed === "true") {
        //         if (event.key === "Escape") {
        //             btnPress();
        //         }
        //     }
        // });
        // アコーディオン開閉
        const dropDown = (el) => {// sp ナビのトグル
            const parent = el.closest('li');
            const target = el.closest('li').querySelector('ul');
            target.classList.toggle("show");
            el.classList.toggle("active");
            parent.ariaExpanded = parent.ariaExpanded === "true" ? "false" : "true";
            target.ariaHidden = target.ariaHidden === "false" ? "true" : "false";
            target.ariaLabel = target.ariaLabel === "open" ? "close" : "open";
        }
        dropToggles.forEach((el) => {// sp ナビのトグル実行
            el.addEventListener("click", () => {
                dropDown(el);
            });
        });
    } catch (error) { console.log(error); }
});
document.addEventListener('DOMContentLoaded', () => {// IntersectionObserver ヘッダー変形 .trans or .init
    const head = document.querySelectorAll(//対象、この要素が画面に出入りすることを監視
        ".mv,.first,.title1,.page-title"
    );
    const headerIO = document.querySelector('#header:not(.upInit)');
    const headerScroll = document.querySelector('#header.upInit');

    const observerH = new IntersectionObserver(IOhead, { rootMargin: "0% 0% -0% 0px", threshold: 0.5 });
    function IOhead(entries) {
        entries.forEach(function (entry, i) {//スクロール時trans(変形) or 上端でinit(初期化)
            if (headerIO) {
                if (entry.isIntersecting) {
                    headerIO.classList.remove('trans');
                    // headerIO.classList.add('init');
                }
                else {
                    headerIO.classList.add('trans');
                    // headerIO.classList.remove('init'); 
                }
            }
        });
    }
    head.forEach((tgt) => { observerH.observe(tgt); });

    let lastScroll = 0;
    let ticking = false;
    const scrollThreshold = 20; // この値以上スクロールしたら判定
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDiff = currentScroll - lastScroll;

                if (Math.abs(scrollDiff) > scrollThreshold) {
                    if (scrollDiff > 0) {
                        // 下スクロール
                        if (headerScroll) headerScroll.classList.add('trans');
                    } else {
                        // 上スクロール
                        if (headerScroll) headerScroll.classList.remove('trans');
                    }
                    lastScroll = currentScroll;
                }

                ticking = false;
            });
            ticking = true;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {// IntersectionObserver その他 .show
    const Once = document.querySelectorAll( // 一度のみ
        "[class*=js-]:not([class*=js-ch],.js-bgFix),[class*=js-ch]>*,.em-clip em"
    );
    const observerO = new IntersectionObserver(IOonce, {
        rootMargin: "0% 0% -15% 0px",
        threshold: 0,
        // root: document.body,
    });
    function IOonce(entries) {
        entries.forEach(function (entry, i) {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add("show");
            }
        });
    }
    Once.forEach((tgt) => { observerO.observe(tgt); });

    const Toggle = document.querySelectorAll(// トグル、フェードインアウト
        ".f_main,.js-bgFix"
    );
    const observerT = new IntersectionObserver(IOtoggle, { rootMargin: "-0% 0% -50% 0px", });
    function IOtoggle(entries) {
        entries.forEach(function (entry, i) {
            const target = entry.target;
            if (entry.isIntersecting) { target.classList.add("show"); }
            else { target.classList.remove("show"); }
        });
    }
    Toggle.forEach((tgt) => { observerT.observe(tgt); });

});

document.addEventListener('DOMContentLoaded', () => {// ページ毎処理 ページ設定でクラス付与できるが自動処理やshopにページタイトルつける時など
    // let pageT = location.pathname.slice(1).replace(".html", "");
    // let param = location.search;
    // let html = $('html');
    // if (pageT == "" || pageT.includes("index") || param.includes("page=776&token")) {
    //     html.addClass("home");
    // }
    // else {
    //     if (pageT.includes("blog")) {
    //         html.addClass("blog");

    //     }
    //     else
    //     if (pageT.includes("shop")) {
    //         html.addClass("shop");
    //     }
    // }
});



document.addEventListener('DOMContentLoaded', () => {//文字分割 一文字ずつspanで囲む
    class SpanWrap {//spanwrap
        constructor(target, globalIndex) {
            this.target = this.convertElement(target);
            this.nodes = [...this.target.childNodes];
            this.charIndex = globalIndex.count; // グローバルカウンターを参照
            this.globalIndex = globalIndex; // 参照を保持
            this.convert();
        }
        convert() {
            let spanWrapText = ""
            this.nodes.forEach((node) => {
                if (node.nodeType == 3) {//テキストの場合
                    const text = node.textContent.replace(/\r?\n/g, '');//テキストから改行コード削除
                    //spanで囲んで連結
                    spanWrapText = spanWrapText + text.split('').reduce((acc, v) => {
                        const delay = (this.globalIndex.count * 0.075).toFixed(2); // 小数点2桁に丸める
                        const span = `<span style="--char-index:${this.globalIndex.count}; transition-delay:${delay}s;">${v}</span>`;
                        this.globalIndex.count++;
                        return acc + span;
                    }, "");
                }
                else {//<br>などテキスト以外の要素をそのまま連結
                    spanWrapText = spanWrapText + node.outerHTML
                }
            })
            this.target.innerHTML = spanWrapText.replace(/\n/, '');
        }
        //jQueryオブジェクトや文字列セレクターを変換
        convertElement(element) {
            if (element instanceof HTMLElement) { return element }
            if (element instanceof jQuery) { return element[0] }
            return document.querySelector(element);
        }
    }
    // span分離実行
    const targets = [...document.querySelectorAll(".js-letter >span")]
    const globalIndex = { count: 0 }; // 全体で共有するカウンター
    targets.forEach((target) => {
        new SpanWrap(target, globalIndex);
    })
});
// $(window).on('load', function () {//scrollbar幅取得
//     const scrollbarWidth = window.innerWidth - document.body.clientWidth;
//     const setProp = document.querySelectorAll('.mv,.title1');
//     if (setProp.length) {
//         setProp.forEach((el) => {
//             el.style.setProperty('--scrollBar', `${scrollbarWidth}px`);
//         });
//     }
// });
// document.addEventListener('DOMContentLoaded', () => {//title1を#contents前に
//     try {
//         $('.sectionWood .title1').prependTo('#contents');
//     } catch (error) { console.log(error); }
// });


// document.addEventListener('DOMContentLoaded', () => {//webstorage loadローディング   header初期非表示
//     try {
//         $('header').addClass('hide');
//         $(".op-close").on("click", function () {
//             $('.op').attr('style', "transition-duration: 0.6s;");
//             $('.op').addClass('closed');
//             $('header').removeClass('hide');
//             $(".op_slide ul").slick('slickPause');
//         });
//         const webStorage = function () {
//             if (sessionStorage.getItem('visit')) {//2回目以降の処理
//                 $('.op').addClass('closed');
//                 $('header').removeClass('hide');
//                 $(".op_slide ul").slick('slickPause');
//                 // document.querySelector('.op').setAttribute("style", "display:none;");
//             } else {//初回訪問時の処理
//                 sessionStorage.setItem('visit', 'true'); //sessionStorageにデータ格納
//             }
//         };
//         webStorage();
//     } catch (error) { console.log(error); }
// });

document.addEventListener('DOMContentLoaded', () => { // MV動画 lazy再生処理
    // <video id="video01" autoplay loop muted playsinline preload="none" poster="/images/home/mv03.jpg" data-src="/images/home/481877471Slow.mp4"></video> srcをdata-srcに移動し、preload="none"で読み込み抑制
    const mvVideos = document.querySelectorAll('.video_container,.video_container2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;
            const video = container.querySelector('video');

            // 交差したら src をセットして再生
            if (entry.isIntersecting) {
                if (video && video.dataset.src && !video.getAttribute('src')) {
                    video.setAttribute('src', video.dataset.src);
                    video.load();
                }
                if (video && typeof video.play === 'function') {
                    video.play().catch(() => { /* 自動再生ブロック対策 */ });
                }
            } else {
                if (video && typeof video.pause === 'function') {
                    video.pause();
                }
            }

            // YouTube iframe対応（既存ロジック維持）
            const iframe = container.querySelector('iframe');
            if (iframe && iframe.src.includes('youtube.com')) {
                const command = entry.isIntersecting ? 'playVideo' : 'pauseVideo';
                iframe.contentWindow.postMessage(
                    JSON.stringify({
                        event: 'command',
                        func: command,
                        args: ''
                    }),
                    '*'
                );
            }
        });
    }, { threshold: 0.1 });

    mvVideos.forEach(el => observer.observe(el));
});
