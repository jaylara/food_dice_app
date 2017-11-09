import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import Header from '../common/Header';
import Search from '../results/Search';

import './Random.css'

//Displays a random location, from an axios call to Yelp API
export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state={
      location: '',
      randomPick: '',
      location :{latitude: null,longitude: null}
    } // end of initialize this.state

    this.handleRandom=this.handleRandom.bind(this);
    this.toggleMap=this.toggleMap.bind(this);
    this.formatAddress=this.formatAddress.bind(this);
    this.formatCategories=this.formatCategories.bind(this);
    this.formatPhoneNumber=this.formatPhoneNumber.bind(this);
  } // end of constructor

  handleRandom(e){
    e.preventDefault();
    let idLength = 50;
    axios.get(`https://yelpprox.herokuapp.com/search?term=restaurant&limit=${idLength}&location=${this.refs.locationseed.value}`)
    .then((res) => {
      //check each business' categories
      //remove businesses that
      idLength = res.data.businesses.length
      let randomIndex = Math.floor(Math.random()*idLength)
      this.setState({
        randomPick: res.data.businesses[randomIndex]
      })
    }) // end of axios.get.then
    .catch((error)=>{
      console.log('error');
      this.setState({
        randomPick: null,
        isMapHidden: true
      })
    }) // end of axios.get.then
  } // end of handleRandom()

  //Returns a string representation of a business' formatted address
  formatAddress(location){
    var address = '';
    address += location.address1 ? location.address1 : "";
    address += location.address2 ? location.address2 : "";
    address += location.address3 ? location.address3 : "";
    address += location.city ? ", "+location.city : "";
    address += location.state ? ", "+location.state : "";
    address += location.zip_code ? " "+location.zip_code : "";
    return address
  } // end of formatAddress()

  //Returns a string representation of a business' categories
  formatCategories(business){
    var categories = '';
    for(let i of business.categories){
      categories += i.title + ' ';
    }
    return categories;
  } // end of formatCategories()

  //Returns a string representation of a business' phone number
  formatPhoneNumber(phonenum) {
    var newNumber = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (newNumber.test(phonenum)) {
      var parts = phonenum.match(newNumber);
      var phone = "";
      if (parts[1]) { phone += "(" + parts[1] + ") "; }
      phone += parts[2] + "-" + parts[3];
      return phone;
    } // end of if
    else {
      //invalid phone number
      return phonenum;
    } // end of else
  } // end of formatPhoneNumber()

  toggleMap(e) {
    this.setState({
      isMapHidden : !this.state.isMapHidden
    })
  }

  componentDidMount() {
    if ("geolocation" in navigator) { //geolocation is available

      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        this.setState({
          location : position.coords
        })
      });
    } else { //geolocation IS NOT available
      console.log ("error");
    }
  }

  render() {
    var business = this.state.randomPick;
    var location = "";
    var isOpened = "";
    var categories = "";
    var phonenum = "";
    var staticMapSrc = "";
    var staticMapStyle = "";
    var randomOutputContainer = {};
    if (business) {
      location = (business.location) ? this.formatAddress(business.location): '';
      isOpened = business.is_closed ? <span>Closed</span> : <span>Opened</span>;
      categories = this.formatCategories(business);
      phonenum = (business.phone)?this.formatPhoneNumber(business.phone):'';
      randomOutputContainer = {
        backgroundImage: `url(${business.image_url})`,
        visibility:'visible'
      };
      var staticMapSrc=`https://maps.googleapis.com/maps/api/staticmap?`
                        //+ `center=${this.state.location.latitude},${this.state.location.longitude}`
                        + `center=${business.coordinates.latitude},${business.coordinates.longitude}`
                        + `&zoom=13&size=400x400&sensor=false`
                        + `&key=AIzaSyDDQfQVi8sWBRMBLHMfmkcBko6r44-mo9o`;
      this.formatCategories(business);
    } // end of if

    return (
      <div className='random-container'>
        <h1>Dont even care?</h1>
        <input type='text' placeholder='City and State OR Zipcode' ref='locationseed'
                onKeyDown={(e) => {if(e.keyCode === 13) this.handleRandom(e)}}/>
        <input type='button' value='Roll The Dice' onClick={this.handleRandom}/>

        <div className="random-container-output" style={randomOutputContainer}>

          <div className="business-title">
            <a href={business.url} target="_blank" title={business.name}><h1>{business.name}</h1></a>
            <div>
              <h3>{business.price}</h3>
              <h3>{business.rating}</h3>
            </div>
          </div>
          <div className="business-map" onClick={this.toggleMap}>
            <div>🗺</div>
            {this.state.isMapHidden && <img id="static-map" src={staticMapSrc} alt={business.name} /> }
          </div>
          <div className="business-title">
            <p>{categories}</p>
            <p>{location}</p>
            <p>{phonenum}</p>
            <p>{isOpened}</p>
          </div>
        </div>
      </div>
    ) // end of return
  } // end of render()
} // end of Random component
