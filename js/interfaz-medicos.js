const ocultar = function(elem, elemChilds){
    for (let i=0; i<elemChilds; i++) {
        elem.children[i].className += ' ocultar';
    };
};

const aparecer = function(elem, elemChilds){
    for (let i=0; i<elemChilds; i++) {
        elem.children[i].classList.remove('ocultar');
    };
};

const btn_account = document.getElementById('account');

btn_account.addEventListener('click', function(){
    event.preventDefault();

    const container_item = document.querySelector('.container-item');
    ocultar(container_item, 2);
});

const btn_calendar = document.getElementById('iconCalendario');

btn_calendar.addEventListener('click', function(){
    event.preventDefault();

    const container_item = document.querySelector('.container-item');
    aparecer(container_item, 2);
});

