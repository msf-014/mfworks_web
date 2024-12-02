const ham = document.querySelector('.hamburger');
const header = document.querySelector('.header');
const aboutLink = document.querySelector('.header__navitem[href="#about"]');
const links = document.querySelectorAll("header__navitem > a");

// ハンバーガーメニューのクリックイベント
ham.addEventListener('click', function(){
  ham.classList.toggle('active'); // ハンバーガーメニューにactiveクラスを付け外し
  header.classList.toggle('active'); // ナビゲーションメニューにactiveクラスを付け外し
});

ham.addEventListener('click', () => {
  if (headerNavGroup.classList.contains('fade-in')) {
      // フェードアウトに切り替え
      headerNavGroup.classList.remove('fade-in');
      headerNavGroup.classList.add('fade-out');
      
      // アニメーション終了後に display: none を設定
      headerNavGroup.addEventListener('transitionend', () => {
          if (headerNavGroup.classList.contains('fade-out')) {
              headerNavGroup.style.display = 'none';
          }
      }, { once: true });
      
  } else {
      // フェードインに切り替え
      headerNavGroup.classList.remove('fade-out');
      headerNavGroup.classList.add('fade-in');
      headerNavGroup.style.display = 'flex';
  }
});

// カレント表示
links.forEach(function (link) {
    if (link.href === location.href) {
        link.closest("header__navitem").classList.add("current");
    }
});

document.querySelector('#about-link').addEventListener('click', function(event) {
  event.preventDefault();
  const aboutSection = document.querySelector('#about');

  // aboutセクションまでスムーズにスクロール
  window.scrollTo({
    top: aboutSection.offsetTop - 100,
    behavior: 'smooth'
  });

  // aboutセクションを表示するためのクラスを切り替える
  aboutSection.classList.toggle('active');
});

// 画面サイズが820px以下の時のみ、ABOUTをクリックしたときにメニューを非表示にする
aboutLink.addEventListener('click', function() {
  if (window.innerWidth <= 820) {
    ham.classList.remove('active'); // ハンバーガーメニューの非表示
    header.classList.remove('active'); // メニュー全体を非表示
  }
});

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');

  // ページのナビゲーションタイプを取得
  const navigationType = performance.getEntriesByType('navigation')[0]?.type;

  // 別ページからの遷移かどうかを確認
  const isFromAnotherPage = document.referrer && !document.referrer.includes(window.location.origin);

  if (navigationType === 'reload') {
    // ページがリロードされた場合、ローディングを表示
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 3000);
  } else if (isFromAnotherPage) {
    // 別ページからの遷移時はローディングをスキップ
    loader.style.display = 'none';
  } else {
    // 初回訪問時の処理
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 3000);

    // セッションストレージに訪問フラグを設定
    sessionStorage.setItem('visited', 'true');
  }
});





