import {
    GET_ALL_DOGS,
    GET_DOG_DETAIL,
    GET_ALL_TEMPS,
    GET_NAME_DOGS,
    FILTER_DOGS,
    FILTER_BY_WEIGHT,
    FILTER_API_DB,
    FILTER_BY_TEMPS,
    CREATE_DOGO,
    GET_CLEAN,
  } from "../actions/appActions";
  
  //Estos son los estados iniciales que vamos a manejar, isLoading booleano para ver si esta cargando informacion, dogs va contener toda la informacion de los perros y se modificara segun los filtros y acciones aplicadas, dogsDetail va a ser usada para representar un solo perro en DogDetail, temps va a traer todos los temperamentos de los perros, y allDogs es una copia de dogs que nunca va a ser modificada, para lograr tener el state original siempre a mano
  const INITIAL_STATE = {
    dogs: [],
    dogsDetail: [],
    temps: [],
    allDogs: [],
  };
  
  function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      
      case GET_ALL_DOGS: { //trae state, la info de dogs y copia allDogs
        return { ...state, dogs: action.payload, allDogs: action.payload };
      }
      case GET_DOG_DETAIL: {//Solo trae la info y state
        return { ...state, dogsDetail: action.payload };
      }
      case GET_ALL_TEMPS: { //Misma dinamica
        return { ...state, temps: action.payload };
      }
      case GET_NAME_DOGS: { //La meme chose
        return { ...state, dogs: action.payload };
      }
      case CREATE_DOGO: {
        return { ...state };
      }
      case FILTER_DOGS: {
        //Armo mi logica aca.. Traigo dogs, luego lo filtro y luego devuelvo dogs filtrado por orden
        let dogsFiltered =
          action.payload === "asc"
            ? state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              });
  
        return {
          ...state,
          dogs: dogsFiltered,
        };
      }
      case FILTER_BY_WEIGHT: {
        //const orderDogs = state.AllDogsCopy
  
        let orderWeight =
          action.payload === "maxWeight"
            ? state.dogs.sort((a, b) => Number(b.weightMax) - Number(a.weightMax))
            : state.dogs.sort(
                (a, b) => Number(a.weightMin) - Number(b.weightMin)
              );
          orderWeight = 
          action.payload === 'maxWeight'
          ?  state.dogs
          : state.dogs.sort(
            (a,b) => Number(a.weightMax) - Number(b.weightMax)
          )  
        return {
          ...state,
          dogs: orderWeight,
        };
      }
      case FILTER_API_DB: {
        let result =
          action.payload === "db"
            ? state.dogs.filter((e) => e.created_in_dogs)
            : state.dogs.filter((e) => !e.created_in_dogs);
  
        return {
          ...state,
          dogs: result,
        };
      }
      case FILTER_BY_TEMPS: {
        const copyAllDogs = state.allDogs;
        const filterTemperaments = copyAllDogs.filter((e) => {
          if (typeof e.temperament === "string") {
            return e.temperament.includes(action.payload);
          }
          if (Array.isArray(e.Temperamentos)) {
            let temp = e.Temperamentos.map((e) => e.name);
            return temp.includes(action.payload);
          }
        });
        return {
          ...state,
          dogs: filterTemperaments
        }
      }
      
      case GET_CLEAN: {
        return {
          ...state,
          dogsDetail: action.payload,
        };
      }
  
      default:
        return state;
    }
  }
  
  export default rootReducer;
  