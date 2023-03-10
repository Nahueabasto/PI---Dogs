import axios from "axios";
//LAS ACCIONES ASINCRONICAS EN REDUX SE CARACTERIZAN POR SER UN OBJETO DE JS QUE RETORNA UN TIPO DE ACCION, POR EL QUE SERÁ IDENTIFICADA Y QUE DEFINIRA POSTERIORMENTE EN EL REDUCER EL MODO EN EL QUE MODIFICARÁ EL ESTADO ASI COMO LA INFORMACION QUE TRAE, EN UN ESPACIO LLAMADO payload.
export const GET_DOGS = "GET_DOGS"; //traigo todos los perros
export const GET_DOGS_DETAILS = "GET_DOGS_DETAILS"; //muestro el detalle.
export const GET_BY_BREED = "GET_BY_BREED";//
export const ORDER_BY = "ORDER_BY";//
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";//filtra por temperamento.
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";//trae todos los temperamentos.
export const FILTER_BY_BREED = "FILTER_BY_BREED";
export const CREATE_DOG = "CREATE_DOG";
export const CLEAN = "CLEAN";
export const DELETE_DOG = "DELETE_DOG";

export function getDogs() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs"); //le paso la ruta que me trae todos los dogs
      return dispatch({
        type: GET_DOGS, //le paso el type
        payload: json.data, // y el patload
      });
    } catch (error) {
      alert(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {//va a dispatch la ruta del back que me trae los temperaments
    var json = await axios("http://localhost:3001/temperaments", {}); // esto devuelve un array de temperamentos
    return dispatch({
      type: GET_TEMPERAMENTS, 
      payload: json.data, // esto es lo que me devuelve la action
    });
  };
}

export function getDogsDetails(id) {
  console.log(id);
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs/${id}`);//espera la info de la api, la ruta del id
      return dispatch({
        type: GET_DOGS_DETAILS,
        payload: json.data[0] || json.data, //cuando lo tenga, me despacha la info que consiguio.
      });
    } catch (error) {
      alert(error);
    }
  };
}

//lo que hace es buscar el name. SearchBar, en la barra de busqueda
export function getDogByBreed(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs?name=${payload}`);//esto lo que hace es buscar por nombre
      return dispatch({
        type: GET_BY_BREED,
        payload: json.data,//me va a devolver lo que devuelva la ruta
      });
    } catch (error) {
      alert("Breed not found");
    }
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}

//<EJEMPLO A SEGUIR>
export function filterByTemperaments(payload) {//le paso un payload que va a ser el value que me va a llegar, lo que llega aca es basicamente lo que llega del componente
  return function (dispatch) {
    console.log(payload);
    dispatch({ type: FILTER_BY_TEMPERAMENTS, payload });
  };
}

export function filterByBreed(payload) {// el payload, el value que sea la opcion que elija
  return {
    type: FILTER_BY_BREED,
    payload,
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/dogs", payload);
      return dispatch({
        type: CREATE_DOG,
      });
    } catch (error) {
      alert("Post failed");
    }
  };
}

export function clean() {
  return {
    type: CLEAN,
  };
}


export function deleteDog(id){
  return async function(dispatch){
    try{
      const perro = await axios.delete(`http://localhost:3001/dogs/${id}`)
      return dispatch ({
        type: DELETE_DOG,
        payload: perro,
      });
    }catch(error){
      alert(error)
    }
  };
};
