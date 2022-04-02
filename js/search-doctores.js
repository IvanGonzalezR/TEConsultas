const modal = document.querySelector(".results__btn");
const cardBtn = document.querySelector(".results__cards__items__btn");
const X = document.querySelector(".results__btn__items__linesX");

// Metodo para abrir el modal.
cardBtn.addEventListener("click", function () {
    modal.style.display = "flex";
});

// Metodo para cerrar el modal.
X.addEventListener("click", function () {
    modal.style.display = "none";
});

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