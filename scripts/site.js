const nav = document.querySelector('nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const consentBanner = document.querySelector('.cookie-banner');
const consentButton = document.querySelector('.cookie-banner button');

const closeMenu = () => {
  links?.classList.remove('show');
  toggle?.setAttribute('aria-expanded', 'false');
  dropdownMenu?.classList.remove('show');
  dropdownToggle?.setAttribute('aria-expanded', 'false');
};

const hasConsent = () => localStorage.getItem('analytics-consent') === 'granted';

const loadAnalytics = () => {
  if (window.__analyticsLoaded || !hasConsent()) return;
  window.__analyticsLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-LJX72YS86V';
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-LJX72YS86V');
};

if (consentBanner && consentButton) {
  if (hasConsent()) {
    consentBanner.remove();
    loadAnalytics();
  } else {
    consentButton.addEventListener('click', function () {
      localStorage.setItem('analytics-consent', 'granted');
      consentBanner.remove();
      loadAnalytics();
    });
  }
}

window.addEventListener('scroll', function () {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
});

if (toggle && links) {
  toggle.addEventListener('click', function (event) {
    event.stopPropagation();
    const open = links.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
    if (!open) {
      dropdownMenu?.classList.remove('show');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

if (dropdownToggle && dropdownMenu) {
  dropdownToggle.addEventListener('click', function (event) {
    event.stopPropagation();
    const open = dropdownMenu.classList.toggle('show');
    dropdownToggle.setAttribute('aria-expanded', String(open));
  });
}

links?.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  });
});

document.addEventListener('click', function (event) {
  if (!event.target.closest('.dropdown') && !event.target.closest('.nav-toggle')) {
    dropdownMenu?.classList.remove('show');
    dropdownToggle?.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
