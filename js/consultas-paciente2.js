//Globales de Axios
axios.defaults.withCredentials = true;

//Obtener ID del usuario en sesion activa
let idUsuario = localStorage.getItem("id");

//Obtener inputs
let inputNombre = document.getElementById('nombre2');
let inputCelular = document.getElementById('celular2');
let inputCorreo = document.getElementById('correo2');
let inputDireccion = document.getElementById('direccion2');
let inputFechaNacimiento = document.getElementById('fechaNac2');
// let inputSexo = document.getElementById('sexo');
let inputTipoSangre = document.getElementById('tipoSangre2');
let inputFoto = document.getElementById('foto2');

let usuario = {idPaciente: idUsuario};
let datosUsuario = {};
let datosUsuarioNombre = {};

//Obtener objeto a partir de la ID del usuario
function getInfoPacientes(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/infopacientes/get", usuario, headers2)
      .then(response => {
         datosUsuario = response;
         console.log(datosUsuario);

         actualizarPacientes2(datosUsuario);
      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getInfoPacientes();

function getPacientes(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/pacientes/nombre", usuario, headers2)
      .then(response => {
         datosUsuarioNombre = response;
         console.log(datosUsuarioNombre);

         actualizarPacientes(datosUsuarioNombre); 

      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getPacientes();

function actualizarPacientes(datosUsuarioNombre){
         inputNombre.value = datosUsuarioNombre.data.nombre;
         inputCorreo.value = datosUsuarioNombre.data.correo;
}

function actualizarPacientes2(datosUsuario){
   console.log(datosUsuario);
         inputCelular.value = datosUsuario.data[0].celular;
         inputDireccion.value = datosUsuario.data[0].direccion;
         // inputFechaNacimiento.value = datosUsuario[0].data.fechaNac;
         inputTipoSangre.value = datosUsuario.data[0].tipoSangre;
}

//Cerrar sesion
cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function() {
   localStorage.removeItem("id");
   axios.get("http://localhost:3005/api/pacientes/logout")
   .then(response => {
         console.log(response);
      })
      .catch(error => {console.error(error)
      });
});

campoId = document.getElementById("idPaciente2");
campoId.value = idUsuario;