import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';

import foto from "./img/manchi.png"

function LandingPage() {
  return (
    <div className={style.div}>

    <div className={style.section}>
      <div className={style.textyimg}>

      <div className={style.left}>
      <h1 className={style.titulo}>Bienvenidos a Manchi Dogs!</h1>
      <p>Esta es una web donde podran encontrar todas las razas de perros que existen podran filtrarlas a gusto y hasta crear tus propias Razas!</p>
      </div>
      
      <img className={style.img} src={foto} alt="jpg" />
      </div>
      
      <Link to="/home">
        <button className={style.button}>Entrar</button>
      </Link>
    </div>
    </div>
  );
}

export default LandingPage;
