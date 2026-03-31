// ============================================
// Nullscape Website - Optimized & Enhanced
// ============================================

// Use shared utils (load utils.js before this file)
var debounce = window.debounce;
var throttle = window.throttle;

// ============================================
// Loading Animation (Optimized)
// ============================================

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        // Force hide immediately
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        loader.style.pointerEvents = 'none';
        loader.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        
        // Remove from DOM after transition
        setTimeout(() => {
            loader.style.display = 'none';
            loader.classList.add('hidden');
        }, 300);
    }
}

// Immediate execution - hide loader as soon as script runs
(function() {
    // If DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(hideLoader, 100);
    } else {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(hideLoader, 100);
        });
    }
    
    // Also listen for window load
    window.addEventListener('load', function() {
        hideLoader();
    });
    
    // Safety fallback - force hide after 1 second
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            loader.style.display = 'none';
            loader.style.pointerEvents = 'none';
            loader.classList.add('hidden');
        }
    }, 1000);
})();

// ============================================
// Sticky Header (Optimized with Intersection Observer)
// ============================================

const header = document.getElementById('header');
if (header) {
    const headerObserver = new IntersectionObserver(
        ([entry]) => {
            header.classList.toggle('scrolled', !entry.isIntersecting);
        },
        { threshold: 0.1, rootMargin: '-100px 0px 0px 0px' }
    );
    
    const heroSection = document.getElementById('home');
    if (heroSection) {
        headerObserver.observe(heroSection);
    }
}

// ============================================
// Mobile Navigation (Enhanced)
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function setNavMenuOpen(open) {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle('active', open);
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
}

const headerEl = document.getElementById('header');

if (navToggle && navMenu && headerEl) {
    navToggle.addEventListener('click', e => {
        e.stopPropagation();
        setNavMenuOpen(!navMenu.classList.contains('active'));
    });

    headerEl.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', () => {
            setNavMenuOpen(false);
            navMenu.querySelectorAll('.nav-item--mega.is-open').forEach(item => {
                item.classList.remove('is-open');
                const t = item.querySelector('.nav-link--trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        });
    });

    document.addEventListener('click', (e) => {
        const inActions = e.target.closest && e.target.closest('.nav-actions');
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && !inActions) {
            setNavMenuOpen(false);
        }
    });
}

// ============================================
// Active Navigation Link (sections + #team)
// ============================================

const sections = document.querySelectorAll('section[id], #team');

function clearNavActive() {
    document
        .querySelectorAll(
            '#header [data-nav-anchor].active, #navMenu .nav-link.active, #navMenu .nav-link--trigger.active'
        )
        .forEach(el => {
            el.classList.remove('active');
        });
}

function highlightNavigation() {
    const scrollY = window.pageYOffset + 150;
    let currentId = null;

    Array.from(sections)
        .reverse()
        .forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentId = sectionId;
            }
        });

    clearNavActive();
    if (!currentId) return;

    let anchorId = currentId === 'team' ? 'about' : currentId;
    const byData =
        document.querySelector(`#header [data-nav-anchor="${currentId}"]`) ||
        document.querySelector(`#navMenu [data-nav-anchor="${currentId}"]`) ||
        document.querySelector(`#navMenu [data-nav-anchor="${anchorId}"]`);
    if (byData) {
        byData.classList.add('active');
    }
    const navLink = document.querySelector(`#navMenu a.nav-link[href="#${currentId}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
}

window.addEventListener('scroll', throttle(highlightNavigation, 100));

// ============================================
// Smooth Scroll (Enhanced)
// ============================================

function activateServiceCategoryBySlug(slug) {
    if (!slug) return;
    const el = document.querySelector('.service-category-item[data-category="' + slug.replace(/"/g, '') + '"]');
    if (el) {
        el.click();
    }
}

document.body.addEventListener('click', function (e) {
    const anchor = e.target.closest && e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;

    if (e.defaultPrevented) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (typeof e.button === 'number' && e.button !== 0) return;

    const id = href.slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const headerHeight = header?.offsetHeight || 80;
    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    const slug = anchor.getAttribute('data-category-slug');
    if (slug && href === '#custom-services') {
        setTimeout(() => activateServiceCategoryBySlug(slug), 450);
    }

    if (navMenu?.classList.contains('active')) {
        setNavMenuOpen(false);
    }

    if (typeof window.closeAllMegaNav === 'function') {
        window.closeAllMegaNav();
    }
});

// ============================================
// Scroll Animations (Optimized with Intersection Observer)
// ============================================

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animatable elements
document.querySelectorAll('.service-card, .solution-card, .portfolio-card, .value-item, .achievement-item, .testimonial-card').forEach(el => {
    el.classList.add('will-animate');
    animationObserver.observe(el);
});

// ============================================
// Portfolio Filter (Enhanced) - Now uses dynamic categories
// ============================================
// Filter functionality is now handled in loadPortfolioCategories()
// This ensures filters are set up after categories are loaded

// ============================================
// Testimonials Carousel (Enhanced)
// ============================================

let currentTestimonial = 0;
let testimonialInterval;

function getTestimonialCardCount() {
    return document.querySelectorAll('.testimonials-carousel .testimonial-card').length;
}

function showTestimonialSlide(index) {
    const cards = document.querySelectorAll('.testimonials-carousel .testimonial-card');
    const carouselDots = document.querySelector('.carousel-dots');
    if (cards.length === 0) return;
    const i = ((index % cards.length) + cards.length) % cards.length;
    cards.forEach((card, j) => {
        card.classList.toggle('active', j === i);
    });
    if (carouselDots) {
        carouselDots.querySelectorAll('.carousel-dot').forEach((dot, j) => {
            dot.classList.toggle('active', j === i);
        });
    }
    currentTestimonial = i;
}

function advanceTestimonial(delta) {
    const n = getTestimonialCardCount();
    if (n === 0) return;
    showTestimonialSlide(currentTestimonial + delta);
}

function resetTestimonialAutoPlay() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
        advanceTestimonial(1);
    }, 5000);
}

function initTestimonials() {
    if (getTestimonialCardCount() === 0) return;

    const carouselDots = document.querySelector('.carousel-dots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    if (carouselDots) {
        carouselDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonialSlide(index);
                resetTestimonialAutoPlay();
            });
        });
    }

    if (nextBtn && nextBtn.dataset.nsTestimonialNavBound !== '1') {
        nextBtn.dataset.nsTestimonialNavBound = '1';
        nextBtn.addEventListener('click', () => {
            advanceTestimonial(1);
            resetTestimonialAutoPlay();
        });
    }
    if (prevBtn && prevBtn.dataset.nsTestimonialNavBound !== '1') {
        prevBtn.dataset.nsTestimonialNavBound = '1';
        prevBtn.addEventListener('click', () => {
            advanceTestimonial(-1);
            resetTestimonialAutoPlay();
        });
    }

    resetTestimonialAutoPlay();

    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel && carousel.dataset.nsTestimonialHoverBound !== '1') {
        carousel.dataset.nsTestimonialHoverBound = '1';
        carousel.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        carousel.addEventListener('mouseleave', resetTestimonialAutoPlay);
    }
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
} else {
    initTestimonials();
}

// ============================================
// Button Ripple Effect (Enhanced)
// ============================================

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// Scroll to Top Button (Enhanced)
// ============================================

let scrollTopBtn = document.getElementById('scrollTop');
if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTop';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
}

const scrollTopObserver = new IntersectionObserver(
    ([entry]) => {
        scrollTopBtn.style.opacity = entry.isIntersecting ? '0' : '1';
        scrollTopBtn.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    },
    { threshold: 0.1 }
);

const heroSection = document.getElementById('home');
if (heroSection) {
    scrollTopObserver.observe(heroSection);
}

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// Form Enhancements
// ============================================

// Enhanced form validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(field, message) {
    field.classList.add('error');
    let errorMsg = field.parentElement.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        field.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showFieldError(input, 'This field is required');
            } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email');
            } else {
                clearFieldError(input);
            }
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                clearFieldError(input);
            }
        });
    });
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email');
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        }
        
        try {
            const formData = new FormData(contactForm);
            const payload = {
                type: 'contact', // Valid enum values: 'contact', 'quote', 'hire', 'newsletter', 'other'
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            const response = await fetch(`${API_BASE}/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                contactForm.reset();
                showSuccessMessage(contactForm, 'Thank you! Your message has been sent.');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err) {
            showErrorMessage(contactForm, 'Failed to send message. Please try again.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                showFieldError(emailInput, 'Please enter a valid email');
            } else {
                clearFieldError(emailInput);
            }
        });
    }
    
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput?.value || '';
        if (!email) {
            if (emailInput) showFieldError(emailInput, 'Email is required');
            return;
        }
        
        if (!validateEmail(email)) {
            if (emailInput) showFieldError(emailInput, 'Please enter a valid email');
            return;
        }
        
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Subscribing...';
        }
        
        try {
            const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            if (response.ok) {
                newsletterForm.reset();
                showSuccessMessage(newsletterForm, 'Successfully subscribed!');
            } else {
                throw new Error('Subscription failed');
            }
        } catch (err) {
            showErrorMessage(newsletterForm, 'Subscription failed. Please try again.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

function showSuccessMessage(form, message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.textContent = message;
    form.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 5000);
}

function showErrorMessage(form, message) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'form-error';
    errorMsg.textContent = message;
    form.appendChild(errorMsg);
    setTimeout(() => errorMsg.remove(), 5000);
}

// ============================================
// Dynamic Content from Admin Backend (CMS)
// ============================================
// API_BASE, fetchJson, escapeHtml, createSkeletonLoader from config.js, api.js, utils.js
var API_BASE = window.API_BASE;
var fetchJson = window.fetchJson;
var escapeHtml = window.escapeHtml;
var createSkeletonLoader = window.createSkeletonLoader;

/** Aligns with BlogCategory slug rules — must match filter button `data-filter` values */
function slugifyBlogCategoryKey(str) {
    const s = String(str || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    return s || 'general';
}

/** Strip script tags from admin HTML before innerHTML (basic XSS hardening). */
function sanitizeBlogBodyHtml(html) {
    if (!html || typeof html !== 'string') return '';
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    tpl.content.querySelectorAll('script').forEach((el) => el.remove());
    return tpl.innerHTML;
}

/** Plain text from admin HTML/plain description (cards must not show raw tags). */
function stripHtmlToPlainText(html) {
    if (!html || typeof html !== 'string') return '';
    const s = html.trim();
    if (!s) return '';
    if (!/<[a-z][\s\S]*>/i.test(s)) return s.replace(/\s+/g, ' ').trim();
    const tpl = document.createElement('template');
    tpl.innerHTML = s;
    tpl.content.querySelectorAll('script, style').forEach((el) => el.remove());
    return (tpl.textContent || '').replace(/\s+/g, ' ').trim();
}

function truncatePortfolioExcerpt(text, maxLen) {
    const max = maxLen || 220;
    const t = String(text || '').trim();
    if (!t) return '';
    if (t.length <= max) return t;
    const cut = t.slice(0, max);
    const lastSpace = cut.lastIndexOf(' ');
    const out = (lastSpace > 32 ? cut.slice(0, lastSpace) : cut).trim();
    return out + '…';
}

/** Summary line for portfolio cards — matches admin description/solution/problem without escaped HTML. */
function portfolioCardExcerpt(project) {
    const sources = [project.description, project.solution, project.problem];
    for (const raw of sources) {
        if (raw == null || raw === '') continue;
        const plain = stripHtmlToPlainText(String(raw));
        if (plain) return truncatePortfolioExcerpt(plain, 220);
    }
    return '';
}

function portfolioCategoryFilterSlug(cat) {
    if (cat && cat.slug && String(cat.slug).trim()) {
        return String(cat.slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, '') || 'category';
    }
    return portfolioCategoryFilterSlugFromName(cat && cat.name);
}

function portfolioCategoryFilterSlugFromName(name) {
    return String(name || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') || 'category';
}

function wirePortfolioCardImages(container) {
    if (!container) return;
    container.querySelectorAll('.portfolio-card__img').forEach((img) => {
        img.addEventListener('error', function onImgErr() {
            this.removeEventListener('error', onImgErr);
            const wrap = this.closest('.portfolio-image');
            if (!wrap) return;
            const initial = (wrap.getAttribute('data-initial') || '★').charAt(0).toUpperCase();
            wrap.innerHTML = `<div class="portfolio-placeholder" role="img" aria-hidden="true"><span class="portfolio-placeholder__glyph">${escapeHtml(initial)}</span></div>`;
        });
    });
}

// Render Portfolio on homepage (with skeleton loader)
async function loadPortfolio() {
    const container = document.querySelector('.portfolio-grid');
    if (!container) {
        console.warn('[Portfolio] Container not found');
        return;
    }
    
    // Show skeleton loader
    container.innerHTML = createSkeletonLoader(6, 'card');
    
    console.log('[Portfolio] Loading portfolio...');
    const data = await fetchJson('/portfolio?status=active&limit=100');
    console.log('[Portfolio] Data received:', data);
    
    if (!data) {
        console.error('[Portfolio] No data returned from API');
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">⚠️</div>
                <h3>Unable to Load Portfolio</h3>
                <p>Could not connect to the API. Please check if the backend is running.</p>
            </div>
        `;
        return;
    }
    
    if (!data.items || data.items.length === 0) {
        console.log('[Portfolio] No portfolio items found in data');
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">💼</div>
                <h3>No Portfolio Projects</h3>
                <p>Portfolio projects will be displayed here once they are added through the admin panel.</p>
                <p style="margin-top: 8px; font-size: 14px; color: #999;">Make sure portfolio items have status set to "active" in the admin panel.</p>
            </div>
        `;
        return;
    }
    
    console.log(`[Portfolio] Rendering ${data.items.length} portfolio items`);
    
    // Get all categories to map names to slugs
    const categoriesData = await fetchJson('/portfolio-categories?status=active&limit=100');
    const categoryMap = new Map();
    if (categoriesData?.items) {
        categoriesData.items.forEach((cat) => {
            categoryMap.set(cat.name, portfolioCategoryFilterSlug(cat));
        });
    }
    
    container.innerHTML = data.items.map((p) => {
        const name = escapeHtml(p.name);
        const categoryName = (p.category || 'Other').trim() || 'Other';
        const categoryLabel = escapeHtml(categoryName);
        const filterKey = categoryMap.get(categoryName) || portfolioCategoryFilterSlugFromName(categoryName);
        const excerpt = portfolioCardExcerpt(p);
        const excerptHtml = excerpt
            ? `<p class="portfolio-description portfolio-description--excerpt">${escapeHtml(excerpt)}</p>`
            : '<p class="portfolio-description portfolio-description--excerpt portfolio-description--muted">No description yet.</p>';
        const rawStack = Array.isArray(p.techStack) ? p.techStack.filter((t) => String(t).trim()) : [];
        const tags = rawStack.slice(0, 6);
        const tagsHtml = tags.length
            ? `<div class="portfolio-tags">${tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>`
            : '';
        const img = Array.isArray(p.screenshots) && p.screenshots[0] ? escapeHtml(String(p.screenshots[0]).trim()) : null;
        const initial = String(p.name || '★').trim().charAt(0) || '★';
        const initialAttr = escapeHtml(initial.toUpperCase());
        const imgBlock = img
            ? `<img class="portfolio-card__img" src="${img}" alt="${name}" loading="lazy" decoding="async">`
            : `<div class="portfolio-placeholder" role="img" aria-hidden="true"><span class="portfolio-placeholder__glyph">${initialAttr}</span></div>`;
        return `
            <article class="portfolio-card will-animate" data-category="${escapeHtml(filterKey)}">
                <div class="portfolio-image" data-initial="${initialAttr}">
                    ${imgBlock}
                </div>
                <div class="portfolio-content">
                    <p class="portfolio-card__category">${categoryLabel}</p>
                    <h3>${name}</h3>
                    ${excerptHtml}
                    ${tagsHtml}
                </div>
            </article>
        `;
    }).join('');
    
    wirePortfolioCardImages(container);

    // Observe new cards for animation
    container.querySelectorAll('.portfolio-card').forEach((card) => {
        animationObserver.observe(card);
    });
}

/** Safe https URL for img src (basic XSS hardening). */
function safeHttpImageUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const t = url.trim();
    if (!/^https?:\/\//i.test(t)) return '';
    return escapeHtml(t);
}

// Render Testimonials on homepage (with skeleton loader)
async function loadTestimonials() {
    const container = document.querySelector('.testimonials-carousel');
    if (!container) return;

    let dotsWrap = document.querySelector('.carousel-dots');
    if (!dotsWrap && container.parentElement) {
        dotsWrap = document.createElement('div');
        dotsWrap.className = 'carousel-dots';
        dotsWrap.setAttribute('role', 'tablist');
        dotsWrap.setAttribute('aria-label', 'Testimonial slides');
        container.after(dotsWrap);
    }

    // Show skeleton loader
    container.innerHTML = createSkeletonLoader(3, 'card');
    if (dotsWrap) dotsWrap.innerHTML = '';

    const data = await fetchJson('/testimonials?status=active&limit=100');

    if (!data) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">⚠️</div>
                <h3>Unable to Load Testimonials</h3>
                <p>Could not connect to the API. Please check if the backend is running.</p>
            </div>
        `;
        return;
    }

    if (!data.items || data.items.length === 0) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">💬</div>
                <h3>No Testimonials Available</h3>
                <p>Client testimonials will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        if (dotsWrap) dotsWrap.innerHTML = '';
        return;
    }

    container.innerHTML = data.items.map((t, idx) => {
        const name = escapeHtml(t.clientName);
        const review = escapeHtml(t.review || t.testimonial || '');
        const rating = Math.max(1, Math.min(5, Number(t.rating || 5)));
        const stars = '★★★★★'.slice(0, rating).padEnd(5, '☆');
        const picture = safeHttpImageUrl(t.picture);
        const initial = escapeHtml(String(t.clientName || '?').trim().charAt(0).toUpperCase() || '?');
        const avatarInner = picture
            ? `<img src="${picture}" alt="" loading="lazy" decoding="async" width="60" height="60">`
            : `<span class="testimonial-avatar__fallback">${initial}</span>`;
        return `
            <div class="testimonial-card ${idx === 0 ? 'active' : ''}">
                <div class="testimonial-rating">${stars}</div>
                <p class="testimonial-text">"${review}"</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${avatarInner}</div>
                    <div><h4>${name}</h4></div>
                </div>
            </div>
        `;
    }).join('');

    if (dotsWrap) {
        dotsWrap.innerHTML = '';
        const cards = container.querySelectorAll('.testimonial-card');
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.setAttribute('role', 'tab');
            dotsWrap.appendChild(dot);
        });
    }

    currentTestimonial = 0;
    initTestimonials();
}

// Render Blog list on blog page (with skeleton loader)
async function loadBlogList() {
    const grid = document.querySelector('.blog-grid');
    if (!grid) {
        console.warn('[Blog] Container .blog-grid not found on this page');
        return;
    }
    
    console.log('[Blog] Loading blog posts...');
    
    // Show skeleton loader
    grid.innerHTML = createSkeletonLoader(6, 'card');
    
    const data = await fetchJson('/blog?status=published&limit=12&sort=-publishedAt');
    console.log('[Blog] Data received:', data);
    
    if (!data) {
        console.error('[Blog] No data returned from API');
        grid.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">⚠️</div>
                <h3>Unable to Load Blog Posts</h3>
                <p>Could not connect to the API. Please check if the backend is running.</p>
            </div>
        `;
        return;
    }
    
    if (!data.items || data.items.length === 0) {
        console.log('[Blog] No blog posts found in data');
        grid.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">📝</div>
                <h3>No Blog Posts</h3>
                <p>Blog posts will be displayed here once they are published through the admin panel.</p>
                <p style="margin-top: 8px; font-size: 14px; color: #999;">Make sure blog posts have status set to "published" in the admin panel.</p>
            </div>
        `;
        return;
    }
    
    console.log(`[Blog] Rendering ${data.items.length} blog posts`);
    
    grid.innerHTML = data.items.map(post => {
        const title = escapeHtml(post.title || 'Untitled');
        const desc = escapeHtml(post.description || '');
        const dateRaw = post.publishedAt || post.createdAt;
        const date = dateRaw ? new Date(dateRaw).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
        const contentLength = (post.contentHtml || '').length;
        const read = contentLength > 0 ? Math.max(3, Math.min(10, Math.round(contentLength / 1200))) + ' min read' : '1 min read';
        const rawCategory = (post.category || '').trim();
        const rawTag = Array.isArray(post.tags) && post.tags[0] ? String(post.tags[0]).trim() : '';
        const categoryFilterKey = slugifyBlogCategoryKey(rawCategory || rawTag || 'general');
        const categoryLabel = escapeHtml(rawCategory || rawTag || 'General');
        const img = post.thumbnail ? escapeHtml(post.thumbnail) : null;
        const slug = post.slug ? encodeURIComponent(post.slug) : '';
        const postHref = slug ? `blog-post.html?slug=${slug}` : 'blog.html';
        
        return `
            <article class="blog-card will-animate" data-category="${categoryFilterKey}">
                <div class="blog-image">
                    ${img ? `<img src="${img}" alt="${title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">` : '<div style="width:100%;height:100%;background:linear-gradient(135deg, #005CFF, #6C38FF);display:flex;align-items:center;justify-content:center;font-size:48px;">📝</div>'}
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-category">${categoryLabel}</span>
                        <span>${date}</span>
                        <span>${read}</span>
                    </div>
                    <h3>${title}</h3>
                    <p>${desc || 'No description available.'}</p>
                    <a href="${postHref}" class="blog-read-more">${slug ? 'Read More →' : 'View blog'}</a>
                </div>
            </article>
        `;
    }).join('');
    
    // Observe new cards for animation
    if (typeof animationObserver !== 'undefined') {
        grid.querySelectorAll('.blog-card').forEach(card => {
            animationObserver.observe(card);
        });
    }
    
    console.log('[Blog] ✅ Blog posts rendered successfully');
}

async function loadBlogPostPage() {
    const root = document.getElementById('blog-post-root');
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) {
        root.innerHTML =
            '<div class="container blog-post-wrap"><div class="blog-post-error"><h1>Not found</h1><p>No article slug in the URL.</p><p><a class="blog-read-more" href="blog.html">← Back to blog</a></p></div></div>';
        return;
    }

    root.innerHTML =
        '<div class="container blog-post-wrap"><p class="blog-post-loading">Loading article…</p></div>';

    const post = await fetchJson('/blog/' + encodeURIComponent(slug));
    if (!post || post.status !== 'published') {
        root.innerHTML =
            '<div class="container blog-post-wrap"><div class="blog-post-error"><h1>Post not found</h1><p>This article is unavailable or not published.</p><p><a class="blog-read-more" href="blog.html">← Back to blog</a></p></div></div>';
        return;
    }

    const title = escapeHtml(post.title || '');
    const desc = escapeHtml(post.description || '');
    const dateRaw = post.publishedAt || post.createdAt;
    const date = dateRaw
        ? new Date(dateRaw).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        : '';
    const cat = escapeHtml((post.category || '').trim() || 'General');
    const img = post.thumbnail ? escapeHtml(post.thumbnail) : '';
    const body = sanitizeBlogBodyHtml(post.contentHtml || '');

    if (post.seoTitle) document.title = post.seoTitle + ' | Nullscape';
    const meta = document.querySelector('meta[name="description"]');
    if (meta && post.seoDescription) meta.setAttribute('content', post.seoDescription);

    root.innerHTML =
        '<article class="container blog-post-wrap blog-post-article">' +
        '<nav class="blog-post-breadcrumb"><a href="blog.html">Blog</a> <span aria-hidden="true">/</span> <span>' +
        title +
        '</span></nav>' +
        (img ? '<div class="blog-post-feature"><img src="' + img + '" alt="' + title + '" loading="eager"></div>' : '') +
        '<header class="blog-post-header"><p class="blog-post-meta">' +
        cat +
        (date ? ' · ' + date : '') +
        '</p><h1>' +
        title +
        '</h1>' +
        (desc ? '<p class="blog-post-lead">' + desc + '</p>' : '') +
        '</header>' +
        '<div class="blog-post-body">' +
        body +
        '</div>' +
        '<p class="blog-post-footer-nav"><a class="blog-read-more" href="blog.html">← All posts</a></p>' +
        '</article>';
}

function bindBlogFilterDelegation() {
    const filterContainer = document.querySelector('.blog-filters');
    if (!filterContainer || filterContainer.dataset.nsBlogFilterDelegation === '1') return;
    filterContainer.dataset.nsBlogFilterDelegation = '1';
    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.blog-filter-btn');
        if (!btn || !filterContainer.contains(btn)) return;
        filterContainer.querySelectorAll('.blog-filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }, index * 30);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Load Blog Categories for filtering
async function loadBlogCategories() {
    const filterContainer = document.querySelector('.blog-filters');
    if (!filterContainer) {
        console.warn('[Blog Categories] Filter container not found');
        return;
    }
    
    bindBlogFilterDelegation();
    
    console.log('[Blog Categories] Loading categories...');
    const data = await fetchJson('/blog-categories?status=active&limit=100&sort=order');

    const allButton = filterContainer.querySelector('[data-filter="all"]');
    filterContainer.querySelectorAll('.blog-filter-btn:not([data-filter="all"])').forEach((btn) => btn.remove());

    if (!data?.items || data.items.length === 0) {
        console.log('[Blog Categories] No categories found');
        return;
    }

    console.log(`[Blog Categories] Found ${data.items.length} categories`);
    
    data.items.forEach((category) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'blog-filter-btn';
        // Must match `data-category` on cards (slugify of post.category name), not a stale slug field
        const key = slugifyBlogCategoryKey(category.name);
        button.setAttribute('data-filter', key);
        button.textContent = category.name || 'Unnamed';
        filterContainer.appendChild(button);
    });
    
    if (allButton && filterContainer.firstElementChild !== allButton) {
        filterContainer.insertBefore(allButton, filterContainer.firstElementChild);
    }
    
    console.log('[Blog Categories] ✅ Categories loaded');
}

// Render Team members on homepage (with skeleton loader)
async function loadTeam() {
    const container = document.querySelector('.team-grid');
    if (!container) return;
    
    const data = await fetchJson('/team?status=active&limit=100&sort=order');

    if (!data) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">⚠️</div>
                <h3>Unable to Load Team</h3>
                <p>Could not connect to the API. Please check if the backend is running.</p>
            </div>
        `;
        return;
    }

    if (!data.items || data.items.length === 0) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">👥</div>
                <h3>No Team Members</h3>
                <p>Team members will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = data.items.slice(0, 4).map((member) => {
        const name = escapeHtml(member.name || '');
        const role = escapeHtml(member.role || '');
        const imgUrl = safeHttpImageUrl(member.image || member.photo || '');
        const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase() || 'TM';
        const avatarInner = imgUrl
            ? `<img src="${imgUrl}" alt="" class="team-avatar__img" loading="lazy" width="80" height="80">`
            : `<span class="team-avatar__initials">${initials}</span>`;

        return `
            <div class="team-member will-animate">
                <div class="team-avatar">${avatarInner}</div>
                <h4>${name}</h4>
                <p>${role}</p>
            </div>
        `;
    }).join('');
    
    // Observe new members for animation
    container.querySelectorAll('.team-member').forEach(member => {
        animationObserver.observe(member);
    });
}

/** Map Admin tech category → homepage tab data-tech-tab value */
function techCategoryToTabKey(category) {
    const c = String(category || 'Other').trim();
    if (c === 'Frontend') return 'frontend';
    if (c === 'Backend' || c === 'Database' || c === 'Cloud' || c === 'DevOps') return 'backend';
    if (c === 'Mobile') return 'mobile';
    if (c === 'Ecommerce') return 'ecommerce';
    if (c === 'DataAnalytics') return 'analytics';
    return null;
}

function renderTechLogoItem(tech) {
    const name = escapeHtml(tech.name || '');
    const icon = tech.icon ? escapeHtml(tech.icon) : '';
    const initial = name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || 'TS';
    const img = icon
        ? `<img src="${icon}" alt="${name}" class="tech-logo" loading="lazy" decoding="async">`
        : `<span class="tech-logo-fallback" aria-hidden="true">${initial}</span>`;
    return `
        <div class="tech-logo-item will-animate" tabindex="0">
            ${img}
            <span class="tech-logo-name">${name}</span>
        </div>`;
}

/** Apply optional nested object from GET /global-settings (e.g. key <code>site</code>) */
function applySiteSettingsFromGlobal(gs) {
    if (!gs || typeof gs !== 'object') return;
    const site = gs.site && typeof gs.site === 'object' ? gs.site : gs;

    if (site.stats && typeof site.stats === 'object') {
        const st = site.stats;
        const labels = st.labels && typeof st.labels === 'object' ? st.labels : {};
        const map = [
            ['clients', st.clients, labels.clients],
            ['projects', st.projects, labels.projects],
            ['cmmi', st.cmmi, labels.cmmi],
            ['rating', st.rating, labels.rating],
        ];
        map.forEach(([key, val, lab]) => {
            if (val != null && val !== '') {
                const vEl = document.querySelector(`[data-stat="${key}"]`);
                if (vEl) vEl.textContent = String(val);
            }
            if (lab != null && lab !== '') {
                const lEl = document.querySelector(`[data-stat-label="${key}"]`);
                if (lEl) lEl.textContent = String(lab);
            }
        });
        const aboutMap = [
            ['projects', st.aboutProjects, st.aboutProjectsLabel],
            ['clients', st.aboutClients, st.aboutClientsLabel],
            ['team', st.aboutTeam, st.aboutTeamLabel],
            ['awards', st.aboutAwards, st.aboutAwardsLabel],
        ];
        aboutMap.forEach(([attr, num, lab]) => {
            if (num == null && lab == null) return;
            const block = document.querySelector(`[data-about-stat="${attr}"]`);
            if (!block) return;
            if (num != null && num !== '') {
                const hv = block.querySelector('[data-about-value]');
                if (hv) hv.textContent = String(num);
            }
            if (lab != null && lab !== '') {
                const pl = block.querySelector('[data-about-label]');
                if (pl) pl.textContent = String(lab);
            }
        });
    }

    if (site.contact && typeof site.contact === 'object') {
        const c = site.contact;
        const emailEl = document.querySelector('[data-contact-field="email"]');
        const phoneEl = document.querySelector('[data-contact-field="phone"]');
        const addrEl = document.querySelector('[data-contact-field="address"]');
        if (c.email && emailEl) emailEl.textContent = String(c.email);
        if (c.phone && phoneEl) phoneEl.textContent = String(c.phone);
        if (c.address && addrEl) addrEl.textContent = String(c.address);
    }

    const officesEl = document.getElementById('contactOffices');
    if (officesEl && Array.isArray(site.offices) && site.offices.length) {
        officesEl.innerHTML = site.offices.map((o) => {
            const title = escapeHtml(o.title || o.name || 'Office');
            const lines = Array.isArray(o.lines) ? o.lines : (o.line ? [o.line] : []);
            const body = lines.map((line) => `<li>${escapeHtml(String(line))}</li>`).join('');
            const phone = o.phone ? `<p class="contact-office__phone">${escapeHtml(String(o.phone))}</p>` : '';
            const email = o.email ? `<p class="contact-office__email"><a href="mailto:${escapeHtml(String(o.email))}">${escapeHtml(String(o.email))}</a></p>` : '';
            return `<div class="contact-office"><h4 class="contact-office__title">${title}</h4><ul class="contact-office__lines">${body}</ul>${phone}${email}</div>`;
        }).join('');
    }
}

async function loadSiteSettings() {
    const gs = await fetchJson('/global-settings');
    applySiteSettingsFromGlobal(gs);
}

async function loadIndustries() {
    const grid = document.getElementById('industriesGrid');
    if (!grid) return;

    const data = await fetchJson('/industries?limit=24');
    const items = data && Array.isArray(data.items) ? data.items : [];

    const fallback = `
        <article class="industry-card"><h3 class="industry-card__title">FinTech &amp; Banking</h3>
        <p class="industry-card__text">Secure payments, lending workflows, and compliance-aware architectures.</p>
        <a href="#contact" class="industry-card__link">Discuss a project</a></article>
        <article class="industry-card"><h3 class="industry-card__title">Healthcare &amp; Life Sciences</h3>
        <p class="industry-card__text">Patient-centric apps, integrations, and data handling with privacy in mind.</p>
        <a href="#contact" class="industry-card__link">Discuss a project</a></article>
        <article class="industry-card"><h3 class="industry-card__title">EdTech &amp; Media</h3>
        <p class="industry-card__text">Engagement, subscriptions, and content platforms that scale with your audience.</p>
        <a href="#contact" class="industry-card__link">Discuss a project</a></article>
        <article class="industry-card"><h3 class="industry-card__title">Retail &amp; E‑commerce</h3>
        <p class="industry-card__text">Storefronts, ops tooling, and analytics to grow conversion and repeat buyers.</p>
        <a href="#contact" class="industry-card__link">Discuss a project</a></article>`;

    if (items.length === 0) {
        grid.innerHTML = fallback;
        return;
    }

    grid.innerHTML = items.map((ind) => {
        const title = escapeHtml(ind.name || 'Industry');
        const c = ind.content && typeof ind.content === 'object' ? ind.content : {};
        const textRaw = c.summary || c.description || ind.category || '';
        const text = textRaw ? escapeHtml(String(textRaw)) : 'Discuss how we can help in this space.';
        return `
            <article class="industry-card will-animate">
                <h3 class="industry-card__title">${title}</h3>
                <p class="industry-card__text">${text}</p>
                <a href="#contact" class="industry-card__link">Discuss a project</a>
            </article>`;
    }).join('');

    grid.querySelectorAll('.industry-card').forEach((el) => animationObserver.observe(el));
}

async function loadCaseStudiesHome() {
    const grid = document.getElementById('caseStudiesHomeGrid');
    if (!grid) return;

    grid.innerHTML = Array(3).fill(0).map(() => '<div class="skeleton-tech-item" style="min-height:180px;border-radius:12px;"></div>').join('');

    const data = await fetchJson('/case-studies?limit=6');
    const items = data && Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state-card" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">📋</div>
                <h3>Case studies coming soon</h3>
                <p>Publish case studies from the admin panel (Growth CMS → Case Studies) to show them here.</p>
            </div>`;
        return;
    }

    grid.innerHTML = items.map((cs) => {
        const rawTitle = cs.title || 'Case study';
        const title = escapeHtml(rawTitle);
        const industry = escapeHtml(cs.industry || '');
        const sum = escapeHtml(cs.summary || '');
        const content = cs.content && typeof cs.content === 'object' ? cs.content : {};
        const domain = content.clientDomain ? escapeHtml(String(content.clientDomain)) : '';
        const img = cs.featuredImage ? escapeHtml(cs.featuredImage) : '';
        const hero = img
            ? `<div class="case-study-card__media"><img src="${img}" alt="" loading="lazy" decoding="async"></div>`
            : `<div class="case-study-card__media case-study-card__media--placeholder" aria-hidden="true"><span>${escapeHtml(rawTitle.slice(0, 1))}</span></div>`;
        const metaParts = [];
        if (domain) metaParts.push(`<strong>Client domain:</strong> ${domain}`);
        if (industry) metaParts.push(`<strong>Industry:</strong> ${industry}`);
        const meta = metaParts.length ? `<p class="case-study-card__meta">${metaParts.join(' · ')}</p>` : '';
        const excerpt = sum
            ? `<p class="case-study-card__excerpt">${sum}</p>`
            : '';
        return `
            <article class="case-study-card will-animate">
                ${hero}
                <div class="case-study-card__body">
                    <h3 class="case-study-card__title">${title}</h3>
                    ${meta}
                    ${excerpt}
                </div>
            </article>`;
    }).join('');

    grid.querySelectorAll('.case-study-card').forEach((el) => animationObserver.observe(el));
}

// Render Tech Stack on homepage + fill technology tabs (Admin categories drive tab columns)
async function loadTechStack() {
    const summary = document.querySelector('.tech-grid');
    const data = await fetchJson('/tech-stack?status=active&limit=100&sort=order');

    if (summary) {
        summary.innerHTML = Array(12).fill(0).map(() => '<div class="skeleton-tech-item"></div>').join('');
    }

    if (!data?.items || data.items.length === 0) {
        if (summary) {
            summary.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">💻</div>
                <h3>No Tech Stack Items</h3>
                <p>Tech stack items will be displayed here once they are added through the admin panel.</p>
            </div>`;
        }
        document.querySelectorAll('.tech-logos-grid[data-tech-tab]').forEach((el) => {
            el.innerHTML = '<p class="tech-tab-empty">Add technologies in Admin → Tech Stack.</p>';
        });
        return;
    }

    const items = data.items;

    if (summary) {
        summary.innerHTML = items.map((tech) => {
            const name = escapeHtml(tech.name || '');
            const icon = escapeHtml(tech.icon || '');
            return `
            <div class="tech-item will-animate">
                ${icon ? `<img src="${icon}" alt="${name}" loading="lazy" style="width:32px;height:32px;margin-right:8px;vertical-align:middle;border-radius:4px;">` : ''}
                ${name}
            </div>`;
        }).join('');
        summary.querySelectorAll('.tech-item').forEach((item) => animationObserver.observe(item));
    }

    const buckets = { frontend: [], backend: [], mobile: [], ecommerce: [], analytics: [] };
    items.forEach((tech) => {
        const tab = techCategoryToTabKey(tech.category);
        if (tab && buckets[tab]) buckets[tab].push(tech);
    });

    Object.keys(buckets).forEach((tab) => {
        const el = document.querySelector(`.tech-logos-grid[data-tech-tab="${tab}"]`);
        if (!el) return;
        const list = buckets[tab];
        el.innerHTML = list.length
            ? list.map((t) => renderTechLogoItem(t)).join('')
            : '<p class="tech-tab-empty">No items in this category yet.</p>';
        el.querySelectorAll('.tech-logo-item').forEach((node) => animationObserver.observe(node));
    });
}

// Technologies And Platforms Tabs Functionality
function initTechnologiesTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabList = document.querySelector('.technologies-tabs');
    
    if (tabButtons.length === 0 || !tabList) return;
    
    // Switch tab function
    function switchTab(targetButton) {
        const targetContentId = targetButton.getAttribute('aria-controls');
        const targetContent = document.getElementById(targetContentId);
        
        if (!targetContent) return;
        
        // Remove active class and ARIA attributes from all buttons and contents
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            btn.setAttribute('tabindex', '-1');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true');
            content.setAttribute('tabindex', '-1');
        });
        
        // Add active class and ARIA attributes to selected button and content
        targetButton.classList.add('active');
        targetButton.setAttribute('aria-selected', 'true');
        targetButton.setAttribute('tabindex', '0');
        
        targetContent.classList.add('active');
        targetContent.setAttribute('aria-hidden', 'false');
        targetContent.setAttribute('tabindex', '0');
        
        // Smooth scroll to content if on mobile
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                targetContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }
    
    // Click handler
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(button);
        });
    });
    
    // Keyboard navigation
    tabList.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(tabButtons).findIndex(btn => btn.getAttribute('aria-selected') === 'true');
        let targetIndex = currentIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                targetIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                targetIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                targetIndex = tabButtons.length - 1;
                break;
            default:
                return;
        }
        
        if (targetIndex !== currentIndex && targetIndex >= 0) {
            switchTab(tabButtons[targetIndex]);
            tabButtons[targetIndex].focus();
        }
    });
    
    // Initialize first tab as active if not already set
    const activeButton = Array.from(tabButtons).find(btn => btn.classList.contains('active')) || tabButtons[0];
    if (activeButton) {
        switchTab(activeButton);
    }
}

// Render Pricing Plans on homepage (with skeleton loader)
async function loadPricingPlans() {
    const container = document.querySelector('.pricing-grid');
    if (!container) return;
    
    // Show skeleton loader
    container.innerHTML = createSkeletonLoader(3, 'card');
    
    const data = await fetchJson('/pricing?status=active&limit=100&sort=order');
    
    if (!data?.items || data.items.length === 0) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">💰</div>
                <h3>No Pricing Plans</h3>
                <p>Pricing plans will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.items.map(plan => {
        const name = escapeHtml(plan.name || '');
        const description = escapeHtml(plan.description || '');
        const price = plan.price || 0;
        const currency = plan.currency || 'USD';
        const period = plan.period || 'monthly';
        const features = Array.isArray(plan.features) ? plan.features : [];
        const popular = plan.popular || false;
        const buttonText = escapeHtml(plan.buttonText || 'Get Started');
        const buttonLink = escapeHtml(plan.buttonLink || '#');
        const priceDisplay = price === 0 || price === null ? 'Custom' : `$${price.toLocaleString()}`;
        const periodDisplay = period === 'one-time' ? '' : period === 'monthly' ? '/month' : '/year';
        
        return `
            <div class="pricing-card ${popular ? 'featured' : ''} will-animate">
                ${popular ? '<div class="popular-badge">Most Popular</div>' : ''}
                <h3>${name}</h3>
                <div class="pricing-price">
                    <span class="price-amount">${priceDisplay}</span>
                    ${priceDisplay !== 'Custom' ? `<span class="price-period">${periodDisplay}</span>` : ''}
                </div>
                ${description ? `<p style="margin-bottom:16px;color:#666;">${description}</p>` : ''}
                <ul class="pricing-features">
                    ${features.map(f => `<li>✓ ${escapeHtml(f)}</li>`).join('')}
                </ul>
                <a href="${buttonLink}" class="btn ${popular ? 'btn-primary' : 'btn-secondary'}">${buttonText}</a>
            </div>
        `;
    }).join('');
    
    container.querySelectorAll('.pricing-card').forEach(card => {
        animationObserver.observe(card);
    });
}

// Load Trusted Partners
async function loadPartners() {
    const container = document.querySelector('.partners-grid');
    if (!container) {
        console.warn('[Partners] Container not found');
        return;
    }
    
    console.log('[Partners] Loading partners...');
    const data = await fetchJson('/partners?status=active&limit=100&sort=order');
    console.log('[Partners] Data received:', data);
    
    if (!data) {
        console.error('[Partners] No data returned from API');
        return;
    }
    
    if (!data.items || data.items.length === 0) {
        console.log('[Partners] No partners found in data');
        container.innerHTML = `
            <div class="empty-state-card" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🤝</div>
                <h3>No Partners Available</h3>
                <p>Trusted partner logos will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }
    
    console.log(`[Partners] Rendering ${data.items.length} partners`);
    
    container.innerHTML = data.items.map((p, index) => {
        const name = escapeHtml(p.name || '');
        const subtitle = escapeHtml(p.subtitle || '');
        const logo = escapeHtml(p.logo || '');
        const logoColor = escapeHtml(p.logoColor || '#005CFF');
        const website = escapeHtml(p.website || '');
        
        let logoContent = '';
        if (logo) {
            logoContent = `<img src="${logo}" alt="${name}" loading="lazy" style="max-width:100%;max-height:60px;object-fit:contain;" onerror="this.onerror=null; this.style.display='none'; this.parentElement.querySelector('.partner-logo-fallback').style.display='flex';">`;
        }
        
        const textLogoHTML = `<div class="partner-logo${logo ? ' partner-logo-fallback' : ''}" style="display:${logo ? 'none' : 'flex'}; color: ${logoColor};">${name}</div>`;
        
        const cardContent = `
            ${logo ? `<div style="display:flex;align-items:center;justify-content:center;min-height:60px;margin-bottom:${subtitle ? '8px' : '0'};width:100%;">${logoContent}</div>` : ''}
            ${textLogoHTML}
            ${subtitle ? `<div class="partner-subtitle">${subtitle}</div>` : ''}
        `;
        
        if (website) {
            return `
                <a href="${website}" target="_blank" rel="noopener noreferrer" class="partner-card will-animate">
                    ${cardContent}
                </a>
            `;
        } else {
            return `
                <div class="partner-card will-animate">
                    ${cardContent}
                </div>
            `;
        }
    }).join('');
    
    // Observe new cards for animation
    container.querySelectorAll('.partner-card').forEach(card => {
        animationObserver.observe(card);
    });
}

// Load Custom Software Development Services
let currentServiceCategory = null;
let allServices = [];

function bindServiceCategoryListOnce() {
    const categoryList = document.getElementById('serviceCategoryList');
    if (!categoryList || categoryList.dataset.nsCategoryClickBound === '1') return categoryList;
    categoryList.dataset.nsCategoryClickBound = '1';
    categoryList.addEventListener('click', (e) => {
        const item = e.target.closest('.service-category-item');
        if (!item) return;
        const category = item.getAttribute('data-category');
        const categoryName = item.getAttribute('data-category-name');
        console.log(`\n[Custom Services] ===== CATEGORY CLICKED =====`);
        console.log(`Category: ${categoryName} (${category})`);
        categoryList.querySelectorAll('.service-category-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentServiceCategory = category;
        filterServicesByCategory(category, categoryName);
    });
    return categoryList;
}

async function loadServiceCategories() {
    const categoryList = bindServiceCategoryListOnce();
    const navMega = document.getElementById('navMegaServiceLinks');
    if (!categoryList && !navMega) return;

    console.log('[Service Categories] Loading categories...');
    const data = await fetchJson('/service-categories?status=active&limit=100&sort=order');
    console.log('[Service Categories] Data received:', data);

    if (!data?.items || data.items.length === 0) {
        console.log('[Service Categories] No categories found');
        return;
    }

    if (categoryList) {
        categoryList.innerHTML = data.items.map((cat, index) => {
            const name = escapeHtml(cat.name || '');
            const slug = escapeHtml(cat.slug || name.toLowerCase().replace(/\s+/g, '-'));
            const isActive = index === 0 ? 'active' : '';
            if (index === 0) {
                currentServiceCategory = slug;
            }
            return `<li class="service-category-item ${isActive}" data-category="${slug}" data-category-name="${name}">${name}</li>`;
        }).join('');
    }

    if (navMega) {
        const prefix = document.body.classList.contains('ns-page-home') ? '' : 'index.html';
        const hash = prefix ? prefix + '#custom-services' : '#custom-services';
        navMega.innerHTML = data.items
            .slice(0, 10)
            .map(cat => {
                const name = escapeHtml(cat.name || '');
                const slug = String(cat.slug || (cat.name || '').toLowerCase().replace(/\s+/g, '-')).replace(
                    /"/g,
                    ''
                );
                return `<li><a href="${hash}" class="nav-mega-link" data-category-slug="${slug}">${name}</a></li>`;
            })
            .join('');
    }

    if (categoryList && allServices && allServices.length > 0) {
        const firstActive = categoryList.querySelector('.service-category-item.active');
        if (firstActive) {
            const category = firstActive.getAttribute('data-category');
            const categoryName = firstActive.getAttribute('data-category-name');
            console.log(`[Custom Services] Auto-filtering by first active category: ${categoryName}`);
            filterServicesByCategory(category, categoryName);
        }
    }
}

async function loadCustomServices() {
    const grid = document.getElementById('customServicesGrid');
    if (!grid) return;
    
    console.log('[Custom Services] Loading services...');
    const data = await fetchJson('/services?status=active&limit=100&sort=order');
    console.log('[Custom Services] Data received:', data);
    
    if (!data?.items || data.items.length === 0) {
        console.log('[Custom Services] No services found');
        grid.innerHTML = `
            <div class="empty-state-card" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">💻</div>
                <h3>No Services Available</h3>
                <p>Service offerings will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }
    
    allServices = data.items;
    console.log(`[Custom Services] Loaded ${allServices.length} total services`);
    
    // Log all services with their categories for debugging
    console.log('[Custom Services] Services loaded:');
    allServices.forEach(s => {
        console.log(`  - "${s.name}" → category: "${s.category || 'NO CATEGORY'}"`);
    });
    
    // Wait a bit for categories to load, then filter
    const checkAndFilter = () => {
        const categoryList = document.getElementById('serviceCategoryList');
        if (categoryList && categoryList.children.length > 0) {
            const firstCategoryItem = categoryList.querySelector('.service-category-item.active');
            if (firstCategoryItem) {
                const categorySlug = firstCategoryItem.getAttribute('data-category');
                const categoryName = firstCategoryItem.getAttribute('data-category-name');
                console.log(`[Custom Services] Filtering by first active category: ${categoryName}`);
                filterServicesByCategory(categorySlug, categoryName);
            } else {
                // If no active category, show all services
                console.log('[Custom Services] No active category, showing all services');
                renderServices(allServices);
            }
        } else {
            // Retry after a short delay if categories aren't loaded yet
            setTimeout(checkAndFilter, 200);
        }
    };
    
    // Start checking after a short delay
    setTimeout(checkAndFilter, 300);
}

function filterServicesByCategory(categorySlug, categoryName) {
    console.log(`\n[Custom Services] ===== FILTERING =====`);
    console.log(`Category Name: "${categoryName}"`);
    console.log(`Category Slug: "${categorySlug}"`);
    console.log(`Total services: ${allServices.length}`);
    
    if (!allServices || allServices.length === 0) {
        console.warn('[Custom Services] No services available to filter');
        const grid = document.getElementById('customServicesGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="empty-state-card" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">💻</div>
                    <h3>No Services Available</h3>
                    <p>Service offerings will be displayed here once they are added through the admin panel.</p>
                </div>
            `;
        }
        return;
    }
    
    // Normalize category name for comparison (trim, lowercase)
    const normalizedCategoryName = categoryName.trim().toLowerCase();
    
    // Filter services - match by exact category name (case-insensitive)
    const filtered = allServices.filter(service => {
        const serviceCategory = (service.category || '').trim();
        const normalizedServiceCategory = serviceCategory.toLowerCase();
        
        // Exact match (case-insensitive)
        const exactMatch = normalizedServiceCategory === normalizedCategoryName;
        
        if (exactMatch) {
            console.log(`  ✓ MATCH: "${service.name}" → category: "${serviceCategory}"`);
        }
        
        return exactMatch;
    });
    
    // If no exact match, try partial matching
    if (filtered.length === 0) {
        console.log('[Custom Services] No exact matches, trying partial match...');
        const partialFiltered = allServices.filter(service => {
            const serviceCategory = (service.category || '').trim().toLowerCase();
            return serviceCategory.includes(normalizedCategoryName) || 
                   normalizedCategoryName.includes(serviceCategory);
        });
        
        if (partialFiltered.length > 0) {
            console.log(`[Custom Services] Found ${partialFiltered.length} services with partial match`);
            filtered.push(...partialFiltered);
        }
    }
    
    console.log(`[Custom Services] ===== RESULT: ${filtered.length} services found =====\n`);
    
    // Log all services for debugging
    if (filtered.length === 0) {
        console.log('[Custom Services] All available services:');
        allServices.forEach(s => {
            console.log(`  - "${s.name}" → category: "${s.category || 'NO CATEGORY'}"`);
        });
    }
    
    if (filtered.length > 0) {
        renderServices(filtered);
    } else {
        // Show empty state if no services for this category
        const grid = document.getElementById('customServicesGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="empty-state-card" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">💻</div>
                    <h3>No Services in This Category</h3>
                    <p>No services available for "${categoryName}".</p>
                    <p style="margin-top: 8px; font-size: 14px; color: #999;">Make sure services are assigned to this category in the admin panel.</p>
                </div>
            `;
        }
    }
}

function renderServices(services) {
    const grid = document.getElementById('customServicesGrid');
    if (!grid) return;
    
    console.log(`[Custom Services] Rendering ${services.length} services`);
    
    if (services.length === 0) {
        grid.innerHTML = `
            <div class="empty-state-card" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">💻</div>
                <h3>No Services Available</h3>
                <p>Service offerings will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = services.map((service, index) => {
        const name = escapeHtml(service.name || '');
        const description = escapeHtml(service.description || '');
        const icon = escapeHtml(service.icon || '');
        
        // Create illustration - use icon if available, otherwise generate SVG matching the design
        let illustrationHTML = '';
        if (icon) {
            illustrationHTML = `<img src="${icon}" alt="${name}" loading="lazy" style="width:100%;height:100%;object-fit:contain;">`;
        } else {
            // Generate SVG illustration with purple square, white robot head icon, and decorative circles
            illustrationHTML = `
                <svg width="100%" height="100%" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Decorative circle - top left -->
                    <circle cx="60" cy="50" r="25" fill="#90CAF9" opacity="0.6"/>
                    <!-- Main purple square with rounded corners -->
                    <rect x="100" y="80" width="100" height="100" rx="12" fill="#6C38FF"/>
                    <!-- White robot head icon inside purple square -->
                    <!-- Robot head body -->
                    <rect x="120" y="100" width="60" height="60" rx="8" fill="white" opacity="0.95"/>
                    <!-- Robot eyes (two circles) -->
                    <circle cx="140" cy="125" r="6" fill="#6C38FF"/>
                    <circle cx="160" cy="125" r="6" fill="#6C38FF"/>
                    <!-- Robot mouth (horizontal line) -->
                    <rect x="135" y="145" width="30" height="3" rx="1.5" fill="#6C38FF"/>
                    <!-- Decorative circle - bottom right -->
                    <circle cx="240" cy="190" r="20" fill="#90CAF9" opacity="0.6"/>
                </svg>
            `;
        }
        
        return `
            <div class="custom-service-card will-animate">
                <div class="custom-service-illustration">
                    <div class="custom-service-icon">
                        ${illustrationHTML}
                    </div>
                </div>
                <div class="custom-service-card-header">
                    <h3 class="custom-service-card-title">${name}</h3>
                </div>
                <p class="custom-service-card-description">${description || 'Professional service tailored to your business needs.'}</p>
                <button class="custom-service-more-btn">MORE</button>
            </div>
        `;
    }).join('');
    
    // Observe new cards for animation
    grid.querySelectorAll('.custom-service-card').forEach(card => {
        animationObserver.observe(card);
    });
}

function bindPortfolioFilterDelegation() {
    const filterContainer = document.querySelector('.portfolio-filters');
    if (!filterContainer || filterContainer.dataset.nsPortfolioFilterBound === '1') return;
    filterContainer.dataset.nsPortfolioFilterBound = '1';
    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn || !filterContainer.contains(btn)) return;
        const filter = btn.getAttribute('data-filter');
        filterContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach((card, index) => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    });
                }, index * 30);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Load Portfolio Categories for filters (idempotent: no duplicate buttons on refresh)
async function loadPortfolioCategories() {
    const filterContainer = document.querySelector('.portfolio-filters');
    if (!filterContainer) return;

    bindPortfolioFilterDelegation();

    const data = await fetchJson('/portfolio-categories?status=active&limit=100&sort=order');

    filterContainer.querySelectorAll('.filter-btn:not([data-filter="all"])').forEach((b) => b.remove());

    if (!data?.items || data.items.length === 0) {
        return;
    }

    const allBtn = filterContainer.querySelector('[data-filter="all"]');
    let insertAfter = allBtn;
    data.items.forEach((cat) => {
        const slug = portfolioCategoryFilterSlug(cat);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'filter-btn';
        button.setAttribute('data-filter', slug);
        button.textContent = cat.name || 'Category';
        if (insertAfter) {
            insertAfter.after(button);
            insertAfter = button;
        } else {
            filterContainer.appendChild(button);
        }
    });
}

// ============================================
// Growth CMS (public GET /page/:slug, /global-settings)
// ============================================

async function initGrowthCmsMounts() {
    if (typeof window.growthCmsRenderer !== 'object' || !window.growthCmsRenderer) return;
    try {
        await window.growthCmsRenderer.hydrateGlobalSettings();
    } catch (e) {
        console.warn('[Growth CMS] hydrateGlobalSettings', e);
    }
    const roots = document.querySelectorAll('[data-cms-root]');
    for (const el of roots) {
        const slug = el.getAttribute('data-cms-slug') || 'home';
        try {
            await window.growthCmsRenderer.renderCmsPage(slug, el);
        } catch (e) {
            console.warn('[Growth CMS] render failed for slug:', slug, e);
        }
    }
}

// ============================================
// Global Content Refresh Function
// ============================================

// Global refresh function - can be called from browser console or admin panel
window.refreshWebsiteContent = async function() {
    console.log('[Website] Refreshing all content...');
    console.log('[Website] API_BASE:', API_BASE);
    console.log('[Website] Current page:', window.location.pathname);
    
    try {
        // Load content sections that exist on the current page
        const loadPromises = [];
        
        // Homepage content
        loadPromises.push(loadSiteSettings());
        if (document.getElementById('industriesGrid')) {
            loadPromises.push(loadIndustries());
        }
        if (document.getElementById('caseStudiesHomeGrid')) {
            loadPromises.push(loadCaseStudiesHome());
        }
        if (document.querySelector('.partners-grid')) {
            loadPromises.push(loadPartners());
        }
        // Load service categories first, then services (sidebar and/or header mega menu)
        if (document.getElementById('serviceCategoryList') || document.getElementById('navMegaServiceLinks')) {
            loadPromises.push(loadServiceCategories());
        }
        if (document.getElementById('customServicesGrid')) {
            // Load services after a short delay to ensure categories are loaded
            setTimeout(() => {
                loadCustomServices();
            }, 100);
        }
        if (document.querySelector('.portfolio-grid')) {
            loadPromises.push(loadPortfolio());
        }
        if (document.querySelector('.testimonials-carousel')) {
            loadPromises.push(loadTestimonials());
        }
        if (document.querySelector('.team-grid')) {
            loadPromises.push(loadTeam());
        }
        if (document.querySelector('.tech-grid')) {
            loadPromises.push(loadTechStack());
        }
        if (document.querySelector('.pricing-grid')) {
            loadPromises.push(loadPricingPlans());
        }
        
        // Blog page: load category filters before posts so data-filter keys match card data-category
        const blogGrid = document.querySelector('.blog-grid');
        const blogFilters = document.querySelector('.blog-filters');
        if (blogGrid && blogFilters) {
            await loadBlogCategories();
            await loadBlogList();
        } else {
            if (blogGrid) {
                loadPromises.push(loadBlogList());
            }
        }
        
        // Load all available content in parallel
        await Promise.all(loadPromises);
        
        // Load categories after their respective content is loaded
        const categoryPromises = [];
        if (document.querySelector('.portfolio-filters')) {
            categoryPromises.push(loadPortfolioCategories());
        }
        if (document.querySelector('.blog-filters') && !(blogGrid && blogFilters)) {
            categoryPromises.push(loadBlogCategories());
        }
        
        await Promise.all(categoryPromises);

        if (document.getElementById('blog-post-root')) {
            await loadBlogPostPage();
        }

        await initGrowthCmsMounts();
        
        console.log('[Website] ✅ All content refreshed successfully!');
        
        // Show success notification if notification system exists
        if (window.showNotification) {
            window.showNotification('Content refreshed successfully!', 'success');
        }
        
        return true;
    } catch (error) {
        console.error('[Website] ❌ Error refreshing content:', error);
        console.error('[Website] Error stack:', error.stack);
        if (window.showNotification) {
            window.showNotification('Error refreshing content. Please check console.', 'error');
        }
        return false;
    }
};

// Auto-refresh content every 5 minutes (optional - can be disabled)
let autoRefreshInterval = null;
function startAutoRefresh(intervalMinutes = 5) {
    if (autoRefreshInterval) clearInterval(autoRefreshInterval);
    autoRefreshInterval = setInterval(() => {
        console.log('[Website] Auto-refreshing content...');
        window.refreshWebsiteContent();
    }, intervalMinutes * 60 * 1000);
    console.log(`[Website] Auto-refresh enabled (every ${intervalMinutes} minutes)`);
}

// Stop auto-refresh
function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
        console.log('[Website] Auto-refresh disabled');
    }
}

// Expose refresh controls globally
window.websiteContentControls = {
    refresh: window.refreshWebsiteContent,
    startAutoRefresh,
    stopAutoRefresh
};

// Boot: load CMS-driven sections when present
window.addEventListener('DOMContentLoaded', async () => {
    console.log('[Website] DOM loaded, starting content fetch...');
    console.log('[Website] API_BASE:', API_BASE);
    
    // Initialize technologies tabs
    initTechnologiesTabs();
    
    // Initial content load
    await window.refreshWebsiteContent();

    highlightNavigation();

    // Start auto-refresh (every 5 minutes)
    // Uncomment the line below to enable auto-refresh
    // startAutoRefresh(5);
    
    console.log('[Website] 💡 Tip: Use window.refreshWebsiteContent() in console to manually refresh content');
});

// ============================================
// Performance: Lazy load images
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Performance: Preload critical resources
// ============================================

try {
    const existingCss = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
    const cssHref = existingCss ? existingCss.getAttribute('href') : '/assets/css/styles.css';
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'style';
    preloadLink.href = cssHref;
    document.head.appendChild(preloadLink);
} catch (e) {
    // ignore preload failures
}

// ============================================
// Performance: Reduce motion for users who prefer it
// ============================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

