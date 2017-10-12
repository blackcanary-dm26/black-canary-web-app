import React, { Component } from 'react';
import TweenMax from 'gsap';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateLocationActive, getInitialEmergencyGroup, getInitialUserInfo} from './../../ducks/reducer';
import {sendLocation, sendCurrentUser} from './../../controllers/socketCTRL';
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
        // timeActive: 24 * 60 * 60 * 1000, //24 hours
        timeActive: 30 * 1000, //for testing
        groupRecipients: ['should be set in profile'],
        recipientIds: [], 
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

//   componentWillMount(){
//     let {getInitialUserInfo, getInitialEmergencyGroup} = this.props;
//     getInitialUserInfo()
//     getInitialEmergencyGroup()
    
// }

  componentDidMount(){
    console.log(this.props.match.params);
    let x = this.props.match.params.id.split("_").join(" ").toUpperCase()
    this.setState({
      title: x
    })

    setTimeout(()=> {
      if(this.props.user.id){
          console.log('home send current user', this.props.user)
          sendCurrentUser(this.props.user)
      }}
      , 500)
  }

  sendLocToSocket() {
    console.log('I am ',this.props.userLoc);
    this.props.updateLocationActive(true);
    sendLocation({
      user_id: this.props.user.id,
      user_coordinates: this.props.userLoc,
      situation: this.state.title,
      situation_level: 3,
      message: this.state.message,
      individual_recip: this.state.recipientIds,
      // group_recip: this.state.groupRecipients
      time_active: this.state.timeActive
    })
    setTimeout(() => {
      this.props.updateLocationActive(false);
    }, +this.state.timeActive)
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

          <div className="redirect">
              <p>You do not have any emergency contacts set. Please add your emergency contacts.</p>
              <Link to="/profile">Set Emergency Contacts</Link>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state){
    return state;
}

let outputActions = {
  updateLocationActive,
  getInitialUserInfo,
  getInitialEmergencyGroup
}

export default connect(mapStateToProps, outputActions)(LevelThree);