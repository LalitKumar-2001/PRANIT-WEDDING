/**
 * Active section highlight for sticky navigation.
 */

export function initNavigation() {
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.framer-1nkq9it a[href^="#"]');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', isActive);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}
