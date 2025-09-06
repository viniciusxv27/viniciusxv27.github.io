// Back to Top Button functionality
const btnTop = document.getElementById("btnTop");

// Throttle function for better performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Show/hide back to top button based on scroll position
function handleScroll() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  
  if (scrollTop > 300) {
    btnTop.style.display = "flex";
    btnTop.style.opacity = "1";
    btnTop.style.transform = "translateY(0)";
  } else {
    btnTop.style.opacity = "0";
    btnTop.style.transform = "translateY(10px)";
    
    // Hide after transition
    setTimeout(() => {
      if (btnTop.style.opacity === "0") {
        btnTop.style.display = "none";
      }
    }, 300);
  }
}

// Smooth scroll to top with progress indication
function scrollToTop() {
  const scrollDuration = 800;
  const scrollStep = -window.scrollY / (scrollDuration / 15);
  
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

// Initialize button state
if (btnTop) {
  btnTop.style.display = "none";
  btnTop.style.opacity = "0";
  btnTop.style.transform = "translateY(10px)";
  btnTop.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  
  // Add icon if not present
  if (!btnTop.innerHTML.trim()) {
    btnTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  }
  
  // Event listeners
  btnTop.addEventListener("click", scrollToTop);
  
  // Add keyboard support
  btnTop.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  });
  
  // Add ARIA label for accessibility
  btnTop.setAttribute("aria-label", "Voltar ao topo");
  btnTop.setAttribute("title", "Voltar ao topo");
}

// Attach scroll event with throttling
window.addEventListener("scroll", throttle(handleScroll, 100));

// Navbar scroll effect
const navbar = document.querySelector('.fixed');
let lastScrollTop = 0;

function handleNavbarScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down & past header height
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up or at top
    navbar.style.transform = 'translateY(0)';
  }
  
  // Add background blur when scrolling
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}

window.addEventListener('scroll', throttle(handleNavbarScroll, 10));

// Carousel sempre infinito - sem interrupções
const carousel = document.querySelector('.carousel-track');
if (carousel) {
  // Resetar posição inicial
  carousel.style.transform = 'translateX(0)';
  
  // Garantir que a animação sempre continue
  carousel.style.animationPlayState = 'running';
  
  // Opcional: hover sutil apenas para escala das imagens individuais
  const clientLogos = document.querySelectorAll('.client-logo');
  clientLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      const img = logo.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1)';
      }
    });
    
    logo.addEventListener('mouseleave', () => {
      const img = logo.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
}

// Add loading states and error handling for dynamic content
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in effect for page load
  document.body.classList.add('page-loaded');
  
  // Handle form submissions if any
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando...';
        
        // Re-enable after delay (remove this in production with proper form handling)
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Enviar';
        }, 3000);
      }
    });
  });
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.button, .service-card, .project-card');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
});

// Ripple effect function
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
  
  // Remove ripple after animation
  setTimeout(() => {
    circle.remove();
  }, 600);
}

// CSS for ripple effect (add to stylesheet)
const rippleCSS = `
  .button, .service-card, .project-card {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .page-loaded {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .navbar.scrolled {
    backdrop-filter: blur(20px);
    background: rgba(15, 23, 42, 0.98);
  }
`;

// Inject CSS if not already present
if (!document.getElementById('dynamic-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'dynamic-styles';
  styleSheet.textContent = rippleCSS;
  document.head.appendChild(styleSheet);
}