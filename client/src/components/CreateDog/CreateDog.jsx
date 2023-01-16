import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDog, getTemps } from "../../Redux/actions/appActions";

import style from "./CreateDog.module.css";
//---------------------VALIDACION----------------------------------
const validate = (input) => {
  const errors = {}; //Aca guardamos nuestros errores
  const regexName = /^[a-z ,.'-]+$/i; //regex validacion letras de a-z y sin simbolos
  const regexNumLifeSpan = new RegExp("^[0-9-]+$"); //se utiliza para hacer coincidir texto con un patrón.
  const regexNum = new RegExp("^[0-9]+$");

  if (!input.name) {
    errors.name = "Debes completar este campo";
  } else if (input.name.length < 3 || input.name.length > 20) {
    errors.name = "Tiene que tener entre 3 y 20 caracteres";
  } else if (!regexName.test(input.name))
    errors.name = "Solo puede usar letras";
  //----------------------------------------------------------------
  else if (!input.heightMin) {
    errors.heightMin = "Debes completar este campo";
  } else if (input.heightMin <= 0 || input.heightMin >= 100) {
    //valores entre los que tiene que estar
    errors.heightMin = "Debe que ser mayor a 1 y menor que 100";
  } else if (!regexNum.test(input.heightMin))
    //Condicion de numero
    errors.heightMin = "Solo puede usar numeros";
  //----------------------------------------------------------------
  else if (!input.heightMax) {
    errors.heightMax = "Debes completar este campo";
  } else if (input.heightMax <= 0 || input.heightMax >= 100) {
    //valores entre los que tiene que estar
    errors.heightMax = "Debe que ser mayor a 1 y menor que 100";
  } else if (input.heightMax < input.heightMin) {
    //No puede ser mayor al otro
    errors.heightMax = "La altura minima no puede ser mayor a la maxima";
  } else if (!regexNum.test(input.heightMax))
    //Condicion de numero
    errors.heightMax = "Solo puede usar numeros";
  //----------------------------------------------------------------
  else if (!input.weightMin) {
    errors.weightMin = "Debes completar este campo";
  } else if (input.weightMin <= 0 || input.weightMin >= 100) {
    errors.weightMin = "Debe que ser mayor a 1 y menor que 100";
  } else if (!regexNum.test(input.weightMin))
    errors.weightMin = "Solo puede usar numeros";
  //----------------------------------------------------------------
  else if (!input.weightMax) {
    errors.weightMax = "Debes completar este campo";
  } else if (input.weightMax <= 0 || input.weightMax >= 100) {
    errors.weightMax = "Debe que ser mayor a 1 y menor que 100";
  } else if (input.weightMax < input.weightMin) {
    errors.weightMax = "El peso minimo no puede ser mayor a la maxima";
  } else if (!regexNum.test(input.weightMax))
    errors.weightMax = "Solo puede usar numeros";
  //----------------------------------------------------------------
  else if (!input.life_span) {
    //Vacio
    errors.life_span = "Debes completar este campo";
  } else if (!input.life_span.includes("-")) {
    //Si no incluye un - para separar campos
    errors.life_span =
      "Debes incluir un '-' dentro de promedio minimo o maximo";
  } else if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
    //CharAt me devuelve el valor en la posicion solicitada, aqui usamos +1 de la posicion donde se encuentre el '-';
    errors.life_span = "Debe haber un numero detras del '-'";
  } else if (
    Number(input.life_span.split("-")[0]) >
    Number(input.life_span.split("-")[1])
  ) {
    //Numero mayor que otro
    errors.life_span = "El año minimo debe ser menor al año maximo";
  } else if (regexNumLifeSpan.test(input.life_span) === false) {
    errors.life_span = "Sin espacios, solo numeros positivos y '-'!";
  } else if (input.life_span.charAt(0) === "-") {
    errors.life_span = "Debes agregar un valor inicial";
  }
  //----------------------------------------------------------------
  else if (!input.temperament.length)
    errors.temperament = "Debe completar este campo";
  //----------------------------------------------------------------
  else if (!input.image) errors.image = "Debe completar este campo";
  else if (!/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/.test(input.image)) {
    errors.image = "El URL no es valido prueba con otro formato";
  }
  return errors;
};
//------------------------FUNCION-----------------------------------
function CreateDog() {
  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps); //adhiero a temps los temperamentos
  const [input, setInput] = useState({
    //Estado local iniciados vacios, las modificaciones iran dentro de estos parametros declarados
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
    //Se despacha una vez renderizado, sujeto a cambios de dispatch
    //Use effect utilizado traer el estado de los temperamentos
    dispatch(getTemps());
  }, [dispatch]);
  //------------------------HANDLE CHANGE---------------------------

  const handleInputSubmit = (e) => {
    //Al momento de crearlo hace un dispatch en el boton crear activando la funcion postDog(pasando el estado por parametro), preventDefault para que no vuelva a renderizar, if(si tiene algun error es decir mayor a 0), Chequeo que ningun campo este vacio, dispatch de la funcion postDog pasandole el estado local de input como parametro, vuelvo a setear todos los cambios vacios.
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
      input.image === "" ||
      !input.temperament.length
    ) {
      alert("Campos vacios");
    } else {
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
    }
  };
  //----------------------------------------------------------------
  function handleChange(e) {
    // Tod os los cambios van a ser manejados por este handleChange, ira actualizando el estado de input, creo un setErrors para que me vaya validando los errores a medida que voy cambiando el input
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }
  //----------------------------------------------------------------
  function handleSelect(e) {
    // Funcion que utilizo para los cambios. Traigo el input y modifica temperament
    setInput({
      // Traigo los temperamentos anteriores sleccionados y agrego los que selecciono en el momento dentro del array
      ...input,
      temperament: Array.from(new Set([...input.temperament, e.target.value])), //Set devuelve tipo de dato Set, luego lo vuelvo transformar en array. Evito repetidos
    });
  }
  //----------------------------------------------------------------
  function handleDelete(e) {
    //Utilizo el handle delete para poder borrar los temps no deseados, filtro sobre input.temperament y devuelvo los que no coincidan con el seleccionado
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
  }
  //* ----------------------------------------------------------------

  return (
    
      <div className={style.buttonYform}>
        <Link className={style.buttonBack} to="/home">
          Regresar
        </Link>
        <div className={style.boxstyle}>
          <h1 className={style.titulo}>Crea tu perro!</h1>

          <form
            className={style.formCreateDog}
            onSubmit={(e) => handleInputSubmit(e)}
          >
            <div className={style.div}>
              <label className={style.label}> Nombre de tu raza:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder='Por ejemplo: "Border Collie"'
                name="name"
                value={input.name}
              />
            </div>
            <p className={style.error}>{errors.name}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Su altura Minima:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="En centimetros"
                name="heightMin"
                value={input.heightMin}
              />
            </div>
            <p className={style.error}>{errors.heightMin}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Su altura Maxima</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="En centimetros"
                name="heightMax"
                value={input.heightMax}
              />
              <p className={style.error}>{errors.heightMax}</p>
            </div>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Su peso Minimo:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="En kilos"
                name="weightMin"
                value={input.weightMin}
              />
            </div>
            <p className={style.error}>{errors.weightMin}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Su peso Maximo:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="En kilos"
                name="weightMax"
                value={input.weightMax}
              />
            </div>
            <p className={style.error}>{errors.weightMax}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Promedio de vida:</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Ejemplo: 12-15"
                name="life_span"
                value={input.life_span}
              />
            </div>
            <p className={style.error}>{errors.life_span}</p>
            {/* --------------------------------------------------------- */}
            <div className={style.div}>
              <label className={style.label}>Selecciona Temperamentos</label>
              <select className={style.input} onChange={(e) => handleSelect(e)}>
                {temps.map((temp) => (
                  <option className={style.input} value={temp}>
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
              <label className={style.label}>Ingresa la URL de la imagen</label>
              <input
                className={style.input}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Copia y pega aqui!"
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
                Crear Perro!
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default CreateDog;
