import { getAllConsultasAxios } from "./axios/consultasAxios.js";
import { getInfoPaciente } from "./axios/infoPacientesAxios.js";
import { getInfoDoctores } from "./axios/infoDoctoresAxios.js";
import { getPaciente } from "./axios/pacientesAxios.js";
import { getReceta } from "./axios/recetasAxios.js";

//Globales de Axios
// axios.defaults.withCredentials = true;
// const headers = {"Content-Type": "application/json",};

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
let container_consultas = document.querySelector('.container_consultas');
let confCuenta = document.getElementById('configuracion_cuenta');
let inputTipoSangre = document.getElementById('tipoSangre2');
let inputFoto = document.getElementById('foto2');
let inputFoto2 = document.getElementById('fotoPerfil');
let btnVer = document.getElementById('btnVer');
let btnImprimir = document.getElementById('btnImprimir');

let usuario = {idPaciente: idUsuario};

let doctor = {idPaciente: idUsuario};
console.log(usuario);
let datosUsuario = [];
let datosDoctores = {};
let receta = document.querySelector('.receta');
let foto2Valor = "";

getPaciente(usuario).then(function(response){
   datosUsuario = response;
   console.log("DatosPaciente >");
   console.log(datosUsuario);
   actualizarPacientes(datosUsuario);
});

function actualizarPacientes(datosUsuarioNombre){
         inputNombre.value = datosUsuarioNombre.data.nombre;
         inputCorreo.value = datosUsuarioNombre.data.correo;
         inputCorreoIzq.textContent = datosUsuarioNombre.data.correo;
         inputNombreIzq.textContent = datosUsuarioNombre.data.nombre;
}

//OBTENEMOS LA INFO DEL USUARIO
getInfoPaciente(usuario).then(response => {
   datosUsuario = response;

   actualizarPacientes2(datosUsuario);
});

//ACTUALIZAMOS LA INFO DEL USUARIO
function actualizarPacientes2(datosUsuario){
   inputCelular.value = datosUsuario[0].celular;
   inputDireccion.value = datosUsuario[0].direccion;
   inputFechaNacimiento.value = datosUsuario[0].fechaNac;

   if(datosUsuario[0].sexo == 1){
      inputSexo.checked = true;
   }else{
      inputSexo2.checked = true;
   }

   if(datosUsuario[0].discapacidad == 0){
      inputDiscapacidad.checked = true;
   }else{
      inputDiscapacidad2.checked = true;
   }

   inputTipoSangre.value = datosUsuario[0].tipoSangre;
   inputFoto2.src = "/recursos/pruebas/pacientes/" + datosUsuario[0].foto;
   // datosUsuario[0].direccion;
}



let objUsuario = {idPaciente: idUsuario};  

// let prueba = getAllConsultasAxios(objUsuario);
// console.log("Prueba AXIOS");
// console.log(prueba);

function getAllConsultas(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/consultas/getAllConsultas", objUsuario, headers2)
      .then(response => {
         let todasConsultas = response.data;
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
            '<button class="btn-ir-cons"><a href="www.facebook.com" id="' + element.idDoctor +'">Ir a consulta</a></button>' +
            '</div>'];
            // div.addEventListener('click', function(){
            //    window.location.repleace = "";
            // });

            // i++;
            document.getElementById("consultasCards").insertBefore(div, null);  

            // generarDatos();
         });
            })
            .catch(error => {console.error(error)
            if (error.response.status === 401){
               // alert("El correo ya esta registrado");
            }});
         }

         console.log("Todas las consultas > ");
         console.log(datosDoctores);

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
            // document.getElementById("consultasCards").insertBefore(div, null);  

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
let cerrarSesion = document.getElementById('cerrarSesion');
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

let campoId = document.getElementById("idPaciente2");
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

btnVer.addEventListener('click', function(){
   event.preventDefault();

   receta.classList.remove('none');
   // container_cons_rec.style.display = "block";
   container_consultas.classList.add('none');
   confCuenta.style.display = "none";

   //Obtenemos los datos de la receta
   getReceta(usuario).then(response => {
      console.log("RECETA RESPONSE");
      console.log(response);

      let receta = response;
      //llenar los campos de la receta
      
      let edad = document.getElementById("recetaEdad");
      edad.textContent = receta[0].datos.split(" ")[0];
      let fecha = document.getElementById("recetaFecha");
      fecha.textContent = receta[0].fecha;
      let prescripcion = document.getElementById("recetaPrescripcion");
      prescripcion.textContent = receta[0].prescripcion;
      let peso = document.getElementById("recetaPeso");
      peso.textContent = receta[0].datos.split(" ")[1];
      let altura = document.getElementById("recetaAltura");
      altura.textContent = receta[0].datos.split(" ")[2];
      let alergias = document.getElementById("recetaAlergia");
      alergias.textContent = receta[0].datos.split(" ")[3];

      getPaciente(usuario).then(response => {
         let nombre = document.getElementById("recetaNombre");
         nombre.textContent = response.data.nombre;
         let cedula = document.getElementById("recetaCedulaDoctor");
         cedula.textContent = response[0].cedula;
      });

      let idDoctor = {idDoctor: receta[0].idDoctor};

      getInfoDoctores(idDoctor).then(response => {
         console.log("DOCTOR RESPONSE");
         console.log(response);
         let doctor = document.getElementById("recetaDoctor");
         // doctor.src = "./recursos/pruebas/doctores/firma/" + response.foto;

         let firma = document.getElementById("recetaFirma");
         firma.src = "/recursos/pruebas/doctores/firma/" + response[0].firma;
         let nombre = document.getElementById("recetaNombreDoctor");
         nombre.textContent = response[0].nombreC;
         let especialidad = document.getElementById("recetaEspecialidadDoctor");
         especialidad.textContent = response[0].especialidad;
         
      });

      

   });
});

btnImprimir.addEventListener('click', function(){
   event.preventDefault();

   // container_cons_rec.classList.add('none');
   let contIzq = document.getElementById("contIzq");
   let containerRecetas = document.getElementById("containerRecetas");
   contIzq.classList.add('none');
   containerRecetas.classList.add('none');
   confCuenta.classList.remove('none');
   print();
   contIzq.classList.remove('none');
   containerRecetas.classList.remove('none');

});