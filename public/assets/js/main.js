// スクロール連動フェードイン
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".js-fade-in");

  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target); // 1度だけ発火
      }
    });
  }, options);

  targets.forEach(el => {
    el.classList.add("fade-in"); // 初期スタイル付与
    observer.observe(el);
  });
});

// KV読み込み時フェードイン
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ページ内リンク
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ページトップへ戻るボタン
document.querySelector('.footer-to-page-top')?.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
