document.addEventListener('DOMContentLoaded', () => {
  // Cursor
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Page transition
  function loadPage(url) {
    const transition = document.querySelector('.page-transition');
    gsap.to(transition, {
      scaleY: 1,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        window.location.href = url;
      }
    });
  }

  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      const pages = ['index.html', 'paintings.html', 'digital-art.html', 'bio.html', 'contacts.html'];
      loadPage(pages[index]);
    });
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Hero animation
  gsap.from('.title-line', {
    opacity: 0,
    y: 40,
    duration: 1.2,
    stagger: 0.1,
    ease: "power3.out"
  });

  // Work items animation
  gsap.from('.work-item', {
    opacity: 0,
    y: 60,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.work-section',
      start: "top 80%"
    }
  });

  // Image hover effect
  document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item.querySelector('.work-image'), {
        scale: 1.05,
        duration: 0.6
      });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item.querySelector('.work-image'), {
        scale: 1,
        duration: 0.6
      });
    });
  });
});
