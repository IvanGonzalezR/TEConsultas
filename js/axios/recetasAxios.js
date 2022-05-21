
export function crearReceta(receta){
      const headers = {"Content-Type": "application/json",};
      return axios.post("http://localhost:3005/api/recetas/crearReceta", receta, headers)
         .then(response => {
            // return response.data;
            alert("Receta mandada con exito");
         })
         .catch(error => {console.error(error)
         if (error.response.status === 401){
            // alert("El correo ya esta registrado");
}})}

export function getReceta(idDoctor){
      const headers = {"Content-Type": "application/json",};
      return axios.post("http://localhost:3005/api/recetas/get", idDoctor, headers)
         .then(response => {
            return response.data;
            // alert("Receta recuperada con exito");
         })
         .catch(error => {console.error(error)
         if (error.response.status === 401){
            // alert("El correo ya esta registrado");
}})}