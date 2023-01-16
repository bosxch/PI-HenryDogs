import React from "react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName, getDogos } from "../../Redux/actions/appActions";

import style from "./NavBar.module.css";
import Logo from "./img/Logo.png";

export default function NavBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogsName(name));
    setName({
      name: "",
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogos(e));
  };

  return (
    <div className={style.backimg}>
      <div className={style.components}>
        <div className={style.NavBar}>
        <Link to="/">
                  <button className={style.logo}   src={Logo}
              alt="logoIMG">BEST FRIEND FINDER</button> 
            </Link>
           
    
        

          <form className={style.searchBar}>
            <input
              className={style.input}
              onChange={(e) => handleInput(e)}
              placeholder="Busca tu perro..."
              maxLength="30"
            />

            <input
              onClick={(e) => handleInputSubmit(e)}
              className={style.submit}
              type="submit"
              value="Search!"
            />
          </form>

          <Link to="/createDog">
            <button className={style.creaPerro}>Crea tu perro!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
