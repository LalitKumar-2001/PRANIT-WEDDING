/**
 * Application entry point.
 */

import { initCountdown } from './components/ui/Countdown.js';
import { initMusicPlayer } from './components/ui/MusicPlayer.js';
import { initEventCards } from './components/sections/Events.js';
import { initNavigation } from './components/layout/Navigation.js';
import { initWatermark } from './components/layout/Watermark.js';
import { initScrollAnimations } from './utils/animation.js';
import { initSmoothScroll } from './utils/scroll.js';
import { getConfig } from './utils/config-loader.js';

function init() {
  const config = getConfig();

  initWatermark();
  initSmoothScroll();
  initScrollAnimations();
  initNavigation();

  if (config.countdownDate) initCountdown(config.countdownDate);
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
