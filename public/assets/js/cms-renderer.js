/* global fetchJson, API_BASE */
(function initGrowthRenderer() {
  var sectionRegistry = {
    hero: renderHero,
    services: renderServices,
    process: renderProcess,
    cta: renderCTA,
    testimonials: renderTestimonials,
    blog: renderBlog,
    case_studies: renderCaseStudies,
    industries: renderIndustries,
  };

  function safe(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderHero(section) {
    var c = section.content || {};
    return (
      '<section class="cms-block cms-hero" aria-label="Featured message">' +
      '<div class="container cms-hero__inner">' +
      '<p class="cms-eyebrow">' + safe(c.eyebrow || 'Growth Engineering Company') + '</p>' +
      '<h2 class="cms-hero__title">' + safe(c.title || 'Build revenue systems, not vanity websites') + '</h2>' +
      '<p class="cms-hero__subtitle">' + safe(c.subtitle || '') + '</p>' +
      '<div class="cms-hero__actions">' +
      '<a class="btn-primary btn-large cms-btn" href="' + safe(c.primaryCtaLink || '#contact') + '">' + safe(c.primaryCtaText || 'Get Free Growth Audit') + '</a>' +
      '<a class="btn-secondary btn-large cms-btn" href="' + safe(c.secondaryCtaLink || '#contact') + '">' + safe(c.secondaryCtaText || 'Book Strategy Call') + '</a>' +
      '</div></div></section>'
    );
  }

  function renderServices(section) {
    var c = section.content || {};
    var items = Array.isArray(c.items) ? c.items : [];
    if (!items.length) return '';
    return (
      '<section class="cms-block cms-services section">' +
      '<div class="container">' +
      '<div class="cms-section-head">' +
      '<h2 class="cms-section-title">' + safe(c.title || 'Growth Services') + '</h2>' +
      '</div>' +
      '<div class="cms-grid">' +
      items.map(function (item) {
        return (
          '<article class="cms-card">' +
          '<h3 class="cms-card__title">' + safe(item.title) + '</h3>' +
          '<p class="cms-card__text">' + safe(item.description) + '</p>' +
          '</article>'
        );
      }).join('') +
      '</div></div></section>'
    );
  }

  function renderProcess(section) {
    var c = section.content || {};
    var steps = c.steps || [];
    if (!steps.length) return '';
    var head = c.title || section.name || 'How we work';
    return (
      '<section class="cms-block cms-process section">' +
      '<div class="container">' +
      '<div class="cms-section-head">' +
      '<h2 class="cms-section-title">' +
      safe(head) +
      '</h2>' +
      '</div>' +
      '<ol class="cms-process__list">' +
      steps
        .map(function (step, idx) {
          return (
            '<li class="cms-process__item">' +
            '<span class="cms-process__num">' +
            (idx + 1) +
            '</span>' +
            '<span class="cms-process__text">' +
            safe(step) +
            '</span>' +
            '</li>'
          );
        })
        .join('') +
      '</ol></div></section>'
    );
  }

  function renderCTA(section) {
    var c = section.content || {};
    if (!(c.title || '').trim() && !(c.description || '').trim() && !(c.text || '').trim()) return '';
    return (
      '<section class="cms-block cms-cta section">' +
      '<div class="container">' +
      '<div class="cms-cta__panel">' +
      '<h2 class="cms-cta__title">' +
      safe(c.title || '') +
      '</h2>' +
      '<p class="cms-cta__desc">' +
      safe(c.description || '') +
      '</p>' +
      '<a class="btn-primary btn-large cms-btn" href="' +
      safe(c.link || '#contact') +
      '">' +
      safe(c.text || 'Book Strategy Call') +
      '</a>' +
      '</div></div></section>'
    );
  }

  function renderTestimonials(section) {
    var c = section.content || {};
    var items = c.items || [];
    if (!items.length) return '';
    var head = c.title || 'What clients say';
    return (
      '<section class="cms-block cms-testimonials section">' +
      '<div class="container">' +
      '<div class="cms-section-head">' +
      '<h2 class="cms-section-title">' +
      safe(head) +
      '</h2>' +
      '</div>' +
      '<div class="cms-grid cms-grid--testimonials">' +
      items
        .map(function (item) {
          return (
            '<blockquote class="cms-card cms-quote">' +
            '<p class="cms-quote__text">“' +
            safe(item.quote) +
            '”</p>' +
            '<footer class="cms-quote__by">' +
            safe(item.name) +
            '</footer>' +
            '</blockquote>'
          );
        })
        .join('') +
      '</div></div></section>'
    );
  }

  function renderBlog(section) {
    var c = section.content || {};
    var items = c.items || [];
    if (!items.length) return '';
    var head = c.title || 'From the blog';
    return (
      '<section class="cms-block cms-blog section">' +
      '<div class="container">' +
      '<div class="cms-section-head">' +
      '<h2 class="cms-section-title">' +
      safe(head) +
      '</h2>' +
      '</div>' +
      '<div class="cms-grid">' +
      items
        .map(function (item) {
          return (
            '<article class="cms-card">' +
            '<h3 class="cms-card__title">' +
            safe(item.title) +
            '</h3>' +
            '<p class="cms-card__text">' +
            safe(item.excerpt) +
            '</p>' +
            '</article>'
          );
        })
        .join('') +
      '</div></div></section>'
    );
  }

  function renderCaseStudies(section) {
    var c = section.content || {};
    var items = c.items || [];
    if (!items.length) return '';
    var head = c.title || 'Case studies';
    return (
      '<section class="cms-block cms-case-studies section">' +
      '<div class="container">' +
      '<div class="cms-section-head">' +
      '<h2 class="cms-section-title">' +
      safe(head) +
      '</h2>' +
      '</div>' +
      '<div class="cms-grid">' +
      items
        .map(function (item) {
          return (
            '<article class="cms-card cms-card--case">' +
            '<h3 class="cms-card__title">' +
            safe(item.title) +
            '</h3>' +
            '<p class="cms-card__kicker">Result</p>' +
            '<p class="cms-card__text">' +
            safe(item.result) +
            '</p>' +
            '</article>'
          );
        })
        .join('') +
      '</div></div></section>'
    );
  }

  function renderIndustries(section) {
    var c = section.content || {};
    var items = c.items || [];
    if (!items.length) return '';
    var head = c.title || 'Industries';
    return (
      '<section class="cms-block cms-industries section">' +
      '<div class="container">' +
      '<div class="cms-section-head">' +
      '<h2 class="cms-section-title">' +
      safe(head) +
      '</h2>' +
      '</div>' +
      '<ul class="cms-pills">' +
      items
        .map(function (item) {
          return '<li class="cms-pill">' + safe(item) + '</li>';
        })
        .join('') +
      '</ul></div></section>'
    );
  }

  function resolveCmsTarget(targetSelector) {
    if (targetSelector && targetSelector.nodeType === 1) return targetSelector;
    return document.querySelector(targetSelector || '[data-cms-root]');
  }

  async function renderCmsPage(slug, targetSelector) {
    var target = resolveCmsTarget(targetSelector);
    if (!target) return;

    var page = await fetchJson('/page/' + encodeURIComponent(slug));
    if (!page || !Array.isArray(page.sections)) {
      target.innerHTML = '';
      return;
    }

    var html = page.sections
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); })
      .map(function (section) {
        var renderer = sectionRegistry[section.type];
        if (!renderer) return '';
        return renderer(section);
      })
      .join('');

    target.innerHTML = html;

    var zone = target.closest('.growth-cms-zone');
    if (zone) {
      if (html.trim()) zone.classList.add('growth-cms-zone--visible');
      else zone.classList.remove('growth-cms-zone--visible');
    }

    if (page.seoTitle) document.title = page.seoTitle;
    if (page.seoDescription) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', page.seoDescription);
    }
  }

  async function hydrateGlobalSettings() {
    if (typeof fetchJson !== 'function') return;
    var settings = await fetchJson('/global-settings');
    if (!settings) return;
    window.__GLOBAL_SETTINGS__ = settings;
  }

  window.growthCmsRenderer = {
    renderCmsPage: renderCmsPage,
    hydrateGlobalSettings: hydrateGlobalSettings,
    registerSectionRenderer: function registerSectionRenderer(type, renderer) {
      if (!type || typeof renderer !== 'function') return;
      sectionRegistry[type] = renderer;
    },
  };
})();
