import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByBreed } from "../Redux/dogsActions"; //me importo el getDogByBreed de las actions
import "./SearchBar.css";

//uso hooks
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); //hacemos el estado local. useState("") lo seteo en un string vacio

  //tengo que guardar en mi estado local lo que vaya apareciendo en el input
  //estada funcion va a tomar el value del input va a tomar el value de state
  //PASO ESTA FUNCION EN EL INPUT
  function handleInputChange(e) {//esta funcion va a tener un preventDefault
    e.preventDefault();
    setName(e.target.value); //seteo el setName en setName(e.target.value)
    console.log(name); //para ver como se va modificando 
  }

  //PARA EL BOTON:
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogByBreed(name)); //dispatch la action y le paso el name, el name va a ser mi estado local, voy a ir guardando lo que esta escribiendo mi usuario en mi estado local name.
  }
  //   if (!name.length || name.charAt(0) === " ") {
  //     //si no hay nada en el input o un espacio.
  //     return alert("Please insert a valid name."); //no hace nada
  //   } else {
  //     dispatch(getDogByBreed(name)); //si hay algo en el input, hace el dispatch con el valor del input
  //     setName("");
  //   }
  // }

  return (
    <div>
      <input //tengo un input
        className="breedInputCss"
        type="text" //aca lo que voy a agregar es un text
        placeholder="Dog's breed goes here" //para que se vea en el fondo transparente  
        value={name}
        onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : null)} //
        onChange={(e) => {
          handleInputChange(e); //paso la funcion
        }}
      />
      <button //boton 
        type="submit" //type de tipo submit
        className="breedButtonCss"
        onClick={(e) => {
          handleSubmit(e);//la del boton
        }}
      >
       {" "}
        Submit{" "}
      </button>
    </div>
  );
}
