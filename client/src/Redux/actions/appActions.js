import axios from "axios";

export const SET_APP_IS_LOADING = "app/setIsLoading";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_NAME_DOGS = "GET_NAME_DOGS";
export const GET_ALL_TEMPS = "GET_ALL_TEMPS";
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_DOGS = "FILTER_DOGS";
export const FILTER_API_DB = "FILTER_API_DB";
export const CREATE_DOGO = "CREATE_DOGO";
export const GET_CLEAN = "GET_CLEAN";
export const DELETE_DOG = "DELETE_DOG";

//Las actions estan compuestas por un identificador y los datos que va a manejar el reducer..

export function setIsLoading(value) {
  return {
    type: SET_APP_IS_LOADING,
    payload: value,
  };
}
export function getDogos() {
  return async function (dispatch) {
     var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    })
  }
}

export function getDogDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getTemps() {
  return async function (dispatch) {
    try {
      let temps = await axios.get("http://localhost:3001/temperaments");
      return dispatch({
        type: GET_ALL_TEMPS,
        payload: temps.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getDogsName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_NAME_DOGS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function filterBy(payload) {
  return {
    type: FILTER_DOGS,
    payload,
  };
}
export function filterByApi_DB(payload) {
  return {
    type: FILTER_API_DB,
    payload,
  };
}
export function filterByWeight(payload) {
  return {
    type: FILTER_BY_WEIGHT,
    payload,
  };
}
export function filterByTemps(payload) {
  return {
    type: FILTER_BY_TEMPS,
    payload,
  };
}
export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dogs/", payload);
    return dispatch({
      type: CREATE_DOGO,
      payload: response,
    });
  };
}
export function getClean() {
  return {
    type: GET_CLEAN,
    payload: [],
  };
}
export function deleteDog(id) {
  return async function (dispatch) {
    const response = await axios.delete(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: DELETE_DOG,
      payload: response.data,
    });
  };
}
