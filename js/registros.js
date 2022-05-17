let esDoctor = false;

const clicked = function(elem){
    document.getElementById(elem).style.backgroundColor = "#495057";
}

const notClicked = function(elem){
    document.getElementById(elem).style.backgroundColor = "#030419";
}

//Por default el boton 'PACIENTE' esta coloreado (seleccionado)
clicked("paciente");

document.getElementById("doctor").addEventListener("click", function(event){
    event.preventDefault();
    clicked("doctor");
    notClicked("paciente");
    esDoctor = true;

    if(!document.getElementById("cedula")){
        const inpCedula = document.createElement("input");
        inpCedula.type = "text";
        inpCedula.placeholder = "CEDULA";
        inpCedula.name = "cedula";
        inpCedula.id = "cedula";

        const inputs = document.querySelector(".inputs");
        inputs.insertAdjacentElement("beforeend", inpCedula);
    }
});

document.getElementById("paciente").addEventListener("click", function(event){
    event.preventDefault();
    clicked("paciente");
    notClicked("doctor");
    esDoctor = false;

    if(document.getElementById("cedula")){
        const inputs = document.querySelector(".inputs");
        const inpCedula = inputs.querySelector("#cedula");
        inputs.removeChild(inpCedula);
    }
});

crearCuenta = document.getElementById("crearCuentaBtn");
crearCuenta.addEventListener("click", function(event){
    event.preventDefault();
    let paciente = {};
    // Obtener datos del formulario
    if(!esDoctor){
        paciente.nombre = document.getElementById("nombre").value;
        paciente.correo = document.getElementById("correo").value;
        paciente.password = document.getElementById("contrasena").value;
        console.log(paciente);
        crearPaciente(paciente);
    }else{
        paciente.nombre = document.getElementById("nombre").value;
        paciente.correo = document.getElementById("correo").value;
        paciente.password = document.getElementById("contrasena").value;
        paciente.cedula = document.getElementById("cedula").value;
        console.log(paciente);
        crearDoctor(paciente);
    }
});

function crearPaciente(paciente){
    const headers = {"Content-Type": "application/json",};
    axios.post('http://localhost:3005/api/pacientes/registro', paciente, {headers})
        .then(response => {
            console.log(response);
            alert("Usuario registrado con exito");
            localStorage.setItem("primeraVez", "true");
            setTimeout( function() { window.location.href = "./login.html"; }, 1000 );
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            alert("El correo ya esta registrado");
        }});
}

function crearDoctor(doctor){
    const headers = {"Content-Type": "application/json",};
    axios.post('http://localhost:3005/api/doctores/registro', doctor, {headers})
        .then(response => {
            console.log(response);
            alert("Doctor registrado con exito");
            localStorage.setItem("primeraVez", "true");
            setTimeout( function() { window.location.href = "./login.html"; }, 1000 );
        })
        .catch(error => {console.error(error)
        if (error.response.status === 401){
            alert("El correo ya esta registrado");
        }});
}