document.addEventListener("DOMContentLoaded", function () {
  let copyright = document.querySelector(".copyright");
  let currentYear = new Date().getFullYear();
  copyright.textContent = `©${currentYear} Pencho Deskov`;
});
