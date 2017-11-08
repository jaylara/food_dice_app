import React, { Component } from 'react';
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
      testCount: 0,
      myCity: null
    };

    this.access = {
      client_id: '3-N_879q6D3M6P3s3KplCA',
      client_secret: 'KqyZ9kAqWo6VUCyRfUau0fWCTyJpPpicNj2e7y69emmTosk4yqJHGrcyDX1UZ5vW',
      access_token: "zhu9COybkCTwEVuw-DQGBnJPx0mUdbtEEG9H-_5ouY6m-yZkcVxQjzkv1D0jXO0gkcSlq6_SS5okYRpJo9ZTy2dBPBW1uR_Ffm6YstSPMvsddTXUtzc66DQnhoIAWnYx",
      expires_in: 637498157,
      token_type: "Bearer"
    }

    this.imgComp = '';
    this.saveData = {};
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
          <div id='input-form' key={i}>
            <input onBlur={ this.updateArray } placeholder='Type of food...' type="text" value={this.state.value[i] || ''} onChange={this.handleChange.bind(this, i)} />
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
    // this.setState({
    //   hasSearched: true
    // })

    for (let i of this.state.inputs) {
      this.axiosRequest(i);
    }

    console.log(this.saveData, 'im logging after all axios requests');
  }

  updateArray(e) {
    this.state.inputs.push(e.target.value);
  }

  prepData(data) {

    console.log(data.data.businesses, 'prepdata function')

    this.makeMyObject(data.data.businesses);


  }

  createMyName(){
     // console.log(this.saveData);
  }

  // componentWillMount() {
  //   alert("Updating");
  // }

  makeMyObject(businesses) {
    console.log(businesses);

    for(let i of businesses){
      this.setState({
        hasSearched: true,
        data: this.state.data.concat([i])
      })
    }
    console.log(this.state.data, 'im your data after looping through search')
    console.log(this.state.data[0]);
    // console.log(this.savedData);
    // let fuck  = this.makeMyChild();
    // this.setState({
    //   ayy: fuck
    // })
    console.log(this.stuff);
  }

  makeMyChild(){
    let resultDivs = [];
    for(let i = 0; i < this.state.data.length ; i++) {
      resultDivs.push(
        <div id='result-listed' key={ i }>
          <img src={ this.state.data[i].image_url } />
          <h1>{ this.state.data[i].name }</h1>
          <p>{ this.state.data[i].is_closed ? 'closed' : 'open' }</p>
          <p>{ this.state.data[i].location.display_address }</p>
        </div>
        )
    }
    let rand = this.shuffle(resultDivs);
    console.log(rand);
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
    let resultDisplay = this.saveData;

    let omg = this.createMyName();
    !this.state.hasSearched?
      display = (
        <div>
          <h1 className="header">What are you craving?</h1>
          <input placeholder='City or zip code...' onBlur={(e) => this.setState({ myCity: e.target.value })} />
          <form onSubmit={ this.prepareQuery }>
            {this.createUI()}
            <div id='add-remove-buttons'>
              <input id='add-input' type='button' value='+' onClick={this.addClick.bind(this)}/>
              <input id='remove-input' type='button' value='-' onClick={this.removeClick.bind(this)} />
            </div>
            <input id='submit-cravings' type="submit" value="Submit" />
          </form>
        </div>)
        :
        display = (
          <div className="render-results">
            <h1>Search Results</h1>
            {this.makeMyChild()}
 {/*                       <p className="results-name">{ resultDisplay }</p>
            <img src={this.saveData[0]} />*/}
            <p>I am your results page</p>
            <p>How many stuffs i found in unary: {this.state.ayy}</p>
            <p>This is the name of the first restaurant: {this.state.data[0].name}</p>
            <p>Am I open?: {this.state.data[0].is_closed ? 'closed' : 'open'}</p>
            <img src={this.state.data[0].image_url}/>
          </div>
          )
    return (
      <div>
        {display}
      </div>
    );
  }
}
