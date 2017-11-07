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
      hi:[]
    };

    this.access = {
      client_id: '3-N_879q6D3M6P3s3KplCA',
      client_secret: 'KqyZ9kAqWo6VUCyRfUau0fWCTyJpPpicNj2e7y69emmTosk4yqJHGrcyDX1UZ5vW',
      access_token: "zhu9COybkCTwEVuw-DQGBnJPx0mUdbtEEG9H-_5ouY6m-yZkcVxQjzkv1D0jXO0gkcSlq6_SS5okYRpJo9ZTy2dBPBW1uR_Ffm6YstSPMvsddTXUtzc66DQnhoIAWnYx",
      expires_in: 637498157,
      token_type: "Bearer"
    }

    this.prepData = this.prepData.bind(this);
    this.prepareQuery = this.prepareQuery.bind(this);
    this.axiosRequest = this.axiosRequest.bind(this);
    this.updateArray = this.updateArray.bind(this);
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
    let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${ foodTerm }&location=austin&limit=${ limit }`;

    axios.get(url,{
      //params
      'headers': {
        'Authorization': 'Bearer ' + this.access.access_token,
      }
    }).then((response)=>{
      // console.log(response.data.businesses);
      // this.setState({
      //   data: response.data.businesses
      // })
      this.prepData(response);
    }).catch(e => e);
  }

  prepareQuery(e) {
    e.preventDefault();
    this.setState({
      hasSearched: true
    })

    for (let i of this.state.inputs) {
      this.axiosRequest(i);
    }
  }

  updateArray(e) {
    this.state.inputs.push(e.target.value);
  }

  prepData(data) {
    console.log(data.data.businesses[0].name);
    console.log(data.data.businesses[0].image_url);
    console.log(data.data.businesses[0].location);
    this.setState ({
      data: data.data.businesses[0]
    })
    console.log(typeof(this.state.hi));
  }

  render() {

    let display;
    !this.state.hasSearched?
      display = (
        <div>
          <h1 className="header">What are you craving?</h1>
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
          <div>
            <p>{this.state.data.name}</p>
            <img src={this.state.data.image_url} />
          </div>
          )
    return (
      <div>
        {display}
      </div>
    );
  }
}
