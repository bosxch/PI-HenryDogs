import React from "react";
import { useHistory } from 'react-router-dom'
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
  let history = useHistory ();
  const handleClick = (e) => {
    
    e.preventDefault();
    dispatch(getDogos(e));
    history.push ('/');

  };

  return (
    <div className={style.backimg}>
      <div className={style.components}>
        <div className={style.NavBar}>
        <Link to="/" className={style.logo}>
            <img
              onClick={(e) => handleClick(e)}
              className={style.imglogo}
              src={Logo}
              alt="logoIMG"
            />
          </Link>
          <form className={style.searchBar}>
            <input
              className={style.input}
              onChange={(e) => handleInput(e)}
              placeholder="Search..."
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
            <button className={style.creaPerro}>Create your dog!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
