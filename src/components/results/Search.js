import React, { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {value: [], count: 1};
  }

  handleChange(i, event) {
     let value = this.state.value.slice();
     value[i] = event.target.value;
     this.setState({value});
  }

  addClick(){
    if (this.state.count < 3) {
      this.setState({count: this.state.count+1})
    }
    else {
      alert('You can only have up to three fields.')
    }
  }

  removeClick(i){
     let value = this.state.value.slice();
     value.splice(i,1);
     if (this.state.count > 1) {
       this.setState({
          count: this.state.count - 1,
          value
       })
    }
    else {
      alert("You must have at least one search field.");
    }
  }

  createUI(){
     let inputFields = [];
     for(let i = 0; i < this.state.count; i++){
           inputFields.push(
               <div id='input-form' key={i}>
                  <input placeholder='Type of food...'type="text" value={this.state.value[i] || ''} onChange={this.handleChange.bind(this,i)} />
               </div>
            )
     }
     return inputFields || null;
  }

  render() {
    return (
      <div>

        <h1 className="header">What are you craving?</h1>
        <form>
          {this.createUI()}
          <div id='add-remove-buttons'>
            <input id='add-input' type='button' value='+' onClick={this.addClick.bind(this)}/>
            <input id='remove-input' type='button' value='-' onClick={this.removeClick.bind(this)} />
          </div>
          <input id='submit-cravings' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
