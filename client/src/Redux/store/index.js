import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk  from "redux-thunk";
import  rootReducer  from "../reducer/index";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// thunk, me sirve para poder usar las funciones de middleware asyncronas
// y composeDevTools, la utilizo para poder inspeccionar los componentes dentro de la web de redux