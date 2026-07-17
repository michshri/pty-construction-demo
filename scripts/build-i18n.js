const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const localesDir = path.join(root, 'locales');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getPagePath(locale, pageKey) {
  const pageMap = {
    home: 'index.html',
    construction: 'construction.html',
    renovations: 'renovations.html',
    propertyManagement: 'property-management.html',
    investment: 'investment.html',
    contact: 'contact.html'
  };
  const pageFile = pageMap[pageKey];
  return locale === 'en' ? pageFile : `es/${pageFile}`;
}

function getAssetPath(locale, asset) {
  return locale === 'en' ? asset : `../${asset}`;
}

function renderNav(locale, currentPage) {
  const common = readJson(path.join(localesDir, locale, 'common.json'));
  const homeHref = locale === 'en' ? 'index.html' : 'index.html';
  const contactHref = locale === 'en' ? 'contact.html' : 'contact.html';
  const switchHref = locale === 'en' ? 'es/index.html' : '../index.html';
  const switchLabel = locale === 'en' ? 'ES' : 'EN';
  const services = [
    { href: locale === 'en' ? 'construction.html' : 'construction.html', label: 'Construction' },
    { href: locale === 'en' ? 'renovations.html' : 'renovations.html', label: 'Renovations' },
    { href: locale === 'en' ? 'property-management.html' : 'property-management.html', label: 'Property Management' },
    { href: locale === 'en' ? 'investment.html' : 'investment.html', label: 'Investment Support' }
  ];

  return `
<nav>
<a href="${homeHref}" class="logo">${common.siteName}</a>
<button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-nav">
<span></span><span></span><span></span>
</button>
<div class="nav-links" id="primary-nav">
<div class="nav-item dropdown">
<button class="dropdown-toggle" type="button" aria-expanded="false">${common.nav.services} <span class="caret">▾</span></button>
<div class="dropdown-menu">
${services.map((service) => `<a href="${service.href}">${service.label}</a>`).join('')}
</div>
</div>
<a href="${locale === 'en' ? 'index.html#projects' : 'index.html#projects'}">${common.nav.projects}</a>
<a href="${locale === 'en' ? 'index.html#about' : 'index.html#about'}">${common.nav.about}</a>
<a class="button nav-cta" href="${contactHref}">${common.nav.contact}</a>
<span class="lang-switch"><a href="${switchHref}" class="${locale === 'en' ? 'active' : ''}">EN</a><a href="${locale === 'en' ? 'es/index.html' : '../index.html'}" class="${locale === 'es' ? 'active' : ''}">ES</a></span>
</div>
</nav>`;
}

function renderFooter(locale) {
  const common = readJson(path.join(localesDir, locale, 'common.json'));
  return `
<footer>
<div class="footer-brand">
<h3>${common.footer.brand}</h3>
<p>${common.footer.location}</p>
<a class="footer-link" href="${locale === 'en' ? 'contact.html' : 'contact.html'}">${common.cta.arrangeConsultation}</a>
</div>
<p class="footer-disclaimer">${common.footer.disclaimer}</p>
<p class="footer-copy">${common.footer.copyright}</p>
</footer>`;
}

function renderHomePage(locale) {
  const common = readJson(path.join(localesDir, locale, 'common.json'));
  const home = common.home;
  const title = common.pages.home.title;
  const description = common.pages.home.description;
  const nav = renderNav(locale, 'home');
  const footer = renderFooter(locale);
  const assetPath = getAssetPath(locale, 'styles.css');
  const scriptPath = getAssetPath(locale, 'scripts/site.js');
  const ctaHref = locale === 'en' ? 'contact.html' : 'contact.html';
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="https://example.com/${locale === 'en' ? '' : 'es/'}">
<link rel="alternate" hreflang="en" href="https://example.com/">
<link rel="alternate" hreflang="es" href="https://example.com/es/">
<link rel="stylesheet" href="${assetPath}">
</head>
<body>
${nav}
<div class="hero" style="background-image: url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80');">
<div class="hero-inner">
<span class="hero-label">${home.heroLabel}</span>
<h1>${home.heroTitle}</h1>
<p>${home.heroText}</p>
<a class="button" href="${ctaHref}">${common.cta.bookConsultation}</a>
</div>
</div>
<section id="services">
<div class="section-header">
<span class="section-label">${home.servicesLabel}</span>
<h2>${home.servicesTitle}</h2>
</div>
<div class="grid">
<div class="card"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80" alt="Luxury construction project"><div><h3>Construction</h3><p>New builds, villas and complete property projects managed from concept to completion.</p><a href="construction.html">Learn more</a></div></div>
<div class="card"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80" alt="Luxury interior renovation"><div><h3>Luxury Renovations</h3><p>Bathrooms, kitchens and interiors where craftsmanship matters.</p><a href="renovations.html">Learn more</a></div></div>
<div class="card"><img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" alt="Property management services"><div><h3>Property Management</h3><p>Maintenance, improvements and care for homes and investment properties.</p><a href="property-management.html">Learn more</a></div></div>
<div class="card"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" alt="Panama property investment"><div><h3>Property Investment Support</h3><p>Helping owners and investors improve and protect their Panama assets.</p><a href="investment.html">Learn more</a></div></div>
</div>
</section>
<section id="projects" class="projects-section">
<div class="section-header">
<span class="section-label">${home.featuredLabel}</span>
<h2>${home.featuredTitle}</h2>
</div>
<div class="grid">
<div class="card"><div><h3>Oceanfront Villa Delivery</h3><p>Full construction oversight for a premium Panama residence with remote owner coordination, schedule discipline and detailed finish management.</p></div></div>
<div class="card"><div><h3>Historic Home Renovation</h3><p>Interior transformation focused on premium kitchen and bathroom upgrades, elegant finishes and long-term durability.</p></div></div>
<div class="card"><div><h3>Property Care Program</h3><p>Ongoing property management support for owners abroad with maintenance planning, contractor coordination and proactive communication.</p></div></div>
</div>
</section>
<section id="about" class="about-section">
<div class="section-header">
<span class="section-label">${home.aboutLabel}</span>
<h2>${home.aboutTitle}</h2>
</div>
<div class="about-grid">
<div class="about-card"><h3>Trusted on the ground</h3><p>We provide dependable project oversight, thoughtful communication and practical solutions for homes, renovations and investments throughout Panama.</p></div>
<div class="about-card"><h3>Built around clarity</h3><p>Every engagement is shaped by transparent planning, rigorous execution and a calm, professional approach that supports confident decisions from a distance.</p></div>
</div>
</section>
<section class="trust-section">
<div class="section-header">
<span class="section-label">${home.trustLabel}</span>
<h2>${home.trustTitle}</h2>
</div>
<div class="trust-grid">
<div class="trust-card"><h3>Remote oversight</h3><p>We manage planning, scheduling, contractor coordination and site follow-up while keeping you informed with clear milestones and practical updates.</p></div>
<div class="trust-card"><h3>Local execution</h3><p>We bridge Panama’s construction realities with the discipline, communication and accountability expected by international owners.</p></div>
<div class="trust-card"><h3>Clear progress reporting</h3><p>Receive timely updates, milestone tracking and thoughtful guidance so your project remains predictable throughout delivery.</p></div>
<div class="trust-card"><h3>Protecting your investment</h3><p>Whether you are planning a new build, comprehensive renovation or long-term property care, our focus is value, durability and peace of mind.</p></div>
</div>
</section>
<section class="dark">
<div class="section-header">
<span class="section-label" style="color: var(--color-gold-light);">${home.promiseLabel}</span>
<h2>${home.promiseTitle}</h2>
</div>
<p>${home.promiseText}</p>
<p>${home.promiseBody}</p>
</section>
${footer}
<script src="${scriptPath}"></script>
</body>
</html>`;
}

function renderServicePage(locale, pageKey) {
  const common = readJson(path.join(localesDir, locale, 'common.json'));
  const pageContent = common.pages[pageKey];
  const nav = renderNav(locale, pageKey);
  const footer = renderFooter(locale);
  const title = pageContent.title;
  const description = pageContent.description;
  const heroImage = pageKey === 'construction' ? 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80' : pageKey === 'renovations' ? 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80' : pageKey === 'propertyManagement' ? 'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1920&q=80' : 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80';
  const assetPath = getAssetPath(locale, 'styles.css');
  const scriptPath = getAssetPath(locale, 'scripts/site.js');
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="https://example.com/${locale === 'en' ? '' : 'es/'}">
<link rel="alternate" hreflang="en" href="https://example.com/">
<link rel="alternate" hreflang="es" href="https://example.com/es/">
<link rel="stylesheet" href="${assetPath}">
</head>
<body>
${nav}
<div class="hero hero-sub" style="background-image: url('${heroImage}');">
<div class="hero-inner">
<span class="hero-label">${pageContent.heroLabel}</span>
<h1>${pageContent.heroTitle}</h1>
</div>
</div>
<section>
<div class="section-header">
<span class="section-label">${pageContent.sectionLabel}</span>
<h2>${pageContent.sectionTitle}</h2>
</div>
<div class="page-intro">
<p>${pageContent.introP1}</p>
<p>${pageContent.introP2}</p>
</div>
<div class="content-cards">
${pageContent.cards.map((card) => `<div class="card"><h3>${card.title}</h3><p>${card.body}</p></div>`).join('')}
</div>
<div class="cta-wrap"><a class="button" href="contact.html">${common.cta.discussProject}</a></div>
</section>
${footer}
<script src="${scriptPath}"></script>
</body>
</html>`;
}

function renderContactPage(locale) {
  const common = readJson(path.join(localesDir, locale, 'common.json'));
  const nav = renderNav(locale, 'contact');
  const footer = renderFooter(locale);
  const title = locale === 'en' ? 'Contact Vanguardia | Luxury Construction in Panama' : 'Contacto Vanguardia | Construcción de lujo en Panamá';
  const description = locale === 'en' ? 'Arrange a confidential consultation with Vanguardia for luxury construction, renovations and property management in Panama.' : 'Coordina una consulta confidencial con Vanguardia para construcción de lujo, renovaciones y gestión de propiedades en Panamá.';
  const assetPath = getAssetPath(locale, 'styles.css');
  const scriptPath = getAssetPath(locale, 'scripts/site.js');
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="https://example.com/${locale === 'en' ? 'contact.html' : 'es/contact.html'}">
<link rel="alternate" hreflang="en" href="https://example.com/contact.html">
<link rel="alternate" hreflang="es" href="https://example.com/es/contact.html">
<link rel="stylesheet" href="${assetPath}">
</head>
<body>
${nav}
<div class="hero hero-sub" style="background-image: url('https://images.unsplash.com/photo-1494526585095-c41746248156?w=1920&q=80');">
<div class="hero-inner">
<span class="hero-label">${common.contact.headline}</span>
<h1>${common.contact.headline}</h1>
</div>
</div>
<section>
<div class="section-header">
<span class="section-label">${common.contact.introTitle}</span>
<h2>${common.contact.introHeading}</h2>
</div>
<div class="contact-grid">
<div class="contact-card">
<h3>Let’s talk about your goals</h3>
<p>${common.contact.introText}</p>
<ul class="contact-list">
${common.contact.bullets.map((item) => `<li>${item}</li>`).join('')}
</ul>
</div>
<div class="contact-card">
<h3>${common.contact.formTitle}</h3>
<form class="contact-form" action="mailto:hello@vanguardia.com" method="post" enctype="text/plain">
<label>${common.contact.name}<input type="text" name="name" placeholder="${common.contact.placeholderName}"></label>
<label>${common.contact.email}<input type="email" name="email" placeholder="${common.contact.placeholderEmail}"></label>
<label>${common.contact.projectType}<input type="text" name="project" placeholder="${common.contact.placeholderProject}"></label>
<label>${common.contact.message}<textarea name="message" placeholder="${common.contact.placeholderMessage}"></textarea></label>
<a class="button" href="mailto:hello@vanguardia.com?subject=Panama%20Project%20Inquiry">${common.cta.sendInquiry}</a>
</form>
</div>
</div>
</section>
${footer}
<script src="${scriptPath}"></script>
</body>
</html>`;
}

function writePage(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

['en', 'es'].forEach((locale) => {
  const outputDir = locale === 'en' ? root : path.join(root, 'es');
  ensureDir(outputDir);
  if (locale === 'es') {
    const esDir = path.join(root, 'es');
    ensureDir(esDir);
  }

  writePage(path.join(outputDir, 'index.html'), renderHomePage(locale));
  writePage(path.join(outputDir, 'construction.html'), renderServicePage(locale, 'construction'));
  writePage(path.join(outputDir, 'renovations.html'), renderServicePage(locale, 'renovations'));
  writePage(path.join(outputDir, 'property-management.html'), renderServicePage(locale, 'propertyManagement'));
  writePage(path.join(outputDir, 'investment.html'), renderServicePage(locale, 'investment'));
  writePage(path.join(outputDir, 'contact.html'), renderContactPage(locale));
});

console.log('Localized pages generated successfully.');
