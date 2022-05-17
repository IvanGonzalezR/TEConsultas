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

let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');
let container_cons_rec = document.querySelector('.container_cons_rec');
let confCuenta = document.getElementById('configuracion_cuenta');
// let inputSexo = document.getElementById('sexo');
let inputTipoSangre = document.getElementById('tipoSangre2');
let inputFoto = document.getElementById('foto2');
let inputFoto2 = document.getElementById('fotoPerfil');

let usuario = {idPaciente: idUsuario};
console.log(usuario);
let datosUsuario = {};
let datosUsuarioNombre = {};

//Obtener objeto a partir de la ID del usuario
function getInfoPacientes(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/infopacientes/get", usuario, headers2)
      .then(response => {
         datosUsuario = response;
         console.log("DatosUsuario > " );
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
         console.log("DatosUsuarioNombre >");
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
         inputFoto2.src = "/recursos/pruebas/pacientes/" + datosUsuario.data[0].foto;
         datosUsuario.data[0].direccion;
}

//Cerrar sesion
cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function() {
   localStorage.removeItem("id");
   localStorage.removeItem("primeraVez");
   axios.get("http://localhost:3005/api/pacientes/logout")
   .then(response => {
         console.log(response);
      })
      .catch(error => {console.error(error)
      });
});

campoId = document.getElementById("idPaciente2");
campoId.value = idUsuario;

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