import {
    GET_DOGS,
    GET_BY_BREED,
    GET_DOGS_DETAILS,
    ORDER_BY,
    FILTER_BY_TEMPERAMENTS,
    GET_TEMPERAMENTS,
    FILTER_BY_BREED,
    CLEAN,
    CREATE_DOG,
    DELETE_DOG,
  } from "./dogsActions";
  
  const initialState = { //estado inicial
    dogs: [],
    filtered: [], //a este estado lo tengo de soporte para que siempre tenga todo
    dogsDetails: [],
    temperaments: [],
  };
  
  //armamos la logica en el reducer:
  export default function reducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_DOGS:
        return {
          ...state, //stado
          dogs: action.payload, // esto es lo que me devuelve la action. Manda todo lo que te mande la accion getDogs
          filtered: action.payload,// en este estado nuevo (filtered) que me guarde todos los dogs. Cuandp se dispare esta accion me va a llenar los dos estados (filtered) y (dogs)
        };
  
        //SearchBar, 
      case GET_BY_BREED:
        return {
          ...state, //devolveme el estado
          dogs: action.payload, //dogs, porque es el arreglo que estoy renderizando
        };
  
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload, //lo guardo en un nuevo array, un estado que se va a llamar temperaments
        };
  
      case GET_DOGS_DETAILS:
        return {
          ...state,
          dogsDetails: action.payload,//lo meto en un nuevo estado
        };
      case CLEAN: //limpio
        return {
          ...state,
          dogsDetails: [],//meto en ese estado
        };
      
      case DELETE_DOG:
        return{
          ...state,
          filtered: state.filtered.filter((e) => e.id !== action.payload)
        }
  
  
      //basicamente lo que va haciendo el sort es comparando dos valores, en esta caso queremos aseder al name, el sort va a comparando y ir poniendo a la derecha o a la izq, antes o despues en el array dependiendo si son mas grandes o mas chicos
  
      case ORDER_BY:
        if (action.payload === "default") {
          // si el payload es default, entonces que me devuelva el estado inicial
          return {
            ...state,
            dogs: state.dogs, // esto es lo que me devuelve la action
          };
        }
        if (action.payload === "az") {
          // si el payload es az, entonces que me devuelva el estado inicial
          return {
            ...state,
            dogs: state.dogs.sort(function (a, b) {
              // ordena de la A a la Z
              if (a.name > b.name) {
                // si el nombre de a es mayor que el de b
                return 1; // entonces que me devuelva 1 para que se ordene de la A a la Z.
              }
              if (b.name > a.name) {
                // si el nombre de b es mayor que el de a
                return -1; // tiene que devolver -1  para que se ordene de la Z a la A
              }
              return 0; // si son iguales lo deja como esta
            }),
          };
        }
        if (action.payload === "za") {
          return {
            ...state,
            dogs: state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            }),
          };
        }
        if (action.payload === "asc") {
          return {
            ...state,
            dogs: state.dogs.sort(function (a, b) {
              if (a.weight > b.weight) {
                return 1;
              }
              if (b.weight > a.weight) {
                return -1;
              }
              return 0;
            }),
          };
        }
        if (action.payload === "desc") {
          return {
            ...state,
            dogs: state.dogs.sort(function (a, b) {
              if (a.weight > b.weight) {
                return -1;
              }
              if (b.weight > a.weight) {
                return 1;
              }
              return 0;
            }),
          };
        } else {
          return {
            ...state,
          };
        }
  
        //<EJEMPLO A SEGUIR>
  
        //hacemos una const que se llame allDogs que es lo que yo quiero filtrar
      case FILTER_BY_TEMPERAMENTS:
        const allDogs = state.filtered; //CUANDO VOS FILTRES SIEMPRE VAN A SER EL ARREGLO QUE TIENE TODOS (state.filtered) // acabo de crear una variable que contiene a todos los perros, accedo a eso en el reducer desde state.filtered, desde el estado
        const temperamentFilter = action.payload === "All" ? allDogs : allDogs.filter((e) => e.temperaments?.includes(action.payload)); //si tiene todos devolveme todos, sino devolveme todos los dogs filtrados 
        return {
          ...state, //devuevlo el estado concatenado 
          dogs: temperamentFilter, //aca en dogs le devuevlo esta const. Cuando vuelva a hacer otro filtro va a volver a agarrar filtered (que es el que tiene todos). pero el que va a modificar va a ser el estado dogs
        };
     
  
      case FILTER_BY_BREED:
        if (action.payload === "created") { //
          if (
            state.filtered.filter((item) => typeof item.id === "string")
              .length === 0
          ) {
            return alert("no dog");
          }
          return {
            ...state,
            dogs: state.filtered?.filter((item) => typeof item.id === "string"),
          };
        } else {
          return {
            ...state,
            dogs: state.filtered.filter((item) => typeof item.id === "number"),
          };
        }
  
        //en este caso devolveme el estado como esta, porque voy a crearlo en un ruta nueva
      case CREATE_DOG:
        return {
          ...state, // retorna el estado inicial
        };
  
  
      default: // si no es ninguna de las anteriores, entonces que me devuelva el estado inicial
        return { ...state }; // aca me devuelve el estado inicial
    }
  
   };