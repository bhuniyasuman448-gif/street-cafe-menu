/**
 * STREET CAFE — Digital QR Menu Interactive Script
 * Provides smooth navigation, category switching, and touch micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.cat-pill');
  const categories = document.querySelectorAll('.menu-category');
  const menuSection = document.getElementById('menu-section');

  // Handle Category Filter & Scroll Navigation
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = pill.getAttribute('data-filter');

      // Update active pill styling
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (filter === 'all') {
        // Show all categories
        categories.forEach(cat => {
          cat.classList.remove('is-hidden');
        });
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Show all categories to allow seamless viewing, but scroll directly to target
        categories.forEach(cat => {
          cat.classList.remove('is-hidden');
        });
        const targetSection = document.getElementById(filter);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // IntersectionObserver to dynamically highlight category pill as user scrolls
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        pills.forEach(pill => {
          if (pill.getAttribute('data-filter') === id) {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  categories.forEach(category => {
    observer.observe(category);
  });

  // Mobile active feedback for menu cards
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach(card => {
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.classList.remove('touch-active');
      }, 180);
    }, { passive: true });
  });
});
