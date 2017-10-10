import React, {Component} from 'react';
// import addGroup from '../../images/addFriendIconReal.png';
import GroupsModal from './GroupsModal'
import editIcon from '../../images/addFriendIconReal.png'
import TweenMax from 'gsap';
import $ from 'jquery';
import x from '../../images/X.svg'
import {connect} from 'react-redux'
import {friendSearch, searchResults, deleteGroup, addGroup} from './../../controllers/socketCTRL';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');

class Groups extends Component{
    constructor(){
      super()
      this.state={

        // groupName: [
        //     {name: 'urMom',
        //       friends: ['Abby', 'Janise', 'Emily', 'Duck Smith', 'Carl']},
        //     {name: 'HAlp',
        //       friends: ['Abby', 'Janise', 'Ethan', 'Spencer', 'Emily']},
        //     {name: 'Emergency',
        //       friends: ['Monday', 'Jocelyn', 'Bailey']},
        // ],
        AddGroupModal: false,
        groupModal: false,
        newGroupName: '',
        newGroupMembers: []
      }
      this.showModalMethod = this.showModalMethod.bind(this)
      this.exit = this.exit.bind(this)
      this.addNewGroupModal = this.addNewGroupModal.bind(this)
      this.toggleFriendAdd = this.toggleFriendAdd.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e){
      e.preventDefault();
      this.setState({
        newGroupName: e.target.value
      })
    }

    showModalMethod(group){
      this.setState({
        groupModal: true,
        group
      })
    }

    addNewGroup(){

      addGroup({group_name: this.state.newGroupName, members: this.state.newGroupMembers})
      this.setState({
        newGroupName: '',
        newGroupMembers: [],
        groupModal: false
      })
      this.exit()
    }

    exit(){
        this.setState({
            groupModal: false,
            AddGroupModal: false
        })
    }

    addNewGroupModal(input){
      if(input==="show"){
        this.setState({
          AddGroupModal: true
        })
      }else if(input==="hide"){
        this.setState({
          AddGroupModal: false
        })
      }
    }

//=============== SOMETHING WEIRD GOING ON PLS HELP ================//

    toggleFriendAdd(event, friend) {
      event.preventDefault();
      let index = this.state.newGroupMembers.indexOf(friend.friend_user_id);

      let r = this.state.newGroupMembers.slice(0);
      if(index >= 0) {
          //remove from recip and change color back
          TweenMax.to($(`#${friend.friend_user_id}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
          r.splice(index, 1);
      } else {
          //to recip, change color
          TweenMax.to($(`#${friend.friend_user_id}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
          r.push(friend.friend_user_id);
      }
      this.setState({
          newGroupMembers: r
      })
  }



render(){
  let {groups, friends} = this.props
  const allGroups = groups.map((group,i) => {
        return (
        <div className='listOfGroups' key={i}>
            <div className="nameContainer">
                <p className='groupName'>{group.groupName}</p>
                <button className="seeInfo" onClick={_=>this.showModalMethod(group)}>SEE INFO</button>
            </div>

        </div>
        )
  })

  return(
      <div className='Groups'>

          <div className='header'>
            <p>GROUPS</p>
            <img onClick={_=>this.addNewGroupModal("show")} className="addNewGroup" src={editIcon} alt=""/>
          </div>

          {
            !this.state.AddGroupModal
            ?
            null
            :
            <div className="addGroupModal">
              <div className="modalBox">
                <img className="exit" onClick={_=>this.addNewGroupModal("hide")} src={x} alt="close"/>
                <p className="head">ADD NEW GROUP</p>

                <div className="inputField">
                  <input onChange={(e)=> this.handleChange(e)} type="text"/>
                </div>

                <div className="addMembersWrapper">
                  <p>ADD GROUP MEMBERS</p>
                  <div className="groupsbox">
                        {friends.map((friend, i) => {
                            return <button className="friendNames" key={i} id={friend.friend_user_id} onClick={event => this.toggleFriendAdd(event, friend)}>{friend.friend_firstname.toUpperCase()} {friend.friend_lastname.toUpperCase()}</button>
                          })
                        }   
                  </div>
                </div>

                <div className="buttnWrapper">
                  <button onClick={()=> this.addNewGroup()}>ADD GROUP</button>
                </div>
              </div>
            </div>
          }

            {

              !this.state.groupModal
              ?
                <div>{allGroups}</div>
              :
              <GroupsModal exit={this.exit} group={this.state.group}/>
            }
      </div>
  )
}
}

function mapStateToProps(state){
  return state
}

let outputActions = {}

export default connect(mapStateToProps, outputActions)(Groups)