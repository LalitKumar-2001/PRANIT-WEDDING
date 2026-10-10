/**
 * Countdown timer component.
 * Updates the Framer countdown placeholder element.
 */

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 3600000;
const MS_PER_DAY = 86400000;

export function initDateReveal(isoDateString, coupleName) {
  const targetDate = new Date(isoDateString);
  if (Number.isNaN(targetDate.getTime())) return;
  let countdownTimer;

  const mount = () => {
    const instagramSection = document.querySelector('.framer-1cwb6w6');
    if (!instagramSection || document.querySelector('.date-reveal')) return false;

    window.clearTimeout(countdownTimer);
    const monthStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const daysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
    const startOffset = monthStart.getDay();
    const dateLabel = targetDate.toLocaleDateString(undefined, {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    const calendarCells = [
      ...Array.from({ length: startOffset }, () => '<span class="date-reveal__empty" aria-hidden="true"></span>'),
      ...Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        return day === targetDate.getDate()
          ? `<span class="date-reveal__day is-special" role="gridcell" aria-label="${dateLabel}" aria-current="date">${day}</span>`
          : `<span class="date-reveal__day" role="gridcell">${day}</span>`;
      })
    ].join('');

    const section = document.createElement('section');
    section.className = 'date-reveal';
    section.setAttribute('aria-label', `Wedding date: ${dateLabel}`);
    section.innerHTML = `
      <div class="date-reveal__inner">
        <div class="date-reveal__calendar">
          <p class="date-reveal__eyebrow">Save the date</p>
          <h2>${targetDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
          <div class="date-reveal__week" aria-hidden="true">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>
          <div class="date-reveal__days" role="grid" aria-label="${targetDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}">
            ${calendarCells}
          </div>
        </div>
        <div class="date-reveal__details">
          <p class="date-reveal__eyebrow">The day we become family</p>
          <h3>${coupleName}</h3>
          <div class="date-reveal__countdown" aria-label="Time remaining" aria-live="off">
            <div class="date-reveal__unit" data-unit="days"><span class="date-reveal__value">0</span><span class="date-reveal__label">Days</span></div>
            <div class="date-reveal__unit" data-unit="hours"><span class="date-reveal__value">00</span><span class="date-reveal__label">Hours</span></div>
            <div class="date-reveal__unit" data-unit="minutes"><span class="date-reveal__value">00</span><span class="date-reveal__label">Minutes</span></div>
            <div class="date-reveal__unit" data-unit="seconds"><span class="date-reveal__value">00</span><span class="date-reveal__label">Seconds</span></div>
          </div>
        </div>
      </div>`;

    instagramSection.replaceWith(section);

    const update = () => {
      const remaining = Math.max(0, targetDate.getTime() - Date.now());
      const values = {
        days: Math.floor(remaining / MS_PER_DAY),
        hours: Math.floor((remaining % MS_PER_DAY) / MS_PER_HOUR),
        minutes: Math.floor((remaining % MS_PER_HOUR) / MS_PER_MINUTE),
        seconds: Math.floor((remaining % MS_PER_MINUTE) / MS_PER_SECOND)
      };

      Object.entries(values).forEach(([unit, value]) => {
        const output = section.querySelector(`[data-unit="${unit}"] .date-reveal__value`);
        const nextValue = unit === 'days' ? String(value) : String(value).padStart(2, '0');
        if (output.textContent === nextValue) return;
        output.textContent = nextValue;
        output.classList.remove('is-changing');
        requestAnimationFrame(() => {
          output.classList.add('is-changing');
          setTimeout(() => output.classList.remove('is-changing'), 350);
        });
      });

      if (remaining > 0) countdownTimer = window.setTimeout(update, 1000);
    };

    update();
    return true;
  };

  mount();
  const observer = new MutationObserver(() => {
    mount();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
