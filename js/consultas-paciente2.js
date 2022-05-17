//Globales de Axios
axios.defaults.withCredentials = true;
const headers = {"Content-Type": "application/json",};

//Obtener ID del usuario en sesion activa
let idUsuario = localStorage.getItem("id");

//Obtener inputs
let inputNombre = document.getElementById('nombre2');
let inputCelular = document.getElementById('celular2');
let inputCorreo = document.getElementById('correo2');
let inputDireccion = document.getElementById('direccion2');
let inputFechaNacimiento = document.getElementById('fechaNac2');
let inputSexo = document.getElementById('sexo2');
let inputSexo2 = document.getElementById('sexo22');
let inputDiscapacidad = document.getElementById('discapacidad2');
let inputDiscapacidad2 = document.getElementById('discapacidad22');
let inputCorreoIzq = document.getElementById('correoIzq');
let inputNombreIzq  = document.getElementById('nombreIzq');

let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');
let container_cons_rec = document.querySelector('.container_cons_rec');
let confCuenta = document.getElementById('configuracion_cuenta');
let inputTipoSangre = document.getElementById('tipoSangre2');
let inputFoto = document.getElementById('foto2');
let inputFoto2 = document.getElementById('fotoPerfil');

let usuario = {idPaciente: idUsuario};
console.log(usuario);

let doctor = {idPaciente: idUsuario};
console.log(usuario);
let datosUsuario = [];
let datosDoctores = {};
let datosUsuarioNombre = {};
foto2Valor = "";

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
         inputCorreoIzq.textContent = datosUsuarioNombre.data.correo;
         inputNombreIzq.textContent = datosUsuarioNombre.data.nombre;
}

function actualizarPacientes2(datosUsuario){
   // console.log(datosUsuario);
         inputCelular.value = datosUsuario.data[0].celular;
         inputDireccion.value = datosUsuario.data[0].direccion;
         inputFechaNacimiento.value = datosUsuario.data[0].fechaNac;

         if(datosUsuario.data[0].sexo == 1){
            inputSexo.checked = true;
         }else{
            inputSexo2.checked = true;
         }

         if(datosUsuario.data[0].discapacidad == 0){
            inputDiscapacidad.checked = true;
         }else{
            inputDiscapacidad2.checked = true;
         }

         inputTipoSangre.value = datosUsuario.data[0].tipoSangre;
         inputFoto2.src = "/recursos/pruebas/pacientes/" + datosUsuario.data[0].foto;
         datosUsuario.data[0].direccion;
}

objUsuario = {idPaciente: idUsuario};      

function getAllConsultas(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/consultas/getAllConsultas", objUsuario, headers2)
      .then(response => {
         todasConsultas = response.data;
         console.log("datos All InfoConsultas >");
         console.log(todasConsultas[0].idDoctor);
         console.log(todasConsultas);

         
         for(let i = 0; i < todasConsultas.length; i++){
         const headers2 = {"Content-Type": "application/json",};
         axios.post("http://localhost:3005/api/infoDoctores/getPorPaciente", todasConsultas[i], headers2)
            .then(response => {
               datosDoctores = response;
               console.log("Doctor > " );
               console.log(datosDoctores);

               todasConsultas.forEach(element => {
           // console.log(element.fecha);
            let div = document.createElement('div');
            div.classList.add('carta_consulta');
            div.classList.add('flex');
            div.innerHTML = ['<img src="/recursos/pruebas/doctores/perfil/' 
            + datosDoctores.data[i].foto + '"' + 'alt="doctor">'];
            div.innerHTML = div.innerHTML + ['<div class="info-carta-consulta flex">' +
            '<p>' + datosDoctores.data[i].nombreC + '</p>' + 
            '<p>Fecha: <span> ' + element.fecha + '<span></p>' + 
            '<button class="btn-ir-cons"><meta http-equiv="Refresh" content="5;url=https://www.facebook.com"><a  id="' + element.idDoctor +'">Ir a consulta</a></button>' +
            '</div>'];
            // div.addEventListener('click', function(){
            //    window.location.repleace = "";
            // });

            // i++;
            document.getElementById("consultasCards").insertBefore(div, null);  

            // generarDatos();
         });

               // actualizarPacientes2(datosUsuario);
            })
            .catch(error => {console.error(error)
            if (error.response.status === 401){
               // alert("El correo ya esta registrado");
            }});
         }
         
         // obtenerDoctorPorPaciente();

         // <div class="carta_consulta flex">
         //                            <img src="/recursos/img/image 3.png" alt="doctor">
         //                            <div class="info-carta-consulta flex">
         //                                <p>Juan Manuel Alfaro Aguilera</p>
         //                                <p>Fecha: <span>1/May/2022</span></p>
         //                                <button class="btn-ir-cons" >Ir consulta</button>
         //                            </div>
         //                        </div>

         //Crear los cards Dinamicamente
         let i = 0
         todasConsultas.forEach(element => {
           // console.log(element.fecha);
            let div = document.createElement('div');
            div.classList.add('carta_consulta');
            div.classList.add('flex');
            div.innerHTML = ['<img src="/recursos/img/' 
            + foto2Valor + '"' + 'alt="doctor">'];
            div.innerHTML = div.innerHTML + ['<div class="info-carta-consulta flex">' +
            '<p>' + datosDoctores.data[0].nombreC + '</p>' + 
            '<p>' + element.especialidad + '</p>' + 
            '<p>Precio consulta: <span> $' + element.precioCons + '.00<span></p>' + 
            '<button class="btn-ver-mas" id="' + element.idDoctor +'">Ver más</button>' +
            '</div>'];

            i++;
            document.getElementById("consultasCards").insertBefore(div, null);  

            // generarDatos();
         });

      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getAllConsultas();


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