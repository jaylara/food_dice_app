import React, { Component } from 'react';

import './reset.css';

import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

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

    this.access = {
      client_id: '3-N_879q6D3M6P3s3KplCA',
      client_secret: 'KqyZ9kAqWo6VUCyRfUau0fWCTyJpPpicNj2e7y69emmTosk4yqJHGrcyDX1UZ5vW',
      access_token: "zhu9COybkCTwEVuw-DQGBnJPx0mUdbtEEG9H-_5ouY6m-yZkcVxQjzkv1D0jXO0gkcSlq6_SS5okYRpJo9ZTy2dBPBW1uR_Ffm6YstSPMvsddTXUtzc66DQnhoIAWnYx",
      expires_in: 637498157,
      token_type: "Bearer"
    }

    this.stuff= null;

    this.prepData = this.prepData.bind(this);
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
          <div id='input-form' key={ i }>
            <input onBlur={ this.updateArray } placeholder='Food type' type="text" value={ this.state.value[i] || '' } onChange={ this.handleChange.bind(this, i) }/>
          </div>
        )
     }
     return inputFields || null;
  }

  axiosRequest(foodTerm) {
    let limit = 3;
    let url = `https://yelpprox.herokuapp.com/search?term=${ foodTerm }&limit=${ limit }&location=${ this.state.myCity }`;

    axios.get(url)
    .then((response) => {
      this.prepData(response);
    }).catch(e => e);
  }

  prepareQuery(e) {
    e.preventDefault();

    for (let i of this.state.inputs) {
      this.axiosRequest(i);
    }

    this.setState({
      inputs: [],
      data: []
    })
  }

  updateArray(e) {
    this.state.inputs.push(e.target.value);
  }

  prepData(data) {
    this.makeMyObject(data.data.businesses);
  }

  makeMyObject(businesses) {

    for(let i of businesses){
      this.setState({
        hasSearched: true,
        data: this.state.data.concat([i])
      })
    }
  }

  makeMyChild(){
    let resultDivs = [];
    for(let i = 0; i < this.state.data.length ; i++) {
      resultDivs.push(
        <div id='result-container' key={ i }>
          <img className="image"src={ this.state.data[i].image_url } />
          <div id="info-div">
            <p className="business-name">{ this.state.data[i].name }</p>
            <p className="open-closed">{ this.state.data[i].is_closed ? 'closed' : 'open' }</p>
            <p className="business-name">{ this.state.data[i].phone }</p>
            <p className="address">{ this.state.data[i].location.display_address }</p>
          </div>
        </div>
      )
    }

    let rand = this.shuffle(resultDivs);
    resultDivs = rand.slice(0,3);

    return resultDivs || null;
}

shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}


  render() {
    let display;
    let resultsDisplay;
      display = (

        <div className="input-area">

        <div>
        <div className='searchTypeLinks test9'>
          <ul className='searchTypeLinksList'>
            <li className='listItem' id='selected'><NavLink className='links searchLink' to='/Search'>Search</NavLink></li>
            <li className='listItem'><NavLink className='links randomLink' to='/Random'>Don't Even Care!</NavLink></li>
          </ul>
        </div>
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
        </div>

        )

       resultsDisplay = (
        <div className="render-results">
          {this.makeMyChild()}
        </div>
        )

    return (
      <div>
        <div>{display}</div>
        {resultsDisplay}
      </div>
    );
  }
}
