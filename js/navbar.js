//NAVBAR MOBILE
const navLines = document.querySelector(".nav__lines");
const navLinesX = document.querySelector(".nav__linesX"); 
const navMobileList = document.querySelector(".nav__mobile");

// Metodo para abrir el menu en mobile.
   navLines.addEventListener("click", function () {
       navLines.style.display = "none";
       navLinesX.style.display = "flex";     
       navMobileList.style.display = "flex";
   });

// Metodo para cerrar el menu en mobile.
   navLinesX.addEventListener("click", function () {
       navLines.style.display = "flex";
       navLinesX.style.display = "none";     
       navMobileList.style.display = "none";
   });
