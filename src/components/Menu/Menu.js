import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import x from '../../images/X.svg'
import TweenMax from 'gsap'
import $ from 'jquery'
import {connect} from 'react-redux';
import {updateLocationActive, getUserInfo, updateUserLocation, getFriendsList, getGroups, getActiveLocations, getPendingFriendRequests, getEmergencyGroup} from './../../ducks/reducer';
import {heartbeat, renameGroup, socketOn, updateSenderLocation} from './../../controllers/socketCTRL';
import axios from 'axios';

//LINK TO REDUX --> be able to change if userLoggedIn flag
class Menu extends Component{
    constructor() {
        super();
    }

    componentWillMount(){
        axios.get('/auth/me')
            .then(response=> {
                console.log('auth/me', response.data)
                // this.props.getUserInfo(response.data.userInfo)
                // this.props.getGroups(response.data.groups)
                // this.props.getFriendsList(response.data.friends)
                // this.props.getActiveLocations(response.data.getActiveLocations)
                // this.props.getEmergencyGroup(response.data.getEmergencyGroup)
                // this.props.getPendingFriendRequests(response.data.getPendingFriendRequests)
            })
            

        }
        
    componentDidMount(){
        socketOn();
        
        let {getUserInfo, getFriendsList, getGroups, getActiveLocations, getPendingFriendRequests, getEmergencyGroup} = this.props;
        
        heartbeat(getFriendsList, getUserInfo, getGroups, getActiveLocations, getPendingFriendRequests, getEmergencyGroup);
    }

            
    

    componentWillReceiveProps(props){
        if(props.user) {
            if(this.props.locationActive){               
                navigator.geolocation.getCurrentPosition(position => {
                    updateSenderLocation(`${position.coords.latitude}*${position.coords.longitude}`)
                })
            } 
        }
        
    }
    
    render(){

        return(
            <div className="Menu">

                <div className='navigateContainer'>

                    <div className='menuContainer'>
                      <Link to='/home' onClick={()=> this.props.toggleMenu('exit')} className="home buttn">Home</Link>
                      <Link onClick={()=> this.props.toggleMenu('exit')} to='/profile' className="profile buttn" > Profile</Link>
                      <Link onClick={()=> this.props.toggleMenu('exit')} to='/situations' className="situations buttn">Situations</Link>
                      <Link onClick={()=> this.props.toggleMenu('exit')} to='/about' className="about buttn">About</Link>
                      <a onClick={()=> this.props.toggleMenu('exit')} href='http://localhost:3069/auth/logout' className="logout buttn">Logout</a>
                      <div className="exit">
                          <img className="x" onClick={()=> this.props.toggleMenu('exit')} src={x} alt="close"/>
                      </div>
                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

let outputActions = {
    updateLocationActive,
    getUserInfo,
    updateUserLocation,
    getFriendsList,
    getGroups,
    getActiveLocations,
    getPendingFriendRequests,
    getEmergencyGroup
}

export default connect(mapStateToProps, outputActions)(Menu);
