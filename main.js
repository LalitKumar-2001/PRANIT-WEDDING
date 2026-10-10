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

function init() {
  const config = getConfig();

  initOptimizedImages();
  initWatermark();
  initSmoothScroll();
  initScrollAnimations();
  initNavigation();

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
