
export function getInfoPaciente(id_paciente){
   const headers2 = {"Content-Type": "application/json",};
   return axios.post("http://localhost:3005/api/infoPacientes/get", id_paciente, headers2)
      .then(response => {

         return response.data;
      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
}})};