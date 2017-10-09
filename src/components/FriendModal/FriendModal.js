import React, {Component} from 'react';
import addFriend from '../../images/addFriendIconReal.png'
import x from '../../images/x.png'
import TweenMax from 'gsap';
import $ from 'jquery';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');


export default class FriendModal extends Component{
    constructor(){
        super()
        this.state={
            // friend: '',
            groupsToAdd: []
        }
    }
    

    toggleGroupAdd(event, groupObj) {
        let index = -1;
        for (let i = 0; i < this.state.groupsToAdd.length; i++){
            if (this.state.groupsToAdd[i].name === groupObj.name) {
                index = i;
            }
        }

        let r = this.state.groupsToAdd.slice(0);
        if(index >= 0) {
            //remove from recip and change color back
            TweenMax.to($(`#${groupObj.name}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
            r.splice(index, 1);
        } else {
            //to recip, change color
            TweenMax.to($(`#${groupObj.name}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
            r.push(groupObj);
        }
        this.setState({
            groupsToAdd: r
        })
        // console.log(this.state.groupsToAdd)
    }

    render(){
        let {friend, exit} = this.props;
        // console.log(this.state.groupsToAdd)
        return(
            <div className="FriendModal">
                <div className="box">
                        <img className="x" onClick={exit} src={x} alt="close"/>
                    <div className="heaad">
                        <p className="info">INFORMATION</p>
                    </div>
                    <div className="information">
                        <p>USERNAME: {friend.friend_username}</p>
                        <p>NAME: {friend.friend_firstname} {friend.friend_lastname}</p>
                        <p>EMAIL: {friend.friend_email}</p>
                    </div>

                    <div className='groups'>
                        <p className="added">ADD CONTACT TO GROUP:</p>
                        <div className="groupsbox">
                            {this.props.groups.map((e, i) => {
                                return <button className="groupNames" key={i} id={e.groupid} onClick={event => this.toggleGroupAdd(event, e)}>{e.groupName.toUpperCase()}</button>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
