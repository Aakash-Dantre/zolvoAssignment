import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Credit from './credit'
import Debit from './debit'
import Log from './log'
// import Rate from './rate'


export default class Dashboard extends React.Component{
  constructor(){
    super()
    var st=localStorage.getItem('mydata')
    console.log(st)

    if (st==null)
    {
      window.location.assign('/user/login');
    }

    this.state=JSON.parse(st)
        this.onClick=this.onClick.bind(this);
        


  }
  componentDidMount(){
  


  }
  onClick(){
    localStorage.clear()
    window.location.assign('/')
  }
  
  render(){
   
    return(
    <Router>  
      <div>

      <nav id="navvendor" className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                
                <li className="navbar-item">
                  <Link to="/dashboard/credit" className="nav-link">Credit</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/dashboard/debit" className="nav-link">Debit</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/dashboard/log" className="nav-link">Log</Link>
                </li>
                <li style={{position:"absolute",right:"3px"}}>
                Hello {this.state.username}!
                </li>
              </ul>
            </div>
         </nav>


          
        <button id="lolout" className="btn btn-primary" onClick={this.onClick}>LOGOUT</button>
        

        <br/>
  

       <Route path="/dashboard/credit" component={() => <Credit  />}/>
        <Route path="/dashboard/debit" component={() => <Debit  />}/>
       <Route path="/dashboard/log" component={() => <Log />}/>

  </div>


    </Router>
    );
  }
}


