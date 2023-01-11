const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details: [],
}


const rootReducer = (state = initialState, action) => {

    switch(action.type) {

        // --traer todos los perros y mostrarlos-- //
        case 'GET_ALL_DOGS':
            action.payload.forEach(el => {
                if (!el.temperaments[0]) {
                    el.temperaments[0] = 'No-Temperaments'
                }
            });
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };

        // --traer todos los temperamentos-- //
        case 'GET_TEMPERAMENTS':
            const cleanTemps = action.payload.filter((el) => el.name !== '' );
            return {
                ...state,
                temperaments: cleanTemps,
            }

        // --filtra por temperamento-- //
        case 'GET_FILTER_TEMPERAMENTS':
            const allDogs = state.allDogs;
            const filterByDogsTemp = [];
            if (action.payload === 'Todos') {
                filterByDogsTemp = allDogs;
            } else {
                for ( let i = 0 ; i < allDogs.length ; i++) {
                   let coincidencesTemp = allDogs[i].temperaments.find((el) => el === action.payload);
                if (coincidencesTemp) filterByDogsTemp.push(allDogs[i]);
                };
            };  
            return {
                ...state,
                dogs: filterByDogsTemp
            };

        // --raza de la api o creada-- //
        case 'GET_BREED':
            return {
                ...state,
                dogs: action.payload
            }

        // --ordenamiento de A-Z o Z-A-- //
        case 'ORDER_BY_NAME':
            const orderByName = 
            action.payload === 'A-Z' 
            ? state.allDogs.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                };
                if (a.name < b.name) {
                    return -1
                };
                return 0
            })
            : state.allDogs.sort((a,b) => {
                if (a.name > b.name) {
                    return 1
                };
                if (a.name < b.name) {
                    return 1
                };
                return 0;
            });
            return {
                ...state,
                dogs: orderByName
            };

        // --ordenamiento de peso mayor a menor o mayor a menor-- //
        case 'ORDER_BY_WEIGHT':
            const orderByWeight =
            action.payload === 'min-weight' 
            ? state.allDogs.sort((a,b) => {
                if (parseInt(a.weight[0] > b.weight[0])) {
                    return 1
                }
                if (parseInt(a.weight[0] < b.weight[0])) {
                    return -1
                }
                return 0
            })
            : state.allDogs.sort((a,b) => {
                if (parent(a.weight > b.weight[0])) {
                    return -1
                }
                if (parseInt(a.weight < b.weight[0])) {
                    return -1
                }
                return 0
            });
            return {
                ...state,
                dogs: orderByName
            };

        // --muestra los detalles del perro-- //
        case 'SHOW_DOG_DETAILS':
            let dogDetails = action.payload
            if (!dogDetails[0].temperaments[0]) {
                dogDetails[0].temperaments[0] = 'No Temperaments'
            }
            return {
                ...state,
                details: dogDetails
            }

       
        default: 
        return state;
    };
};

export default rootReducer;