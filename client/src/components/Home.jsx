import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  orderBy,
  filterByTemperaments,
  getTemperaments,
  filterByBreed, 

} from "../Redux/dogsActions"; //importo la actions
import Card from "./Card"; //importo el componente card
import "./Home.css";
import Pagination from "./Pagination"; //me importo el paginado
import SearchBar from "./SearchBar"; //importo el searchbar y lo renderizo.
import loading from "../Fotos/loading.gif";


//que es lo que me tengo que traer del back primero para para hacer toda la logica de la barra de busqueda? la ruta que le pega a dogs, me voy a actions a hacer la logica

export default function Home() {
  //esta funcion es la que se encarga de renderizar el componente Home

  //lo primero para el paginado es crearnos varios estados locales


  const dispatch = useDispatch(); //para poder usar las acciones
  const allDogs = useSelector((state) => state.dogs); //con useSelector traeme en esa const (allDogs) todo lo que esta en el estado de dogs.
  
  const temperaments = useSelector((state) => state.temperaments); // para poder usar el estado
  const [, setOrder] = useState("All"); //estado para el ordenamiento
  const [, setBreeds] = useState("All"); //aca lo uso para filtrar por raza

  let orderedTemperaments = temperaments.sort(function(a, b){//para ordenar el forma alfabetica
    if(a.name > b.name){
      return 1;
    }
    if(b.name > a.name){
      return - 1
    }
    return 0;
  });

  //pag
  const [currentPage, setCurrentPage] = useState(1); //aca paso (1) para que empiece en la pagina 1
  const [dogsPerPage] = useState(8); //aca paso (8) para que muestre 8 perros por pagina
  const indexOfLastDog = currentPage * dogsPerPage; //indix del ulitmo dogs//aca calculo el ultimo perro de la pagina y esto va a ser la pag actual en la que estoy con la cantidad de dogs por pagina, en este momento vale 8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //aca calculo el primer perro de la pagina, me va a dar 0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //aca calculo los perros que se van a mostrar en la pagina. aca voy a guardar todos los dogs que voy a tener en cada pagina. slice, agarra un array y toma una porcion depentiendo de lo que le estoy pasando por parametro. por parametro le paso el index del primer personaje y el index del ultimo personaje. Entonces voy a agarrar el arreglo de todo. le voy a decir que me devuelva el indix desde el 0 hasta el 8

  //pag 1------ 0------ 8
  //pag 2------9---------
  const [temperament, setTemperament] = useState("All"); //aca lo uso para filtrar por temperamento

  const pagination = (currentPageNumber) => { //le paso un numero de la pagina
  
    setCurrentPage(currentPageNumber); //esto es para que cuando cambie de pagina se actualice //SETEO LA PAGINA EN ESE NUMERO DE PAGINA
  };

  useEffect(() => {
    //aca uso el useEffect para que cuando se renderice la pagina se ejecute la accion
    setCurrentPage(1); //esto es para que cuando cambie de pagina se actualice
  }, [allDogs]); //aca le paso el estado para que se ejecute cuando cambie


  //aca uso la accion para traer los perros:
  useEffect(() => {
    if (allDogs.length === 0) {
      dispatch(getDogs()); //aca uso la accion para traer los perros
      dispatch(getTemperaments()); //aca uso la accion para traer los temperamentos
    }
  }, [dispatch, allDogs.length]); //mientra tenga dispatcha que lo haga

  //----------------
  function handleClick(e) {
    
    e.preventDefault(); //aca uso el preventDefault para que no se recargue la pagina
    dispatch(getDogs());
  }

  function handleSort(e) {
    //aca uso la funcion para ordenar
    // e.preventDefault();
    dispatch(orderBy(e.target.value)); //aca uso la accion para ordenar
    setCurrentPage(1); //setea en la pagina //esto es para que cuando cambie de pagina se actualice
    setOrder(e.target.value); //setorder para que se actualice el estado. ES UN ESTADO LOCAL QUE ESTA ARRIBA, a ese estado local modificamelo para que desde el front me haga el ordenamiento
  }

  //<EJEMPLO A SEGUIR>
  function handleFilterByTemp(e) { //esta funcion es la que le voy a pasar en el select, le voy a decir cuandp voy te modifiques ejecutame esta funcion.
    //aca uso la funcion para filtrar por temperamento
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value)); //dispatch la action que creamos eb el actions que se llama filterByTemperaments y le paso . accesdo al valor de cada una de las opciones con el e.target.value, se va a ejecutar y va a tomar como payload la actions el valor de cada uno de estos dependiendo que clickea el usuario.
    setCurrentPage(1);
    setTemperament(e.target.value);
  }

  function handleFilterByBreed(e) {
    e.preventDefault();
    dispatch(filterByBreed(e.target.value));
    setCurrentPage(1);
    setBreeds(e.target.value);
  }




  //para agregarle una logica al filtrado me voy a las accions 


  
//<img src={imagen} alt="img" />
  return (
    <div className="homeDiv">
      <div className="welcome">
      
        
      </div>
      <div>
     
        <button
          className="refBtn"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh
        </button>
      </div>
      <div className="searchBar">
        <SearchBar />
      </div>
      <div>
        <Link to="/home/form">
          <button className="createButton" type="button">
            Create Dog!
          </button>
        </Link>
      </div>
      <div>
        <select className="filterBy" onChange={(e) => handleSort(e)}>
          <option value="default"> Sort by.. </option>
          <option value="az"> A-Z</option>
          <option value="za"> Z-A </option>
          <option value="asc"> Lightest </option>
          <option value="desc"> Heaviest </option>
        </select>
      </div>

      
      <div>
        <select
          className="filterTemps"
          value={temperament}           //<EJEMPLO A SEGUIR>
          onChange={(e) => handleFilterByTemp(e)}//aca uso la funcion para filtrar por temperamento
        >
          <option value="All"> All temperaments </option>
          {orderedTemperaments?.map((temp, index) => (  
            <option onClick={(e) => handleClick(e)} key={index}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          className="filterBreeds" 
          onChange={(e) => {
            handleFilterByBreed(e);
          }}
        >
          <option value="all">Breeds</option>
          <option value="created">Created Breeds</option>
          <option value="api"> Api Breeds</option>
        </select>
      </div>

      <div className="Pagination">
        <Pagination //le digo traeme el paginado y pasale el estado que tengo arriba dogsPerPage. Estas son las props que necesita el componente pagination para funcionar:
          dogsPerPage={dogsPerPage} //
          allDogs={allDogs.length} //le paso mi estado allDogs, porque necesito un valor numerico
          pagination={pagination} //como paginado le paso la const pagination
          currentPage={currentPage}
        />
      </div>

      {currentDogs.length === 0 ? (
        <div>
          {<img className="loadingGif" src={loading} alt="Loading..." />}
        </div>
      ) : (
        <div className="CardContainer">
          {currentDogs?.map((e) => { //pregunto si hay currentDogs, es el que tiene todos los dogs
            return (
              <div key={e.id}>
                <Card //paso mi componente card, lo que hago aca es traerme las propiedades del componente card, ese componente ya se trajo al estado global
                  id={e.id}
                  name={e.name}//le paso como prop el elemento name
                  image={e.image}
                  temperament={e.temperaments?.join(", ")}
                  weight={e.weight}
                  height={e.height}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

//image={e.image ? e.image : <image src= 'url...' } //hay e.image, entonces renderizamela, y sino renderizame, imagen por default
