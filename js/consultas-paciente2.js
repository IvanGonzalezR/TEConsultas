//Globales de Axios
axios.defaults.withCredentials = true;

//Obtener ID del usuario en sesion activa
let idUsuario = localStorage.getItem("id");
console.log(idUsuario);

let usuario = {idPaciente: idUsuario};
let datosUsuario = {};

//Obtener objeto a partir de la ID del usuario
function getData(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/infopacientes/get", usuario, headers2)
      .then(response => {
         datosUsuario = response;
         console.log(datosUsuario);
      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getData();

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

campoId = document.getElementById("idPaciente");
campoId.value = idUsuario;