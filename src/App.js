import "./App.css";

import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { News } from "./Pages/News";
import CoinInfo from "./Pages/CoinInfo";
import Crypto from "./Pages/Crypto";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));




function App() {
  const classes=useStyles();
  const [post,setPost]=useState(null)





  return (
    <>
  
      <Router>
     
        <NavBar />
       
        <div className="pages">
    
          <Switch>
      
            <Route exact path="/" component={Crypto}  />
            
            <Route path="/news" component={News} />
            <Route path="/coins/:id"component={CoinInfo}/>
           
            
           
          
            
            
          </Switch>
    
        </div>
        
      </Router>
      
    </>
  );
}

export default App;
