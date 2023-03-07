import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ dogsXPage, paginado, dogs, currentPage }) {
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
              onClick={() => paginado(number)}
              className={number === currentPage ? style.actived : style.list}
            >
              {number}
            </button>
          ))}
      </div>
    </div>
  );
}
