import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import Header from '../common/Header';
import Search from '../results/Search';
import './Random.css';

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
    this.formatPhoneNumber=this.formatPhoneNumber.bind(this);
  }


  handleRandom(e){
    (e).preventDefault();
    console.log(this.refs.locationseed.value);
    let idLength = 50;
    axios.get(`https://yelpprox.herokuapp.com/search?term=restaurant&limit=${idLength}&location=` + this.refs.locationseed.value)
    .then((res) => {
      //check each business' categories
      //remove businesses that
      idLength = res.data.businesses.length
      let randomIndex = Math.floor(Math.random()*idLength)
      this.setState({
        randomPick: res.data.businesses[randomIndex]
      })
      console.log(this.state.randomPick);
      console.log(res)
    })
    .catch((error)=>{
      console.log('error');
    })
  }

    formatAddress(location){
      var address = '';
      if (location.address1){
        address += location.address1;
      } if (location.address2){
        address += ' '+location.address2;
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

    formatPhoneNumber(phonenum) {
        var newNumber = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (newNumber.test(phonenum)) {
            var parts = phonenum.match(newNumber);
            var phone = "";
            if (parts[1]) { phone += "(" + parts[1] + ") "; }
            phone += parts[2] + "-" + parts[3];
            return phone;
        }
        else {
            //invalid phone number
            return phonenum;
        }
    }

    // this.setState({
    //   randomPick: this.refs.locationseed.value
    // })
    //set location state
    //do axios call to Yelp API
    //change state to display random pick


  render() {
    var business = this.state.randomPick;
    var location = '';
    var isOpened ='';
    var categories = '';
    var phonenum = '';
    var ramdomOutputContainer = {}, ramdomBusinessTitle;
    if (business) {
      location = (business.location)?this.formatAddress(business.location): '';
      isOpened = business.is_closed?<span>Closed</span>:<span>Opened</span>;
      categories = this.displayCategories(business);
      phonenum = (business.phone)?this.formatPhoneNumber(business.phone):'';
      ramdomOutputContainer = {
          margin: 'auto',
          color: 'white',
          backgroundImage: 'url(' + business.image_url + ')',
          WebkitTransition: 'all', // note the capital 'W' here
          msTransition: 'all', // 'ms' is the only lowercase vendor prefix
          height: '500px',
          width: '75%',
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',

          boxShadow: '1px 1px 2px #01579B'
          };
      ramdomBusinessTitle = {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.75)',
        padding: '3px 10px',

        textShadow: '1px 1px 2px #01579B'
      };
      this.displayCategories(business);
    }




    return (
     <div>

       <div className='random-container-main'>
        <div className='searchTypeLinks'>
          <ul className='searchTypeLinksList'>
            <li className='listItem' ><NavLink className='links searchLink' to='/Search'>Search</NavLink></li>
            <li className='listItem' id='selectedRandom'><NavLink className='links randomLink' to='/Random'>Don't Even Care!</NavLink></li>
          </ul>
        </div>

          <div className='random-container'>
            <h1>Don't even care?</h1>
            <input type='text' placeholder='City and State OR Zipcode' ref='locationseed'/>
            <input type='button' value='Roll The Dice' onClick={this.handleRandom}/>
            <div style={ramdomOutputContainer}>
              <div style={ramdomBusinessTitle}>
                <a href={business.url} target="_blank" title={business.name}><h1>{business.name}</h1></a>
                <div>
                  <h3>{business.price}</h3>
                  <h3>{business.rating}</h3>
                </div>
              </div>

              <div style={ramdomBusinessTitle}>
                <p>{categories}</p>
                <p>{location}</p>
                <p>{phonenum}</p>

                <p>{isOpened}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
