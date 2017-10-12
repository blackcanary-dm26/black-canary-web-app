import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import MapContainer from './../MapContainer/MapContainer';
import Login from '../Login/Login';
import TweenMax from 'gsap';
import $ from 'jquery';
import {connect} from 'react-redux';
import {getUserInfo, updateUserLocation, getFriendsList, getGroups, getActiveLocations, getPendingFriendRequests, getEmergencyGroup} from './../../ducks/reducer';
import {heartbeat, renameGroup, socketOn, updateSenderLocation} from './../../controllers/socketCTRL';
import map from '../../images/placeholder_map.gif'

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');


class Home extends Component{

    constructor(){
      super();
      this.state = {
        userLoggedIn: false,
        location: {
            lat: 40.226192,
            lng: -111.660776
        },
        user: {username: 'Odysseus'},
        locationActive: false
      }
    }

    componentDidMount(){

        // socket.on('connect', ()=> {
        //     console.log('home socket id:',socket.id)
        //     socket.emit('save socket_id', {socketId: socket.id})
        // })
        socketOn();

        let {getUserInfo, getFriendsList, getGroups, getActiveLocations, getPendingFriendRequests, getEmergencyGroup} = this.props;

        heartbeat(getFriendsList, getUserInfo, getGroups, getActiveLocations, getPendingFriendRequests, getEmergencyGroup);

    }

    componentWillReceiveProps(props){
        // console.log(props)
        if(props.user) {
            // console.log(`state username`, this.state.user.username);
            // console.log(`props username`, props.user.username);
            if(this.state.user.username !== props.user.username) {
                console.log('HELLO HERAAM', props.user)
                this.setState({
                    user: props.user,
                    userLoggedIn: true
                })


            }
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
                props.updateUserLocation(`${position.coords.latitude}*${position.coords.longitude}`)
                
            })
            // this.locationTracker();
        }
    }





    render(){
        let {user, userLoc, friends, groups, getActiveLocations} = this.props;
        // console.log(userLoc);
        return(
            <div id="Home">
                
                <div className='navContainer'>
                    <Link to='/situations'> <p className="head">SITUATIONS</p> </Link>
                    <Link to='/profile'> <p className="head"> PROFILE</p> </Link>
                </div>
                <MapContainer styleMapContainer={{height: '60vh', width: '100vw'}} style={{width: '100vw'}} isHome={true} canary={{name: `User`, lat: this.state.location.lat, lng: this.state.location.lng }}/>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

let outputActions = {
    getUserInfo,
    updateUserLocation,
    getFriendsList,
    getGroups,
    getActiveLocations,
    getPendingFriendRequests,
    getEmergencyGroup
}

export default connect(mapStateToProps, outputActions)(Home);
