
export function getAllConsultasAxios(id_usuario){
   const headers2 = {"Content-Type": "application/json",};
   return axios.post("http://localhost:3005/api/consultas/getAllConsultas", id_usuario, headers2)
      .then(response => {

         return response.data;
      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
}})};

export function getAllConsultasMedicosAxios(id_doctor){
   const headers2 = {"Content-Type": "application/json",};
   return axios.post("http://localhost:3005/api/consultas/getAllConsultasMedicos", id_doctor, headers2)
      .then(response => {   

         return response.data;
      })
      .catch(error => {console.error(error)
      if (error.response.status === 401){
         // alert("El correo ya esta registrado");
}})};

// export default { getAllConsultasAxios, getAllConsultasMedicosAxios };