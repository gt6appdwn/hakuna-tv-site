/**
 * NEXUS STREAM — Minimalist Performance JavaScript
 * Zero dependencies, < 2KB, fully accessible
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(isExpanded));
      mobileNav.classList.toggle('is-open', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    // Close mobile menu on any link click
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });
  }

  // Smooth scroll offset adjustment for fixed header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Set focus to section for keyboard navigation
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
});
