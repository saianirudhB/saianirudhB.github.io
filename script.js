/**
 * Sai Anirudh Boorla — Portfolio
 * Minimal, dependency-free vanilla JS:
 *  - mobile nav toggle
 *  - smooth scroll to in-page anchors (CSS handles most of it; this closes
 *    the mobile menu and manages focus/ARIA state)
 *  - scroll-reveal for sections using IntersectionObserver
 *  - footer year
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     ------------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);

    // Close the mobile menu after a nav link is used, and let the browser's
    // native smooth scroll (enabled via CSS `scroll-behavior`) do the rest.
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape for keyboard users.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Close when resizing back up to desktop.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 780) closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // No IntersectionObserver support (or no-JS fallback already handled
    // by CSS not hiding content) — just show everything immediately.
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
