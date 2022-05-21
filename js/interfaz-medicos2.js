import { getAllConsultasMedicosAxios } from "./axios/consultasAxios.js";
import { getPaciente } from "./axios/pacientesAxios.js";
import { crearReceta } from "./axios/recetasAxios.js";

//Globales de Axios
axios.defaults.withCredentials = true;

//Obtener ID del usuario en sesion activa
let idDoctor = localStorage.getItem("id");
console.log(idDoctor);
let doctor3 = {idDoctor: idDoctor};

//Referencias a los botones
let iconAccount = document.getElementById('iconAccount');
let iconCalendario = document.getElementById('iconCalendario');
let iconReceta = document.getElementById('iconReceta');
let btnGuardar = document.getElementById('btnGuardar2');
let btnEnviarReceta = document.getElementById('btnEnviarReceta');
let selectNombre = document.getElementById('selectNombre');
let doctor = {};

//Contiene los nombres individuales de los pacientes para cada doctor
let nombresPacientesUnicos = [];
//Contiene los id individuales de los pacientes para cada doctor
let idPacientesUnicos = [];

//
selectNombre.addEventListener('change', function(){
  console.log(selectNombre.value);
});

//Obtiene todas las consultas que tiene el medico en cuestion
getAllConsultasMedicosAxios(doctor3).then(function(response){
    console.log("getAllConsultasMedicosAxios");
    console.log(response);

    response.forEach( e => {
      let idPaciente = {idPaciente: e.idPaciente};
      // Obtenemos el nombre del paciente para cada consulta retornada
      getPaciente(idPaciente).then(function(response2){
        // Si no existe en el arreglo, lo indexamos
        if (nombresPacientesUnicos.indexOf(response2.data.nombre) == -1){
          nombresPacientesUnicos.push(response2.data.nombre);
          idPacientesUnicos.push(e.idPaciente);

          // Agregamos el nombre del paciente al select
          let option = document.createElement("option");
          option.text = response2.data.nombre;
          option.value = e.idPaciente;
          selectNombre.add(option);

      }});
    });

    console.log(nombresPacientesUnicos);
    console.log(idPacientesUnicos);
});

let calendario = document.querySelector('.calendario');
let infoAccount = document.querySelector('.info-account');
let receta = document.querySelector('.receta');

//Foto superior
let foto2 = document.getElementById('foto2');
let foto2Valor;

let doctor2 = {idDoctor: idDoctor};
console.log(doctor2);
let datosDoctor = {};
let datosDoctorNombre = {};

btnGuardar.addEventListener('click', function(event){
    event.preventDefault();
    
    doctor.idDoctor = idUsuario; //MODIFICAR Y EXTRAER DE LA SESION COOKIE
    doctor.nombreC = document.getElementById('nombre2').value;

    let radioSeleccionado = document.querySelector('input[name="sexo"]:checked');
      if(radioSeleccionado.value == "F"){
         doctor.sexo = 0;
      }else{
         doctor.sexo = 1;
    }
    
    doctor.fechaNac = document.getElementById('nacimiento2').value;

    doctor.especialidad = document.getElementById('especialidad2').value;

    doctor.horario = document.getElementById('dia12').value + "/" +document.getElementById('dia22').value
    + "/" +document.getElementById('hora12').value + "/" +document.getElementById('hora22').value;

    doctor.precioCons = document.getElementById('precio2').value;
    doctor.direccionCons = document.getElementById('consultorio2').value;
    doctor.Descripcion = document.getElementById('descripcion2').value;

    crearDoctor(doctor);
});

//OBtener los datos de la receta y crearla
btnEnviarReceta.addEventListener('click', function(event){
    event.preventDefault();
    let receta = {};
    receta.idDoctor = idDoctor;
    receta.idPaciente = selectNombre.value;
    receta.prescripcion = document.getElementById('descripcionReceta').value;
    receta.fecha = document.getElementById('fechaReceta').value;
    let edad = document.getElementById('edadReceta').value;
    let peso = document.getElementById('pesoReceta').value;
    let altura = document.getElementById('alturaReceta').value;
    let alergias = document.getElementById('alergiasReceta').value;
    receta.datos = edad + " " + peso + " " + altura + " " + alergias;
    // console.log(receta.datos.split(" ")[0]);

    crearReceta(receta).then(function(response){
      setTimeout( function() { window.location.href = "./interfaz-medicos2.html"; }, 1000 );
    });
});

function obtenerDoctor(){
    const headers = {"Content-Type": "application/json",};
    axios.post('http://localhost:3005/api/infodoctores/get', doctor2, {headers})
        .then(response => {
            localStorage.removeItem("primeraVez");
            localStorage.setItem("primeraVez", "false");
            console.log("Doctor > ")
            console.log(response)

            foto2Valor = response.data[0].foto;
            foto2.src = "/recursos/pruebas/doctores/perfil/" + foto2Valor;

            let firma = document.getElementById("recetaFirma");
            firma.src = "/recursos/pruebas/doctores/firma/" + response.data[0].firma;
            let nombre = document.getElementById("recetaNombreDoctor");
            nombre.textContent = response.data[0].nombreC;
            let especialidad = document.getElementById("recetaEspecialidadDoctor");
            especialidad.textContent = response.data[0].especialidad;

            actualizarDoctor(response.data);
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            // alert("El correo ya esta registrado");
        }});
}
obtenerDoctor();

function obtenerDoctorCedula(){
    const headers = {"Content-Type": "application/json",};
    axios.post('http://localhost:3005/api/doctores/cedula', doctor2, {headers})
        .then(response => {
            localStorage.removeItem("primeraVez");
            localStorage.setItem("primeraVez", "false");

            console.log(response)
            actualizarDoctorCedula(response.data);
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            // alert("El correo ya esta registrado");
        }});
}
obtenerDoctorCedula();

function actualizarDoctor(data){
    let doctor = data;
    document.getElementById('nombre2').value = doctor[0].nombreC;
    document.getElementById('nacimiento2').value = doctor[0].fechaNac;
    document.getElementById('especialidad2').value = doctor[0].especialidad;
    document.getElementById('precio2').value = doctor[0].precioCons;
    document.getElementById('consultorio2').value = doctor[0].direccionCons;
    document.getElementById('descripcion2').value = doctor[0].Descripcion;
    document.getElementById('dia12').value = doctor[0].horario.split("/")[0];
    document.getElementById('dia22').value = doctor[0].horario.split("/")[1];
    document.getElementById('hora12').value = doctor[0].horario.split("/")[2];
    document.getElementById('hora22').value = doctor[0].horario.split("/")[3];
    if(doctor.sexo == 1){
        document.getElementById('sexo2').checked = true;
    }else{
        document.getElementById('sexo22').checked = true;
    }
}

function actualizarDoctorCedula(data){
  let doctor = data;
  document.getElementById('cedula2').value = doctor.cedula;
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
      console.log(f.name);

      if(idCampo == "identificacion2"){
        doctor.identificacion = f.name;
      }else if(idCampo == "firma2"){
        doctor.firma = f.name;
      }else if(idCampo == "imgPerfil2"){
        doctor.foto = f.name;
      }
      

      console.log("identificacion = " + doctor.identificacion);
      console.log("firma = " + doctor.firma);
      console.log("foto = " + doctor.foto);
    }
  }

  //Cerrar sesion
let cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click', function() {
   localStorage.removeItem("id");
   localStorage.removeItem("primeraVez");
   axios.get("http://localhost:3005/api/doctores")
   .then(response => {
         console.log(response);
      })
      .catch(error => {console.error(error)
      });
});

  //Asignar evento a los campos que cargan imageness
  let imgPerfil = document.getElementById('imgPerfil2');
  imgPerfil.addEventListener('change', manejarImagenes);

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