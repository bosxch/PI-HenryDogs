import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDog, getTemps } from "../../Redux/actions/appActions";
import { useHistory } from 'react-router-dom'
import style from "./CreateDog.module.css";
import { toast } from 'react-toastify';

//---------------------VALIDACION----------------------------------

import validate from "./validate";

//------------------------FUNCION-----------------------------------
function CreateDog() {
  let history = useHistory ();
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps); 
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    weightMin: "",
    heightMax: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperament: [],
  });
  const [errors, setErrors] = useState({});

  //------------------------USE EFFECT-------------------------------
  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);
  //------------------------HANDLE CHANGE---------------------------

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert("Chequea errores");
    } else if (
      input.name === "" ||
      input.heightMin === "" ||
      input.weightMin === "" ||
      input.heightMax === "" ||
      input.weightMax === "" ||
      input.life_span === "" ||

      !input.temperament.length
    ) {
      toast.warning("Missing data to complete");
    } else {
      if (input.image === '') {
        input.image = 'https://cdn.pixabay.com/photo/2014/04/03/00/35/footprint-308794_960_720.png'
      }
      dispatch(postDog(input));
      toast.success("Your dog breed has been successfully created!");
      setInput({
        name: "",
        heightMin: "",
        weightMin: "",
        heightMax: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperament: [],
      });
      history.push ('/home');
    }
  };
  //----------------------------------------------------------------
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }
  //----------------------------------------------------------------
  function handleSelect(e) {
    setInput({
      ...input,
      temperament: Array.from(new Set([...input.temperament, e.target.value])), 
    });
  }
  //----------------------------------------------------------------
  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
  }

 


  //* ----------------------------------------------------------------

  return (
    
      <div className={style.buttonYform}>
        <Link className={style.buttonBack} to="/home">
          GO BACK
        </Link>
        <div className={style.boxstyle}>
          <h1 className={style.titulo}>LETS CREATE IT!</h1>

          <form
            className={style.formCreateDog}
            onSubmit={(e) => handleInputSubmit(e)}
          >
            <div className={style.div}>
              <label className={style.label}> Breed name:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder='Name...'
                name="name"
                value={input.name}
              />
            </div>
            <p className={style.error}>{errors.name}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Height min:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="In cm..."
                name="heightMin"
                value={input.heightMin}
              />
            </div>
            <p className={style.error}>{errors.heightMin}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Height max:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="In cm..."
                name="heightMax"
                value={input.heightMax}
              />
              <p className={style.error}>{errors.heightMax}</p>
            </div>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Weight min:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="In kg"
                name="weightMin"
                value={input.weightMin}
              />
            </div>
            <p className={style.error}>{errors.weightMin}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Weight max:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="In kg"
                name="weightMax"
                value={input.weightMax}
              />
            </div>
            <p className={style.error}>{errors.weightMax}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Life span:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Example: 12-15..."
                name="life_span"
                value={input.life_span}
              />
            </div>
            <p className={style.error}>{errors.life_span}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Select temperaments:</label>
              <select className={style.input} onChange={(e) => handleSelect(e)}>
              <option hidden>-select temperament/s-</option>
                {temps.map((temp) => (
                  <option className={style.input} key={temp} value={temp}>
                    {temp}
                  </option>
                ))}
              </select>

              {input.temperament.map((e) => (
                <div className={style.tempsdisplay} key={e}>
                  <div className={style.tempsdisplay} key={e}>
                    {e}
                  </div>
                  <button
                    onClick={() => handleDelete(e)}
                    className={style.close}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <p className={style.error}>{errors.temperament}</p>

            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Image URL:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Copy and paste the url here..."
                name="image"
                value={input.image}
              />
            </div>
            <p className={style.error}>{errors.image}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <button
                className={style.buttonCrear}
                type="submit"
                value="Crear Perro!"
              >
                CREATE THE DOG BREED!
                
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default CreateDog;
