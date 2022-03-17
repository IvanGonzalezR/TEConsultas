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

    if(document.getElementById("cedula")){
        const inputs = document.querySelector(".inputs");
        const inpCedula = inputs.querySelector("#cedula");
        inputs.removeChild(inpCedula);
    }
});