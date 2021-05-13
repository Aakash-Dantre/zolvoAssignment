import React from 'react'
import axios from 'axios'

export default class Credit extends React.Component{
constructor(props){
    super(props)
    var st=JSON.parse(localStorage.getItem('mydata'))
    this.state=st
    this.state['amount']=0
    console.log(this.state)
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAm = this.onChangeAm.bind(this);
        
  }
   onSubmit(e){
    e.preventDefault()
    let data= new FormData()
    data.append('token',this.state.token)
    data.append('amount',this.state.amount)
    axios.post('http://localhost:8000/debit/',data)
         .then(res => {
            this.setState({balance:res.data.balance})
            localStorage.setItem('mydata',JSON.stringify(this.state))
            console.log(localStorage['mydata'])
            document.getElementById("AfterSubmit").innerHTML = "Debit Successfull" ;

        })
         .catch(function(error) {
             console.log(error);
            document.getElementById("AfterSubmit").innerHTML = "Debit FAILED" ;
 
         })
  }
    


  

  onChangeAm(event){

        this.setState({ amount: event.target.value })

  }
   
  render(){
 let bln;
      if(this.state.balance<65){
         bln =  <div class="progress">
            <div class="progress-bar bg-danger progress-bar-striped" 
                        style={{width:"20%"}}>BALANCE: {this.state.balance}</div>
        </div>
      }
      else if(this.state.balance<100){
        bln =  <div class="progress">
            <div class="progress-bar bg-warning progress-bar-striped" 
                        style={{width:"40%"}}>BALANCE: {this.state.balance}</div>
        </div>
      }
      else if(this.state.balance<500){
        bln =  <div class="progress">
            <div class="progress-bar progress-bar-striped" 
                        style={{width:"60%"}}>BALANCE: {this.state.balance}</div>
        </div>
      }
      else{
        bln =  <div class="progress">
            <div class="progress-bar bg-success progress-bar-striped" 
                        style={{width:"80%"}}>BALANCE: {this.state.balance}</div>
        </div>
      }

    
    return(
      <div>

         <div>Amount to debit</div>
         <form onSubmit={this.onSubmit}>
                    <div className="form-group">        
                        <input type="text" 
                               className="form-control" 
                               value={this.state.amount}
                               onChange={this.onChangeAm}
                               />
                    </div>
               
                    <div className="form-group">
                        <input type="submit" value="Debit" className="btn btn-primary"/>
                    </div>
                    
              </form>
              
 <div id ="AfterSubmit">

                    </div>
        {bln}

          
        
        </div>
    );
  }
}