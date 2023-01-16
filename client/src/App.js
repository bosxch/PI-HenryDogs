import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import DogDetail from "./Components/DogDetail/DogDetail";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import CreateDog from "./Components/CreateDog/CreateDog";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <>
          <NavBar />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dogs/:id" component={DogDetail} />
          <Route exact path="/createDog" component={CreateDog} />
        </>
      </Switch>
    </div>
  );
}

export default App;
