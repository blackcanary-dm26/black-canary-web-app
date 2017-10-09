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
            // friendName: [
            //     {
            //         firstName: 'Janise',
            //         lastName: 'Suski',
            //         username: 'janises',
            //         userID: 1,
            //         socketID: '98734jbfhljabh38y7r8734oybfjsdhbfwp495bfuijfsgnk547',
            //         email: 'janises@janises.janises'
            //     },
            //     {
            //         firstName: 'Andi',
            //         lastName: 'Platter',
            //         username: 'meatGap',
            //         userID: 2,
            //         socketID: '98asjdfhauiwefnkjfgskrguroybfjsdhbf8734y534hgsdf63g263',
            //         email: 'andi@meat.gap'
            //     },
            //     {
            //         firstName: 'Abby',
            //         lastName: 'Thelin',
            //         username: 'noBats',
            //         userID: 3,
            //         socketID: '732h5bd672bdhu5489dhj834hf743ihfbfjsdhbfwp495bfuijfsgnk547',
            //         email: 'abby@noBats.tuna'
            //     },
            //     {
            //         firstName: 'Alan',
            //         lastName: 'Miller',
            //         username: 'alien',
            //         userID: 4,
            //         socketID: '732h98234f59e7634asdghf2946msndfblrehfsdhbfwp495bfuijfsgnk547',
            //         email: 'alan@theystillthinkimhuman.mothership'
            //     },
            //     {
            //         firstName: 'Mom',
            //         lastName: '',
            //         username: 'knk',
            //         userID: 35,
            //         socketID: '732kasjdhf74qbafjlhskf7q98234hfkjdff743ihfbfjsdhbfwp495bfuijfsgnk547',
            //         email: 'mom@mom.mom'
            //     },
            //     {
            //         firstName: 'Jake',
            //         lastName: 'Keator',
            //         username: 'jakeSnake',
            //         userID: 44,
            //         socketID: '7akjsdafhlao723hflakhf34fbajshfs3784kufhibfblrehfsdhbfwp495bfuijfsgnk547',
            //         email: 'brother@brother.brother'
            //     },
            // ],
            // groups: [
            //     {name: 'starWars'},
            //     {name: 'Pokemon'},
            //     {name: 'Dev'},
            //     {name: 'BLAHHHHH'},
            //     {name: 'gurlzzz'},
            //     {name: 'dumbBOYZ'}
            // ],
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

    toggleSearch(){
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
                <div><img className= "imgContainer" src={friend.friend_pic} alt="profile pic"/></div>
                <div className='nameContainer'>
                    <p className="name">{friend.friend_firstname}</p>
                    <button onClick={()=>confirmFriendRequest(friend.friend_table_id)}>CONFIRM FRIEND REQUEST</button>
                    <button onClick={()=>declineFriendRequest(friend.friend_table_id)}>DECLINE FRIEND REQUEST</button>
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
                            <button onClick={()=> deleteFriend(friend.friend_table_id)}>DELETE FRIEND</button>
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
                        {pendingFriends}
                        {allFriends}
                    </div>
                    :
                        <FriendModal exit={this.exit} friend={this.state.friend} groups={this.props.groups}/>
                }

                    <div className='header'>
                        <header className='head'>FRIENDS</header>
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
    getGroups
}

export default connect(mapStateToProps, outputActions)(Contacts);
