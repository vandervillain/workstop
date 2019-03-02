import * as React from 'react';
import { BrowserRouter, Link, Route } from "react-router-dom";
import Contact from "./Contact";
import Home from "./Home";
// import logo from './logo.svg';
import Stuff from "./Stuff";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="clear">
            <div className="container-fluid lg">
              { /* <img src={logo} className="App-logo" alt="logo" /> */ }
              <div className="logo">
              <Link to="/"><h1>workstop</h1></Link>
              </div>
              <div className="login">
                <Link to="/login">Log in</Link>
              </div>
            </div>
          </header>
            <div className="container-fluid lg">
              <div className="content">
                <Route exact={true} path="/" component={Home}/>
                <Route path="/stuff" component={Stuff}/>
                <Route path="/contact" component={Contact}/>
              </div>
            </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
