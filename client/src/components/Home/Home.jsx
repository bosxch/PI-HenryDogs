import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";

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
  const dogs = useSelector((state) => state.dogs); 
  const temps = useSelector((state) => state.temps);
  

  //*---------------------PAGINADO ---------------------Estados locales..
  const [currentPage, setCurrentPage] = useState(1); 
  const [ orden , setOrden] = useState(""); 
  const [dogsXPage] = useState(8); 
  const iLastDog = currentPage * dogsXPage; 
  const iFirstDog = iLastDog - dogsXPage; 
  const currentDogs = dogs.slice(iFirstDog, iLastDog); 
  const currentPages = dogs.length / dogsXPage;

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    const nextPage = () => {
      if (currentPages > currentPage) setCurrentPage(currentPage + 1);
      console.log(currentPages)
    };
  
    const previousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
 
  //*--------------------------------------------------------------------

  useEffect(() => {
    dispatch(getDogos());
    dispatch(getTemps());
  }, [dispatch]);



//---------------------------Handles-------------------------------------
  
  function handleClick(e) {
    e.preventDefault(); 
    dispatch(getDogos()); 
    setCurrentPage(1);
  }
  function handleFilter(e) {
    e.preventDefault();
    dispatch(filterBy(e.target.value)); 
    setCurrentPage(1); 
    setOrden(`Ordenado ${e.target.value}`); //
  }
  function handleFilterByWeigth(e) {
    e.preventDefault();
    dispatch(filterByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  /*
  function handleFilterByApi_DB(e) {
    e.preventDefault();
    dispatch(filterByApi_DB(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  */
  function handleFilterByTemps(e) {
    e.preventDefault();
    dispatch(filterByTemps(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  const prev = '<<'
  const next = '>>'
//-----------------------------------------------------------------------
  return (
    <div className={style.all}>
      <NavBar/>

      
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
          defaultValue="temp"
          onChange={(e) => handleFilterByTemps(e)}
        >
          <option hidden>By Temperament</option>
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
        {/*
         <select
          className={style.filters}
          onChange={(e) => handleFilterByApi_DB(e)}
        >
          <option hidden>By Origin</option>
          <option value="api">Api</option>
          <option value="db">DataBase</option>
        </select> 
        */}
       
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
      <div className={style.pagination}>
        {currentPage === 1 ? 
        <button onClick={previousPage} className={style.oculto}>
        {prev}
      </button>
        :
        <button onClick={previousPage} className={style.prev}>
        {prev}
      </button>
        }
      <Paginado className={style.paginado} dogsXPage={dogsXPage} dogs={dogs.length} paginado={paginado} currentPage={currentPage} />
      {currentPages === currentPage || currentPages < currentPage? 
       <button onClick={nextPage} className={style.oculto}>
       {next}
     </button>
      :
      <button onClick={nextPage} className={style.next}>
      {next}
    </button>
      }
        </div>
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
    </div>
  );
}
