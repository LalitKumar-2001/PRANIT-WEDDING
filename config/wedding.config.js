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
  groomGrandparents: "Late Skakuntala Devi & Late Tribeni Prasad Gupta",
  groomParents: "Mrs. Pritilaxmi Gupta & Mr. Om Prakash Gupta",

  // ── Bride's family ──────────────────────────────────────
  brideRelation: "Son of",
  brideParents: "Mrs. Mamata Sasmal & Mr. Ashok Sasmal,",

  // ── Events (6 cards) ────────────────────────────────────
  events: [
    { event: "Mehendi", date: "Friday, 4th Dec 2026", venue: "MM Villa, Trisulia, Kataka", time: "3pm Onwards", mapsLink: "https://maps.app.goo.gl/nztDZypZiyZP76Kq7" },
    { event: "Sangeet", date: "Friday, 4th Dec 2026", venue: "MM Villa, Trisulia, Kataka", time: "5pm Onwards", mapsLink: "https://maps.app.goo.gl/nztDZypZiyZP76Kq7" },
    { event: "Haldi", date: "Saturday, 5th Dec 2026", venue: "MM Villa, Trisulia, Kataka", time: "11am Onwards", mapsLink: "https://maps.app.goo.gl/nztDZypZiyZP76Kq7" },
    { event: "Mangana Handi", date: "Sunday, 6th Dec 2026", venue: "PritiPrakash Niwas, Khannagar, Kataka", time: "9am Onwards", mapsLink: "https://maps.app.goo.gl/nztDZypZiyZP76Kq7" },
    { event: "Shaadi", date: "Sunday, 6th Dec 2026", venue: "Creative Convention, Balikuda, Kataka", time: "7pm Onwards", mapsLink: "https://maps.app.goo.gl/tbCjbczNkigvtUYG8" }
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
  mapsCtaLink: "https://www.google.com/maps/place/Creative+Convention/@20.4304149,85.8713856,878m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a190db5d216c61d:0xc2da6f642323740b!8m2!3d20.4304149!4d85.8713856!16s%2Fg%2F11f57vbvgs?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
  instagramCtaLink: "",
  buyNowLink: "",

  // ── Music ────────────────────────────────────────────────
  musicUrl: "assets/media/background_music.mp3",

  // ── Event card back-face content ─────────────────────────
  // Keys must match the event name shown on the card front.
  eventHours: 3,
  eventCardBack: {
    "Mehendi":        { title: "Mehendi Ceremony",    lines: ["Music, dance & henna hands", "Dress Code: Colourful Traditional", "Snacks served"] },
    "Sangeet":        { title: "Sangeet Night",        lines: ["Music, dance & celebrations", "Dress Code: Golden / Colourful Traditional", "Dinner follows"] },
    "Haldi":          { title: "Haldi Ceremony",      lines: ["Wear yellow & have fun!", "Dress Code: Yellow / Pastels", "Lunch & refreshments"] },
    "Mangana Handi": { title: "Mangana Handi",      lines: ["A Odia tradition to get blessings of Gram Devati", "Dress Code: Traditional", "Breakfast served & Lunch follows"] },
    "Shaadi":         { title: "The Wedding",          lines: ["Pheras at the auspicious muhurat", "Dress Code: Traditional / Ethnic", "Dinner follows"] }
  },
};
