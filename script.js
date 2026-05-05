/* ============================================================
   TOTAL HOUSE WASHING & COMMERCIAL — SCRIPTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== MOBILE NAV ===== */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      nav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ===== STICKY HEADER SHADOW ===== */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a')?.classList.remove('open');
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      answer.classList.toggle('open', !expanded);
    });
  });

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 380);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = (header?.offsetHeight ?? 0) + 8;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===== ACTIVE NAV HIGHLIGHT ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      const pos = window.scrollY + (header?.offsetHeight ?? 0) + 60;
      let current = '';
      sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    }, { passive: true });
  }

  /* ===== VIDEO PLAY BUTTON ===== */
  const playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => showToast('Video coming in the live site!'));
  }

  /* ===== GALLERY THUMBS ===== */
  document.querySelectorAll('.gallery-thumb').forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.gallery-thumb__label')?.textContent ?? 'Gallery';
      showToast(`Full gallery coming in the live site — ${label.trim()}`);
    });
  });

  /* ===== NEWSLETTER ===== */
  window.handleSignup = e => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input?.value) {
      showToast(`Signed up with ${input.value}`);
      input.value = '';
    }
  };

  /* ===== TOAST ===== */
  function showToast(msg) {
    document.querySelector('.thw-toast')?.remove();
    const t = document.createElement('div');
    t.className = 'thw-toast';
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed', bottom: '72px', left: '50%',
      transform: 'translateX(-50%) translateY(10px)',
      background: '#333333', color: '#fff',
      padding: '11px 22px', borderRadius: '999px',
      fontSize: '0.84rem', fontWeight: '600', fontFamily: 'Inter, sans-serif',
      boxShadow: '0 6px 22px rgba(0,0,0,0.2)', zIndex: '9999',
      opacity: '0', transition: 'all 0.26s ease',
      border: '1px solid rgba(0,128,128,0.3)',
      whiteSpace: 'nowrap', maxWidth: '90vw', textAlign: 'center',
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    }));
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => t.remove(), 280);
    }, 3000);
  }

});
