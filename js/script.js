// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll behavior
  // Navbar scroll behavior
  const navbar = document.getElementById('navbar');
  // const hamburger = document.getElementById('hamburger');
  // const navLinks = document.getElementById('navLinks');

  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    // At the very top
    if (currentScrollY <= 10) {
      navbar.classList.remove('nav-hidden');
      navbar.classList.remove('scrolled');

      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // Scrolling DOWN
    if (currentScrollY > lastScrollY) {
      navbar.classList.add('nav-hidden');
    }

    // Scrolling UP
    else if (currentScrollY < lastScrollY) {
      navbar.classList.remove('nav-hidden');
      navbar.classList.add('scrolled');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleNavbarScroll);
      ticking = true;
    }
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Contact form validation & mock success
  const form = document.getElementById('contactForm');
  const successDiv = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !projectType || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    successDiv.style.display = 'block';
    form.reset();
    setTimeout(() => { successDiv.style.display = 'none'; }, 6000);
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.service-card, .project-card, .why-card, .step');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => {
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});