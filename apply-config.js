/**
 * apply-config.js
 * Reads config/wedding.config.js and patches index.html + assets/js/*.mjs.
 * Run: node apply-config.js
 */

const fs   = require('fs');
const path = require('path');

const config    = require('./config/wedding.config.js');
const HTML_PATH = path.join(__dirname, 'index.html');
const MJS_DIR   = path.join(__dirname, 'assets', 'js');

// Matches an assets/… image URL followed by a Framer query string (?width=…)
// Terminators in HTML: " ' space   Terminators in mjs: ` space
const IMG_QUERY = /(assets\/[\w@./\-]+\.(?:png|jpe?g|webp))\?[^`"'\s,)]+/g;

// ── 1. Patch index.html ───────────────────────────────────────────────────────

let html = fs.readFileSync(HTML_PATH, 'utf8');

// Inject WEDDING_CONFIG global so config-loader.js can read it at runtime
const configScript = `<script>window.WEDDING_CONFIG = ${JSON.stringify(config)};</script>`;
if (!html.includes('window.WEDDING_CONFIG')) {
  html = html.replace('</head>', `${configScript}\n</head>`);
}

// Remove Framer's own audio source + autoplay (MusicPlayer.js owns the music)
html = html.replace(
  /<audio src="assets\/media\/background_music\.mp3" loop class="framer-audio" preload="metadata"\s*autoplay><\/audio>/g,
  '<audio loop class="framer-audio" preload="none"></audio>'
);

// Strip Framer's ?width=…&scale-down-to=… query strings so each image has ONE url
html = html.replace(IMG_QUERY, '$1');

fs.writeFileSync(HTML_PATH, html, 'utf8');
console.log('✓ index.html patched');

// ── 2. Patch assets/js/*.mjs ─────────────────────────────────────────────────

const mjsFiles = fs.readdirSync(MJS_DIR).filter(f => f.endsWith('.mjs'));

for (const file of mjsFiles) {
  const filePath = path.join(MJS_DIR, file);
  let mjs = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Swap Framer's bundled music src so MusicPlayer.js controls the file
  if (mjs.includes('srcFile: `assets/media/background_music.mp3`')) {
    mjs = mjs.replace('srcFile: `assets/media/background_music.mp3`', 'srcFile: ``');
    changed = true;
  }

  // Prevent Framer's audio component from autoplaying on load
  if (mjs.includes('playing: !0, progress: 0')) {
    mjs = mjs.replace('playing: !0, progress: 0', 'playing: !1, progress: 0');
    changed = true;
  }

  // Strip Framer's ?width=…&scale-down-to=… query strings so each image has ONE url
  const noQuery = mjs.replace(IMG_QUERY, '$1');
  if (noQuery !== mjs) { mjs = noQuery; changed = true; }

  if (changed) {
    fs.writeFileSync(filePath, mjs, 'utf8');
    console.log(`✓ ${file} patched`);
  }
}

console.log('Done.');
