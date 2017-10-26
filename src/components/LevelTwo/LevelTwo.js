import React, { Component } from 'react';
import TweenMax from 'gsap';
import $ from 'jquery';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateLocationActive, getInitialEmergencyGroup, getInitialUserInfo} from './../../ducks/reducer';
import {sendLocation, sendCurrentUser} from './../../controllers/socketCTRL';
// import blackCanaryLogo from './../../images/canaryLogoWithoutWords.svg';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');



class LevelTwo extends Component {
  constructor() {
      super();

      this.state = {
        title: '',
        message: '',
        individualRecipients: ['should be set in profile'],
        timeActive: 0,
        recipientIds: [], 
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

  componentWillMount(){
    let {getInitialUserInfo, getInitialEmergencyGroup} = this.props;
    getInitialUserInfo()
    getInitialEmergencyGroup()
    
  }

  componentDidMount(){
    console.log(this.props.match.params);
    let x = this.props.match.params.id.split("_").join(" ").toUpperCase();
    let recips = this.props.emergencyGroup.map(contact => {
      return contact.emergency_contact_id
    })
    this.setState({
      title: x,
      recipientIds: recips
    })

    setTimeout(()=> {
      if(this.props.user.id){
          console.log('home send current user', this.props.user)
          sendCurrentUser(this.props.user)
      }}
      , 500)
  }

  saveMessage(event){
    event.preventDefault()
    this.setState({
        message: event.target.value
    })
  }

  chooseTime(val) {
    this.setState({
      timeActive: val
    })
  }

  sendLocToSocket() {
    console.log('I am ',this.props.userLoc);
    this.props.updateLocationActive(true);
    sendLocation({
      user_id: this.props.user.id,
      user_coordinates: this.props.userLoc,
      situation: this.state.title,
      situation_level: 2,
      message: this.state.message,
      individual_recip: this.state.recipientIds,
      // group_recip: [],
      time_active: this.state.timeActive
    })
    setTimeout(() => {
      this.props.updateLocationActive(false);
    }, +this.state.timeActive)
  }

  render() {

    return (
        <div id="Level2">
          <div className="wrapper">
            <header>{this.props.match.params.id.split("_").join(" ")}</header>
            <section className="situationContainer">
              <div className="messageWrapper">
                <h3>Message:</h3>
                <textarea maxLength="180" onChange={e => this.saveMessage(e)}></textarea>
              </div>
              <div className="timeWrapper">
                <h3>Time Active:</h3>
                <select value={this.state.timeActive} onChange={e => this.chooseTime(e.target.value)}>
                  {this.state.timeOptions.map(e => {
                    return <option key={e.time} value={e.timeMS}>{`${e.time} hours`}</option>
                  })}
                </select>
              </div>
              <div className="buttnWrapper">
                <Link to="/home"><button onClick={() => {console.log('no i hate u'); this.sendLocToSocket()}}>SEND</button></Link>
              </div>
            </section>
          </div>
          {/* <div className="redirect">
              <p>You do not have any emergency contacts set. Please add your emergency contacts.</p>
              <Link to="/profile">Set Emergency Contacts</Link>
          </div> */}
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

export default connect(mapStateToProps, outputActions)(LevelTwo);
