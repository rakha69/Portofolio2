/* ================================================
   main.js — Portofolio Hafidz Muhammad Rakha Shidqi
================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------
     1. NAVBAR — scroll effect & active link
  ---------------------------------------- */
  const navbar    = document.getElementById('navbar');
  const navItems  = document.querySelectorAll('.nav-item');
  const sections  = document.querySelectorAll('section[id]');

  function onScroll() {
    // Tambah class 'scrolled' saat scroll > 60px
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Highlight nav item berdasarkan section yang terlihat
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------
     2. HAMBURGER MENU (mobile)
  ---------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Tutup menu saat link diklik
  navLinks.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ----------------------------------------
     3. SKILL BARS — animasi saat masuk viewport
  ---------------------------------------- */
  const bars = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-w') || 0;
        fill.style.width = width + '%';
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));

  /* ----------------------------------------
     4. FADE-IN ANIMASI saat scroll (CSS classes)
  ---------------------------------------- */
  const fadeEls = document.querySelectorAll(
    '.sec-head, .about-text, .about-card, .skill-bars-col, .skill-tags-col, ' +
    '.cert-card, .contact-info, .contact-form'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  /* ----------------------------------------
     5. CERTIFICATE MODAL — buka & tutup
  ---------------------------------------- */
  const modal      = document.getElementById('certModal');
  const modalImg   = document.getElementById('modalImg');
  const modalBg    = document.getElementById('modalBg');
  const modalClose = document.getElementById('modalClose');

  function openModal(src) {
    modalImg.src = src;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  document.querySelectorAll('.cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      if (src) openModal(src);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBg.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ----------------------------------------
     6. CONTACT FORM — validasi & submit
  ---------------------------------------- */
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const feedback    = document.getElementById('formFeedback');

  const fields = {
    fname:  { el: document.getElementById('fname'),  err: document.getElementById('fnameErr') },
    femail: { el: document.getElementById('femail'), err: document.getElementById('femailErr') },
    fmsg:   { el: document.getElementById('fmsg'),   err: document.getElementById('fmsgErr') },
  };

  function validateField(key) {
    const { el, err } = fields[key];
    let msg = '';

    if (key === 'fname' && el.value.trim().length < 2) {
      msg = 'Nama minimal 2 karakter.';
    }
    if (key === 'femail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
      msg = 'Format email tidak valid.';
    }
    if (key === 'fmsg' && el.value.trim().length < 10) {
      msg = 'Pesan minimal 10 karakter.';
    }
    err.textContent = msg;
    return msg === '';
  }

  // Validasi real-time
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].err.textContent) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) return;

    // Simulasi pengiriman (ganti dengan fetch ke backend/emailjs jika perlu)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    setTimeout(() => {
      feedback.textContent = '✅ Pesan terkirim! Saya akan segera membalasnya.';
      feedback.classList.add('success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Kirim Pesan';
      setTimeout(() => { feedback.textContent = ''; }, 5000);
    }, 1500);
  });

  /* ----------------------------------------
     7. SMOOTH SCROLL untuk semua anchor link
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70; // tinggi navbar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});

/* ----------------------------------------
   CSS classes untuk fade-in (ditambah via JS)
   (taruh di sini agar tidak perlu file CSS tambahan)
---------------------------------------- */
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);