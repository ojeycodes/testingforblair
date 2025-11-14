// Countdown
let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

let dd = document.getElementById('dd');
let hh = document.getElementById('hh');
let mm = document.getElementById('mm');
let ss = document.getElementById('ss');

let day_dot = document.querySelector('.day_dot');
let hr_dot = document.querySelector('.hr_dot');
let min_dot = document.querySelector('.min_dot');
let sec_dot = document.querySelector('.sec_dot');

let endDate = '11/23/2025 00:00:00';
//date format mm/dd/yyyy

let x = setInterval (function(){
    let now = new Date(endDate).getTime();
    let countDown = new Date().getTime();
    let distance = now - countDown

    // time calculation for days, hours,minutes and seconds
    let d = Math.floor(distance / (1000 * 60 * 60 * 24));
    let h = Math.floor((distance %  (1000 * 60 * 60 * 24))/ (1000 * 60 * 60));
    let m = Math.floor((distance %  (1000 * 60 * 60))/ (1000 * 60));
    let s = Math.floor((distance %  (1000 * 60))/ (1000));

    // Output the result with element with id
    days.innerHTML = d + "<br><span>Days<span>";
    hours.innerHTML = h + "<br><span>Hours<span>";
    minutes.innerHTML = m + "<br><span>Minutes<span>";
    seconds.innerHTML = s + "<br><span>Seconds<span>";

    // animate stroke
    dd.style.strokeDashoffset = 440 - (440 * d) / 365;
    // 365 days in a year
    hh.style.strokeDashoffset = 440 - (440 * h) / 24;
    // 24 hrs in a day
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    // 60 mins in an hr
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;
    // 60 sec in a min

    // animate circle dots
    day_dot.style.transform = 'rotateZ(${d * 0.986}deg)';
    hr_dot.style.transform = 'rotateZ(${h * 15}deg)';
    min_dot.style.transform = 'rotateZ(${m * 6}deg)';
    sec_dot.style.transform = 'rotateZ(${s * 6}deg)';

    // if the countdown is over
    if (distance < 0){
        clearInterval(x);
        document.getElementById("time").style.display = 'none'
    }
})

// Timer Design ends



// // Device Detection
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);



// Preview Animations and Actions
const revealBtn = document.getElementById('revealBtn');
const story = document.getElementById('story');
const time = document.getElementById('time');
const hiddenDiv = document.getElementById('hiddenDiv');

const END_DATE = '11/23/2025 00:00:00'; // mm/dd/yyyy hh:mm:ss

// Check if countdown has expired
const IS_EXPIRED = Date.now() > new Date(END_DATE).getTime();

// LocalStorage keys
const STORAGE_KEY_REVEALED = 'surpriseRevealed_v2';
const STORAGE_KEY_REVEALCOUNT = 'surpriseRevealCount_v2';

// Story text
const storyText = `
Something A little bit surprising awaits you, Sweetheart.
For days, I’ve held a secret — soft, glowing, and drawn from every heartbeat that thinks of You. I truly appreciate the woman you grow to become each and every single day.
And truly reflecting how special this day does mean to me,
This isn’t just a surprise… it’s a reflection of my deepest affection, a whisper from my soul that truly cares to yours.

Every word you’re about to see, every letter that appears, carries the warmth of my heart and the rhythm of my thoughts when they drift to you.
Can you guess what this secret could be, my dearest?

Before you uncover it, pause for a moment.
Close your eyes. Take a deep breath.
Feel the quiet magic of this moment wrapping itself around you like a tender hug.

This screen?
It’s a veil hiding a few unspoken confessions, an unseen melody of love that dances just for you.

Everything here — every shimmer, every sound — was made for one soul alone… YOU.
Because you are my muse, my worst distraction, my rhythmic blues!

So linger a little longer, my darling.
Let your heart listen to the melodies I chose — soft notes meant to keep you company while the surprise gently unfolds.

And before the moment reveals its secret.....
Happy Birthday in Advance, my Love ❤️. I guess no one had to beat me to saying this...hehe 😅.
You are, and always will be, my favorite story to tell. A glimpse of all the unraveled words would
have a deeper meaning now that it's completely written out. Now with a more open heart: I'd like you to gaze 
over each line, each text again because each and every word holds meaning that come from my heart to yours.
See You At Midnight Darling!
`.trim();

// --- Functions ---
function playStory() {
  story.innerHTML = "";
  story.style.display = "";
  story.style.opacity = "1";

  const words = storyText.trim().split(/\s+/);

  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    span.style.animationDelay = (i * 0.95) + "s";
    story.appendChild(span);
    story.appendChild(document.createTextNode(" "));
  });
}

function startCountdown() {
  time.style.opacity = '1';
  revealBtn.disabled = true;
  revealBtn.textContent = 'Enjoy The Suspense and Warm Sounds My Love!...';

  const countdownInterval = setInterval(() => {
    const now = Date.now();
    const target = new Date(END_DATE).getTime();
    const distance = target - now;

    const d = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
    const h = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const m = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const s = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

    document.getElementById('days').innerHTML = `${d}<br><span>Days</span>`;
    document.getElementById('hours').innerHTML = `${h}<br><span>Hours</span>`;
    document.getElementById('minutes').innerHTML = `${m}<br><span>Minutes</span>`;
    document.getElementById('seconds').innerHTML = `${s}<br><span>Seconds</span>`;

    // When countdown ends
    if (distance <= 0) {
      clearInterval(countdownInterval);

      // Fade out story & timer
      story.classList.add('fade-away');
      time.style.opacity = '0';

      setTimeout(() => {
        story.style.display = 'none';
        time.style.display = 'none';
        revealBtn.textContent = 'Reveal Surprise 💖';
        revealBtn.disabled = false;
        revealBtn.classList.add('centered-fixed');
      }, 1500);
    }
  }, 1000);
}

function revealOnce() {
  localStorage.setItem(STORAGE_KEY_REVEALED, 'true');
  let count = Number(localStorage.getItem(STORAGE_KEY_REVEALCOUNT) || 0) + 1;
  localStorage.setItem(STORAGE_KEY_REVEALCOUNT, String(count));

  hiddenDiv.classList.add('revealed');
  revealBtn.classList.add('fade-out');
  setTimeout(() => {
    revealBtn.style.display = 'none';
  }, 1600);
}

// --- Page Load Behavior ---
if (localStorage.getItem(STORAGE_KEY_REVEALED) === 'true') {
  // Already revealed — skip everything
  story.style.display = 'none';
  time.style.display = 'none';
  hiddenDiv.classList.add('revealed');
  revealBtn.classList.add('centered-fixed');
  revealBtn.textContent = 'Continue The Birthday Tales! 💫';
} else if (IS_EXPIRED) {
  // Countdown passed — skip story + timer
  story.style.display = 'none';
  time.style.display = 'none';
  hiddenDiv.classList.remove('revealed');
  revealBtn.textContent = 'Reveal Surprise 💖';
  revealBtn.disabled = false;
  revealBtn.classList.add('centered-fixed');
} else {
  // Normal behavior — countdown still valid
  story.style.display = 'none';
  time.style.display = 'none';
  hiddenDiv.classList.remove('revealed');
  revealBtn.textContent = 'Shall We Begin This Adventure Sweetheart? 💞';
}

// --- Button Click ---
revealBtn.addEventListener('click', () => {

  // If expired, reveal immediately
  if (IS_EXPIRED) {
    revealOnce();
    return;
  }

  const alreadyRevealed = localStorage.getItem(STORAGE_KEY_REVEALED) === 'true';

  if (alreadyRevealed) {
    hiddenDiv.classList.add('revealed');
    return;
  }

  // If story hasn't started yet
  if (story.style.display === 'none' && !revealBtn.textContent.includes('Reveal')) {
    story.style.display = '';
    time.style.display = '';
    playStory();
    const duration = Math.max(2000, storyText.split(/\s+/).length * 450 + 1000);
    setTimeout(startCountdown, duration);
  } else if (revealBtn.textContent.includes('Reveal')) {
    revealOnce();
  }
});
// Actions and Animations ends



// Floating Hearts Animations

  // Detect Android device
const isAndroid = /Android/i.test(navigator.userAgent);

if (!isAndroid) {
  // Function to create floating hearts
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = 3 + Math.random() * 2 + 's';
    heart.innerHTML = '💖';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }

  // Create hearts continuously
  setInterval(createHeart, 700);

  // Reveal hidden message automatically after 5 seconds
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('hidden-message').classList.remove('hidden');
    }, 5000);
  });
}

// Floating hearts animations ends



// Autoplay

// =================== DEVICE DETECTION ===================
const isIOS = /iP(ad|hone|od)/i.test(navigator.userAgent);
// const isMobile = isAndroid || isIOS;

// =================== PLAYLIST SETUP ===================
let playlist = ["perfect.mp3", "i give you my dreams.mp3", "all of me.mp3"];

// Shuffle playlist for returning users
if (localStorage.getItem("hasVisitedBefore")) {
  playlist.sort(() => Math.random() - 0.5);
} else {
  localStorage.setItem("hasVisitedBefore", "true");
}

let currentIndex = 0;
const maxVolume = 0.15;
const fadeStep = isMobile ? 0.02 : 0.01;
const fadeInterval = isMobile ? 250 : 100;
const crossfadeDuration = 15000; // 15s crossfade

let isCrossfading = false;
let isPausedForInterruption = false;
let fadeOutIntervalId = null;
let fadeInIntervalId = null;

// =================== AUDIO PLAYERS ===================
const playerA = new Audio();
const playerB = new Audio();
[playerA, playerB].forEach(p => {
  p.preload = "auto";
  p.crossOrigin = "anonymous";
  p.loop = false;
  p.volume = 0;
  p.setAttribute("playsinline", ""); // important for iOS
});

let currentPlayer = playerA;
let nextPlayer = playerB;

// =================== OTHER MEDIA ELEMENTS ===================
const mediaElements = [
  document.getElementById("mainSong"),
  document.getElementById("video1"),
  document.getElementById("video2"),
  document.getElementById("video3")
].filter(Boolean);

// =================== CROSSFADE HELPERS ===================
function nextIndex(idx = currentIndex) {
  return (idx + 1) % playlist.length;
}

function startCrossfade() {
  if (isCrossfading) return;
  isCrossfading = true;

  const nextIdx = nextIndex(currentIndex);
  nextPlayer.src = playlist[nextIdx];
  nextPlayer.volume = 0;

  nextPlayer.play().then(() => {
    const fadeIn = setInterval(() => {
      if (nextPlayer.volume < maxVolume - fadeStep) nextPlayer.volume += fadeStep;
      else clearInterval(fadeIn);
    }, fadeInterval);

    const fadeOut = setInterval(() => {
      if (currentPlayer.volume > fadeStep) currentPlayer.volume -= fadeStep;
      else {
        currentPlayer.volume = 0;
        currentPlayer.pause();
        clearInterval(fadeOut);

        // Swap players
        const old = currentPlayer;
        currentPlayer = nextPlayer;
        nextPlayer = old;
        currentIndex = nextIdx;

        watchForCrossfade(currentPlayer);
        isCrossfading = false;
      }
    }, fadeInterval);
  }).catch(err => console.warn("Crossfade play blocked:", err));
}

// =================== WATCH CROSSFADE ===================
function watchForCrossfade(player) {
  // Remove old listeners
  player.removeEventListener("timeupdate", player._timeHandler);
  player.removeEventListener("ended", player._endedHandler);

  // Primary timeupdate handler
  const handler = () => {
    if (isCrossfading || isNaN(player.duration)) return;
    const remainingMs = (player.duration - player.currentTime) * 1000;
    if (remainingMs <= crossfadeDuration) {
      player.removeEventListener("timeupdate", handler);
      startCrossfade();
    }
  };
  player._timeHandler = handler;
  player.addEventListener("timeupdate", handler);

  // Fallback ended handler
  const endedHandler = () => {
    if (!isCrossfading) startCrossfade();
  };
  player._endedHandler = endedHandler;
  player.addEventListener("ended", endedHandler);

  // Polling fallback for iOS Chrome/Safari
  if (!player._pollingInterval) {
    player._pollingInterval = setInterval(() => {
      if (player.paused || isNaN(player.duration)) return;
      const remainingMs = (player.duration - player.currentTime) * 1000;
      if (remainingMs <= 0 && !isCrossfading) {
        startCrossfade();
      }
    }, 500);
  }
}

// =================== PAUSE / RESUME HELPERS ===================
function clearFadeIntervals() {
  if (fadeOutIntervalId) { clearInterval(fadeOutIntervalId); fadeOutIntervalId = null; }
  if (fadeInIntervalId) { clearInterval(fadeInIntervalId); fadeInIntervalId = null; }
}

function pauseBgMusicForSource(sourceEl) {
  if (isPausedForInterruption) return;
  isPausedForInterruption = true;
  clearFadeIntervals();

  if (isMobile) {
    try { currentPlayer.volume = 0; currentPlayer.pause(); } catch(e) {}
    return;
  }

  fadeOutIntervalId = setInterval(() => {
    try {
      if (currentPlayer.volume > fadeStep) currentPlayer.volume = Math.max(0, currentPlayer.volume - fadeStep);
      else {
        currentPlayer.volume = 0;
        currentPlayer.pause();
        clearFadeIntervals();
      }
    } catch(e) { clearFadeIntervals(); }
  }, fadeInterval);
}

function maybeResumeIfNoOtherMedia() {
  const anyPlaying = mediaElements.some(el => !el.paused && !el.ended && el.currentTime > 0);
  if (!anyPlaying && isPausedForInterruption) {
    setTimeout(() => {
      const stillPlaying = mediaElements.some(el => !el.paused && !el.ended && el.currentTime > 0);
      if (!stillPlaying) resumeBgMusic();
    }, 50);
  }
}

function resumeBgMusic() {
  if (!isPausedForInterruption) return;
  const anyOtherPlaying = mediaElements.some(el => !el.paused && !el.ended && el.currentTime > 0);
  if (anyOtherPlaying) return;

  isPausedForInterruption = false;
  clearFadeIntervals();

  try { if (currentPlayer.ended) currentPlayer.currentTime = 0; } catch(e){}

  if (isMobile) {
    currentPlayer.play().then(() => { try { currentPlayer.volume = maxVolume; } catch(e){} }).catch(() => {
      const tryAgain = () => {
        currentPlayer.play().catch(()=>{});
        ["click","touchstart","keydown"].forEach(evt => window.removeEventListener(evt, tryAgain));
      };
      ["click","touchstart","keydown"].forEach(evt => window.addEventListener(evt, tryAgain));
    });
    return;
  }

  currentPlayer.play().catch(()=>{});
  fadeInIntervalId = setInterval(() => {
    try {
      if (currentPlayer.volume < maxVolume - fadeStep) currentPlayer.volume = Math.min(maxVolume, currentPlayer.volume + fadeStep);
      else clearFadeIntervals();
    } catch(e) { clearFadeIntervals(); }
  }, fadeInterval);
}

// =================== STOP OTHER MEDIA ===================
function stopOtherMedia(current) {
  mediaElements.forEach(el => {
    if (el !== current) {
      try { el.pause(); el.currentTime = 0; } catch(e) {}
    }
  });
}

// =================== MEDIA ELEMENT LISTENERS ===================
mediaElements.forEach(el => {
  el.removeEventListener("play", el._playHandler);
  el.removeEventListener("pause", el._pauseHandler);
  el.removeEventListener("ended", el._endedHandler);

  const playHandler = () => { pauseBgMusicForSource(el); stopOtherMedia(el); };
  const pauseHandler = () => maybeResumeIfNoOtherMedia();
  const endedHandler = () => maybeResumeIfNoOtherMedia();

  el._playHandler = playHandler;
  el._pauseHandler = pauseHandler;
  el._endedHandler = endedHandler;

  el.addEventListener("play", playHandler);
  el.addEventListener("pause", pauseHandler);
  el.addEventListener("ended", endedHandler);
});

// =================== INITIAL PLAYBACK ===================
function startInitial() {
  currentPlayer.src = playlist[currentIndex];
  currentPlayer.volume = maxVolume;

  // Wait for metadata before starting crossfade watchers
  currentPlayer.addEventListener("loadedmetadata", () => {
    watchForCrossfade(currentPlayer);

    currentPlayer.play().catch(() => {
      ["click","touchstart","keydown"].forEach(evt=>{
        window.addEventListener(evt,function once(){
          currentPlayer.play().then(() => watchForCrossfade(currentPlayer)).catch(()=>{});
          window.removeEventListener(evt,once);
        });
      });
    });
  }, { once: true });
}

window.addEventListener("load", startInitial);





// Card Slider
const slider = document.querySelector('.slider');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const cards = Array.from(slider.children);
let currentCardIndex = 0; // Track which card is centered

// Function to center a card based on its index
function scrollToCard(index) {
  const card = cards[index];
  if (!card) return;

  const sliderRect = slider.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  // Calculate how far to scroll so the selected card is centered
  const offset = cardRect.left - sliderRect.left - (sliderRect.width / 2 - cardRect.width / 2);
  slider.scrollBy({ left: offset, behavior: 'smooth' });

  updateButtonState();
}

// Function to enable/disable buttons depending on position
function updateButtonState() {
  // Disable prev if at first card
  if (currentCardIndex <= 0) {
    prevBtn.disabled = true;
    prevBtn.style.opacity = 0.5;
    prevBtn.style.cursor = 'default';
  } else {
    prevBtn.disabled = false;
    prevBtn.style.opacity = 1;
    prevBtn.style.cursor = 'pointer';
  }

  // Disable next if at last card
  if (currentCardIndex >= cards.length - 1) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = 0.5;
    nextBtn.style.cursor = 'default';
  } else {
    nextBtn.disabled = false;
    nextBtn.style.opacity = 1;
    nextBtn.style.cursor = 'pointer';
  }
}

// Next button
nextBtn.addEventListener('click', () => {
  if (currentCardIndex < cards.length - 1) {
    currentCardIndex++;
    scrollToCard(currentCardIndex);
  }
});

// Previous button
prevBtn.addEventListener('click', () => {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    scrollToCard(currentCardIndex);
  }
});

// Disable swipe gestures on *mobile only*
if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  slider.style.touchAction = 'none';
}

// Center the first card and set initial button states on load
window.addEventListener('load', () => {
  scrollToCard(currentCardIndex);
  updateButtonState();
});




// Read More Buttons
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.readMoreBtn');

    buttons.forEach(button => {
      const container = button.closest('.text-box');
      const more = container.querySelector('.moreText');

      // ensure more starts collapsed (in case of server-side styles)
      more.style.maxHeight = '0px';
      more.classList.remove('open');
      more.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');

      // click handler
      button.addEventListener('click', () => {
        const isOpen = more.classList.contains('open');

        if (!isOpen) {
          // ---- OPEN FLOW ----
          // 1. set explicit maxHeight to its scrollHeight so it animates open
          const fullHeight = more.scrollHeight;
          more.style.maxHeight = fullHeight + 'px';
          more.classList.add('open');
          more.setAttribute('aria-hidden', 'false');
          button.setAttribute('aria-expanded', 'true');
          button.textContent = 'Read less';

          // 2. after transition finishes, remove maxHeight so it can grow naturally
          const onOpenEnd = (e) => {
            if (e.propertyName === 'max-height') {
              more.style.maxHeight = 'none'; // allow dynamic content
              more.removeEventListener('transitionend', onOpenEnd);
            }
          };
          more.addEventListener('transitionend', onOpenEnd);

        } else {
          // ---- CLOSE FLOW ----
          // If maxHeight is 'none' (we removed it previously), set it to current height before collapsing
          if (more.style.maxHeight === 'none' || !more.style.maxHeight) {
            // temporarily set to measured height (forces a fixed start point)
            more.style.maxHeight = more.scrollHeight + 'px';
          }

          // Force a reflow so the browser registers the previous height before changing to 0
          /* eslint-disable no-unused-expressions */
          more.offsetHeight;
          /* eslint-enable no-unused-expressions */

          // collapse
          more.style.maxHeight = '0px';
          more.classList.remove('open');
          more.setAttribute('aria-hidden', 'true');
          button.setAttribute('aria-expanded', 'false');
          button.textContent = 'Read more';

          // optional: after transition ends ensure maxHeight stays at 0
          const onCloseEnd = (e) => {
            if (e.propertyName === 'max-height') {
              // keep maxHeight at 0 to stay collapsed
              more.style.maxHeight = '0px';
              more.removeEventListener('transitionend', onCloseEnd);
            }
          };
          more.addEventListener('transitionend', onCloseEnd);
        }
      });
    });
  });

  // Read more button ends