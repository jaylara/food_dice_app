import React, { Component } from 'react';
//import './reset.css';
import { NavLink } from 'react-router-dom';
import './Search.css';
import axios from 'axios';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      count: 1,
      hasSearched: false,
      inputs: [],
      data:[],
      myCity: null
    };
    this.prepareQuery = this.prepareQuery.bind(this);
    this.axiosRequest = this.axiosRequest.bind(this);
    this.updateArray = this.updateArray.bind(this);
    this.makeMyObject = this.makeMyObject.bind(this);
  }
  handleChange(i, event) {
     let value = this.state.value.slice();
     value[i] = event.target.value;
     this.setState({value});
  }
  addClick(){
    //adds or limits how many fields you can have
    if (this.state.count < 3) {
      this.setState({count: this.state.count+1})
    }
    else {
      alert('You can only have up to three fields.')
    }
  }
  removeClick(i){
    //remvoes input fields
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
    //makes the actual input components
     let inputFields = [];
     for(let i = 0; i < this.state.count; i++){
       inputFields.push(
          <div id='input-form' key={ i }>
            <input onBlur={ this.updateArray } placeholder='Food type' type="text" value={ this.state.value[i] || '' } onChange={ this.handleChange.bind(this, i) }/>
          </div>
        )
     }
     return inputFields || null;
  }
  updateArray(e) {
    //called onBlur of an input field, adds that value to our inputs array
    this.state.inputs.push(e.target.value);
  }
  prepareQuery(e) {
    //for each input field, we keep track of them on the state, this method sends an axios request for each of those items
    e.preventDefault();

    for (let i of this.state.inputs) {
      this.axiosRequest(i);
    }
    //after the search, set the data and inputs to blank, so the user can search again without stacking the searches
    this.setState({
      inputs: [],
      data: []
    })
  }
  axiosRequest(foodTerm) {
    let limit = 3; //set search limit to 3 for yelp API endpoint
    let url = `https://yelpprox.herokuapp.com/search?term=${ foodTerm }&limit=${ limit }&location=${ this.state.myCity }`;

    axios.get(url)
    .then((response) => {
      this.makeMyObject(response.data.businesses); //sends data to makeMyObj, which saves the data to our state
    }).catch(e => e);
  }
  makeMyObject(businesses) {
    //for each business data object found, save it to our state
    //and change hasSearched to true (toggles the view)
    for(let i of businesses){
      this.setState({
        hasSearched: true,
        data: this.state.data.concat([i])
      })
    }
    console.log(this.state.data);
  }
  makeMyChild(){
    //goes through saved API data and creates appendable HTML elements
    let resultDivs = [];
    for(let i = 0; i < this.state.data.length ; i++) {
      let currentItem = this.state.data[i];
      let img = {
        backgroundImage: `url(${this.state.data[i].image_url})`
      };

      resultDivs.push(
        <div id='result-container' key={ i }>
          <div className="image" style={img} >
          </div>
          <div id="info-div">
            <a href={currentItem.url} className="business-name">{ currentItem.name }</a>
            <p className="business-name">{currentItem.price}</p>
            <p className="open-closed">{ currentItem.is_closed ? 'closed' : 'open' }</p><p className="business-name"><img src={'/img/small_'+currentItem.rating+'.png'} /></p>
            <p className="business-name"><a href="tel:{ currentItem.display_phone }">{currentItem.display_phone }</a></p>
            <p className="address">{ currentItem.location.display_address }</p>
          </div>
        </div>
      )
    }
    //shuffles the array of all data, returns only the first 3 to provide a more random/dice like experience
    let rand = this.shuffle(resultDivs);
    resultDivs = rand.slice(0,3);
    return resultDivs || null;
  }
  shuffle(arr) {
    //shuffles arr in place
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  render() {
    let display;
    let resultsDisplay;
      display = ( //set sthe initial display with test form. Sending a call back to a child component was giving us CORS issues with the http request, hence all the code on this section
        <div className="input-area">
          <h1 className="header">What are you craving?</h1>
          <div className="form-container">
            <div id="another-div">
              <input className="zip-code" placeholder='City or Zip' onBlur={(e) => this.setState({ myCity: e.target.value })} />
              <div className="forms">
                <div id="food-inputs">
                  {this.createUI()}
                </div>
              </div>
            </div>
            <form onSubmit={ this.prepareQuery }>
              <div id='add-remove-buttons'>
                <input id='add-input' type='button' value='+' onClick={this.addClick.bind(this)}/>
                <input id='remove-input' type='button' value='-' onClick={this.removeClick.bind(this)} />
              </div>
              <input id='submit-cravings' type="submit" value="Submit" />
            </form>
          </div>
        </div>

        )

       resultsDisplay = (
        <div className="render-results">
          {this.makeMyChild()}
        </div>
        )

    return (
      <div>
        {display}
        {resultsDisplay}
      </div>
    );
  }
}
