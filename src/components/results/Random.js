import React, { Component } from 'react';
import axios from 'axios';

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state={
      location: '',
      randomPick: ''
    }

    this.handleRandom=this.handleRandom.bind(this);
  }

  handleRandom(e){
    console.log(this.refs.locationseed.value);
    axios.get('https://yelpprox.herokuapp.com/search?location=' + this.refs.locationseed.value)
    .then((res) => {
      let randomIndex = Math.floor(Math.random()*20)
      this.setState({
        randomPick: res.data.businesses[randomIndex].name
      })
      console.log(res.data.businesses)
    })
    .catch((error)=>{
      console.log('error');
    })

    // this.setState({
    //   randomPick: this.refs.locationseed.value
    // })
    //set location state
    //do axios call to Yelp API
    //change state to display random pick

  }

  render() {
    return (
      <div className='random-container'>
        <h1>Dont even care?</h1>
        <input type='text' placeholder='City and State OR Zipcode' ref='locationseed'/>
        <input type='button' value='Roll The Dice' onClick={this.handleRandom}/>
        <div className='ramdomOutputContainer'>
          {this.state.randomPick}
        </div>
      </div>
    )
  }
}
