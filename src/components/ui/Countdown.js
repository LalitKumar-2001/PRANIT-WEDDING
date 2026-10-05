/**
 * Countdown timer component.
 * Updates the Framer countdown placeholder element.
 */

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 3600000;
const MS_PER_DAY = 86400000;

/**
 * Initialize countdown timer.
 * @param {string} isoDateString - Target date in ISO 8601 format
 */
export function initCountdown(isoDateString) {
  const targetTime = new Date(isoDateString).getTime();
  const display = document.querySelector('.framer-1oaa3g2-container p');
  if (!display) return;

  function update() {
    const diff = Math.max(0, targetTime - Date.now());

    const days = Math.floor(diff / MS_PER_DAY);
    const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
    const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

    const pad = n => String(n).padStart(2, '0');
    display.textContent = `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    display.style.visibility = 'visible';

    if (diff > 0) setTimeout(update, 1000);
  }

  update();
}
