import React, {Component} from 'react';
import addFriend from '../../images/addFriendIconReal.png'
import x from '../../images/x.png'
import FriendModal from './../FriendModal/FriendModal';
import {connect} from 'react-redux';
import {getFriendsList, getGroups, getInitialUserInfo, getInitialFriends, getInitialPendingFriendRequests, getInitialGroups} from './../../ducks/reducer';
import FriendSearchModal from '../FriendSearchModal/FriendSearchModal'
import {confirmFriendRequest, declineFriendRequest, deleteFriend, sendCurrentUser} from './../../controllers/socketCTRL';

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

    componentWillMount(){
        let {getInitialFriends, getInitialGroups, getInitialUserInfo, getInitialPendingFriendRequests} = this.props;
        getInitialUserInfo()
        getInitialFriends()
        getInitialGroups()
        getInitialPendingFriendRequests()
        
    }

    componentDidMount(){
        setTimeout(()=> {
            if(this.props.user.id){
                console.log('home send current user', this.props.user)
                sendCurrentUser(this.props.user)
            }}
            , 500)
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

    toggleSearch(){
      this.setState({
        showSearch: !this.state.showSearch
      })
    }

 
    render(){
        // console.log(this.props.pendingFriendRequests)
    let allGroups, pendingFriends, allFriends;
    if(this.props.groups) {
        allGroups = this.props.groups.map((group, i)=>{
            return(
                <div key={i}>
                    <p className="groups">{group.name}</p>
                </div>
            )
        })
    }

    if(this.props.pendingFriendRequests){
        pendingFriends= this.props.pendingFriendRequests.map((friend, i) => {
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
    }

    if(this.props.friends){
        allFriends = this.props.friends.map((friend, i)=>{
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
    }

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
                      <FriendSearchModal toggleSearch={this.toggleSearch} />
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
    getGroups,
    getInitialUserInfo,
    getInitialFriends,
    getInitialGroups,
    getInitialPendingFriendRequests
}

export default connect(mapStateToProps, outputActions)(Contacts);
