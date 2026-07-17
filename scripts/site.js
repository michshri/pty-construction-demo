const nav = document.querySelector('nav');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

const closeMenu = () => {
  links?.classList.remove('show');
  toggle?.setAttribute('aria-expanded', 'false');
  dropdownMenu?.classList.remove('show');
  dropdownToggle?.setAttribute('aria-expanded', 'false');
};

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
