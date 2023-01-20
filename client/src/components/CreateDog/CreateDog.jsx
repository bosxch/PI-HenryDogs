import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDog, getTemps } from "../../Redux/actions/appActions";
import { useHistory } from 'react-router-dom'

import style from "./CreateDog.module.css";
//---------------------VALIDACION----------------------------------
const validate = (input) => {
  const errors = {}; 
  const regexName = /^[a-z ,.'-]+$/i; 
  const regexNumLifeSpan = new RegExp("^[0-9-]+$"); 
  const regexNum = new RegExp("^[0-9]+$");

  if (!input.name) {
    errors.name = "This cannot be incomplete.";
  } 
  if (input.name.length < 3 || input.name.length > 20) {
    errors.name = "It has to be between 3 and 20 characters.";
  } 
  if (!regexName.test(input.name))
    errors.name = "You can only use letters.";
  //----------------------------------------------------------------
   if (!input.heightMin) {
    errors.heightMin = "This cannot be incomplete.";
  }  
  if (input.heightMin <= 0 || input.heightMin >= 100) {
    
    errors.heightMin = "Must be greater than 1 and less than 100.";
  }  
  if (!regexNum.test(input.heightMin))
    
    errors.heightMin = "You can only use numbers.";
    
    
  if (input.heightMin > input.heightMax) {
      errors.heightMin = 'The min height cannot be bigger than the max height.'
    }
  //----------------------------------------------------------------
  if (!input.heightMax) {
    errors.heightMax = "This cannot be incomplete.";
  } 
  if (input.heightMax <= 0 || input.heightMax >= 100) {
    
    errors.heightMax = "Must be greater than 1 and less than 100.";
  } 
  if (input.heightMax < input.heightMin) {
    
    errors.heightMax = "The minimum height cannot be greater than the maximum.";
  } 
  if (!regexNum.test(input.heightMax))
    
    errors.heightMax = "You can only use numbers.";
    
  if (input.weightMin > input.weightMax) {
      errors.weightMin = 'The min weight cannot be bigger than the max weight.'
    }
  //----------------------------------------------------------------
 if (!input.weightMin) {
    errors.weightMin = "This cannot be incomplete.";
  } 
  if (input.weightMin <= 0 || input.weightMin >= 100) {
    errors.weightMin = "Must be greater than 1 and less than 100.";
  } 
  if (!regexNum.test(input.weightMin))
    errors.weightMin = "You can only use numbers.";
  //----------------------------------------------------------------
 
  if (!input.weightMax) {
    errors.weightMax = "This cannot be incomplete.";
  } 
  if (input.weightMax <= 0 || input.weightMax >= 100) {
    errors.weightMax = "Must be greater than 1 and less than 100.";
  } 
  if (input.weightMax < input.weightMin) {
    errors.weightMax = "The minimum weight cannot be greater than the maximum.";
  } 
  if (!regexNum.test(input.weightMax))
    errors.weightMax = "You can only use numbers.";
  //----------------------------------------------------------------
  
  if (!input.life_span) {
    
    errors.life_span = "This cannot be incomplete.";
  } 
  if (!input.life_span.includes("-")) {
    
    errors.life_span =
      "You must include a '-' within the minimum or maximum average.";
  }
  if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
   
    errors.life_span = "There must be a number behind the '-'.";
  } 
  if (
    Number(input.life_span.split("-")[0]) >
    Number(input.life_span.split("-")[1])
  ) {
    
    errors.life_span = "The minimum year must be less than the maximum year.";
  } 
  if (regexNumLifeSpan.test(input.life_span) === false) {
    errors.life_span = "No spaces, only positive numbers and '-'!";
  } 
  if (input.life_span.charAt(0) === "-") {
    errors.life_span = "You must add an initial value.";
  }
  if (input.life_span.split('-')[1] > 25) {
    errors.life_span = 'You must enter values below 25 years.'
  }
  //----------------------------------------------------------------
 
  if (!input.temperament.length < 0)
    errors.temperament = "This cannot be incomplete.";
  //----------------------------------------------------------------

  
  if (input.image && !/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/.test(input.image)) {
    errors.image = "The URL is not valid try another format.";
  }
  
  return errors;
  
};
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
      alert("Missing data to complete");
    } else {
      if (input.image === '') {
        input.image = 'https://cdn.pixabay.com/photo/2014/04/03/00/35/footprint-308794_960_720.png'
      }
      dispatch(postDog(input));
      alert("Tu Raza ha sido creada con exito!");
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
                {temps.map((temp) => (
                  <option className={style.input} key={temp} value={temp}>
                    {temp}
                  </option>
                ))}{" "}
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
                CREATE THE DOG!
                
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default CreateDog;
