//Globales de Axios
axios.defaults.withCredentials = true;

let calendario = document.querySelector('.calendario');
let infoAccount = document.querySelector('.info-account');
let receta = document.querySelector('.receta');

//Botones
let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');
let iconReceta = document.getElementById('iconReceta');
let btnGuardar = document.getElementById('btnGuardar');

//Boton Cuentaa
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
    receta.classList.remove('none');
});

btnGuardar.addEventListener('click', function(event){
    event.preventDefault();
    let doctor = {}
    doctor.idDoctor = 1; //MODIFICAR Y EXTRAER DE LA SESION COOKIE
    doctor.nombreC = document.getElementById('nombre').value;

    doctor.identificacion = "ImgIdentificacion";

    doctor.firma = "ImgFirma";

    let radioSeleccionado = document.querySelector('input[name="sexo"]:checked');
      if(radioSeleccionado.value == "F"){
         doctor.sexo = 0;
      }else{
         doctor.sexo = 1;
    }
    
    doctor.fechaNac = document.getElementById('nacimiento').value;

    doctor.foto = "ImgFoto";

    doctor.especialidad = document.getElementById('especialidad').value;

    doctor.horario = document.getElementById('dia1').value + "/" +document.getElementById('dia2').value
    + "/" +document.getElementById('hora1').value + "/" +document.getElementById('hora2').value;

    doctor.precioCons = document.getElementById('precio').value;
    doctor.direccionCons = document.getElementById('consultorio').value;
    doctor.Descripcion = document.getElementById('descripcion').value;

    crearDoctor(doctor);
});

function crearDoctor(doctor){
    const headers = {"Content-Type": "application/json",};
    axios.post('http://localhost:3005/api/infodoctores', doctor, {headers})
        .then(response => {
            alert("Informacion completa del doctor");
            setTimeout( function() { window.location.href = "/interfaz-medicos2.html"; }, 1000 );
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            // alert("El correo ya esta registrado");
        }});
}

function manejarImagenes(evt) {
    var files = evt.target.files; // FileList object
    idCampo = evt.currentTarget.id

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var div = document.createElement('div');
          div.classList.add('centrarImagen');
          div.innerHTML = ['<img class="thumb centerX centerY" width="110rem" height="110rem" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById(idCampo).insertBefore(div, null);
        };
      })(f); 

      // Read in the image file as a data URL.
      console.log(reader.readAsDataURL(f));
      console.log(f.name);
      console.log(evt);
    }
  }

  //Asignar evento a los campos que cargan imagenes
  let identificacion = document.getElementById('identificacion');
  identificacion.addEventListener('change', manejarImagenes);

  let firma = document.getElementById('firma');
  firma.addEventListener('change', manejarImagenes);

  let imgPerfil = document.getElementById('imgPerfil');
  imgPerfil.addEventListener('change', manejarImagenes);

