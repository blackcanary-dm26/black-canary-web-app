import React, { Component } from 'react';
import TweenMax from 'gsap';
import $ from 'jquery';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {updateLocationActive, getInitialFriends, getInitialGroups} from './../../ducks/reducer';
import {sendLocation, sendCurrentUser} from './../../controllers/socketCTRL';
// import blackCanaryLogo from './../../images/canaryLogoWithoutWords.svg';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');


class LevelOne extends Component {
  constructor() {
      super();

      this.state = {
        title: '',
        message: '',
        individualRecipients: [],
        timeActive: 60 * 1000 * 60,
        groupRecipients: [],
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
//     let {getInitialFriends, getInitialGroups, getInitialUserInfo, getInitialPendingFriendRequests} = this.props;
//     getInitialFriends()
//     getInitialGroups()
    
// }

  componentDidMount(){
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

  setCustomTitle(event){
    event.preventDefault()
    this.setState({
      title: event.target.value
    })
    // console.log(this.state.title);
  }

  saveMessage(event){
    event.preventDefault()
    this.setState({
        message: event.target.value
    })
  }

  toggleFriend(event, userObj) {
    event.preventDefault()
    let index = this.state.individualRecipients.indexOf(userObj.friend_user_id);
  
    let r = this.state.individualRecipients.slice(0);
    if(index >= 0) {
      //remove from recip and change color back
      TweenMax.to($(`#${userObj.friend_username}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
      r.splice(index, 1);
    } else {
      //to recip, change color
      TweenMax.to($(`#${userObj.friend_username}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
      r.push(userObj.friend_user_id);
    }

    this.setState({
      individualRecipients: r
    })

    // setTimeout(()=>{
    //   console.log(this.state.individualRecipients)
    // }, 1000);

  }

  toggleGroup(event, groupObj) {
    event.preventDefault()
    let gr = this.state.groupRecipients.slice(0);
    let index = -1;
    for(let i = 0; i < gr; i++){
      if(groupObj.groupID === gr[i].groupID) {
        let index = i;
      }
    }
  
    if(index >= 0) {
      // console.log('We, the '+groupObj.groupName+'are being removed')      
      //remove from recip and change color back
      TweenMax.to($(`#${groupObj.groupID}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
      gr.splice(index, 1);
    } else {
      //to recip, change color
      // console.log('We, the '+groupObj.groupName+'were added')
      TweenMax.to($(`#${groupObj.groupID}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
      gr.push(groupObj);
    }

    this.setState({
      groupRecipients: gr
    })
    // setTimeout(()=>{
    //   console.log(this.state.groupRecipients)
    // }, 1000);

  }

  chooseTime(val) {
    this.setState({
      timeActive: +val
    })
  }

  sendLocToSocket() {
    console.log('I am ',this.props.userLoc);
    this.props.updateLocationActive(true);
    sendLocation({
      user_id: this.props.user.id,
      user_coordinates: this.props.userLoc,
      situation: this.state.title,
      situation_level: 1,
      message: this.state.message,
      individual_recip: this.state.individualRecipients,
      group_recip: this.state.groupRecipients,
      time_active: this.state.timeActive
    })
    setTimeout(() => {
      this.props.updateLocationActive(false);
    }, +this.state.timeActive)

  }

  render() {

    return (
        <div id="Level1">
          <div className="wrapper">
            <header>{
              this.props.match.params.id === "custom" ?
              <input className="customHeaderInput" placeholder="Enter situation" onChange={(e)=> this.setCustomTitle(e)}></input> :
              this.props.match.params.id.split("_").join(" ")}</header>
            <section className="situationContainer">
              <div className="messageWrapper">
                <h3>Message:</h3>
                <textarea maxLength="180" onChange={e => this.saveMessage(e)}></textarea>
              </div>
              <div className="recipWrapper">
                <h3>To:</h3>
                <div>
                  { this.props.friends ?
                    this.props.friends.map(e => {
                      return <button key={e.friend_username} id={e.friend_username} onClick={event => this.toggleFriend(event, e)} >{`${e.friend_firstname} ${e.friend_lastname}`}</button>
                    })
                    :
                    null
                  }
                  {
                    this.props.groups ?
                    this.props.groups.map(e => {
                      return <button key={e.groupID} id={e.groupID} onClick={event => this.toggleGroup(event, e)} >{`${e.groupName}`}</button>
                    })
                    :
                    null
                  }
                </div>
              </div>
              <div className="timeWrapper">
                <h3>Time Active:</h3>
                <select value={this.state.timeActive} onChange={e => this.chooseTime(e.target.value)}>
                  <option disabled selected value>Select a Time</option>
                  {this.state.timeOptions.map(e => {
                    return <option key={+e.time} value={+e.timeMS}>{`${e.time} hours`}</option>
                  })}
                </select>
              </div>
              <div className="buttnWrapper">
                <Link to='/home'><button onClick={() => {this.sendLocToSocket()}}>SEND</button></Link>
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

let outputActions = {
  updateLocationActive,
  getInitialFriends,
  getInitialGroups
}

export default connect(mapStateToProps, outputActions)(LevelOne);
