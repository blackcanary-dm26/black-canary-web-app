import React, { Component } from 'react';
import TweenMax from 'gsap';
import $ from 'jquery';
import {connect} from 'react-redux';
import {getUserInfo, updateUserLocation, getFriendsList, getGroups, getActiveLocations} from './../../ducks/reducer';
import {sendLocation} from './../../controllers/socketCTRL';
// import blackCanaryLogo from './../../images/canaryLogoWithoutWords.svg';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');


class LevelThree extends Component {
  constructor() {
      super();

      this.state = {
        title: '',
        message: 'THIS SHOULD BE SET IN PROFILE',
        individualRecipients: ['should be set in profile'],
        timeActive: 24 * 60 * 60 * 1000, //24 hours
        groupRecipients: ['should be set in profile'],
        timeOptions: [
          {
            time: 1,
            timeMS: 3600000
          },
          {
            time: 2,
            timeMS: (2 * 3600000)
          },
          {
            time: 3,
            timeMS: (3 * 3600000)
          },
          {
            time: 5,
            timeMS: (5 * 3600000)
          },
          {
            time: 10,
            timeMS: (10 * 3600000)
          },
          {
            time: 18,
            timeMS: (18 * 3600000)
          },
          {
            time: 24,
            timeMS: (24 * 3600000)
          }
        ]
      }
  }

  componentDidMount(){
    console.log(this.props.match.params);
    let x = this.props.match.params.id.split("_").join(" ").toUpperCase()
    this.setState({
      title: x
    })
  }

  sendLocToSocket() {
    // console.log('I am ',this.props.userLoc);
    sendLocation({
      user_id: this.props.user.id,
      user_coordinates: this.props.userLoc,
      situation: this.state.title,
      situation_level: 3,
      message: this.state.message,
      individual_recip: this.state.individualRecipients,
      group_recip: this.state.groupRecipients
    })
  }

  render() {

    return (
        <div id="Level3">
          <div className="wrapper">
            <header>{this.props.match.params.id.split("_").join(" ")}</header>
            <section className="situationContainer">
              <div className="buttnWrapper">
                <button onClick={() => {console.log('no i hate u'); this.sendLocToSocket()}}>SEND</button>
              </div>
            </section>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(LevelThree);