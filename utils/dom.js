/**
 * DOM utility helpers.
 */

/**
 * Safely get text content from a selector.
 * @param {Element} parent - Parent element
 * @param {string} selector - CSS selector
 * @returns {string}
 */
export function getText(parent, selector) {
  return (parent.querySelector(selector)?.textContent ?? '').trim();
}

/**
 * Escape HTML special characters.
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/**
 * Check if device supports hover (non-touch).
 * @returns {boolean}
 */
export function isTouchDevice() {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}
