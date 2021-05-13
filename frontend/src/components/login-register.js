import React from "react"
import axios from "axios"

export default class  Login extends React.Component {

	constructor(props){
		super(props)

		 this.state = {
            username: '',
            phone: '',
           
      
        }
   		this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


	}

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePhone(event) {
        this.setState({ phone: event.target.value });
    }

	onSubmit(e) {
        e.preventDefault();
        
        const newUser = {
            username: this.state.username,
           	phone: this.state.phone
        }
	        if (this.props.mode==="register")
	        {
            console.log('registering')
            let data=new FormData()
            data.append("username",newUser.username)
            data.append("phone",newUser.phone)
            console.log(data)
		        axios.post('http://localhost:8000/register/', data)
		             .then(res => {
                  console.log(res.status)
                  if(res.status!==200)
                  {
                    console.log(res.data)

                  }
                  else{
                      document.getElementById("AfterSubmit").innerHTML = "REGISTERED";

                      let data=new FormData()
                      data.append("phone",newUser.phone)
                      console.log(data)

                      axios.post('http://localhost:8000/login/', data)
                           .then(res => {
                     
                             if(res.status===200)
                             {
                                let lol=  res.data
                                localStorage.clear()
                                localStorage.setItem('mydata',JSON.stringify(lol))

                                let data = new FormData()
                                data.append("token",lol.token)

                                axios.post('http://localhost:8000/create/',data)
                                  .then(res => {
                                    lol["balance"]=res.data.balance
                                    localStorage.setItem('mydata',JSON.stringify(lol))
                             
                                 })
                                 .catch(function(error) {
                                     console.log(error);
                                 })
                                  window.location.assign('/dashboard')
                             }

                           })
                            .catch(function(error) {
                               document.getElementById("AfterSubmit").innerHTML = "LOGIN FAILED" ;

                           console.log(error);
                       })
                  }
                 })
                 .catch(function(error) {
                     document.getElementById("AfterSubmit").innerHTML = "phone no. already exist" ;

                 console.log(error);
             })

		   
		    }    
		  else{
	         console.log('loginingn')
            let data=new FormData()
            data.append("phone",newUser.phone)
            console.log(data)

		        axios.post('http://localhost:8000/login/', data)
		             .then(res => {
           
                   if(res.status===200)
                   {
                      let lol=  res.data
                      localStorage.clear()
                      localStorage.setItem('mydata',JSON.stringify(lol))
                      window.location.assign('/dashboard')
                   }

                 })
                  .catch(function(error) {
                     document.getElementById("AfterSubmit").innerHTML = "LOGIN FAILED" ;

                 console.log(error);
             })
                 
		    }
		  
		
        this.setState({
            username: '',
            phone: '',
           
        });
    }
	render(){
		var hide=""
    let btnval = "Register"
		if(this.props.mode==="login"){
      hide="none"
      btnval = "Login"
    }


 		return(
      
  			<div>
             <form onSubmit={this.onSubmit}>

                    <div style={{display:hide}} className="form-group">        
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>

                    <div className="form-group">
                        <label>Phone: </label>
                        <input type="tel" 
                               id="ph"
                               className="form-control"
                               pattern="[0-9]{10}" 
                               value={this.state.phone}
                               onChange={this.onChangePhone}
                               required

                               />  
                    </div>
                    
                    <div className="form-group">
                        <input value={btnval} type="submit"  className="btn btn-primary"/>
                    </div>

                    <div id ="AfterSubmit">

                    </div>
                </form>
            </div>
      	);

     
	}
}



