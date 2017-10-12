import React, {Component} from 'react';
import addFriend from '../../images/addFriendIconReal.png'
import x from '../../images/x.png'
import FriendModal from './../FriendModal/FriendModal';
import {connect} from 'react-redux';
import {getFriendsList, getGroups} from './../../ducks/reducer';
import FriendSearchModal from '../FriendSearchModal/FriendSearchModal'

import {confirmFriendRequest, declineFriendRequest, deleteFriend} from './../../controllers/socketCTRL';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');


class Contacts extends Component{
    constructor(){
        super()
        this.state={
            friendModal: false,
            friend: null,
            showSearch: false
        }
        this.showModalMethod = this.showModalMethod.bind(this)
        this.exit = this.exit.bind(this)
        this.toggleSearch = this.toggleSearch.bind(this)
    }

    showModalMethod(friend){
        this.setState({
            friendModal: true,
            friend
        })
    }

    exit(){
        this.setState({
            friendModal: false
        })
    }

    toggleGroupAdd(event, groupObj) {

    }

    toggleSearch(input){
      this.setState({
        showSearch: !this.state.showSearch
      })
    }

 
    render(){
        // console.log(this.props.pendingFriendRequests)

    const allGroups = this.props.groups.map((group, i)=>{
        return(
            <div key={i}>
                <p className="groups">{group.name}</p>
            </div>
        )
    })

    const pendingFriends= this.props.pendingFriendRequests.map((friend, i) => {
        return (
            <div key={i} className="listOfFriends">
                <div><img className="imgContainer" src={friend.friend_pic} alt="profile pic"/></div>
                <div className='nameContainer'>
                    <p className="name">{friend.friend_firstname}</p>
                    <button onClick={()=>confirmFriendRequest(friend.friend_table_id)}>WATCH OVER</button>
                    <button onClick={()=>declineFriendRequest(friend.friend_table_id)}>DECLINE</button>
                </div>
            </div>)
        });

    const allFriends = this.props.friends.map((friend, i)=>{
        if(friend.friend_status === true) {
            return(
                    <div key={i} className="listOfFriends">
                        <div><img className= "imgContainer" src={friend.friend_pic} alt="profile pic"/></div>
                        <div className='nameContainer'>
                            <p className="name">{friend.friend_firstname}</p>
                            <button className="seeInfo" onClick={_=>this.showModalMethod(friend)}>SEE INFO</button>

                            <button onClick={()=> deleteFriend(friend.friend_table_id)}>REMOVE</button>
                        </div>
                    </div>
            )
        } 
    })

        return(
            <div className="Contacts">

            {/* NEED A PLACE TO SHOW PENDING FRIEND REQUESTS AND CONFIRM OR DECLINE REQUEST.
            IF YOU MAP THROUGH THIS.PROPS.FRIENDS, FRIEND_STATUS = FALSE MEANS THAT THE FRIEND REQUEST IS PENDING */}

                {
                    !this.state.friendModal
                    ?
                    <div>
                        <div className="pendingContact">
                            {pendingFriends}
                        </div>
                        {allFriends}
                    </div>
                    :
                        <FriendModal exit={this.exit} friend={this.state.friend} groups={this.props.groups}/>
                }

                    <div className='header'>
                        <header className='head'>CONTACTS</header>
                        <img className="addFriend" onClick={_=>this.toggleSearch()}src={addFriend} alt="addFriendIcon"/>
                    </div>
                    {
                      this.state.showSearch
                      ?
                      <FriendSearchModal toggleSearch={this.toggleSearch} 
                      
                      />
                      :
                      null
                    }
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

let outputActions = {
    getFriendsList,
    getGroups
}

export default connect(mapStateToProps, outputActions)(Contacts);
