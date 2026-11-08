const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const blocks = document.querySelectorAll('.section-top, .role, .skills-heading, .skill-group, .metrics');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  blocks.forEach(block => { block.classList.add('reveal'); observer.observe(block); });
  document.documentElement.classList.add('reveal-ready');
}
const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('loudemaso@gmail.com');
    copyButton.textContent = 'Copied ✓';
    copyStatus.textContent = 'Email address copied to clipboard.';
    setTimeout(() => { copyButton.textContent = 'Copy email ⧉'; }, 2500);
  } catch {
    copyStatus.textContent = 'Copy unavailable. Email address: loudemaso@gmail.com';
    copyButton.textContent = 'loudemaso@gmail.com';
  }
});

// Explicit speed controls work consistently across desktop and mobile players.
const salesCall = document.querySelector('#sales-call');
if (salesCall) {
  const speeds = document.querySelectorAll('[data-call-speed]');
  const callStatus = document.querySelector('#call-status');
  const fallback = document.querySelector('#call-fallback');
  speeds.forEach(button => button.addEventListener('click', () => {
    const speed = Number(button.dataset.callSpeed);
    salesCall.defaultPlaybackRate = speed;
    salesCall.playbackRate = speed;
  }));
  salesCall.addEventListener('ratechange', () => {
    speeds.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.callSpeed) === salesCall.playbackRate)));
    callStatus.textContent = 'Playback speed: ' + salesCall.playbackRate + ' times.';
  });
  salesCall.addEventListener('error', () => {
    fallback.hidden = false;
    callStatus.textContent = 'The recording could not be loaded. Use the Google Drive link below.';
  });
  salesCall.addEventListener('playing', () => { fallback.hidden = true; });
}
