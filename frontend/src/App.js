import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// import Display from "./components/display"

import Login from './components/login-register'
import Dashboard from './components/dash'


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              {/*<li className="navbar-item">
                <Link to="/display" className="nav-link">Display</Link>
              </li>*/}
            </ul>
          </div>
        </nav>

        <br/>

        <p>

        ZOLVO assignment
        </p>
       
{/*       calling same component with differt prop value
*/}      
        <Route path="/register" component={() => <Login mode="register"/>}/>
        <Route path="/login" component={() => <Login mode="login"/>}/>
{        <Route path="/dashboard" component={() => <Dashboard/>}/>
}        


      </div>
    </Router>
  );
}

export default App;
