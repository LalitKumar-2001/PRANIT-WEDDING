/**
 * Date parsing and formatting utilities.
 */

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Parse date strings like "9th Sep 2026" or "Sep 9, 2026"
 * @param {string} str - Date string
 * @returns {{day: number, month: number, year: number}|null}
 */
export function parseDate(str) {
  let match = str.match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]{3,})\.?,?\s+(\d{4})/);
  if (match) {
    return { day: +match[1], month: MONTHS[match[2].slice(0, 3).toLowerCase()], year: +match[3] };
  }
  match = str.match(/([A-Za-z]{3,})\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/);
  if (match) {
    return { month: MONTHS[match[1].slice(0, 3).toLowerCase()], day: +match[2], year: +match[3] };
  }
  return null;
}

/**
 * Parse time string like "6pm" or "4:30pm"
 * @param {string} str - Time string
 * @returns {{hours: number, minutes: number}|null}
 */
export function parseTime(str) {
  const match = str.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (!match) return null;
  let hours = +match[1] % 12;
  if (match[3].toLowerCase() === 'pm') hours += 12;
  return { hours, minutes: +(match[2] || 0) };
}

/**
 * Format date for ICS calendar file (YYYYMMDDTHHMMSS)
 * @param {Date} date
 * @returns {string}
 */
export function formatForCalendar(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}
