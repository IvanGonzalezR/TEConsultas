let calendario = document.querySelector('.calendario');
let infoAccount = document.querySelector('.info-account');
let receta = document.querySelector('.receta');

//Botones
let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');
let iconReceta = document.getElementById('iconReceta');

//Boton Cuenta
iconAccount.addEventListener('click', function(event){
    event.preventDefault();

    infoAccount.classList.remove('none');
    calendario.classList.add('none');
    receta.classList.add('none');
});

//Boton Calendario
iconCalendario.addEventListener('click', function(event){
    event.preventDefault();

    infoAccount.classList.add('none');
    calendario.classList.remove('none');
    receta.classList.add('none');
});

//Boton Receta
iconReceta.addEventListener('click', function(event){
    event.preventDefault();

    infoAccount.classList.add('none');
    calendario.classList.add('none');
    receta.classList.revome('none');
});
