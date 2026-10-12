/**
 * Background music player with mute/unmute toggle.
 * Autoplays on first user interaction (required by browsers).
 */

/**
 * Initialize music player.
 * @param {string} src - Audio file URL
 */
export function initMusicPlayer(src) {
  const button = document.querySelector('.framer-2fmrhl-container');
  if (!button) return;

  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.4;
  let isPlaying = false;

  function play() {
    audio.play().then(() => { isPlaying = true; }).catch(() => {});
  }

  function toggle() {
    isPlaying ? audio.pause() : play();
    isPlaying = !isPlaying;
  }

  // Autoplay on first interaction (browser requirement)
  document.addEventListener('click', play, { once: true });
  document.addEventListener('touchstart', play, { once: true });

  button.addEventListener('click', e => {
    e.stopPropagation();
    toggle();
  });
}
