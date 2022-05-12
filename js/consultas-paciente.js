
/*let consultas = document.getElementById('consultas');
let confCuenta = document.getElementById('configuracion_cuenta');
let confCuentaHijo = document.getElementById('configuracion_cuenta_hijo');

let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');

// esconder el Div de consultas
iconAccount.addEventListener('click', function() {
      consultas.classList.add('none');
      confCuenta.classList.remove('none');
      confCuentaHijo.classList.remove('none');
});

// esconder el Div de configuracion de cuenta
iconCalendario.addEventListener('click', function() {
      confCuenta.classList.add('none');
      consultas.classList.remove('none');
      confCuentaHijo.classList.add('none');
});*/

let container_cons_rec = document.querySelector('.container_cons_rec');
let confCuenta = document.getElementById('configuracion_cuenta');
//let confCuentaHijo = document.getElementById('configuracion_cuenta_hijo');

let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');

// esconder el Div de consultas
iconCalendario.addEventListener('click', function() {
      container_cons_rec.classList.add('none');
      confCuenta.classList.remove('none');
      //confCuentaHijo.classList.remove('none');
});

// esconder el Div de configuracion de cuenta
iconAccount.addEventListener('click', function() {
      confCuenta.classList.add('none');
      container_cons_rec.classList.remove('none');
      //confCuentaHijo.classList.add('none');
});