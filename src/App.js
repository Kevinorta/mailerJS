import React from 'react';
import ReactDOM from 'react-dom';
import AddPeople from './Components/addPeople';
import AddMail from './Components/addMail';

class App extends React.Component{
    constructor(){
        super();
        this.state= {
            people:[],
            personInput:"",
            step:0
        }; 

        this.submit=this.submit.bind(this);
    }
    
    
    submit(){
        let addedStep = this.state.step +1;
        this.setState({
            step:addedStep
        })
    }
    
  

    render(){
        
        if(this.state.step==0){
        return(
        <div>
           
            <AddPeople
                people={this.state.people}
            ></AddPeople>
            
            <br></br>
            <button onClick={this.submit}>Submit</button>
        </div>
        )
        }else if(this.state.step==1){
            return(
                <div>
                <AddMail
                people={this.state.people}
                ></AddMail>
                <br></br>
                <button onClick={this.submit}>Submit</button>
                <br></br>
                <button onClick={this.back}>Add More People</button>
                </div>
            )
        }else{
            return(
                <div>Success</div>
            )
        }
    }

}
export default App;