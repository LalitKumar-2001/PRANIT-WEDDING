#!/usr/bin/env node
// ============================================================
// apply-config.js — Patches the Framer invitation with values
// from wedding.config.js
//
// Usage: node apply-config.js
// ============================================================

const fs = require("fs");
const path = require("path");

const CONFIG_FILE = path.join(__dirname, "wedding.config.js");
const TARGET_FILE = path.join(__dirname, "assets/js/rnnTUOxVq8PHuNJnW02Z-QNi-QQMH82osuPTQxAKcn0.BYt2vYcP.mjs");
const BACKUP_FILE = TARGET_FILE + ".bak";
const COUPLE_DIR = path.join(__dirname, "assets/images/couple");
const FRAME_DIR = path.join(__dirname, "assets/images/frame");

// ── Load config ─────────────────────────────────────────────
const cfg = require(CONFIG_FILE);

// ── Read target (always from backup to allow re-runs) ───────
if (!fs.existsSync(BACKUP_FILE)) {
  fs.copyFileSync(TARGET_FILE, BACKUP_FILE);
  console.log("✅ Backup created:", BACKUP_FILE);
}
let src = fs.readFileSync(BACKUP_FILE, "utf8");



// ── Helper: exact string replace (throws if not found) ──────
function replace(from, to) {
  if (!src.includes(from)) {
    console.warn(`⚠️  Pattern not found — skipping:\n   ${from.slice(0, 80)}`);
    return;
  }
  src = src.split(from).join(to);
}

// ── 1. Hero banner names (Couple's names 3 component) ───────
// Apply nameOrder: name1 always occupies the "left/first" slot in the template
// If nameOrder is "name2_weds_name1", swap so name2 appears first visually
const heroFirst = cfg.nameOrder === "name2_weds_name1" ? cfg.name2 : cfg.name1;
const heroSecond = cfg.nameOrder === "name2_weds_name1" ? cfg.name1 : cfg.name2;
const dispFirst = cfg.nameOrder === "name2_weds_name1" ? cfg.name2Display : cfg.name1Display;
const dispSecond = cfg.nameOrder === "name2_weds_name1" ? cfg.name1Display : cfg.name2Display;

replace(`q_Mw9gntU: \`PRITI\``, `q_Mw9gntU: \`${heroFirst}\``);
replace(`BGQVPX9uc: \`ANKIT\``, `BGQVPX9uc: \`${heroSecond}\``);
// defaultProps inside component definition
replace(`defaultValue: \`ANKIT\``, `defaultValue: \`${heroFirst}\``);
replace(`defaultValue: \`PRITI\``, `defaultValue: \`${heroSecond}\``);

// ── 2. Bride & Groom section names ──────────────────────────
replace(`tml4boL7l: \`Priti\``, `tml4boL7l: \`${dispFirst}\``);
replace(`dJVbfF52C: \`Ankit\``, `dJVbfF52C: \`${dispSecond}\``);

// ── 3. Mantra ────────────────────────────────────────────────
replace(`Ka1jTZQ18: \`ॐ श्री गणेशाय नम\``, `Ka1jTZQ18: \`${cfg.mantra}\``);

// ── 4. Join us text ─────────────────────────────────────────
replace(
  `mkRqKd7Wh: \`You to join us in the wedding celebrations of\``,
  `mkRqKd7Wh: \`${cfg.joinUsText}\``
);

// ── 5. Couple's message ─────────────────────────────────────
replace(
  `pcs_ZoWCD: \`We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness.We are looking forward to see you at the wedding.\``,
  `pcs_ZoWCD: \`${cfg.couplesMessage}\``
);

// ── 6 & 7. Family names — order follows nameOrder ───────────
// The template has two family blocks:
//   Block A (rEqxinV9x / KhId2_Z78 / SwyWMQuoO): the "first" person's family
//   Block B (sKFuJb5xa / PF8ftF8Ur):              the "second" person's family
// When nameOrder is "name1_weds_name2": name1 (groom) is first → Block A = groom, Block B = bride
// When nameOrder is "name2_weds_name1": name2 is first → Block A = bride, Block B = groom
const groomFirst = cfg.nameOrder !== "name2_weds_name1";

const blockA = groomFirst
  ? { blessingOf: cfg.groomBlessingOf, grandparents: cfg.groomGrandparents, parents: cfg.groomParents }
  : { blessingOf: cfg.groomBlessingOf, grandparents: cfg.groomGrandparents, parents: cfg.brideParents };
const blockB = groomFirst
  ? { relation: cfg.brideRelation, parents: cfg.brideParents }
  : { relation: cfg.brideRelation, parents: cfg.groomParents };

replace(`rEqxinV9x: \`With the heavenly blessings of \``, `rEqxinV9x: \`${blockA.blessingOf}\``);
replace(`KhId2_Z78: \`Smt. Groom Grandmother & Sm. Groom Grandfather\``, `KhId2_Z78: \`${blockA.grandparents}\``);
replace(`SwyWMQuoO: \`Mrs. Bride Mother & Mr. Bride Father\``, `SwyWMQuoO: \`${blockA.parents}\``);
replace(`sKFuJb5xa: \`Daughter of\``, `sKFuJb5xa: \`${blockB.relation}\``);
replace(`PF8ftF8Ur: \`Mrs. Groom Mother & Mr. Groom Father,\``, `PF8ftF8Ur: \`${blockB.parents}\``);

// ── 8. Events ───────────────────────────────────────────────
// Strategy: locate each card's instantiation block by finding the pattern
// `name: `Card N`, nodeId: `<id>`` which is unique per card, then replace
// props within a bounded window (up to the closing `}) })` of that card).
const eventNodeIds = ["kuuPkpWqY", "XSHCv73ay", "qqiq8_WCg", "gwb3xf1SZ", "iBrVgSsnX", "lCh_X2l0t"];
cfg.events.forEach((ev, i) => {
  const id = eventNodeIds[i];
  if (!id) return;
  // Anchor on the card's outer container: `nodeId: `<id>`` — unique per card
  const anchor = `nodeId: \`${id}\``;
  if (!src.includes(anchor)) { console.warn(`⚠️  Event card ${i + 1} anchor not found`); return; }

  const anchorIdx = src.indexOf(anchor);
  // Take a bounded window of ~500 chars after the anchor — enough for all 5 props
  const before = src.slice(0, anchorIdx + anchor.length);
  let window = src.slice(anchorIdx + anchor.length, anchorIdx + anchor.length + 500);
  const after = src.slice(anchorIdx + anchor.length + 500);

  window = window.replace(/b0Odmcs_Z: `[^`]*`/, `b0Odmcs_Z: \`${ev.event}\``);
  window = window.replace(/I7wqgbAd_: `[^`]*`/, `I7wqgbAd_: \`${ev.date}\``);
  window = window.replace(/Oz7wr6hEc: `[^`]*`/, `Oz7wr6hEc: \`${ev.venue}\``);
  window = window.replace(/Ee2cAuq7F: `[^`]*`/, `Ee2cAuq7F: \`${ev.time}\``);
  if (ev.mapsLink) {
    window = window.replace(/Ze39EmOzQ: `[^`]*`/, `Ze39EmOzQ: \`${ev.mapsLink}\``);
  }
  src = before + window + after;
});

// ── 9. Things to Know ───────────────────────────────────────
const ttkNodeIds = ["uadvB6eiz", "e9zb3cLno", "LafV3CnVU", "faCGxlxEn"];
cfg.thingsToKnow.forEach((ttk, i) => {
  const id = ttkNodeIds[i];
  if (!id) return;
  const parts = src.split(`id: \`${id}\``);
  if (parts.length < 2) return;
  let seg = parts[1];
  seg = seg.replace(/PVzPSjchM: `[^`]*`/, `PVzPSjchM: \`${ttk.title}\``);
  seg = seg.replace(/PrrSJxMUh: `[^`]*`/, `PrrSJxMUh: \`${ttk.info}\``);
  src = parts[0] + `id: \`${id}\`` + seg;
});

// ── 10. Countdown date ──────────────────────────────────────
replace(`date: \`2026-12-06T00:00:00.000Z\``, `date: \`${cfg.countdownDate}\``);

// ── 11. Links ────────────────────────────────────────────────
replace(`i9HrUZDnv: \`https://wa.me/91XXXXXXXXXX\``, `i9HrUZDnv: \`${cfg.whatsappRsvpLink}\``);
replace(`i9HrUZDnv: \`https://www.linkedin.com/in/lalitkumarod/\``, `i9HrUZDnv: \`${cfg.mapsCtaLink}\``);
replace(`i9HrUZDnv: \`https://www.linkedin.com/in/lalitkumarod/\``, `i9HrUZDnv: \`${cfg.instagramCtaLink}\``);
replace(`oYsZVBOnc: \`https://rzp.io/rzp/city2\``, `oYsZVBOnc: \`${cfg.buyNowLink}\``);

// ── 12. Music ────────────────────────────────────────────────
replace(
  `srcFile: \`https://framerusercontent.com/assets/q8x7MYVF61gOLfkcxdG7dlXjxw.mp3\``,
  `srcFile: \`${cfg.musicUrl}\``
);

// ── 13. Couple photos (slideshow) — dynamic from assets/images/couple/ ──
const coupleExts = /\.(jpe?g|png|webp|gif)$/i;
const coupleFiles = fs.readdirSync(COUPLE_DIR)
  .filter(f => coupleExts.test(f))
  .sort();

if (coupleFiles.length > 0) {
  // Slot class names in order as they appear in the JS
  const slotClasses = [
    `framer-679jd`,
    `framer-sif4cl`,
    `framer-1w6qfi3`,
    `framer-1qvpcia`,
    `framer-pft7l8`,
    `framer-l15e94`,
  ];
  slotClasses.forEach((cls, i) => {
    const img = coupleFiles[i % coupleFiles.length];
    const relPath = `assets/images/couple/${img}`;
    // Replace src inside the block identified by className: `<cls>`
    const parts = src.split(`className: \`${cls}\``);
    if (parts.length < 2) { console.warn(`⚠️  Slot class ${cls} not found`); return; }
    // Replace the first src: `...` and srcSet: `...` in the segment after the class marker
    let seg = parts[1];
    // Slot 1 (framer-679jd) has src BEFORE className, handle separately
    if (i === 0) {
      src = src.replace(/src: `https:\/\/framerusercontent\.com\/images\/fKFg2vQEmI70QHKfOSr54pE7KQ4[^`]*`/, `src: \`${relPath}\``);
      src = src.replace(/srcSet: `https:\/\/framerusercontent\.com\/images\/fKFg2vQEmI70QHKfOSr54pE7KQ4[^`]*`/, `srcSet: \`${relPath}\``);
      console.log(`  ✅ Slot 1 → ${img}`);
      return;
    }
    seg = seg.replace(/src: `https:\/\/framerusercontent\.com\/images\/[^`]+`/, `src: \`${relPath}\``)
    seg = seg.replace(/srcSet: `https:\/\/framerusercontent\.com\/images\/[^`]+`/, `srcSet: \`${relPath}\``);
    src = parts[0] + `className: \`${cls}\`` + seg;
    console.log(`  ✅ Slot ${i + 1} → ${img}`);
  });
}

// ── 14. Phone frame image — dynamic from assets/images/frame/ ────────────
const frameFiles = fs.readdirSync(FRAME_DIR)
  .filter(f => coupleExts.test(f))
  .sort();

if (frameFiles.length > 0) {
  const frameImg = frameFiles[0];
  const framePath = `assets/images/frame/${frameImg}`;
  // The frame div has data-framer-name: `The frame` and className: `framer-4rlk9i`
  const parts = src.split(`className: \`framer-4rlk9i\``);
  if (parts.length >= 2) {
    let seg = parts[1];
    seg = seg.replace(/src: `https:\/\/framerusercontent\.com\/images\/54JwjUrKR8txnFhN4dFmme3FzoQ[^`]*`/g, `src: \`${framePath}\``);
    seg = seg.replace(/srcSet: `https:\/\/framerusercontent\.com\/images\/54JwjUrKR8txnFhN4dFmme3FzoQ[^`]*`/g, `srcSet: \`${framePath}\``);
    src = parts[0] + `className: \`framer-4rlk9i\`` + seg;
    console.log(`  ✅ Frame → ${frameImg}`);
  } else {
    console.warn(`⚠️  Frame class framer-4rlk9i not found`);
  }
}

// ── Write result ─────────────────────────────────────────────
fs.writeFileSync(TARGET_FILE, src);
console.log("✅ Config applied successfully!");
console.log("   Open index.html in a browser to preview.");
