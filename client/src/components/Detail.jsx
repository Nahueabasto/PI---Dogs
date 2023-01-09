import "./Detail.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogsDetails, clean } from "../Redux/dogsActions";//importo de actions
import loading from "../Fotos/loading.gif";

export default function Details(props) {

  const dispatch = useDispatch(); //para poder usar las acciones
  let dogsDetail = useSelector((state) => state.dogsDetails); // para poder usar el estado. Con el useSelector me traigo el detalle

  const { id } = useParams();
  console.log(id);
  
  // useEffect(() => {
  //     dispatch(getDogsDetails(props.match.params.id));//de esta forma accedo al id de ese detalle  
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getDogsDetails(id));//para acceder al id
    dispatch(clean());
  }, [dispatch, id]);


  return (
    <div className="background">
      <div className="detailsCss">
        
        {dogsDetail.length === 0 ? ( //si es igual a 0 renderizame
          <img src={loading} alt="Loading..." />
        ) : (
          <div className="detailsContainer">
            <div>
              <h2> {dogsDetail.name} </h2>
              <div className="img">
                <img src={dogsDetail.image ? dogsDetail.image : loading} />
              </div>
              {dogsDetail.temperaments ? <p> <b>Temperaments: </b> {dogsDetail.temperaments}.</p> : null}
              <div className="weightCss">
                <p> Weight: {dogsDetail.weight} </p>
              </div>
              <p className="heightCss"> Height: {dogsDetail.height} </p>
              <p className="lifeSpanCss"> Life Span: {dogsDetail.life_span} </p>
            </div>
            <Link to="/home">
              <button> Volver </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
