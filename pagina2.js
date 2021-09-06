const btnMobile = document.getElementById("btn-mobile");
const closeMenu = document.getElementById("close");
const navMenu = document.getElementById("nav");
const closeButtons = document.querySelectorAll("#close");

// Ativar e desativar menuHambúrguer
function toggleMenu() {
  navMenu.classList.toggle("active");
}

function closeMenuMobile() {
  navMenu.classList.remove("active");
}

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touch", toggleMenu);
closeMenu.addEventListener("click", closeMenuMobile);
closeButtons.forEach(link => link.addEventListener("click", closeMenuMobile));

const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  delay: 400,
  reset: true
})

const pi = ScrollReveal({
    distance: '32px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal(`h2`, {delay: 100})
sr.reveal(`.skill-img`, {origin: 'top', interval: 50})
pi.reveal(`.portfolio-image`, {origin: 'right', interval: 50})