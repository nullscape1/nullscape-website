/**
 * Mega navigation: mobile accordion, desktop touch toggles, Escape, outside-click.
 */
(function () {
    'use strict';

    var mqMobile = window.matchMedia('(max-width: 1023px)');
    var mqDesktop = window.matchMedia('(min-width: 1024px)');
    var navMenu = document.getElementById('navMenu');
    var navToggle = document.getElementById('navToggle');
    if (!navMenu) return;

    var megaItems = navMenu.querySelectorAll('.nav-item--mega');

    /** Large screens where hover is unreliable (tablet landscape, touch laptops). */
    function useDesktopTapMega() {
        if (!mqDesktop.matches) return false;
        if (window.matchMedia('(hover: none)').matches) return true;
        if (window.matchMedia('(pointer: coarse)').matches) return true;
        return false;
    }

    function closeAllMega() {
        megaItems.forEach(function (item) {
            item.classList.remove('is-open');
            var t = item.querySelector('.nav-link--trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    }

    megaItems.forEach(function (item) {
        var trigger = item.querySelector('.nav-link--trigger');
        if (!trigger) return;

        trigger.addEventListener('click', function (e) {
            if (mqMobile.matches) {
                e.preventDefault();
                var willOpen = !item.classList.contains('is-open');
                megaItems.forEach(function (other) {
                    if (other !== item) {
                        other.classList.remove('is-open');
                        var ot = other.querySelector('.nav-link--trigger');
                        if (ot) ot.setAttribute('aria-expanded', 'false');
                    }
                });
                item.classList.toggle('is-open', willOpen);
                trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
                return;
            }

            if (useDesktopTapMega()) {
                e.preventDefault();
                e.stopPropagation();
                var open = !item.classList.contains('is-open');
                megaItems.forEach(function (other) {
                    if (other !== item) {
                        other.classList.remove('is-open');
                        var ot = other.querySelector('.nav-link--trigger');
                        if (ot) ot.setAttribute('aria-expanded', 'false');
                    }
                });
                item.classList.toggle('is-open', open);
                trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
            }
        });
    });

    document.addEventListener(
        'click',
        function (e) {
            if (!mqDesktop.matches || !useDesktopTapMega()) return;
            var inside = e.target.closest && e.target.closest('.nav-item--mega');
            if (!inside) closeAllMega();
        },
        true
    );

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        closeAllMega();
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.style.overflow = '';
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open menu');
            }
        }
    });

    mqMobile.addEventListener('change', function () {
        if (!mqMobile.matches) closeAllMega();
    });

    mqDesktop.addEventListener('change', function () {
        closeAllMega();
    });

    window.closeAllMegaNav = closeAllMega;
})();
