import React from "react"

export default class  List extends React.Component {

	constructor(props){
    super(props)
	
    this.state=this.props.itm

	}



   
    
	render(){
    // console.log(typeof(this.state.myfile))
    var type
    if(this.state.t_log>0)type=<span class="badge badge-success">Credit</span>
    else type=<span class="badge badge-warning">Debit</span>

 		return(
      
  			<div>
           {type}
          
            <span class="badge badge-dark">Amount: {(this.state.t_log)}</span>
            <span class="badge badge-info">Time: {this.state.time}</span>

          </div>

		);
	}
}



