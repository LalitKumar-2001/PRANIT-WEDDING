// ============================================================
// WEDDING CONFIGURATION — Edit this file to customise the invite
// Then run: node apply-config.js
// ============================================================

module.exports = {

  // ── Couple ──────────────────────────────────────────────
  // nameOrder: "name1_weds_name2" → Name1 weds Name2
  //            "name2_weds_name1" → Name2 weds Name1
  nameOrder: "name1_weds_name2",
  name1: "PRITI",
  name2: "ANKIT",
  name1Display: "Priti",
  name2Display: "Ankit",

  // ── Mantra ──────────────────────────────────────────────
  mantra: "ॐ श्री गणेशाय नम",

  // ── Invite text ─────────────────────────────────────────
  joinUsText: "You to join us in the wedding celebrations of",

  // ── Couple's message ────────────────────────────────────
  couplesMessage: "We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness.We are looking forward to see you at the wedding.",

  // ── Groom's family ──────────────────────────────────────
  groomBlessingOf: "With the heavenly blessings of ",
  groomGrandparents: "Smt. Shakuntala Devi & Sm. Tribeni Prasad Gupta",
  groomParents: "Mrs. Pritilaxmi Gupta & Mr. Om Prakash Gupta",

  // ── Bride's family ──────────────────────────────────────
  brideRelation: "Son of",
  brideParents: "Mrs. Mamata Sasmal & Mr. Ashok Sasmal,",

  // ── Events (6 cards) ────────────────────────────────────
  events: [
    { event: "Engagement", date: "Friday, 9th Sep 2026", venue: "Red Mirchi, Trisulia", time: "12pm Onwards", mapsLink: "https://maps.app.goo.gl/CotNnjBZ9CPivikV7" },
    { event: "Haldi", date: "Friday, 4th Dec 2026", venue: "Khannagar, Kataka", time: "4pm Onwards", mapsLink: "https://maps.app.goo.gl/nztDZypZiyZP76Kq7" },
    { event: "Mehendi", date: "Friday, 4th Dec 2026", venue: "Khannagar, Kataka", time: "6pm Onwards", mapsLink: "https://maps.app.goo.gl/nztDZypZiyZP76Kq7" },
    { event: "Managana Handi", date: "Sunday, 6th Dec 2026", venue: "Khannagar, Kataka", time: "8am Onwards", mapsLink: "https://maps.app.goo.gl/nztDZypZiyZP76Kq7" },
    { event: "Shaadi", date: "Friday, 6th Dec 2026", venue: "Creative Convention, Balikuda", time: "6pm Onwards", mapsLink: "https://maps.app.goo.gl/tbCjbczNkigvtUYG8" },
    { event: "Reception", date: "Friday, 9th Dec 2026", venue: "Gandarpur, Kataka", time: "6pm Onwards", mapsLink: "https://maps.app.goo.gl/Rq1YjBynA6oqNEkU8" },
  ],

  // ── Things to Know (4 cards) ────────────────────────────
  thingsToKnow: [
    { title: "Hashtag", info: "While posting photos on social media please use the hashtag - #pranit" },
    { title: "Weather", info: "It will be mostly sunny with temperature reaching up to 28 degrees at the venue" },
    { title: "Staff", info: "We recommend the nearby hotel called Bhola Bhawan near the venue for the staff members" },
    { title: "Parking", info: "Valet parking for all our guests will be available at the venue" },
  ],

  // ── Countdown date (ISO 8601 UTC) ────────────────────────
  countdownDate: "2026-12-06T06:00:00.000Z",

  // ── Links ────────────────────────────────────────────────
  whatsappRsvpLink: "https://wa.me/919178558111",
  mapsCtaLink: "https://maps.app.goo.gl/CotNnjBZ9CPivikV7",
  instagramCtaLink: "",
  buyNowLink: "",

  // ── Music ────────────────────────────────────────────────
  musicUrl: "assets/media/background_music.mp3",

  // ── Event card back-face content ─────────────────────────
  // Keys must match the event name shown on the card front.
  eventHours: 3,
  eventCardBack: {
    "Mehendi":       { title: "Mehendi Night",      lines: ["Music, dance & henna artists", "Dress Code: Colourful Traditional", "Dinner served"] },
    "Haldi":         { title: "Haldi Ceremony",     lines: ["Wear yellow & have fun!", "Dress Code: Yellow / Pastels", "Snacks & refreshments"] },
    "Mangana Handi": { title: "Mangana Handi",      lines: ["A traditional pre-wedding ritual", "Dress Code: Traditional", "Breakfast served"] },
    "Engagement":    { title: "Ring Ceremony",      lines: ["Join us as we exchange rings", "Dress Code: Traditional", "Dinner & celebrations"] },
    "Shaadi":        { title: "The Wedding",        lines: ["Pheras at the auspicious muhurat", "Dress Code: Traditional / Ethnic", "Dinner follows"] },
    "Reception":     { title: "Reception",          lines: ["An evening of music & blessings", "Dress Code: Formal / Ethnic", "Dinner & cocktails"] },
  },
};
