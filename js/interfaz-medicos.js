const btnOcultar = document.querySelector('#ocultar');
const menu = document.querySelector('menu');

btnOcultar.addEventListener('click', ()=>{
    menu.setAttribute('style','display:none');
})
