// 현재 보이는 섹션에 맞춰 내비게이션 링크 강조 (scroll spy)
const navLinks = document.querySelectorAll('header a[href^="#"]');
const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sectionIds.forEach((id) => {
  const section = document.getElementById(id);
  if (section) spyObserver.observe(section);
});

// 연도 자동 표시
document.getElementById('year').textContent = new Date().getFullYear();

// 모바일 메뉴 토글
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

function setMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  iconOpen.classList.toggle('hidden', open);
  iconClose.classList.toggle('hidden', !open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}

menuToggle.addEventListener('click', () => {
  setMenu(mobileMenu.classList.contains('hidden'));
});

// 모바일 메뉴 링크를 누르면 메뉴 닫기
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// 스크롤 시 헤더 그림자
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive: true });

// 요소가 화면에 들어오면 나타나는 애니메이션
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 프로젝트 태그 필터
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));

    projectCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});
