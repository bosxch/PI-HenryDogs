import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';


function LandingPage() {
  return (
    <div className={style.div}>

    <div className={style.section}>
      <div className={style.textyimg}>

      <div className={style.left}>
      <h1 className={style.titulo}>BEST FRIEND FINDER</h1>
      <p>An application to find and know more about our best friends!</p>
      </div>
      </div>
      <Link to="/home">
        <button className={style.button}>START!</button>
      </Link>
    </div>
    </div>
  );
}

export default LandingPage;
