import React from "react"
import axios from "axios"
import List from './list'

export default class  Log extends React.Component {

  constructor(props){
    super(props)
     var st=JSON.parse(localStorage.getItem('mydata'))
    
    let data= new FormData()
    data.append('token',st.token)
     axios.post('http://localhost:8000/log/',data)
            .then(res => {
               this.setState(res.data)
               console.log(this.state)
       
           })
           .catch(function(error) {
               console.log(error);
           })

  }



   
    
  render(){

    var lis=[]
    var values = this.state
    for(var i in this.state){
      // console.log(i)
      lis.push(values[i])
    }
    var All
    All=lis.map(item => <List itm={item} />)
    

    return(
      
        <div>
            {All}
           </div>

    );
  }
}



