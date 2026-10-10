/**
 * Shared animation helpers used across components.
 */

/**
 * Observe elements with [data-animate] and add .is-visible when they enter
 * the viewport, triggering CSS transition animations.
 */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}
