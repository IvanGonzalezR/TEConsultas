//Botones
let btnAgendar = document.getElementById('btn-agendar-cita');
btnAgendar.addEventListener('click', agendarCita);

//Obtener ID del usuario en sesion activa
let idUsuario = localStorage.getItem("id");
console.log(idUsuario);

//Variables Globales
const headers = {"Content-Type": "application/json",};
let idDoctor = 12;
let derechaFecha = document.getElementById('FechaActual').value;
var todosDoctores = [];
var todosinfoDoctores = {};

// let derechaHora = document.getElementById('HoraActual');
let derechaHora = "12";
let consulta = {};

// ACTUALIZAR CON ON CHANGE
consulta.idDoctor = idDoctor;
consulta.idPaciente = idUsuario;
consulta.fecha = derechaFecha;
consulta.hora = ""+derechaHora; //obtener los horarios disponibles
consulta.link = "www.facebook.com";

console.log("consulta");
console.log(consulta);

function agendarCita(){
      console.log("funciona");
      axios.post("http://localhost:3005/api/consultas", consulta, headers)
      .then(response => {
            datosConsulta = response;
            console.log("Datos de la consulta >");
            console.log(datosConsulta);
      //    actualizarPacientes(datosUsuarioNombre); 

      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
            // alert("El correo ya esta registrado");
      }});
}

function getAllDoctores(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/doctores/todosDoctores", {}, headers2)
      .then(response => {
         todosDoctores.push(response);
         console.log("datos All Doctores >");
         console.log(todosDoctores);

      //    todosDoctores[0]['data']['data'].forEach(element => {
      //       console.log(element.nombre);
      //    });

      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getAllDoctores();

function getAllInfoDoctores(){
   const headers2 = {"Content-Type": "application/json",};
   axios.post("http://localhost:3005/api/infoDoctores/todosInfoDoctores", {}, headers2)
      .then(response => {
         todosinfoDoctores = response.data;
         console.log("datos All InfoDoctores >");
         console.log(todosinfoDoctores);

         //Crear los cards Dinamicamente
         let i = 0
         todosinfoDoctores.data.forEach(element => {
            // console.log(element.foto);
            let div = document.createElement('div');
            div.classList.add('carta-doctor');
            div.classList.add('flex');
            div.innerHTML = ['<img src="/recursos/pruebas/doctores/perfil/' 
            + element.foto + '"' + 'alt="doctor">'];
            div.innerHTML = div.innerHTML + ['<div class="info-carta-doctor flex">' +
            '<p>' + todosDoctores[0]['data']['data'][i].nombre + '</p>' + 
            '<p>' + element.especialidad + '</p>' + 
            '<p>Precio consulta: <span>$' + element.precioCons + '.00<span></p>' + 
            '<button class="btn-ver-mas" id="' + element.idDoctor +'">Ver más</button>' +
            '</div>'];

            i++;
            document.getElementById("menuDoctores").insertBefore(div, null);  

         });

      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getAllInfoDoctores();

      // <div class="carta-doctor flex">
      //                   <img src="/recursos/img/image 3.png" alt="doctor">
      //                   <div class="info-carta-doctor flex">
      //                       <p>Juan Manuel Alfaro Aguilera</p>
      //                       <p>Ginecologo</p>
      //                       <p>Precio consulta: <span>$150.00</span></p>
      //                       <button class="btn-ver-mas" >Ver más</button>
      //                   </div>
      //               </div>
      // console.log('Aqui entra al forEach');
      // console.log(todosinfoDoctores);
      // console.log(todosinfoDoctores);
      // todosinfoDoctores[0].data.data.forEach(element => {
      //       console.log(element + "1");
            // let div = document.createElement('div');
            // div.classList.add('carta-doctor');
            // div.classList.add('flex');
            // div.innerHTML = ['src="/recursos/pruebas/doctores/' + 'perfilimage 3.png' + '"' + 'alt="doctor"'];
            // document.getElementById("menuDoctores").insertBefore(div, null);  
      // };     

      // let a = todosinfoDoctores[0].data.map(element => {
      //       element.data.data.idDoctor; 
      // });

      // console.log(a);


