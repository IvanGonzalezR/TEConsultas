
btnIniciarSesion = document.getElementById("btnIniciarSesion");

btnIniciarSesion.addEventListener("click", function(event){
      event.preventDefault();
      let usuario = {};
      usuario.correo = document.getElementById("correo").value;
      usuario.password = document.getElementById("password").value;
      console.log(usuario);

      let radioSeleccionado = document.querySelector('input[name="tipoUsuario"]:checked');
      if(radioSeleccionado.value == "paciente"){
         iniciarSesionPaciente(usuario);
      }else{
         iniciarSesionDoctor(usuario);
      }
      
});

function iniciarSesionPaciente(usuario){
   const headers = {"Content-Type": "application/json",};
   axios.defaults.withCredentials = true;
   axios.post('http://localhost:3005/api/pacientes/login', usuario, {headers})
        .then(response => {
            console.log(response);
            localStorage.setItem("id", response.data.id);
            if(localStorage.getItem("primeraVez") == "true"){
                setTimeout( function() { window.location.href = "./consultas-paciente.html"; }, 1000 );
            }else{
            setTimeout( function() { window.location.href = "./consultas-paciente2.html"; }, 1000 );
            }

        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            alert("Usuario no encontrado");
        }else if(error.response.status === 402){
            alert("Contraseña incorrecta");
        }});
}

function iniciarSesionDoctor(usuario){
   const headers = {"Content-Type": "application/json",};
   axios.defaults.withCredentials = true;
   axios.post('http://localhost:3005/api/doctores/login', usuario, {headers})
        .then(response => {
            console.log(response);
            localStorage.setItem("id", response.data.id);
            if(localStorage.getItem("primeraVez") == "true"){
                setTimeout( function() { window.location.href = "./interfaz-medicos.html"; }, 1000 );
            }else{
                setTimeout( function() { window.location.href = "./interfaz-medicos2.html"; }, 1000 );
            }
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            alert("Doctor no encontrado");
         }else if(error.response.status === 402){
            alert("Contraseña incorrecta");
        }});
}

