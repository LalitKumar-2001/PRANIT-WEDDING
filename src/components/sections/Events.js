/**
 * Event card 3-D flip behaviour.
 * Cards flip on hover (mouse) or tap (touch/keyboard).
 */

import { parseDate, parseTime, formatForCalendar } from '../../utils/date.js';
import { getText, escapeHtml } from '../../utils/dom.js';

/**
 * Create and download an ICS calendar file.
 */
function downloadCalendarFile(card, coupleName, eventHours) {
  const dateStr = getText(card, '.framer-inj5oz');
  const timeStr = getText(card, '.framer-g4ggot');

  const date = parseDate(dateStr);
  const time = parseTime(timeStr);
  if (!date || !time) return;

  const start = new Date(date.year, date.month, date.day, time.hours, time.minutes);
  const end = new Date(start.getTime() + eventHours * 3600000);
  const eventName = getText(card, '.framer-d9o4fp');
  const venue = getText(card, '.framer-1lwecf7');

  const escapeIcs = s => s.replace(/([,;\\])/g, '\\$1');
  const icsContent = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invite//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatForCalendar(start)}`,
    `DTEND:${formatForCalendar(end)}`,
    `SUMMARY:${escapeIcs(eventName)} – ${escapeIcs(coupleName)}`,
    `LOCATION:${escapeIcs(venue)}`,
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const link = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: `${eventName.replace(/\s+/g, '_')}.ics`
  });
  link.click();
  URL.revokeObjectURL(link.href);
}

/**
 * Build the back face of an event card.
 */
function createBackFace(card, backData, lookupName, coupleName, eventHours, mapsLink) {
  const eventName = getText(card, '.framer-d9o4fp');
  const info = backData[lookupName] ?? { title: lookupName, lines: [] };

  const back = document.createElement('div');
  back.className = 'event-card-back';
  back.innerHTML = `
    <h3>${escapeHtml(info.title)}</h3>
    <div class="back-divider"></div>
    ${info.lines.map(line => `<p>${escapeHtml(line)}</p>`).join('')}
    <div class="ecf-actions">
      ${mapsLink ? `<a class="ecf-btn" href="${escapeHtml(mapsLink)}" target="_blank" rel="noopener">📍 Get Directions</a>` : ''}
      <button class="ecf-btn alt ecf-ics">📅 Add to Calendar</button>
      <p class="ecf-back-hint">Tap card to flip back</p>
    </div>`;

  back.querySelector('.ecf-ics')?.addEventListener('click', e => {
    e.stopPropagation();
    downloadCalendarFile(card, coupleName, eventHours);
  });

  return back;
}

/**
 * Build the front hint overlay.
 */
function createFrontHint() {
  const div = document.createElement('div');
  div.className = 'ecf-front';
  div.innerHTML = `
    <div class="ecf-hint">
      <b>↻</b>
      <span class="t">Tap for details</span>
      <span class="h">Hover for details</span>
    </div>`;
  return div;
}

/**
 * Initialize event cards with flip behaviour.
 * @param {Object} backData - Map of event names to back-face content
 * @param {string} coupleName - Couple names for calendar event
 * @param {number} eventHours - Default event duration in hours
 */
export function initEventCards(backData, coupleName, eventHours = 3, eventsConfig = []) {
  // Framer's hardcoded b0Odmcs_Z values → config backData keys
  // (after initRepurposedCards mutation fires the displayed name matches the key directly,
  //  but we also map the original Framer names as fallback for the first render pass)
  const FRAMER_NAME_MAP = {
    'Engagement':    'Mehendi',       // framer-1xxttys before mutation
    'Mehendi':       'Mehendi',
    'Mangana Handi': 'Mangana Handi',
    'Sangeet':       'Sangeet',
    'Reception':     'Reception',
    'Haldi':         'Haldi',
    'Baarat':        'Baarat',
  };
  // Build mapsLink lookup from eventsConfig keyed by Framer event name
  const mapsLinkMap = Object.fromEntries(
    eventsConfig.map(e => [e.event, e.mapsLink])
  );

  document.querySelectorAll('.framer-eqI5A').forEach(card => {
    const eventName = getText(card, '.framer-d9o4fp');
    const lookupName = backData[eventName] ? eventName : (FRAMER_NAME_MAP[eventName] ?? eventName);
    if (!backData[lookupName]) return;

    // Resolve mapsLink: from config by display name, or from Framer-rendered anchor
    const framerAnchor = card.querySelector('.framer-1hdt68x a');
    const mapsLink = mapsLinkMap[eventName]
      ?? mapsLinkMap[lookupName]
      ?? framerAnchor?.href
      ?? '';

    // Stop the Framer-rendered "See the route" link from flipping the card
    if (framerAnchor) {
      framerAnchor.addEventListener('click', e => e.stopPropagation());
    }

    card.appendChild(createFrontHint());
    card.appendChild(createBackFace(card, backData, lookupName, coupleName, eventHours, mapsLink));

    // Accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${eventName} event card – activate to see details`);

    // Toggle flip on click/keyboard — but not when clicking a link or button
    const toggle = e => {
      if (e.target.closest('a, button')) return;
      card.classList.toggle('is-flipped');
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('is-flipped'); }
    });
  });
}
