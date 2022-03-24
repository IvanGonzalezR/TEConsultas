//NAVBAR MOBILE
const navOpen = document.querySelector(".nav__open");
const navClose = document.querySelector(".nav__close");
const navMobileList = document.querySelector(".nav__mobile__links");
const navWebList = document.querySelector(".nav__web__links");

// Metodo para abrir el menu en mobile.
   navOpen.addEventListener("click", function () {
       navMobileList.style.display = "flex";
       navOpen.style.display = "none";
       navClose.style.display = "block";
   });

// Metodo para cerrar el menu en mobile.
   navClose.addEventListener("click", function () {
       navMobileList.style.display = "none";
       navOpen.style.display = "block";
       navClose.style.display = "none";
   });
