import React from "react";
import "./Pagination.css";

export default function Pagination({ //ESTO ACA ME LLEGA DEL OTRO COMPONENTE
dogsPerPage,//cantidad de dogs por pagina
currentPage,//pagina actual
allDogs,//todos los dogs
pagination,//const paginado
}) {
const pageNumbers = []; //va a ser igual a un arreglo vacio

  //DIVIDO TODOS LOS DOGS (allDogs) POR LOS DOGS POR PAGINA QUE YO QUIERO (dogsPerPage)
for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) { //math redondea para arriba, redondea todos los dogs sobre la cantidad de dogs que quiero por pagina
  pageNumbers.push(i); //ACA PUSHEO ESOS NUMEROS AL pegeNumbers
}
// if (currentPage === pageNumbers.length + 1) {
//   pagination(1);
// }

return ( //este componente va a ser el que renderice los numeritos en si
  <nav className="btnPag">
    <button
      onClick={() =>
        pagination(currentPage === 1 ? pageNumbers.length : currentPage - 1) 
      }
    >
      «{" "}
    </button>

    {pageNumbers &&
      pageNumbers.map((number) => ( //si tiene algo, le paso un number y le paso un link en cuando le hago click le voy a pasar mi paginado que es la const que declare en el otro componente (home) y le paso number, el numero de paginas. Despues de eso voy a renderizar mi number
        <button key={number} onClick={() => pagination(number)}>
          {currentPage === number ? <b>{number}</b> : number} 
        </button>
      ))}
    {/* <button
      onClick={() =>
        pagination(currentPage === 0 ? currentPage : currentPage + 1)
      }
    >
      »{" "}
    </button> */}
  </nav>
);
}