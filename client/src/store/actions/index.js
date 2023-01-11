import axios from "axios";

const urlMyApiBE = "http://localhost:3001"; //trabajo sobre la api creada en su respectiva carpeta


//busca a los perros y tira un dispatch al reducer
export function getAllDogs (){
    return async function(dispatch) {
        var allDogs = await axios.get(`${urlMyApiBE}/dogs`);
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: allDogs.data
        });
    };
};

//busca los temperamentos y tira un dispatch al reducer
export function getTemperaments() {
    return async function(dispatch) {
        var allTemperaments = await axios.get(`${urlMyApiBE}/temperaments`);
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: allTemperaments.data
        });
    };

};

//retorna al reducer la action
export function getFilterTemperaments(payload) {
    return {
        type: 'GET_FILTER_TEMPERAMENTS',
        payload
    };
};

//busca al dog por query y tira un dispatch al reducer
export function getBreed(payload) {
    return async function(dispatch) {
            var dogByQuery = await axios.get(`${urlMyApiBE}/dogs?name=${payload}`);
            return dispatch({
                type: 'GET_BREED',
                payload: dogByQuery.data
            });
    };
};

//retorna al reducer la action
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

//retorna al reducer la action
export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    };
};

//busca al perro según su id y tira un dispatch al reducer
export function showDogDetails(id) {
    return async function(dispatch) {
        var dogDetailsId = await axios.get(`${urlMyApiBE}/dogs/:${id}`)
        return dispatch ({
            type: 'SHOW_DOG_DETAILS',
            payload: dogDetailsId.data
        })
    }
 
};

//recibe la data de los formularios y postea el perro
export function postDog(payload) {
    return async function () {
        const newDog = await axios.post("/dogs", payload);
        return newDog;
    }
}