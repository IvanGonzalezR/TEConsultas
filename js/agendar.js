//Botones
// let btnAgendar = document.getElementById('btn-agendar-cita');
// btnAgendar.addEventListener('click', agendarCita);

//Obtener ID del usuario en sesion activa
let idUsuario = localStorage.getItem("id");
console.log(idUsuario);

//Variables Globales
const headers = {"Content-Type": "application/json",};
let idDoctor;
let derechaFoto = document.getElementById('derechaFoto');
let derechaNombre = document.getElementById('derechaNombre');
let derechaEspecialidad = document.getElementById('derechaEspecialidad');
let derechaDescripcion = document.getElementById('derechaDescripcion');
let derechaPrecio = document.getElementById('derechaPrecio');
let derechaFecha = document.getElementById('derechaFecha').value;
let derechaHorarios = document.getElementById('derechaHorarios');
var todosDoctores = [];
var todosinfoDoctores = {};
let precioConsulta = 0;

// let derechaHora = document.getElementById('HoraActual');
let derechaHora;
let consulta = {};
let horarioInicial = [];
let horarioFinal = [];

// ACTUALIZAR CON ON CHANGE
consulta.idDoctor = idDoctor;
consulta.idPaciente = idUsuario;
consulta.fecha = derechaFecha;
consulta.hora = ""+derechaHora; //obtener los horarios disponibles
consulta.link = "www.facebook.com";

console.log("consulta");
console.log(consulta);

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
            '<p>Precio consulta: <span> $' + element.precioCons + '.00<span></p>' + 
            '<button class="btn-ver-mas" id="' + element.idDoctor +'">Ver más</button>' +
            '</div>'];

            i++;
            document.getElementById("menuDoctores").insertBefore(div, null);  

            generarDatos();
         });

      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
      }});
}
getAllInfoDoctores();
let btnHorarios = {};
function generarDatos(){
      let btnVerMas = document.getElementsByClassName('btn-ver-mas');
      for (let i = 0; i < btnVerMas.length; i++) {
            btnVerMas[i].addEventListener('click', function(){

                  //eliminar botones de horarios
                  
                  btnHorarios = document.getElementsByClassName('btn-horarios-citas');
                  for (let j = 0; j < btnHorarios.length; j++) {
                        btnHorarios[j].classList.add('none');
                  }

                  idDoctor = btnVerMas[i].id;
                  console.log(idDoctor);

                  derechaFoto.src = "/recursos/pruebas/doctores/perfil/" + todosinfoDoctores.data[i].foto;
                  derechaNombre.textContent = todosDoctores[0]['data']['data'][i].nombre;
                  derechaEspecialidad.textContent = todosinfoDoctores.data[i].especialidad;
                  derechaDescripcion.textContent = "Descripción: " + todosinfoDoctores.data[i].Descripcion;
                  derechaPrecio.textContent = "$" + todosinfoDoctores.data[i].precioCons;
                  // derechaFecha.value = ;

                   //Obtener los horarios disponibles

                  horarioInicial = [];
                  horarioFinal = [];
                  horarioInicial.push(todosinfoDoctores.data[i].horario.split("/")[2]);
                  horarioFinal.push(todosinfoDoctores.data[i].horario.split("/")[3]);

                  for (let h = horarioInicial; h <= horarioFinal; h++) {
                        //Crear nuevos botones
                        let button = document.createElement('button');
                        button.classList.add('btn-horarios-citas'); 
                        button.textContent = h + ":00";
                        button.addEventListener('click', function(){
                              derechaHora = h + ":00";
                              console.log(derechaHora);
                              button.selected = true;
                              precioConsulta = todosinfoDoctores.data[i].precioCons;
                        });
                        document.getElementById("derechaHorarios").insertBefore(button, null); 
                  }
                  console.log("Horario inicial: " + horarioInicial);
                  console.log("Horario Final: " + horarioFinal);
                  //delete buttons
            });
      }
      
}


