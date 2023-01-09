import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Detail";
import CreateDog from "./components/Form";

//hacemos el ruteo
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dogs/:id" component={Details} />
          <Route exact path="/home/form" component={CreateDog} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
