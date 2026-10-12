/**
 * Application entry point.
 */

import { initDateReveal } from './components/ui/Countdown.js';
import { initMusicPlayer } from './components/ui/MusicPlayer.js';
import { initEventCards } from './components/sections/Events.js';
import { initNavigation } from './components/layout/Navigation.js';
import { initWatermark } from './components/layout/Watermark.js';
import { initScrollAnimations } from './utils/animation.js';
import { initSmoothScroll } from './utils/scroll.js';
import { getConfig } from './utils/config-loader.js';

function initOptimizedImages() {
  const imageVariants = [
    ['assets/grand_palace_night_potrait.png', 'assets/grand_palace_night_potrait.jpg'],
    ...['Image-1', 'Image-2', 'Image-3', 'Image-4', 'Image-5'].map(name => [
      `assets/images/couple/${name}.jpeg`,
      `assets/images/couple/${name}-optimized.jpeg`
    ])
  ];

  const updateImage = image => {
    imageVariants.forEach(([original, optimized]) => {
      ['src', 'srcset'].forEach(attribute => {
        const value = image.getAttribute(attribute);
        if (value?.includes(original)) image.setAttribute(attribute, value.replaceAll(original, optimized));
      });
    });
  };

  const scan = node => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.matches('img')) updateImage(node);
    node.querySelectorAll('img').forEach(updateImage);
  };

  scan(document.documentElement);
  new MutationObserver(records => {
    records.forEach(record => {
      if (record.type === 'attributes') updateImage(record.target);
      record.addedNodes.forEach(scan);
    });
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['src', 'srcset'],
    childList: true,
    subtree: true
  });
}

function initVenueOverrides(events) {
  if (!events?.length) return;
  const venueMap = Object.fromEntries(events.map(e => [e.event, e.venue]));
  const inject = () => {
    document.querySelectorAll('.framer-eqI5A').forEach(card => {
      const nameEl = card.querySelector('.framer-d9o4fp');
      const venueEl = card.querySelector('.framer-1lwecf7');
      if (!nameEl || !venueEl) return;
      const eventName = nameEl.textContent.trim();
      const venue = venueMap[eventName];
      if (venue && venueEl.textContent.trim() !== venue) {
        const p = venueEl.querySelector('p') ?? venueEl;
        p.textContent = venue;
      }
    });
  };
  inject();
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
}

function initMapsCtaLink(url) {
  if (!url) return;
  const inject = () => {
    const container = document.querySelector('.framer-gug0pj-container');
    if (!container) return;
    const anchor = container.querySelector('a');
    if (anchor && anchor.href !== url) anchor.href = url;
  };
  inject();
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
}

function initPresenceText() {
  const inject = () => {
    const section = document.querySelector('.framer-1rq20ml');
    if (!section || section.querySelector('.ttk-presence-text')) return;
    const el = document.createElement('p');
    el.className = 'ttk-presence-text';
    el.textContent = 'Awaiting your presence - PritiPrakash Family';
    section.appendChild(el);
  };
  inject();
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
}

function initCountdownHeading() {
  const inject = () => {
    const section = document.querySelector('.framer-jcebrp');
    if (!section || section.querySelector('.ttk-countdown-heading')) return;
    const el = document.createElement('p');
    el.className = 'ttk-countdown-heading';
    el.textContent = 'Countdown Begins...';
    section.appendChild(el);
  };
  inject();
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
}

function init() {
  const config = getConfig();

  initOptimizedImages();
  initWatermark();
  initSmoothScroll();
  initScrollAnimations();
  initNavigation();
  initCountdownHeading();
  initPresenceText();
  if (config.mapsCtaLink) initMapsCtaLink(config.mapsCtaLink);
  else initMapsCtaLink('https://maps.app.goo.gl/gsEhJjka3zv6nRWc9');
  if (config.events) initVenueOverrides(config.events);
  else initVenueOverrides([
    { event: 'Engagement',     venue: 'Red Mirchi, Trisulia' },
    { event: 'Haldi',          venue: 'Trisulia, Katak' },
    { event: 'Mehendi',        venue: 'Trisulia, Katak' },
    { event: 'Managana Handi', venue: 'Khannagar, Kataka' },
    { event: 'Shaadi',         venue: 'Creative Convention, Balikuda' },
    { event: 'Reception',      venue: 'Gandarpur, Kataka' },
  ]);

  const countdownDate = config.countdownDate ?? '2026-12-06T06:00:00.000Z';
  initDateReveal(countdownDate, `${config.name1Display ?? 'Priti'} & ${config.name2Display ?? 'Ankit'}`);
  if (config.musicUrl) initMusicPlayer(config.musicUrl);
  if (config.eventCardBack) {
    initEventCards(
      config.eventCardBack,
      `${config.name1Display} & ${config.name2Display}`,
      config.eventHours ?? 3
    );
  }
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
