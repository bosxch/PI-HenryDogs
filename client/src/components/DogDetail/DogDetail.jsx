import React, { useEffect /* useState */ } from "react";
import style from "./DogDetail.module.css";
import { getDogDetail, getClean } from "../../Redux/actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import loader from "../Home/img/loader.gif"

function DogDetail(props) {
  const dispatch = useDispatch(); //
  const dogs = useSelector((state) => state.dogsDetail);
  //const [loading, setLoading] = useState(false);


  useEffect(() => {
    //La idea es que con el use effect cambie el estado local a true como que esta cargando y una vez que el dispatch se ejecute vuelva a pasarlo a false para que deje de renderizar el loading..
    /* setLoading(true); */
    dispatch(getDogDetail(props.match.params.id)); //el params.id contiene info de una route correspondiente, params(key o value), isExact(boolean), path, url
    /* setLoading(false); */
    return () => {
      dispatch(getClean());
    };
  }, [dispatch, props.match.params.id]);

  return (
    //---------------------------BOTTON REGRESO-------------------------------------------
    /*  <div>
    {loading ? (
      <h1 loading={loading}>Cargando...</h1>
      ) : ( */
    <div className={style.buttonYform}>
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <button className={style.buttonBack}>Regresar</button>
      </Link>
      {/* //---------------------DETAIL DE PERRO----------------------------------------------- */}
      <div className={style.card}>
        <h2 className={style.title}>{dogs.name}</h2>
        <div>
          <img
            className={style.img}
            src={dogs.image}
            alt="DogIMG"
            width="250px"
            height="250px"
          />
          <h4>
            Temperament:{" "}
            {
              dogs.temperament || dogs.Temperamentos?.map((e) => e.name + " ") //Filtro doble ya que temperament viene por api y Temperamentos viene por base de datos
            }
          </h4>
          <h4>
            Weight : {dogs.weightMin} {dogs.weight} kg - {dogs.weightMax} {dogs.weight}kg
          </h4>
          <h4>
            Height : {dogs.heightMin} {dogs.height}cm - {dogs.heightMax} {dogs.height}cm
          </h4>
          <h4>
            Life span:{" "}
            {dogs.created_in_dogs ? `${dogs.life_span}  years` : dogs.life_span}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default DogDetail;
