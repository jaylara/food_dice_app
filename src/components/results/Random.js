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
    this.formatAddress=this.formatAddress.bind(this);
    this.displayCategories=this.displayCategories.bind(this);
  }

  handleRandom(e){
    console.log(this.refs.locationseed.value);
    axios.get('https://yelpprox.herokuapp.com/search?location=' + this.refs.locationseed.value)
    .then((res) => {
      let randomIndex = Math.floor(Math.random()*20)
      this.setState({
        randomPick: res.data.businesses[randomIndex]
      })
      console.log(this.state.randomPick.categories)
    })
    .catch((error)=>{
      console.log('error');
    })

     // for (var i=0; i< this.state.randomPick.categories.length; i++){
     //    console.log(this.state.randomPick.categories[i])
     //  }

  }

    formatAddress(location){
      var address = '';
      if (location.address1){
        address += location.address1;
      } if (location.address2){
        address += location.address2;
      } if (location.address3){
        address += location.address3;
      }
      if (location.city){
        address += ', '+location.city;
      } if (location.state){
        address += ', '+location.state;
      } if (location.zip_code){
        address += ' '+location.zip_code;
      }
      return address
    }

    displayCategories(business){
      var categories = '';
      for(let i of business.categories){
        categories += i.title + ' ';
      }
      return categories
    }

    // this.setState({
    //   randomPick: this.refs.locationseed.value
    // })
    //set location state
    //do axios call to Yelp API
    //change state to display random pick


  render() {
    var business = this.state.randomPick;
    var location = (business.location)?this.formatAddress(business.location): '';
    var isOpened ='';
    var categories = '';
    if (business) {
      isOpened = business.is_closed?<span>Closed</span>:<span>Opened</span>;
      categories = this.displayCategories(business);
      this.displayCategories(business);
    }

    return (
      <div className='random-container'>
        <h1>Dont even care?</h1>
        <input type='text' placeholder='City and State OR Zipcode' ref='locationseed'/>
        <input type='button' value='Roll The Dice' onClick={this.handleRandom}/>
        <div className='ramdomOutputContainer'>
          {business.name}<br/>
          {categories}<br/>
          {business.price}
          <img className='randomPickImage' src={business.image_url} alt={business.name}/>
          {business.rating}<br/>
          {location}<br/>
          {isOpened}<br/>




        </div>
      </div>
    )
  }
}
