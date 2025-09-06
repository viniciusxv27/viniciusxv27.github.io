// Mobile Menu Toggle
const btnMobile = document.getElementById("btn-mobile");
const navMenu = document.getElementById("nav");
const menuLinks = document.querySelectorAll("#menu a");

function toggleMenu() {
  navMenu.classList.toggle("active");
  
  // Update aria-expanded for accessibility
  const isActive = navMenu.classList.contains("active");
  btnMobile.setAttribute("aria-expanded", isActive);
}

function closeMenuMobile() {
  navMenu.classList.remove("active");
  btnMobile.setAttribute("aria-expanded", "false");
}

// Event listeners
if (btnMobile) {
  btnMobile.addEventListener("click", toggleMenu);
  btnMobile.setAttribute("aria-expanded", "false");
  btnMobile.setAttribute("aria-label", "Toggle navigation menu");
}

// Close menu when clicking on menu links (mobile)
menuLinks.forEach(link => {
  link.addEventListener("click", closeMenuMobile);
});

// Close menu when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !btnMobile.contains(e.target)) {
    closeMenuMobile();
  }
});

// Scroll Reveal Animation
const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  delay: 400,
  reset: false, // Changed to false for better performance
  easing: 'ease-out'
});

// Reveal animations
sr.reveal('h2', { delay: 100, origin: 'bottom' });
sr.reveal('.tech-item', { origin: 'top', interval: 100 });
sr.reveal('.service-card', { origin: 'bottom', interval: 150 });
sr.reveal('.timeline-item', { origin: 'left', interval: 200 });
sr.reveal('.project-card', { origin: 'bottom', interval: 200 });
sr.reveal('.client-logo', { origin: 'top', interval: 50 });

// Hero section reveal
sr.reveal('.introducao_info > div:first-child', { 
  origin: 'left', 
  distance: '80px',
  duration: 1500,
  delay: 200 
});

sr.reveal('.hero-image', { 
  origin: 'right', 
  distance: '80px',
  duration: 1500,
  delay: 400 
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      closeMenuMobile();
    }
  });
});

// Header scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.fixed');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  lastScrollY = window.scrollY;
});

// Add loaded class to body for CSS animations
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Intersection Observer for nav active states
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#menu a[href^="#"]');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -80% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all nav links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to current nav link
      const activeLink = document.querySelector(`#menu a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lazy loading for images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));