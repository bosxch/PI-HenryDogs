import React from "react";
import style from '../Card.Card.modules.css';

export default function Card({ name, temperaments, image }) {
    return (
        <div className={style.card_container}>
            <div className={style.image_container}>
                <img className={style.img} src={`${image}`} alt={`Foto del perro ${name}`} />
            </div>
            <h2>{name}</h2>
            <div className={style.temperaments_container}>
            {
                temperaments.map((el) => <h3 key={el+Math.random}>{el}</h3>)
            }
            </div>
        </div>
    );
};