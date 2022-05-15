const btnTop = document.getElementById("btnTop");

window.onscroll = function () {
  scroll();
};

function backToTop() {
  document.documentElement.scrollTop = 0;
}

function scroll() {
  if (document.documentElement.scrollTop > 200) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
}

btnTop.addEventListener("click", backToTop);