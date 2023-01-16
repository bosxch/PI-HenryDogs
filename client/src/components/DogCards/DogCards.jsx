import React from "react";
import style from "./DogCards.module.css";

export default function DogCards(dogs) {
  return (



    <div className={style.Cards}>
      <img className={style.image}
        src={dogs.image}
        alt="DogIMG"
        width="200px"
        height="200px"
      />
      <div className={style.texto}>
        <h3>{dogs.name}</h3>

        <h5>Temperament: {dogs.temperament}</h5>

        <h5>Weight: {dogs.weightMin + " - " + dogs.weightMax} kg</h5>

        <h5>{dogs.id}</h5>
      </div>
    </div>
  );
}
