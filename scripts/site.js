const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');
const toggle = document.querySelector('.nav-toggle');
const locale = document.documentElement.lang || 'en';
const contentBase = (window.location.pathname.includes('/es/') || window.location.pathname.includes('/fr/')) ? '../content/' : 'content/';

const defaultContent = {
  services: [
    { active: true, order: 1, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80', link: '#services', cta: { en: 'Learn More', es: 'Más información', fr: 'En savoir plus' }, en: { title: 'Construction & Renovation', description: 'Planning, delivery and quality-led renovation work for homes, buildings and properties that need careful execution.' }, es: { title: 'Construcción y Renovación', description: 'Planificación, ejecución y trabajos de renovación con atención a la calidad para viviendas, edificios y propiedades.' }, fr: { title: 'Construction & Rénovation', description: 'Planification, exécution et travaux de rénovation orientés qualité pour maisons, bâtiments et propriétés.' } },
    { active: true, order: 2, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80', link: '#services', cta: { en: 'Learn More', es: 'Más información', fr: 'En savoir plus' }, en: { title: 'Maintenance & Repairs', description: 'Routine upkeep, repairs and practical improvements that keep properties operating smoothly over time.' }, es: { title: 'Mantenimiento y Reparaciones', description: 'Mantenimiento rutinario, reparaciones y mejoras prácticas para mantener las propiedades en buen funcionamiento.' }, fr: { title: 'Maintenance & Réparations', description: 'Entretien régulier, réparations et améliorations pratiques pour garder les biens en bon état.' } },
    { active: true, order: 3, image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80', link: '#services', cta: { en: 'Learn More', es: 'Más información', fr: 'En savoir plus' }, en: { title: 'Property Management', description: 'Ongoing coordination for maintenance, inspections and day-to-day property care for owners and communities.' }, es: { title: 'Gestión de Propiedades', description: 'Coordinación continua para mantenimiento, inspecciones y cuidado práctico de propiedades para propietarios y comunidades.' }, fr: { title: 'Gestion Immobilière', description: 'Coordination continue de l’entretien, des inspections et de la gestion quotidienne des biens.' } },
    { active: true, order: 4, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', link: '#services', cta: { en: 'Learn More', es: 'Más información', fr: 'En savoir plus' }, en: { title: 'Project Management', description: 'Clear scope, scheduling and communication to keep projects moving with realistic accountability.' }, es: { title: 'Gestión de Proyectos', description: 'Alcance claro, programación y comunicación para mantener los proyectos en movimiento con responsabilidad realista.' }, fr: { title: 'Gestion de Projets', description: 'Portée claire, planning et communication pour faire avancer les projets avec suivi responsable.' } },
    { active: true, order: 5, image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80', link: '#services', cta: { en: 'Learn More', es: 'Más información', fr: 'En savoir plus' }, en: { title: 'Specialized Building Works', description: 'Targeted technical work for structural, building-performance and property improvement needs.' }, es: { title: 'Obras Especializadas', description: 'Trabajos técnicos específicos para necesidades estructurales, de rendimiento y mejora de propiedades.' }, fr: { title: 'Travaux Spécialisés', description: 'Travaux techniques ciblés pour les besoins structurels, de performance et d’amélioration du bien.' } }
  ],
  segments: [
    { active: true, order: 1, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80', link: '#who-we-serve', en: { title: 'Residential', description: 'Construction, renovation, maintenance and property services for homeowners and private property owners.' }, es: { title: 'Residencial', description: 'Servicios de construcción, renovación, mantenimiento y propiedades para propietarios y dueños de viviendas.' }, fr: { title: 'Résidentiel', description: 'Services de construction, rénovation, maintenance et gestion pour propriétaires de maisons et biens privés.' } },
    { active: true, order: 2, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80', link: '#who-we-serve', en: { title: 'Commercial & Industrial', description: 'Construction, maintenance, renovation and property services that help businesses keep their properties operating properly.' }, es: { title: 'Comercial e Industrial', description: 'Servicios de construcción, mantenimiento, renovación y propiedades para apoyar el correcto funcionamiento de negocios.' }, fr: { title: 'Commercial & Industriel', description: 'Services de construction, maintenance, rénovation et gestion pour soutenir le bon fonctionnement des biens commerciaux.' } },
    { active: true, order: 3, image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80', link: '#who-we-serve', en: { title: 'PH & Condominiums', description: 'Building maintenance, improvements, repairs and project coordination for PH administrations, boards and condominium communities.' }, es: { title: 'PH y Condominios', description: 'Mantenimiento de edificios, mejoras, reparaciones y coordinación de proyectos para administraciones y comunidades.' }, fr: { title: 'PH & Condominiums', description: 'Maintenance, améliorations, réparations et coordination de projets pour administrations, conseils et communautés de copropriété.' } }
  ],
  why: [
    { id: 'one-point-of-responsibility', title: { en: 'One Point of Responsibility', es: 'Un solo punto de responsabilidad', fr: 'Un seul point de responsabilité' }, copy: { en: 'Construction, maintenance and property services coordinated through one company.', es: 'Servicios de construcción, mantenimiento y propiedades coordinados a través de una misma empresa.', fr: 'Construction, maintenance et services immobiliers coordonnés par une seule entreprise.' } },
    { id: 'practical-project-control', title: { en: 'Practical Project Control', es: 'Control práctico del proyecto', fr: 'Contrôle pratique du projet' }, copy: { en: 'Clear scope, communication, coordination and follow-through.', es: 'Alcance claro, comunicación, coordinación y seguimiento constante.', fr: 'Périmètre clair, communication, coordination et suivi rigoureux.' } },
    { id: 'reliable-local-execution', title: { en: 'Reliable Local Execution', es: 'Ejecución local fiable', fr: 'Exécution locale fiable' }, copy: { en: 'A local team that understands the realities of working with properties in Panama.', es: 'Un equipo local que entiende la realidad de trabajar con propiedades en Panamá.', fr: 'Une équipe locale qui comprend les réalités de la gestion immobilière au Panama.' } },
    { id: 'built-for-long-term-relationships', title: { en: 'Built for Long-Term Relationships', es: 'Pensado para relaciones a largo plazo', fr: 'Conçu pour des relations durables' }, copy: { en: 'The objective is not simply to complete a job, but to become a dependable property partner.', es: 'El objetivo no es solo completar una obra, sino convertirse en un aliado de confianza para la propiedad.', fr: 'L’objectif n’est pas seulement d’achever un travail, mais de devenir un partenaire immobilier fiable.' } }
  ],
  projects: [
    { active: true, order: 1, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', name: { en: 'Private Residence Renewal', es: 'Renovación de residencia privada', fr: 'Rénovation de résidence privée' }, location: { en: 'Panama City', es: 'Ciudad de Panamá', fr: 'Panama City' }, segment: { en: 'Residential', es: 'Residencial', fr: 'Résidentiel' }, service: { en: 'Construction & Renovation', es: 'Construcción y Renovación', fr: 'Construction & Rénovation' }, description: { en: 'Placeholder project detail for a residential renovation requiring coordination, practical planning and finish quality control.', es: 'Detalle provisional de un proyecto residencial que requiere coordinación, planificación práctica y control de calidad en acabados.', fr: 'Détail d’exemple pour un projet résidentiel nécessitant coordination, planification pratique et contrôle qualité des finitions.' }, placeholder: true },
    { active: true, order: 2, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', name: { en: 'Commercial Building Upgrade', es: 'Actualización de edificio comercial', fr: 'Mise à niveau d’immeuble commercial' }, location: { en: 'David, Chiriquí', es: 'David, Chiriquí', fr: 'David, Chiriquí' }, segment: { en: 'Commercial & Industrial', es: 'Comercial e Industrial', fr: 'Commercial & Industriel' }, service: { en: 'Maintenance & Repairs', es: 'Mantenimiento y Reparaciones', fr: 'Maintenance & Réparations' }, description: { en: 'Placeholder content for a commercial property improvement program focused on reliable upkeep and operational continuity.', es: 'Contenido provisional para un programa de mejora de propiedad comercial centrado en mantenimiento fiable y continuidad operativa.', fr: 'Contenu d’exemple pour un programme d’amélioration d’un bien commercial axé sur l’entretien fiable et la continuité opérationnelle.' }, placeholder: true },
    { active: true, order: 3, image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80', name: { en: 'PH Maintenance Coordination', es: 'Coordinación de mantenimiento PH', fr: 'Coordination de maintenance PH' }, location: { en: 'Panama Oeste', es: 'Panamá Oeste', fr: 'Panama Ouest' }, segment: { en: 'PH & Condominiums', es: 'PH y Condominios', fr: 'PH & Condominiums' }, service: { en: 'Property Management', es: 'Gestión de Propiedades', fr: 'Gestion Immobilière' }, description: { en: 'Placeholder content for a condominium or PH management project requiring organized maintenance, reporting and contractor oversight.', es: 'Contenido provisional para un proyecto de gestión de condominio o PH que requiere mantenimiento organizado, reportes y supervisión de contratistas.', fr: 'Contenu d’exemple pour un projet de gestion de condominium ou PH nécessitant maintenance organisée, reporting et supervision des prestataires.' }, placeholder: true }
  ],
  process: [
    { step: '01', title: { en: 'Assess', es: 'Evaluar', fr: 'Évaluer' }, copy: { en: 'Understand the property, problem or project.', es: 'Comprender la propiedad, el problema o el proyecto.', fr: 'Comprendre le bien, le problème ou le projet.' } },
    { step: '02', title: { en: 'Plan', es: 'Planificar', fr: 'Planifier' }, copy: { en: 'Define scope, priorities, budget and execution.', es: 'Definir alcance, prioridades, presupuesto y ejecución.', fr: 'Définir le périmètre, les priorités, le budget et l’exécution.' } },
    { step: '03', title: { en: 'Execute', es: 'Ejecutar', fr: 'Exécuter' }, copy: { en: 'Coordinate the work and keep the project moving.', es: 'Coordinar el trabajo y mantener el proyecto en movimiento.', fr: 'Coordonner les travaux et faire avancer le projet.' } },
    { step: '04', title: { en: 'Complete', es: 'Finalizar', fr: 'Terminer' }, copy: { en: 'Review the work, resolve outstanding items and hand over properly.', es: 'Revisar el trabajo, resolver pendientes y entregar correctamente.', fr: 'Vérifier le travail, régler les derniers points et livrer correctement.' } }
  ],
  matrix: {
    columns: [
      { en: 'Residential', es: 'Residencial', fr: 'Résidentiel' },
      { en: 'Commercial & Industrial', es: 'Comercial e Industrial', fr: 'Commercial & Industriel' },
      { en: 'PH & Condominiums', es: 'PH y Condominios', fr: 'PH & Condominiums' }
    ],
    rows: [
      { en: 'Construction & Renovation', es: 'Construcción y Renovación', fr: 'Construction & Rénovation' },
      { en: 'Maintenance & Repairs', es: 'Mantenimiento y Reparaciones', fr: 'Maintenance & Réparations' },
      { en: 'Property Management', es: 'Gestión de Propiedades', fr: 'Gestion Immobilière' },
      { en: 'Project Management', es: 'Gestión de Proyectos', fr: 'Gestion de Projets' },
      { en: 'Specialized Building Works', es: 'Obras Especializadas', fr: 'Travaux Spécialisés' }
    ]
  }
};

const closeMenu = () => {
  nav?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
};

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
});

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 760) {
      closeMenu();
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

const textFor = (value, field) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value[field]) return value[field];
  if (value[locale]) return value[locale];
  if (value.en) return value.en;
  return Object.values(value)[0] || '';
};

const loadJSON = async (path, fallback) => {
  try {
    const response = await fetch(path);
    if (!response.ok) return fallback;
    return await response.json();
  } catch (error) {
    return fallback;
  }
};

const getPath = (p) => `${contentBase}${p}`;

const renderServices = async () => {
  const container = document.getElementById('services-grid');
  if (!container) return;
  const data = await loadJSON(getPath('tiles/services.json'), defaultContent.services);
  const items = data.filter((item) => item.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  container.innerHTML = items.map((item) => `
    <article class="service-card">
      <img src="${item.image}" alt="${textFor(item[locale], 'title')}" loading="lazy" />
      <div class="service-card-content">
        <h3>${textFor(item[locale], 'title')}</h3>
        <p>${textFor(item[locale], 'description')}</p>
        <a href="${item.link || '#services'}">${textFor(item.cta, locale) || 'Learn More'}</a>
      </div>
    </article>
  `).join('');
};

const renderSegments = async () => {
  const container = document.getElementById('segments-grid');
  if (!container) return;
  const data = await loadJSON(getPath('tiles/segments.json'), defaultContent.segments);
  const items = data.filter((item) => item.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  container.innerHTML = items.map((item) => `
    <article class="segment-card">
      <img src="${item.image}" alt="${textFor(item[locale], 'title')}" loading="lazy" />
      <div class="segment-card-content">
        <h3>${textFor(item[locale], 'title')}</h3>
        <p>${textFor(item[locale], 'description')}</p>
        <a href="${item.link || '#who-we-serve'}">Learn More</a>
      </div>
    </article>
  `).join('');
};

const renderWhy = async () => {
  const container = document.getElementById('why-grid');
  if (!container) return;
  const data = await loadJSON(getPath('reusable/why-vanguardia.json'), defaultContent.why);

  container.innerHTML = data.map((item) => `
    <article class="why-card">
      <h3>${textFor(item.title, locale)}</h3>
      <p>${textFor(item.copy, locale)}</p>
    </article>
  `).join('');
};

const renderMatrix = async () => {
  const container = document.getElementById('matrix-grid');
  if (!container) return;
  const page = await loadJSON(getPath('pages/home.json'), { matrix: defaultContent.matrix });
  const columns = page.matrix.columns || defaultContent.matrix.columns;
  const rows = page.matrix.rows || defaultContent.matrix.rows;

  const matrix = [
    '<div class="matrix-header">Service</div>',
    ...columns.map((column) => `<div class="matrix-header">${textFor(column, locale)}</div>`)
  ].join('');

  const rowMarkup = rows.map((row) => {
    const rowLabel = `<div class="matrix-row-label">${textFor(row, locale)}</div>`;
    const cells = columns.map(() => '<div class="matrix-cell">✓</div>').join('');
    return rowLabel + cells;
  }).join('');

  container.innerHTML = matrix + rowMarkup;
};

const renderProjects = async () => {
  const container = document.getElementById('projects-grid');
  if (!container) return;
  const data = await loadJSON(getPath('projects/projects.json'), defaultContent.projects);
  const items = data.filter((item) => item.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  container.innerHTML = items.map((item) => `
    <article class="project-card ${item.placeholder ? 'placeholder' : ''}">
      <img src="${item.image}" alt="${textFor(item.name, locale)}" loading="lazy" />
      <div class="project-card-content">
        <div class="project-meta">
          <span>${textFor(item.location, locale)}</span>
          <span>${textFor(item.segment, locale)}</span>
        </div>
        <h3>${textFor(item.name, locale)}</h3>
        <p>${textFor(item.description, locale)}</p>
      </div>
    </article>
  `).join('');
};

const renderProcess = async () => {
  const container = document.getElementById('process-grid');
  if (!container) return;
  const page = await loadJSON(getPath('pages/home.json'), { process: { steps: defaultContent.process } });
  const steps = page.process.steps || defaultContent.process;

  container.innerHTML = steps.map((step) => `
    <article class="process-card">
      <span class="process-step">${step.step}</span>
      <h3>${textFor(step.title, locale)}</h3>
      <p>${textFor(step.copy, locale)}</p>
    </article>
  `).join('');
};

const init = async () => {
  try {
    await Promise.all([
      renderServices(),
      renderSegments(),
      renderWhy(),
      renderMatrix(),
      renderProjects(),
      renderProcess()
    ]);
  } catch (error) {
    console.error('Landing page content failed to load:', error);
  }
};

document.addEventListener('DOMContentLoaded', init);
