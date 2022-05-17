//Globales de Axios
axios.defaults.withCredentials = true;

//Obtener ID del usuario en sesion activa
let idUsuario2 = localStorage.getItem("id");
console.log(idUsuario2);

let container_cons_rec = document.querySelector('.container_cons_rec');
let confCuenta = document.getElementById('configuracion_cuenta');
//let confCuentaHijo = document.getElementById('configuracion_cuenta_hijo');

let inputNombre = document.getElementById('nombre');
let inputNombreLeft = document.getElementById('nombreLeft');
let inputCorreo = document.getElementById('correo');
let inputCorreoLeft = document.getElementById('correoLeft');

let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');
let paciente = {};
let paciente2 = {idPaciente: idUsuario2};
let foto;
let foto2 = document.getElementById('foto');
foto2.addEventListener('change', manejarImagenes);

// esconder el Div de consultas
iconAccount.addEventListener('click', function() {
      container_cons_rec.classList.add('none');
      confCuenta.classList.remove('none');
      //confCuentaHijo.classList.remove('none');
});

// esconder el Div de configuracion de cuenta
iconCalendario.addEventListener('click', function() {
      confCuenta.classList.add('none');
      container_cons_rec.classList.remove('none');
      //confCuentaHijo.classList.add('none');
});

function manejarImagenes(evt) {
    var files = evt.target.files; // FileList object
    idCampo = evt.currentTarget.id
    console.log(idCampo + " ESte es el id");

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
          document.getElementById("fotoSpan").insertBefore(div, null);
        };
      })(f); 

      // Read in the image file as a data URL.
      // console.log(reader.readAsDataURL(f));
      paciente.foto = f.name;
      console.log(evt);
    }
  }

function getPacientes(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/pacientes/nombre", paciente2, {headers2})
      .then(response => {
         datosUsuarioNombre = response;
         console.log("DatosUsuarioNombre >");
         console.log(datosUsuarioNombre);

         inputNombre.value = datosUsuarioNombre.data.nombre;
         inputNombreLeft.textContent = datosUsuarioNombre.data.nombre;
         inputCorreo.value = datosUsuarioNombre.data.correo;
         inputCorreoLeft.textContent = datosUsuarioNombre.data.correo;
      //    actualizarPacientes(datosUsuarioNombre); 

      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getPacientes();
//agregar evento click del boton Guardar
btnGuardar = document.getElementById('btnGuardar');
btnGuardar.addEventListener('click', function() {
      
      paciente.idPaciente = idUsuario2; //MODIFICAR Y EXTRAER DE LA SESION COOKIE
      paciente.tipoSangre = document.getElementById('tipoSangre').value;
      paciente.celular = document.getElementById('celular').value;
      

      let radioSeleccionado = document.querySelector('input[name="sexo"]:checked');
      if(radioSeleccionado.value == "F"){
            paciente.sexo = 0;
      }else{
            paciente.sexo = 1;
      }

      paciente.fechaNac = document.getElementById('fechaNac').value;

      paciente.direccion = document.getElementById('direccion').value;

      let radioSeleccionado2 = document.querySelector('input[name="discapacidad"]:checked');
      if(radioSeleccionado.value == "Si"){
            paciente.discapacidad = 1;
      }else{
            paciente.discapacidad = 0;
      }

      // paciente2.

      console.log(paciente);
      crearPaciente(paciente);
});

function crearPaciente(paciente){
    const headers = {"Content-Type": "application/json",};
    axios.post('http://localhost:3005/api/infopacientes', paciente, {headers})
        .then(response => {
            alert("Informacion completa del Paciente");
            localStorage.removeItem("primeraVez");
            localStorage.setItem("primeraVez", "false");
            setTimeout( function() { window.location.href = "./consultas-paciente2.html"; }, 1000 );
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            // alert("El correo ya esta registrado");
        }});
}


