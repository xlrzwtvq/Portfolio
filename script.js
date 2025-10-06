/* Minimal, well-documented behavior:
   - toggles nav drawer
   - locks/unlocks body scroll (works on iOS)
   - traps focus while open
   - backdrop click / Escape / link click close the drawer
   - auto-fills last-updated from document.lastModified with fallback
*/

(function () {
  const nav = document.getElementById('site-nav');
  const toggleBtn = document.getElementById('menu-toggle');
  const backdrop = document.getElementById('backdrop');
  const backToTop = document.getElementById('backtotop');
  const lastUpdatedEl = document.getElementById('lastUpdated');
  const mainEl = document.getElementById('main');

  let lastFocused = null;
  let removeTrap = null;
  let scrollY = 0;

  /* ----------------- utilities ----------------- */
  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && isVisible(el));
  }

  /* ----------------- focus trap ----------------- */
  function trapFocus(container) {
    const focusable = getFocusable(container);
    if (!focusable.length) return null;
    function onKey(e) {
      if (e.key === 'Tab') {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) { // Shift+Tab
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else { // Tab
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      } else if (e.key === 'Escape' || e.key === 'Esc') {
        closeMenu();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }

  /* --------------- scroll lock (iOS-safe) --------------- */
  function lockScroll() {
    scrollY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.classList.add('menu-open');
  }
  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.classList.remove('menu-open');
    window.scrollTo(0, scrollY);
    document.documentElement.style.scrollBehavior = '';
  }

  /* --------------- open / close menu --------------- */
  function openMenu() {
    lastFocused = document.activeElement;

    // visual
    nav.classList.add('open');
    backdrop.classList.add('show');

    // ARIA / semantics
    nav.removeAttribute('aria-hidden');      // expose nav to AT
    nav.setAttribute('role', 'dialog');      // optional, helpful for some ATs (helps AT treat as modal)
    nav.setAttribute('aria-modal', 'true');  // modal semantics
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Close menu');
    toggleBtn.textContent = '✕';
    backdrop.setAttribute('aria-hidden', 'false');
    if (mainEl) mainEl.setAttribute('aria-hidden', 'true');

    // lock scroll + focus management
    lockScroll();
    const first = nav.querySelector('a');
    if (first) first.focus();

    // trap focus
    removeTrap = trapFocus(nav);
  }

  function closeMenu() {

    //visual
    nav.classList.remove('open');
    backdrop.classList.remove('show');

    // ARIA revert
    nav.setAttribute('aria-hidden', 'true');
    nav.removeAttribute('aria-modal');
    nav.removeAttribute('role');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Open menu');
    toggleBtn.textContent = '☰';
    backdrop.setAttribute('aria-hidden', 'true');
    if (mainEl) mainEl.removeAttribute('aria-hidden');

    // unlock scroll and restore focus
    unlockScroll();
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    else toggleBtn.focus();

    // remove focus trap
    if (typeof removeTrap === 'function') {
      removeTrap();
      removeTrap = null;
    }
  }

  /* --------------- event wiring --------------- */
  toggleBtn.addEventListener('click', () => {
    if (nav.classList.contains('open')) closeMenu();
    else openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  // close when a nav link is clicked
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    closeMenu();
  });

  // Escape: also global handler
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && nav.classList.contains('open')) closeMenu();
  });

  // Back-to-top button (if present)
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 200);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* --------------- last updated --------------- */
  if (lastUpdatedEl) {
    let d = new Date(document.lastModified);
    if (isNaN(d) || document.lastModified === '') {
      d = new Date('2025-09-21'); // fallback if server doesn't provide lastModified
    }
    lastUpdatedEl.textContent = 'Last updated: ' + d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }
})();