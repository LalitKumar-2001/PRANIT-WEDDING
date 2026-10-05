/**
 * Watermark / branding overlay component.
 * Hides the Framer "Buy Now" badge that is injected by the template.
 */
export function initWatermark() {
  const style = document.createElement('style');
  style.textContent = '.framer-JT1sO { display: none !important; }';
  document.head.appendChild(style);
}
