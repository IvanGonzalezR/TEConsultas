const clicked = function(elem){
    document.getElementById(elem).style.backgroundColor = "#495057";
}

const notClicked = function(elem){
    document.getElementById(elem).style.backgroundColor = "#030419";
}

//Por default el boton 'PACIENTE' esta coloreado (seleccionado)
clicked("img_cuenta");

const images = ["img_doctor", "img_mensajes", "img_calendario", "img_cuenta"];

document.getElementById("img_doctor").addEventListener("click",function(event){
   for(let i = 0; i < images.length; i++){
      notClicked(images[i]);
   }
   clicked("img_doctor")
   console.log('Click en doctor');
});

document.getElementById("img_cuenta").addEventListener("click",function(event){
   for(let i = 0; i < images.length; i++){
      notClicked(images[i]);
   }
   clicked("img_cuenta");
   console.log('Click en cuenta');
});

document.getElementById("img_mensajes").addEventListener("click",function(event){
   for(let i = 0; i < images.length; i++){
      notClicked(images[i]);
   }
   clicked("img_mensajes");
   console.log('Click en cuenta');
});

document.getElementById("img_calendario").addEventListener("click",function(event){
   for(let i = 0; i < images.length; i++){
      notClicked(images[i]);
   }
   clicked("img_calendario");
   console.log('Click en cuenta');
});

function form_s