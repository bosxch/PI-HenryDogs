import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ dogsXPage, paginado, dogs }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(dogs / dogsXPage); i++) {
    pageNumber.push(i); 
  }

  return (
    <div>
      <div className={style.ulist}>
        {pageNumber &&
          pageNumber.map((number) => (
            <button
              key={number}
              className={style.list}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </div>
  );
}
