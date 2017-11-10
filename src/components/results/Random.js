import React, { Component } from 'react';
// import { BrowserRouter as NavLink } from 'react-router-dom';
import axios from 'axios';

import './Random.css'

//Displays a random location, from an axios call to Yelp API
export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state={
      randomPick: '',
      location :{latitude: null,longitude: null}
    } // end of initialize this.state

    this.handleRandom=this.handleRandom.bind(this);
    this.toggleMap=this.toggleMap.bind(this);
    this.formatAddress=this.formatAddress.bind(this);
    this.formatCategories=this.formatCategories.bind(this);
    this.formatPhoneNumber=this.formatPhoneNumber.bind(this);
  } // end of constructor


  //handles a click event. toggles isMapHidden flag each time map icon is clicked.
  toggleMap(e) {
    this.setState({
      isMapHidden : !this.state.isMapHidden
    })
  } // end of toggleMap()

  //handles a click event. uses value of locationseed textbox to populate ajax request string
  handleRandom(e){
    e.preventDefault();
    //exits if locationseed is empty
    if(!this.refs.locationseed.value) {
      if (navigator.geolocation) { //geolocation is available
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            location : position.coords
          })
        });
      } //end of navigator.geolocation check
    }// end of if

    axios.get(`https://yelpprox.herokuapp.com/search?term=restaurant&limit=50&location=${this.refs.locationseed.value}`)
    .then((res) => {
      this.setState({
        randomPick: res.data.businesses[Math.floor(Math.random()*res.data.businesses.length)]
      })
    }) // end of axios.get.then
    .catch((error)=>{
      this.setState({
        randomPick: null,
        isMapHidden: true
      })
    }) // end of axios.get.catch
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
    return address;
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

  render() {
    var business = this.state.randomPick;

    var location = "";
    var isOpened = "";
    var categories = "";
    var phonenum = "";
    var staticMapSrc = "";
    var randomOutputContainer = {};

    //if a business found, format business output fields
    if (business) {
      location = (business.location) ? this.formatAddress(business.location): '';
      isOpened = (business.is_closed) ? <span>Closed</span> : <span>Opened</span>;
      categories = this.formatCategories(business);

      phonenum = (business.phone)?this.formatPhoneNumber(business.phone):'';
      randomOutputContainer = {
        backgroundImage: `url(${business.image_url})`,
        visibility:'visible'
      };
      //Google Static Map API call
      staticMapSrc=`https://maps.googleapis.com/maps/api/staticmap?`
                        //+ `center=${this.state.location.latitude},${this.state.location.longitude}`
                        + `center=${business.coordinates.latitude},${business.coordinates.longitude}`
                        + `&zoom=13&size=400x400&sensor=false`
                        + `&key=AIzaSyDDQfQVi8sWBRMBLHMfmkcBko6r44-mo9o`;
    } // end of if

    return (
      <div className='random-container'>
{/*
        <div className='searchTypeLinks test9'>
          <ul className='searchTypeLinksList'>
            <li className='listItem'><NavLink className='links searchLink' to='/Search'>Search</NavLink></li>
            <li className='listItem' id='selectedRandom'><NavLink className='links randomLink' to='/Random'>Dont Even Care!</NavLink></li>
          </ul>
        </div>*/}
        <h1 className="header">Dont even care?</h1>
        <div className="form-container">
          <input type='text' placeholder='City and State OR Zipcode' ref='locationseed'
                  onKeyDown={(e) => {if(e.keyCode === 13) this.handleRandom(e)}}/>
          <input type='button' id='submit-roll-dice' value='Roll The Dice' onClick={this.handleRandom}/>
        </div>
        <div className="random-container-output" style={randomOutputContainer}>

          <div className="business-title">
            <a href={business.url} target="_blank" title={business.name}>
              <h1>{business.name}</h1>
            </a>
            <h1 onClick={this.toggleMap}>🗺</h1>

            <div>
              <h3>{business.price}</h3>
              <h3><img src={'/img/small_'+business.rating+'.png'} /></h3>
            </div>
          </div>
          <div className="business-map" >
            {this.state.isMapHidden && <img id="static-map" src={staticMapSrc} alt={business.name} /> }
          </div>
          <div className="business-title">
            <p>{categories}</p>
            <p>{location}</p>
            <p><a href="tel:{phonenum}">{phonenum}</a></p>
            <p>{isOpened}</p>
          </div>
        </div>
      </div>
    ) // end of return
  } // end of render()
} // end of Random component
