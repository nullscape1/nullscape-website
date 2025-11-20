// ============================================
// Nullscape Website - Optimized & Enhanced
// ============================================

// Performance: Debounce and throttle utilities
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Active Navigation Link (Optimized)
// ============================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', throttle(highlightNavigation, 100));

// ============================================
// Smooth Scroll (Enhanced)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = header?.offsetHeight || 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
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

function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const carouselDots = document.querySelector('.carousel-dots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (testimonialCards.length === 0) return;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        if (carouselDots) {
            carouselDots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(next);
    }
    
    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(prev);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoPlay();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoPlay();
    });
    
    if (carouselDots) {
        carouselDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetAutoPlay();
            });
        });
    }
    
    function resetAutoPlay() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    // Auto-play
    resetAutoPlay();
    
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        carousel.addEventListener('mouseleave', resetAutoPlay);
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

// Config: set window.NULLSCAPE_API_BASE in HTML to override
const API_BASE = window.NULLSCAPE_API_BASE || 'http://localhost:4000/api/v1';

// Production mode detection - suppress console.log in production
const isProduction = typeof window !== 'undefined' && 
                     window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1' &&
                     !window.location.hostname.startsWith('192.168.') &&
                     !window.location.hostname.endsWith('.local');

// Console wrapper - only in production
if (isProduction && typeof window !== 'undefined' && window.console) {
  const originalConsole = { ...window.console };
  window.console.log = () => {};
  window.console.debug = () => {};
  window.console.info = () => {};
  // Keep error and warn for critical issues
}

async function fetchJson(path, options = {}, retries = 2) {
    const url = `${API_BASE}${path}`;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            if (attempt > 0) {
                console.log(`[API] Retry attempt ${attempt} for ${path}`);
                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
            
            console.log(`[API] Fetching: ${url}`);
            const res = await fetch(url, {
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                ...options
            });
            
            if (!res.ok) {
                // Don't retry on 404 or 401 errors
                if (res.status === 404 || res.status === 401) {
                    console.warn(`[API] Request failed for ${path}: ${res.status} ${res.statusText}`);
                    return null;
                }
                
                // Retry on server errors (5xx) or network issues
                if (attempt < retries && (res.status >= 500 || res.status === 0)) {
                    console.warn(`[API] Server error ${res.status}, will retry...`);
                    continue;
                }
                
                console.error(`[API] Request failed for ${path}: ${res.status} ${res.statusText}`);
                if (res.status !== 404) {
                    try {
                        const errorText = await res.text();
                        console.error(`[API] Error response:`, errorText);
                    } catch (e) {
                        // Ignore error reading response
                    }
                }
                return null;
            }
            
            const data = await res.json();
            console.log(`[API] ✅ Success for ${path} (${data?.items?.length || 0} items)`);
            return data;
            
        } catch (e) {
            // Network errors - retry if attempts remaining
            if (attempt < retries) {
                console.warn(`[API] Network error (attempt ${attempt + 1}/${retries + 1}):`, e.message);
                continue;
            }
            
            console.error(`[API] ❌ Network error fetching ${path}:`, e.message);
            console.error(`[API] API_BASE:`, API_BASE);
            console.error(`[API] Full URL:`, url);
            console.error(`[API] Make sure backend is running on ${API_BASE.replace('/api/v1', '')}`);
            return null;
        }
    }
    
    return null;
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Skeleton loader HTML
function createSkeletonLoader(count = 3, type = 'card') {
    const skeletons = Array(count).fill(0).map(() => {
        if (type === 'card') {
            return `
                <div class="skeleton-card">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-line skeleton-title"></div>
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line skeleton-short"></div>
                    </div>
                </div>
            `;
        } else if (type === 'service') {
            return `
                <div class="skeleton-service">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-line skeleton-title"></div>
                    <div class="skeleton-line"></div>
                </div>
            `;
        }
        return '';
    }).join('');
    return skeletons;
}

// Render Services on homepage (with skeleton loader)
async function loadServices() {
    const container = document.querySelector('.services-grid');
    if (!container) {
        console.warn('[Services] Container not found');
        return;
    }
    
    // Show skeleton loader
    container.innerHTML = createSkeletonLoader(8, 'service');
    
    console.log('[Services] Loading services...');
    const data = await fetchJson('/services?status=active&limit=100');
    console.log('[Services] Data received:', data);
    
    if (!data) {
        console.error('[Services] No data returned from API');
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">⚠️</div>
                <h3>Unable to Load Services</h3>
                <p>Could not connect to the API. Please check if the backend is running.</p>
            </div>
        `;
        return;
    }
    
    if (!data.items || data.items.length === 0) {
        console.log('[Services] No services found in data');
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">📋</div>
                <h3>No Services Available</h3>
                <p>Services will be displayed here once they are added through the admin panel.</p>
                <p style="margin-top: 8px; font-size: 14px; color: #999;">Make sure services have status set to "active" in the admin panel.</p>
            </div>
        `;
        return;
    }
    
    console.log(`[Services] Rendering ${data.items.length} services`);
    
    container.innerHTML = data.items.map(s => {
        const name = escapeHtml(s.name);
        const desc = escapeHtml(s.description || '');
        const icon = escapeHtml(s.icon);
        return `
            <div class="service-card will-animate">
                <div class="service-icon">
                    ${icon ? `<img src="${icon}" alt="${name}" loading="lazy" style="width:48px;height:48px;border-radius:12px;object-fit:cover;">` : `
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <defs><linearGradient id="serviceDyn" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stop-color="#005CFF"/><stop offset="100%" stop-color="#6C38FF"/></linearGradient></defs>
                            <rect width="48" height="48" rx="12" fill="url(#serviceDyn)"/>
                            <path d="M16 24L22 30L32 18" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`}
                </div>
                <h3>${name}</h3>
                <p>${desc}</p>
            </div>
        `;
    }).join('');
    
    // Observe new cards for animation
    container.querySelectorAll('.service-card').forEach(card => {
        animationObserver.observe(card);
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
        categoriesData.items.forEach(cat => {
            const slug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-');
            categoryMap.set(cat.name, slug);
        });
    }
    
    container.innerHTML = data.items.map(p => {
        const name = escapeHtml(p.name);
        const summary = escapeHtml(p.solution || p.problem || '');
        // Map category name to slug for filtering
        const categoryName = p.category || 'Other';
        const cat = categoryMap.get(categoryName) || categoryName.toLowerCase().replace(/\s+/g, '-');
        const tags = Array.isArray(p.techStack) ? p.techStack.slice(0, 2) : [];
        const img = Array.isArray(p.screenshots) && p.screenshots[0] ? escapeHtml(p.screenshots[0]) : null;
        return `
            <div class="portfolio-card will-animate" data-category="${cat}">
                <div class="portfolio-image">
                    ${img ? `<img src="${img}" alt="${name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">` : `<div class="portfolio-placeholder"></div>`}
                </div>
                <div class="portfolio-content">
                    <h3>${name}</h3>
                    <p>${summary}</p>
                    <div class="portfolio-tags">
                        ${tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Observe new cards for animation
    container.querySelectorAll('.portfolio-card').forEach(card => {
        animationObserver.observe(card);
    });
}

// Render Testimonials on homepage (with skeleton loader)
async function loadTestimonials() {
    const container = document.querySelector('.testimonials-carousel');
    const dotsWrap = document.querySelector('.carousel-dots');
    if (!container || !dotsWrap) return;
    
    // Show skeleton loader
    container.innerHTML = createSkeletonLoader(3, 'card');
    
    const data = await fetchJson('/testimonials?status=active&limit=100');
    
    if (!data?.items || data.items.length === 0) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">💬</div>
                <h3>No Testimonials Available</h3>
                <p>Client testimonials will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.items.map((t, idx) => {
        const name = escapeHtml(t.clientName);
        const review = escapeHtml(t.review || t.testimonial || '');
        const rating = Math.max(1, Math.min(5, Number(t.rating || 5)));
        const stars = '★★★★★'.slice(0, rating).padEnd(5, '☆');
        const picture = escapeHtml(t.picture);
        return `
            <div class="testimonial-card ${idx === 0 ? 'active' : ''}">
                <div class="testimonial-rating">${stars}</div>
                <p class="testimonial-text">"${review}"</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar" ${picture ? `style="background-image:url('${picture}');background-size:cover;background-position:center;"` : ''}></div>
                    <div><h4>${name}</h4></div>
                </div>
            </div>
        `;
    }).join('');
    
    // Rebuild dots and wire controls
    dotsWrap.innerHTML = '';
    const cards = container.querySelectorAll('.testimonial-card');
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dotsWrap.appendChild(dot);
    });
    
    // Reinitialize carousel
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
    
    const data = await fetchJson('/blog?status=published&limit=12');
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
        const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
        const contentLength = (post.contentHtml || '').length;
        const read = contentLength > 0 ? Math.max(3, Math.min(10, Math.round(contentLength / 1200))) + ' min read' : '1 min read';
        const tag = Array.isArray(post.tags) && post.tags.length > 0 && post.tags[0] ? escapeHtml(post.tags[0]) : (post.category || 'General');
        const img = post.thumbnail ? escapeHtml(post.thumbnail) : null;
        const categorySlug = tag.toLowerCase().replace(/\s+/g, '-');
        
        return `
            <article class="blog-card will-animate" data-category="${categorySlug}">
                <div class="blog-image">
                    ${img ? `<img src="${img}" alt="${title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">` : '<div style="width:100%;height:100%;background:linear-gradient(135deg, #005CFF, #6C38FF);display:flex;align-items:center;justify-content:center;font-size:48px;">📝</div>'}
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-category">${tag}</span>
                        <span>${date}</span>
                        <span>${read}</span>
                    </div>
                    <h3>${title}</h3>
                    <p>${desc || 'No description available.'}</p>
                    <a href="#" class="blog-read-more">Read More →</a>
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

// Load Blog Categories for filtering
async function loadBlogCategories() {
    const filterContainer = document.querySelector('.blog-filters');
    if (!filterContainer) {
        console.warn('[Blog Categories] Filter container not found');
        return;
    }
    
    console.log('[Blog Categories] Loading categories...');
    const data = await fetchJson('/blog-categories?status=active&limit=100');
    
    if (!data?.items || data.items.length === 0) {
        console.log('[Blog Categories] No categories found');
        // Keep default "All" button if no categories
        return;
    }
    
    console.log(`[Blog Categories] Found ${data.items.length} categories`);
    
    // Create filter buttons
    const allButton = filterContainer.querySelector('[data-filter="all"]');
    const existingButtons = filterContainer.querySelectorAll('.blog-filter-btn:not([data-filter="all"])');
    
    // Remove old category buttons (except "All")
    existingButtons.forEach(btn => btn.remove());
    
    // Add category buttons
    data.items.forEach(category => {
        const button = document.createElement('button');
        button.className = 'blog-filter-btn';
        button.setAttribute('data-filter', category.slug || category.name.toLowerCase().replace(/\s+/g, '-'));
        button.textContent = category.name || 'Unnamed';
        
        // Insert before the last element (if there's an "All" button) or append
        if (allButton && allButton.nextSibling) {
            filterContainer.insertBefore(button, allButton.nextSibling);
        } else {
            filterContainer.appendChild(button);
        }
    });
    
    // Re-initialize filter functionality
    setTimeout(() => {
        const blogFilterButtons = document.querySelectorAll('.blog-filter-btn');
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogFilterButtons.forEach(button => {
            // Remove existing listeners
            const newButton = button.cloneNode(true);
            button.parentNode?.replaceChild(newButton, button);
            
            newButton.addEventListener('click', () => {
                blogFilterButtons.forEach(btn => btn.classList.remove('active'));
                newButton.classList.add('active');
                
                const filter = newButton.getAttribute('data-filter');
                
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
        });
    }, 100);
    
    console.log('[Blog Categories] ✅ Categories loaded and filters initialized');
}

// Render Team members on homepage (with skeleton loader)
async function loadTeam() {
    const container = document.querySelector('.team-grid');
    if (!container) return;
    
    const data = await fetchJson('/team?status=active&limit=100');
    
    if (!data?.items || data.items.length === 0) {
        // Show empty state if no team data
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">👥</div>
                <h3>No Team Members</h3>
                <p>Team members will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.items.slice(0, 4).map(member => {
        const name = escapeHtml(member.name || '');
        const role = escapeHtml(member.role || '');
        const photo = escapeHtml(member.photo || '');
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || 'TM';
        
        return `
            <div class="team-member will-animate">
                <div class="team-avatar" ${photo ? `style="background-image:url('${photo}');background-size:cover;background-position:center;"` : ''}>
                    ${!photo ? `<span style="font-size:24px;font-weight:bold;color:#005CFF;">${initials}</span>` : ''}
                </div>
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

// Render Tech Stack on homepage (with skeleton loader)
async function loadTechStack() {
    const container = document.querySelector('.tech-grid');
    if (!container) return;
    
    // Show skeleton loader
    container.innerHTML = Array(12).fill(0).map(() => '<div class="skeleton-tech-item"></div>').join('');
    
    const data = await fetchJson('/tech-stack?status=active&limit=100');
    
    if (!data?.items || data.items.length === 0) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-state-icon">💻</div>
                <h3>No Tech Stack Items</h3>
                <p>Tech stack items will be displayed here once they are added through the admin panel.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = data.items.map(tech => {
        const name = escapeHtml(tech.name || '');
        const icon = escapeHtml(tech.icon || '');
        return `
            <div class="tech-item will-animate">
                ${icon ? `<img src="${icon}" alt="${name}" loading="lazy" style="width:32px;height:32px;margin-right:8px;vertical-align:middle;border-radius:4px;">` : ''}
                ${name}
            </div>
        `;
    }).join('');
    
    container.querySelectorAll('.tech-item').forEach(item => {
        animationObserver.observe(item);
    });
}

// Render Pricing Plans on homepage (with skeleton loader)
async function loadPricingPlans() {
    const container = document.querySelector('.pricing-grid');
    if (!container) return;
    
    // Show skeleton loader
    container.innerHTML = createSkeletonLoader(3, 'card');
    
    const data = await fetchJson('/pricing?status=active&limit=100');
    
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

// Load Portfolio Categories for filters
async function loadPortfolioCategories() {
    const data = await fetchJson('/portfolio-categories?status=active&limit=100');
    const filterContainer = document.querySelector('.portfolio-filters');
    if (!filterContainer) return;
    
    if (!data?.items || data.items.length === 0) {
        // If no categories, keep only "All" button
        return;
    }
    
    // Keep "All" button, add category buttons
    const existingAllBtn = filterContainer.querySelector('[data-filter="all"]');
    const categoryButtons = data.items.map(cat => {
        const name = escapeHtml(cat.name || '');
        const slug = escapeHtml(cat.slug || name.toLowerCase().replace(/\s+/g, '-'));
        return `<button class="filter-btn" data-filter="${slug}">${name}</button>`;
    }).join('');
    
    if (existingAllBtn) {
        existingAllBtn.insertAdjacentHTML('afterend', categoryButtons);
    } else {
        filterContainer.innerHTML = `<button class="filter-btn active" data-filter="all">All</button>${categoryButtons}`;
    }
    
    // Re-wire filter buttons after portfolio is loaded
    setTimeout(() => {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        
        filterButtons.forEach(button => {
            // Remove existing listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode?.replaceChild(newButton, button);
            
            newButton.addEventListener('click', () => {
                const filter = newButton.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                newButton.classList.add('active');
                
                portfolioCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
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
        });
    }, 500); // Wait for portfolio to load
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
        if (document.querySelector('.services-grid')) {
            loadPromises.push(loadServices());
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
        
        // Blog page content
        if (document.querySelector('.blog-grid')) {
            loadPromises.push(loadBlogList());
        }
        
        // Load all available content in parallel
        await Promise.all(loadPromises);
        
        // Load categories after their respective content is loaded
        const categoryPromises = [];
        if (document.querySelector('.portfolio-filters')) {
            categoryPromises.push(loadPortfolioCategories());
        }
        if (document.querySelector('.blog-filters')) {
            categoryPromises.push(loadBlogCategories());
        }
        
        await Promise.all(categoryPromises);
        
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
    
    // Initial content load
    await window.refreshWebsiteContent();
    
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

const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'style';
preloadLink.href = 'styles.css';
document.head.appendChild(preloadLink);

// ============================================
// Accessibility: Keyboard navigation
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Performance: Reduce motion for users who prefer it
// ============================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

