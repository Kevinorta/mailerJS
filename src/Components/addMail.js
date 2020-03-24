import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './addMail.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-20%',
    transform             : 'translate(-50%, -50%)',
    height                : '95%',
    width                 : '95%'
  }
};

class AddMail extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      modalIsOpen: false,
      people:this.props.people,
      nameInput: "",
      numInput: 0,
      tagsInput: "", 
      list: [],
      edit:1
    };

    this.addMail=this.addMail.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
   
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
  //Change both inputs and set state(value of input relies on state)
  changeInput(inputType, input) {
    this.setState({
      [inputType]: input,
    });
  }
  
 
  afterOpenModal() {
    
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }


  addMail(){
    let inputArray = this.state.list;
    //found=0 when that person is not present on list already
    let found = 0;
    
    if(this.state.edit==1){ //Not wanting to edit an existing line
    
      //check for empty inputs
      if(this.state.nameInput=="" ){
        alert("Select a Person");
      }else if(this.state.numInput==0){
        alert("How Much Mail?");
      }else{ 

      //looking if that person exists on the list
      for (let n=0; n<inputArray.length; n++){
        //person exists
        if(this.state.nameInput===inputArray[n][0]){ 
          //add more mail to that existing person
          inputArray[n][1]=parseInt(this.state.numInput)+parseInt(inputArray[n][1]);
          found=1;
          break;
        }
      }
      //add a line of mail for new person
      if (found==0) {
        inputArray.push([this.state.nameInput,this.state.numInput]);
      }
      }
    } else{ //making edit to existing line
      //find the line to be edited and change the numInput
      for (let n=0; n<inputArray.length; n++){ 
        if(this.state.nameInput===inputArray[n][0]){
          inputArray[n][1]=parseInt(this.state.numInput);
          break;
        }
      }
    }
    //reset states for inputs and update mail list state
    this.setState({
      list: inputArray,
      nameInput: "",
      numInput: 0                                                                       
    });
  }
  
  //find that line in the list, filter it out, and update the list state 
  remove(val){
    let inputArray = this.state.list;
    inputArray = inputArray.filter(e => e !== val); 
    this.setState({
      list: inputArray, 
    });
    
  }
  edit(val){
   //opens modal w/ the inputs changed to the current lines values
    this.openModal();
    this.setState({
      nameInput:val[0],
      numInput:val[1],
      edit:0 //tells the addMail function that a change is being made/ dont add a new line
    });
    
  }

 
 
  render() {
    return (
      <div>
        
        <button onClick={this.openModal}>Add Mail</button>
        <button onClick={this.submit}>Submit</button>
        <ul>
          
        </ul>


        <table style={{width: "100%"}}>
          <tr>
            <th>Name</th>
            <th>How Much Mail?</th> 
            <th>Tags</th>
          </tr>

          {this.state.list.map(val => (
            <tr>
              <td>{val[0]}</td>
              <td>{val[1]}</td>
              <td>{val[1]}</td>
              <button
                onClick={() => {
                  this.remove(val);
                }}
              >
                X
              </button>
              { <button
                onClick={() => {
                  this.edit(val);
                }}
              >
                Edit
              </button> }
            </tr>
          ))}
          
          
        </table>


        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>X</button>
          <div>Who got mail?</div>
          <form >
          <select id='nameInput' name="People" value={this.state.nameInput} onChange={e => {
            this.changeInput(e.target.id, e.target.value);
          }}>
           <option value="" disabled selected>    </option>
           {this.state.people.map(val=>(
                <option value={val}>{val}</option>
            ))}
            
           
          </select><br></br>
          <br></br>
          
            <p>How much mail?</p><input id="numInput" value={this.state.numInput} type="number" min="0" onChange={e => { this.changeInput(e.target.id, e.target.value); }}/><br></br>
            <br></br>
            <div>

            <ul class="ks-cboxtags" >
              <li><input type="checkbox" id="checkboxOne" value="Spam" ></input><label for="checkboxOne">Spam</label></li>
              <li><input type="checkbox" id="checkboxTwo" value="Bill"></input><label for="checkboxTwo">Bill</label></li>
              <li><input type="checkbox" id="checkboxThree" value="Package"></input><label for="checkboxThree">Package</label></li>
              <li><input type="checkbox" id="checkboxFour" value="Other" ></input><label for="checkboxFour">Other</label></li>
              <input id="name2" name="name2" disabled="disabled"/>

            </ul>
            </div>
           
            <button type="button" onClick={this.addMail}>Add</button>
            <button type='reset' >Reset</button>
          </form>
        </Modal>
      </div>
    );
  }
}



export default AddMail;