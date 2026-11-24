// The second recording uses the same player, speed controls, and chapter styling.
(() => {
  const host = document.querySelector('[data-alan-recording]');
  if (!host) return;

  const chapters = [
    { start: 0, title: 'Discovery · Home and goals', detail: 'Alan’s home, current equipment, and what he wants to improve' },
    { start: 245, title: 'Motivation · Planning for retirement', detail: 'Roof, solar, electrification, and investing in the home now' },
    { start: 685, title: 'Technical qualification', detail: 'Electrical capacity, windows, furnace, and system sizing' },
    { start: 1050, title: 'Project timing', detail: 'How the solar and HVAC projects might fit together' },
    { start: 1146, title: 'Solution presentation', detail: 'Heat pump, smart controls, comfort, and efficiency' },
    { start: 1485, title: 'Product reliability', detail: 'Manufacturer, replacement parts, and service concerns' },
    { start: 1946, title: 'Installation process', detail: 'Engineering review, permits, and project coordination' },
    { start: 2043, title: 'Warranty and care plans', detail: 'Standard coverage and optional ongoing service' },
    { start: 2160, title: 'Pricing and discounts', detail: 'Walking through the proposal and total investment' },
    { start: 2242, title: 'Financing options', detail: 'Monthly payments and deferred payment option' },
    { start: 2325, title: 'Offer · Asking to move forward', detail: 'Introducing the refundable deposit' },
    { start: 2400, title: 'Questions · Installation details', detail: 'Existing furnace space, refrigerant line, and removal' },
    { start: 2569, title: 'Recap and follow-up', detail: 'Emailing the quote and discussing it with his wife' }
  ];
  const formatTime = seconds => Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');

  host.innerHTML = `<article class="recording-card" aria-labelledby="alan-recording-name">
    <header class="recording-summary"><p class="eyebrow">SALES CALL · NOVEMBER 4, 2026</p><h3 id="alan-recording-name">Remote High-Ticket $15,745 Home Services Offer — Discovery & Proposal</h3><p class="recording-meta"><span>Full recording · 46 min</span><span>Recorded November 4, 2026</span></p></header>
    <div class="call-player">
      <audio aria-label="Alan sales call, November 4, 2026" controls preload="metadata" src="assets/alan-sales-call-2026-11-04.mp3">Your browser does not support audio playback.</audio>
      <div class="call-speed-row"><span id="alan-speed-label">Playback speed</span><div class="call-speeds" role="group" aria-labelledby="alan-speed-label">${[1, 1.25, 1.5, 2].map(speed => `<button type="button" data-call-speed="${speed}" aria-pressed="${speed === 1}">${speed}×</button>`).join('')}</div></div>
      <p class="sr-only" role="status"></p><p class="call-fallback" hidden>Having trouble playing? <a href="assets/alan-sales-call-2026-11-04.mp3" download>Download the recording</a></p>
    </div>
    <nav class="call-chapters" aria-label="Alan recording chapters"><div class="chapters-heading"><h4>Jump to a chapter</h4><p>Select a stage to start listening there.</p></div><div class="chapter-group"><h5>Alan · Sales call</h5><ol class="chapter-list">${chapters.map(chapter => `<li><button class="chapter-button" type="button" data-chapter="${chapter.start}" aria-label="Jump to ${formatTime(chapter.start)}, ${chapter.title}"><span class="chapter-time">${formatTime(chapter.start)}</span><span class="chapter-copy"><span class="chapter-name">${chapter.title}</span><span class="chapter-detail">${chapter.detail}</span></span></button></li>`).join('')}</ol></div></nav>
  </article>`;

  const audio = host.querySelector('audio');
  const speeds = host.querySelectorAll('[data-call-speed]');
  const buttons = host.querySelectorAll('[data-chapter]');
  const status = host.querySelector('[role="status"]');
  const fallback = host.querySelector('.call-fallback');
  let currentChapter = -1;
  const highlightChapter = () => {
    let index = -1;
    chapters.forEach((chapter, i) => { if (audio.currentTime >= chapter.start) index = i; });
    if (index === currentChapter) return;
    currentChapter = index;
    buttons.forEach((button, i) => {
      if (i === index) button.setAttribute('aria-current', 'true');
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
    status.textContent = 'The recording could not be loaded. Use the download link below.';
  });
  audio.addEventListener('playing', () => {
    fallback.hidden = true;
    document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); });
  });
  document.querySelectorAll('[data-call-recording] audio').forEach(other => {
    other.addEventListener('playing', () => audio.pause());
  });
})();
