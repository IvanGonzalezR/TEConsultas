//Globales de Axios
axios.defaults.withCredentials = true;

//Obtener ID del usuario en sesion activa
let idUsuario2 = localStorage.getItem("id");
console.log(idUsuario2);

let container_cons_rec = document.querySelector('.container_cons_rec');
let confCuenta = document.getElementById('configuracion_cuenta');
//let confCuentaHijo = document.getElementById('configuracion_cuenta_hijo');

let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');

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

//agregar evento click del boton Guardar
btnGuardar = document.getElementById('btnGuardar');
btnGuardar.addEventListener('click', function() {
      let paciente = {};
      paciente.idPaciente = idUsuario2; //MODIFICAR Y EXTRAER DE LA SESION COOKIE
      paciente.celular = document.getElementById('celular').value;
      paciente.tipoSangre = document.getElementById('tipoSangre').value;

      let radioSeleccionado = document.querySelector('input[name="sexo"]:checked');
      if(radioSeleccionado.value == "F"){
            paciente.sexo = 0;
      }else{
            paciente.sexo = 1;
      }

      paciente.fechaNac = document.getElementById('fechaNac').value;
      paciente.foto = "ImgFoto";
      paciente.direccion = document.getElementById('direccion').value;

      let radioSeleccionado2 = document.querySelector('input[name="discapacidad"]:checked');
      if(radioSeleccionado.value == "Si"){
            paciente.discapacidad = 1;
      }else{
            paciente.discapacidad = 0;
      }

      console.log(paciente);
      crearPaciente(paciente);
});

function crearPaciente(paciente){
    const headers = {"Content-Type": "application/json",};
    axios.post('http://localhost:3005/api/infopacientes', paciente, {headers})
        .then(response => {
            alert("Informacion completa del Paciente");
            setTimeout( function() { window.location.href = "/consultas-paciente2.html"; }, 1000 );
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            // alert("El correo ya esta registrado");
        }});
}
