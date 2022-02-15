import "./App.css";

import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { News } from "./Pages/News";

import Crypto from "./Pages/Crypto";





function App() {
  





  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Switch>
            <Route exact path="/" component={Crypto}  />
            <Route path="/news" component={News} />
            
           
          
            
            
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
