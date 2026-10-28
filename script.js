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
