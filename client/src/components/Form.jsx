import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getDogs } from "../Redux/dogsActions"; //getTemperaments, necesito esa action para traiga los temperaments, para que cuando le de elegir este 
import { Link, useHistory } from "react-router-dom";
import "./Form.css";
import axios from "axios";

const CreateDog = () => {
  const tempForm = useSelector((state) => state.temperaments); //para poder usar el estado.
  const dispatch = useDispatch(); //para poder usar las acciones.
  //para crear mi dogs tiene que haber renderizado en la pagina el formulario y ese formulario lo voy a poder guardar en un estado:
  const [create, setCreate] = useState(false);
  const initialState = {
    name: "",
    heightmin: "",
    heightmax: "",
    weightmin: "",
    weightmax: "",
    life_spanmin: "",
    life_spanmax: "",
    temperaments: [],//lo guardo en un array porque le voy a meter mas de una
    image: "",
  };
  const [errors, setErrors] = useState({ form: "complete form" }); //estado local de errors, va a hacer un obj con complete form
  const [completed, setCompleted] = useState(initialState); //el estado local
  const history = useHistory(); 

  const finalForm = {
    name: completed.name,
    height: `${completed.heightmin} - ${completed.heightmax}`,
    weight: `${completed.weightmin} - ${completed.weightmax}`,
    life_span: `${completed.life_spanmin} - ${completed.life_spanmax} years`,
    temperament: completed.temperaments.map((item) => item.id),
    image: completed.image,
  };

  let orderedTemperaments = tempForm.sort(function(a, b){
    if(a.name > b.name){
      return 1;
    }
    if(b.name > a.name){
      return - 1
    }
    return 0;
  });

  useEffect(() => {//aca hago un useEffect de del dispatch de la accion de temperament porque voy a necesitar renderizarlas, hacemos un dispatch de getTemperaments
    if (tempForm.length === 0) return dispatch(getTemperaments());
  }, [tempForm.length, dispatch]);

  const validate = (completed) => {//me creo una funcion de validadora, completed es mi estado local
    let errors = {}; //me genero un objeto errores
    if (!completed.name) { //si en mi estado local.name no hay nada 
      errors.name = "Dog Name is required"; //entonces en mi objeto errors.name pongo un string que diga: "Dog Name is required"
    }
    if (completed.name.length < 3) { //si en mi estado local.name.length es menor a 3
      errors.name = "Dog Name must have at least 3 characters"; //El nombre del perro debe tener al menos 3 caracteres
    }
    if (!completed.heightmin || !completed.heightmax) {
      errors.height = "Dog height is required";
    }
    if (parseInt(completed.heightmax) <= parseInt(completed.heightmin)) {
      errors.height = "Height-max must be highter than height-min"; //Height-max debe ser más alto que height-min
    }
    if (!completed.weightmin || !completed.weightmax) {
      errors.weight = "Dog weight is required"; //Se requiere el peso del perro.
    }
    if (parseInt(completed.weightmax) <= parseInt(completed.weightmin)) {
      errors.weight = "Weight-max must be highter than weight-min";//El peso máximo debe ser mayor que el peso mínimo
    }
    if (!completed.life_spanmin || !completed.life_spanmax) {
      errors.life_span = "Dog life span is required"; //Se requiere vida útil del perro
    }
    if (parseInt(completed.life_spanmax) <= parseInt(completed.life_spanmin)) {
      errors.life_span = "Life span-max must be highter than life span-min";//La vida útil máxima debe ser más alta que la vida útil mínima
    }
    if (completed.temperaments.length === 0) {
      errors.temperaments = "Temperaments are required"; //Se requieren temperamentos
    }
    if (completed.life_spanmax < 0 || completed.life_spanmin < 0) {
      errors.life_span = "Value must be highter than 0"; //El valor debe ser mayor que 0
    }
    if (completed.weightmax < 0 || completed.weightmin < 0) {
      errors.weight = "Value must be highter than 0"; //El valor debe ser mayor que 0
    }
    if (completed.heightmax < 0 || completed.heightmin < 0) {
      errors.height = "Value must be highter than 0";//El valor debe ser mayor que 0
    }

    return errors;
  };

  const handleChange = (e) => { //va a ir manejando cada vez que cambien o se modidifique el completed
    //lo que quiero es ir guardando las cosas que el usuario va escribiendo en el input 
    setCompleted({ ...completed, [e.target.name]: e.target.value }); //cada vez que modifiques esta funcion, a mi estado setCompleted, ademas de lo que tiene agregale el target value de lo que este modificando. la idea es que a medida que vaya modificabdo me vaya llenando el estado name: "",
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
    console.log(completed) //estado
  };

  const handleTemperaments = (e) => {
    if (
      !completed.temperaments.includes(
        tempForm.find((item) => item.name === e.target.value)
      )
    ) {
      completed.temperaments.push(
        tempForm.find((item) => item.name === e.target.value)
      );
    }

    setErrors( //seteame mi estado errores, pasandole la funcion validate que hice arriba, con el estado completed y el [e.target.name]: en el e.target.value,
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.values(errors).length === 0) {
      axios.post("http://localhost:3001/dogs", finalForm);
      setCreate(!create);
      setCompleted(initialState);
      alert("Dog created successfully"); 
      history.push("/home"); 
      dispatch(getDogs());
    } else {
      alert("Please fill all the fields");
    }
  };

  function handleDelete(name) {
    setCompleted({ //seteo el completed 
      ...completed, //el completed que tiene todo y no quiero que se vaya
      temperaments: completed.temperaments.filter((item) => item.name !== name), //a temperaments le digo, filtramelo por todo lo que no sea ese elemento. Va a agarrar y me va a devolver el estado nuevo sin ese elemento que yo clickee
    });
  }

  return (
    <div className="backgroundForm">
      <div>
        <div className="formCss">
          <div className="formTitle">
            <h1>Create your own dog!</h1>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label> Name: </label>
            <input
              type="text"
              name="name"
              value={completed.name}
              onChange={(e) => handleChange(e)}//name
            />
            {errors.name && <p>{errors.name}</p>}

            <div className="lifeSpan">
              <p>
                <label> Life span: </label>
                <input
                  className="inputLife"
                  type="number"
                  min="1"
                  max="25"
                  name="life_spanmin"
                  placeholder="Min"
                  value={completed.life_spanmin}
                  onChange={(e) => handleChange(e)}//life span
                />

                <input
                  className="inputLife"
                  type="number"
                  min="1"
                  max="25"
                  name="life_spanmax"
                  placeholder="Max"
                  value={completed.life_spanmax}
                  onChange={(e) => handleChange(e)}//life span
                />
              </p>
              <p>
                {errors.life_span ? <label>{errors.life_span}</label> : null}
              </p>
            </div>

            <p>
              <label> Weight: </label>
              <input
                type="number"
                name="weightmin"
                min="1"
                placeholder="Min"
                value={completed.weightmin}
                onChange={(e) => handleChange(e)}//weight
              />

              <input
                type="number"
                name="weightmax"
                max="100"
                placeholder="Max"
                value={completed.weightmax}
                onChange={(e) => handleChange(e)}//weight
              />
            </p>
            <p>{errors.weight ? <label>{errors.weight}</label> : null}</p>

            <p>
              <label> Height "CM": </label>
              <input
                type="number"
                name="heightmin"
                min="10"
                placeholder="Min"
                value={completed.heightmin}
                onChange={(e) => handleChange(e)}//height
              />

              <input
                type="number"
                name="heightmax"
                max="80"
                placeholder="Max"
                value={completed.heightmax}
                onChange={(e) => handleChange(e)}//height
              />
            </p>
            <p>{errors.height ? <label>{errors.height}</label> : null}</p>

            <label> Image: </label>
            <input
              className="inputImg"
              type="url"
              name="image"
              value={completed.image}
              onChange={(e) => handleChange(e)}//image
            />

            <div>
              <label> Temperaments: </label>
              <select
                className="inputTemp"
                value={completed.temperaments} //completed es mi estado que va a tener todas los temparaments
                onChange={(e) => handleTemperaments(e)}
              >
                {orderedTemperaments?.map((el) => ( //le paso el name para acceder al nombre y en el ultimo {el.name} le paso name para que renderice 
                  <option key={el.id} value={el.name}>
                    {el.name} 
                  </option>
                ))}
              </select>
              <p>
                {errors.temperaments ? (
                  <label>{errors.temperaments}</label>
                ) : null}
              </p>
            </div>

            <div className="temperaments">
              {completed.temperaments?.map((item) => ( //el estado local completed va a tener todos los temperaments //la funcion handleDelete va borrar el elemento que este clicleando
                <div key={item.id}>
                  {item.name}{" "}
                  <button onClick={() => handleDelete(item.name)}>x</button>
                </div>
              ))}
            </div>
            <Link to="/home">
              <button className="goBackButton">
                <p> Volver </p>
              </button>
            </Link>
            <button className="submitButton" type="submit">
              <p> Submit </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDog;