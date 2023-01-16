import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store/index"
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";


import "./index.css";



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

//Provider viene de react-redux que me sirve para utilizar el store
