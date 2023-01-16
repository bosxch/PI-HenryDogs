import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//-------LINKS------
import { Link } from "react-router-dom";

//----COMPONENTS----
import DogCards from "../DogCards/DogCards";
import Paginado from "../Paginado/Paginado";

//-----ACTIONS----
import {
  getDogos,
  getTemps,
  filterBy,
  filterByWeight,
  filterByApi_DB,
  filterByTemps,
} from "../../Redux/actions/appActions";

//-----AUX DATA-----
import style from "./Home.module.css";
import Logo from "./img/reload.png";

//*--------------------------FUNCTION HOME-------------------------------

export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs); //? SELECTOR DECLARACION DE ESTADO EN dogs
  const temps = useSelector((state) => state.temps);
  

  //*---------------------PAGINADO ---------------------Estados locales..
  const [currentPage, setCurrentPage] = useState(1); //Inicializo en 1 la pag
  const [ /* orden */, setOrden] = useState(""); //Arranca vacio seteo en dicha pag luego de hacer dispatch
  const [dogsXPage, /* setDogsXPage */] = useState(8); //cant de perros x pagina
  const iLastDog = currentPage * dogsXPage; // index ultimo perro
  const iFirstDog = iLastDog - dogsXPage; //index primer dog de esa pag
  const currentDogs = dogs.slice(iFirstDog, iLastDog); //lo que tengo que renderizar

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //*--------------------------------------------------------------------

  //Es un hook que corre despues de la funcion de renderizado, puede ser disparado con ciertas dependencias
  useEffect(() => {
    dispatch(getDogos());
    dispatch(getTemps());
  }, [dispatch]);

  /* useEffect(()=>{
  },[]) */


//---------------------------Handles-------------------------------------
  //Los handles los utilizo para manejar acciones de botones, filtros y buscadores
  function handleClick(e) {
    e.preventDefault(); //Para que no recarge la pagina
    dispatch(getDogos()); //Hago el Get con cada click
  }
  function handleFilter(e) {
    e.preventDefault();
    dispatch(filterBy(e.target.value)); //Despacho el value de lo target
    setCurrentPage(1); // Para que renderice el status tengo que setear la pagina en 1
    setOrden(`Ordenado ${e.target.value}`); //
  }
  function handleFilterByWeigth(e) {
    e.preventDefault();
    dispatch(filterByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleFilterByApi_DB(e) {
    e.preventDefault();
    dispatch(filterByApi_DB(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleFilterByTemps(e) {
    e.preventDefault();
    dispatch(filterByTemps(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
//-----------------------------------------------------------------------
  return (
    <div className={style.all}>

      
      {/* --------------------------BY NAME------------------------- */}
      <div className={style.filters}>
        <select className={style.filters} onChange={(e) => handleFilter(e)}>
          <option hidden>By Name</option>
          <option value="asc">By A-Z</option>
          <option value="desc">By Z-A</option>
        </select>
        {/* -----------------------BY TEMP-------------------------- */}
        <select
          className={style.filters}
          onChange={(e) => handleFilterByTemps(e)}
        >
          <option disabled selected defaultValue>By Temperament</option>
          <option key={1+'e'} value='All'>All</option>
          {temps.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {/* ----------------------BY WEIGHT-------------------------- */}
        <select
          className={style.filters}
          onChange={(e) => handleFilterByWeigth(e)}
        >
          <option hidden>By Weight</option>
          <option value="maxWeight">Max-Min</option>
          <option value="minWeight">Min-Max</option>
        </select>
        {/* ----------------------API/DB----------------------------- */}
        <select
          className={style.filters}
          onChange={(e) => handleFilterByApi_DB(e)}
        >
          <option hidden>Api o DataBase</option>
          <option value="api">Api</option>
          <option value="db">DataBase</option>
        </select>
        {/* ----------------------RELOAD----------------------------- */}
        <button
            className={style.refreshButton}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <img className={style.logo} src={Logo} alt="reload_BTN" />
          </button>
       
      </div>
      {/* ----------------------RENDER CARDS------------------------- */}
      <div className={style.cards}>
        {currentDogs?.map(
          (
            e
          ) => (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/dogs/${e.id}`}
              key={e.id}
            >
              <DogCards
                key={e.id}
                temperament={
                  e.temperament || e.Temperamentos?.map((e) => e.name + " ")
                }
                weightMin={e.weightMin}
                weightMax={e.weightMax}
                name={e.name}
                image={e.image}
              />
            </Link>
          )
        )}
      </div>
      {/* ---------------------RENDER PAG---------------------------- */}
      <Paginado dogsXPage={dogsXPage} dogs={dogs.length} paginado={paginado} />
    </div>
  );
}
