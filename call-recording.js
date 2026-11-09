// One recording and chapter list for the resume and the standalone recordings page.
(() => {
  const chapters = [
  {
    "call": 1,
    "start": 0,
    "title": "Discovery",
    "detail": "Goals, current system, and reasons to upgrade"
  },
  {
    "call": 1,
    "start": 495,
    "title": "Trust & credibility",
    "detail": "Addressing concerns about a newer company"
  },
  {
    "call": 1,
    "start": 755,
    "title": "Technical qualification",
    "detail": "Home, electrical capacity, and project requirements"
  },
  {
    "call": 1,
    "start": 1236,
    "title": "Solution presentation",
    "detail": "System, technology, sizing, and guarantees"
  },
  {
    "call": 1,
    "start": 1830,
    "title": "Pricing & rebates",
    "detail": "Walking through the quote and available savings"
  },
  {
    "call": 1,
    "start": 2740,
    "title": "Offer · Getting started",
    "detail": "Introducing the $500 refundable deposit"
  },
  {
    "call": 1,
    "start": 2772,
    "title": "Objection-handling · Other quotes",
    "detail": "Exploring alternatives and price comparisons"
  },
  {
    "call": 1,
    "start": 2926,
    "title": "Objection-handling · Budget & timing",
    "detail": "Recent home expenses and reasons to wait"
  },
  {
    "call": 1,
    "start": 2970,
    "title": "Financing · Deferred payments",
    "detail": "Addressing cash flow with a 12-month payment deferral"
  },
  {
    "call": 1,
    "start": 3304,
    "title": "Objection-handling · Partner buy-in",
    "detail": "Preparing for the conversation with his wife"
  },
  {
    "call": 2,
    "start": 3466,
    "title": "Start of the second call",
    "detail": "Reconnecting the next day and reviewing questions"
  },
  {
    "call": 2,
    "start": 3513,
    "title": "Objection-handling · Warranty & care plan",
    "detail": "Coverage, ongoing costs, and repair concerns"
  },
  {
    "call": 2,
    "start": 3813,
    "title": "Objection-handling · Electrical work",
    "detail": "Panel costs, possible extras, and coordinating solar"
  },
  {
    "call": 2,
    "start": 4089,
    "title": "Installation & service questions",
    "detail": "Ductwork, response times, and system controls"
  },
  {
    "call": 2,
    "start": 4620,
    "title": "Financing approval",
    "detail": "Confirming approval and updating the proposal"
  },
  {
    "call": 2,
    "start": 4783,
    "title": "Offer · Asking for the sale",
    "detail": "Directing the buyer to review and sign"
  },
  {
    "call": 2,
    "start": 5062,
    "title": "Final questions · Payment",
    "detail": "Payment process, fees, and payoff options"
  },
  {
    "call": 2,
    "start": 5290,
    "title": "Close · Deposit & handoff",
    "detail": "Payment confirmation and project coordination"
  }
];
  const host = document.querySelector('[data-call-recording]');
  if (!host) return;
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    return minutes + ':' + String(Math.floor(seconds % 60)).padStart(2, '0');
  };
  const chapterGroup = (call, title) => `<div class="chapter-group"><h5>${title}</h5><ol class="chapter-list">${chapters.filter(chapter => chapter.call === call).map(chapter => `<li><button class="chapter-button" type="button" data-chapter="${chapter.start}" aria-label="Jump to ${formatTime(chapter.start)}, ${chapter.title}"><span class="chapter-time">${formatTime(chapter.start)}</span><span class="chapter-copy"><span class="chapter-name">${chapter.title}</span><span class="chapter-detail">${chapter.detail}</span></span></button></li>`).join('')}</ol></div>`;
  host.innerHTML = `<article class="recording-card" aria-labelledby="recording-name">
    <header class="recording-summary"><p class="eyebrow">REMOTE HIGH-TICKET SALES</p><h3 id="recording-name">Remote High-Ticket $12,000 Home Services Offer — 2-Call Close</h3><p class="recording-meta"><span>Full recording · 1 hr 31 min</span><span>Two calls · One sales process</span></p></header>
    <div class="call-player">
      <audio id="sales-call" aria-label="Remote high-ticket $12,000 home services offer, two-call close" controls preload="metadata" src="assets/sales-call.mp3">Your browser does not support audio playback.</audio>
      <div class="call-speed-row"><span id="call-speed-label">Playback speed</span><div class="call-speeds" role="group" aria-labelledby="call-speed-label">${[1, 1.25, 1.5, 2].map(speed => `<button type="button" data-call-speed="${speed}" aria-pressed="${speed === 1}">${speed}×</button>`).join('')}</div></div>
      <p class="sr-only" id="call-status" role="status"></p><p class="call-fallback" id="call-fallback" hidden>Having trouble playing? <a href="https://drive.google.com/file/d/189OGc9BZ5ymngZ19iYBDZTnISlOC70Rc/view" target="_blank" rel="noopener noreferrer">Open the recording in Google Drive ↗</a></p>
    </div>
    <nav class="call-chapters" aria-label="Recording chapters"><div class="chapters-heading"><h4>Jump to a chapter</h4><p>Select a stage to start listening there.</p></div>${chapterGroup(1, 'Call 1 · Discovery &amp; offer')}${chapterGroup(2, 'Call 2 · Follow-up &amp; close')}</nav>
  </article>`;
  const audio = host.querySelector('audio');
  const speeds = host.querySelectorAll('[data-call-speed]');
  const buttons = host.querySelectorAll('[data-chapter]');
  const status = host.querySelector('#call-status');
  const fallback = host.querySelector('#call-fallback');
  let currentChapter = -1;
  const highlightChapter = () => {
    let index = -1;
    chapters.forEach((chapter, i) => { if (audio.currentTime >= chapter.start) index = i; });
    if (index === currentChapter) return;
    currentChapter = index;
    buttons.forEach(button => {
      if (index >= 0 && Number(button.dataset.chapter) === chapters[index].start) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  };
  speeds.forEach(button => button.addEventListener('click', () => {
    audio.defaultPlaybackRate = Number(button.dataset.callSpeed);
    audio.playbackRate = Number(button.dataset.callSpeed);
  }));
  audio.addEventListener('ratechange', () => {
    speeds.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.callSpeed) === audio.playbackRate)));
    status.textContent = 'Playback speed: ' + audio.playbackRate + ' times.';
  });
  buttons.forEach(button => button.addEventListener('click', () => {
    const start = Number(button.dataset.chapter);
    audio.currentTime = start;
    highlightChapter();
    const chapter = chapters.find(item => item.start === start);
    status.textContent = chapter.title + ', starting at ' + formatTime(start) + '.';
    audio.play().catch(() => { status.textContent = 'Chapter selected. Press play to listen.'; });
  }));
  audio.addEventListener('timeupdate', highlightChapter);
  audio.addEventListener('loadedmetadata', highlightChapter);
  audio.addEventListener('seeked', highlightChapter);
  audio.addEventListener('error', () => {
    fallback.hidden = false;
    status.textContent = 'The recording could not be loaded. Use the Google Drive link below.';
  });
  audio.addEventListener('playing', () => { fallback.hidden = true; });
})();
