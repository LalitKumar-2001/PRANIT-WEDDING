/**
 * Loads wedding config from the global CONFIG object injected by the HTML.
 * Falls back to defaults so the page never breaks if a key is missing.
 */
export function getConfig() {
  return window.WEDDING_CONFIG ?? {};
}
