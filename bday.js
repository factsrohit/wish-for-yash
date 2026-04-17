/* ==========================================================
   BIRTHDAY WISH CARD — script.js
   ==========================================================
   HOW TO TUNE TIMING:
   ─────────────────────────────────────────────────────────
   • Each entry in MESSAGE_LINES has a `delay` property.
   • `delay` is the time (in milliseconds) after the audio
     STARTS that this line should appear on screen.
   • Adjust each value to match your audio's pacing.
   • Example: if line 3 should appear 14 seconds in → 14000
   ========================================================== */

const MESSAGE_LINES = [
  {
    text:  "Masachika-kun… happy birthday! 🎂✨",
    delay: 1500      /* ms after audio start */
  },
  {
    text:  "Hehe, I was wondering if I should act all cool and composed like usual… but today is special, so I'll be honest just this once.",
    delay: 5000
  },
  {
    text:  "I'm really, really glad you were born.",
    delay: 12000
  },
  {
    text:  "You're always there—sometimes annoying, sometimes surprisingly dependable—but always someone I can count on. Spending time with you has become such a natural part of my days that I can't even imagine things without you anymore… and that's kind of scary, you know?",
    delay: 17000
  },
  {
    text:  "So today, I hope you forget about everything stressful and just enjoy yourself. Eat good food, laugh a lot, and maybe… spend some time with me too, okay?",
    delay: 32000
  },
  {
    text:  "I wish you the happiest birthday, Masachika-kun. And… I hope this year brings you even more moments where you smile like that—because, well… I like seeing it.",
    delay: 42000
  },
  {
    text:  "…Don't make me repeat that. 💙",
    delay: 54000
  }
];

/* ──────────────────────────────────────────
   MESSAGE REVEAL
────────────────────────────────────────── */
function createMessageEls() {
  const container = document.getElementById("messagesContainer");
  MESSAGE_LINES.forEach((line) => {
    const p = document.createElement("p");
    p.className = "msg-line";
    p.textContent = line.text;
    container.appendChild(p);
  });
}

function scheduleMessages(audioEl) {
  const container = document.getElementById("messagesContainer");
  const lines = container.querySelectorAll(".msg-line");

  MESSAGE_LINES.forEach((line, i) => {
    setTimeout(() => {
      if (lines[i]) {
        lines[i].classList.add("visible");
        /* Auto-scroll the card so the newest line is always visible */
        lines[i].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, line.delay);
  });
}

/* ──────────────────────────────────────────
   START SEQUENCE
────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  createMessageEls();

  const startBtn    = document.getElementById("startBtn");
  const overlay     = document.getElementById("startOverlay");
  const scene       = document.getElementById("scene");
  const wishCard    = document.getElementById("wishCard");
  const videoPanel  = document.getElementById("videoPanel");
  const video       = document.getElementById("sideVideo");
  const audio       = document.getElementById("wishAudio");

  startBtn.addEventListener("click", () => {
    /* 1. Fade out overlay */
    overlay.classList.add("hidden");

    /* 2. Show scene */
    setTimeout(() => {
      scene.classList.add("visible");
      wishCard.classList.add("in");
      videoPanel.classList.add("in");
    }, 150);

    /* 3. Start video */
    video.muted = false;    /* video stays muted by default; flip if you want video sound */
    video.muted = true;     /* keep muted so only audio plays */
    video.play().catch(() => { /* silent fail if browser blocks */ });

    /* 4. Start audio */
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Audio autoplay blocked:", err);
        /* Fallback: schedule messages from click time even without audio */
      });
    }

    /* 5. Schedule message reveals */
    scheduleMessages(audio);
  });
});

/*
  ════════════════════════════════════════════════════════
  TIMING TUNING GUIDE
  ════════════════════════════════════════════════════════
  Play your audio file and note the timestamp (in seconds)
  when each line is spoken. Then multiply by 1000 to get ms
  and set that as the `delay` for that entry in MESSAGE_LINES.

  Example:
    Line 1 spoken at 0:01  →  delay: 1000
    Line 2 spoken at 0:04  →  delay: 4000
    Line 3 spoken at 0:11  →  delay: 11000
    ...

  Use the browser's console to help:
    audio.currentTime  (type this while audio is playing)
  ════════════════════════════════════════════════════════
*/