import React from 'react';
import ReactDOM from 'react-dom';

class AddPeople extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            people:this.props.people,
            personInput:"",
        };
        this.changeInput=this.changeInput.bind(this);
        this.add=this.add.bind(this);
       
    }
    
    add(){
        let peopleArray=this.state.people;
        peopleArray.push(this.state.personInput);
        this.setState({
            people: peopleArray,
            personInput: ""
        });
    }
    changeInput(inputId, input){
        this.setState({
            [inputId]: input,
            
          });
    }
    
  

    render(){
        return(
        <div>
            <h1>Add Some Members To Your Household</h1>
            
            <input 
            type="text" id="personInput" 
            value={this.state.personInput}
            onChange={e => {
                this.changeInput(e.target.id, e.target.value);
              }}></input>
            <button onClick={this.add}>Add</button>
             
            <br></br>
            <ul>
            {this.state.people.map(val=>(
                <li>{val}</li>
            ))}
        
         </ul>
            
        </div>
        )
    }

}
export default AddPeople;