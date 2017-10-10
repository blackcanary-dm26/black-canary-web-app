import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import x from '../../images/x.png'
import marauder from './../../images/placeholder_map.gif';
import editIcon from '../../images/whiteEditIcon.svg';
import $ from 'jquery';
import TweenMax from 'gsap';
import {connect} from 'react-redux';
import {getUserInfo} from './../../ducks/reducer';
import {editUser, editEmergencyMessage, addEmergencyContact, updateUser, editSafeHaven, heartbeat, deleteUser} from './../../controllers/socketCTRL';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');

class Profile extends Component{
    constructor(){
        super()

        this.state={
            newUsername: '',
            newSafeHaven: '',
            toggleNameInput: false,
            toggleSafeHavenInput: false,
            emergencyToggle: false,
            delete: false,
            newEmergencyGroupMembers: [],
            emergencyMessage: ''
        }
        this.toggleName = this.toggleName.bind(this)
        this.toggleSafeHaven = this.toggleSafeHaven.bind(this)
        this.addedNewName = this.addedNewName.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeSafeHaven = this.changeSafeHaven.bind(this)
        this.deleteModal = this.deleteModal.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    componentDidMount(){
        
        // console.log('mount profile', this.props.user)
        updateUser(getUserInfo)
        // heartbeat(getFriendsList, getUserInfo, getGroups, getActiveLocations);
        // let x =[];
        // this.props.emergencyGroup.contact_id.map(e => {
        //     TweenMax.to($(`#${e.friend_user_id}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut});
        //     x.push(e);
        // })

        // this.setState({
        //     newEmergencyGroupMembers: x,
        //     emergencyMessage: this.props.emergencyGroup.message
        // })
    }

    toggleName(){
        if (this.state.toggleNameInput){
            this.setState({
                toggleNameInput: false
            })
        } else {
            this.setState({
                toggleNameInput: true
            })
        }
    }

    toggleSafeHaven(){
        if (this.state.toggleSafeHavenInput){
            this.setState({
                toggleSafeHavenInput: false
            })
        } else {
            this.setState({
                toggleSafeHavenInput: true
            })
        }
    }

    addedNewName(){
        // this.props.editUsername(this.state.newName)
        // editUser(this.props.user);
        editUser({username: this.state.newName, userId: this.props.user.id});

        this.setState({
            toggleNameInput: false,
            newName: ''
        })
    }

    handleChange(input){
        let target = input.target
        console.log(target.value)
        this.setState({
            [target.name]: target.value
        })
    }

    changeSafeHaven(){
        editSafeHaven({safeHaven: this.state.newSafeHaven, userId: this.props.user.id})
        this.setState({
            toggleSafeHavenInput: false,
            newSafeHaven: ''
        })
    }

    deleteModal(type){
        if(type === 'popup'){
            this.setState({
                delete: true
            })
        }else if(type==='nvm'){
            this.setState({
                delete: false
            })
        }
    }

    confirmDelete(){
        deleteUser(this.props.user.id)
        this.props.getUserInfo({user:{username: '', firstName: '', lastName: '', email: '', profilepic: '', auth_id: '', socket_id: '', id: '', location: '', safe_haven: ''}})
    }

    changeEmergencySettings(){
        this.setState({
            emergencyToggle: false
        })

    }

    saveMessage(event){
        event.preventDefault()
        this.setState({
            emergencyMessage: event.target.value
        })
    }

    // componentDidMount(){
    //     socket.emit('save socket_id', {socketID: socket.id})
    // }

    toggleFriend(event, friend) {
        event.preventDefault()
        let index = -1;
        let r = this.state.newEmergencyGroupMembers.slice(0);
        for (let i = 0; i < 5; i++){
            if(r[i].friend_user_id === friend.friend_user_id){
                index = i;
            }
        }
    
        // let r = this.state.newEmergencyGroupMembers.slice(0);
        if(index >= 0) {
        //remove from recip and change color back
            TweenMax.to($(`#${friend.friend_user_id}`), 0, { backgroundColor: 'rgba(239, 239, 239, 0.3)', color: '#efefef', ease: TweenMax.Power1.easeInOut})
            r.splice(index, 1);
        } else {
        //to recip, change color
            TweenMax.to($(`#${friend.friend_user_id}`), 0, { backgroundColor: '#fef36e', color: '#111', ease: TweenMax.Power1.easeInOut})
            r.push(friend);
        }

        this.setState({
            newEmergencyGroupMembers: r
        })

    }

    render(){
        let {user} = this.props;
        // console.log('profile page user:', user)

        return(
            <div className="ProfileContainer">

                <div className="Profile">

                <div className='nameWrapper'>
                    {
                        !this.state.toggleNameInput
                        ?
                        <div className='nameContainer'>
                            <div className="name">{this.props.user.username}</div>
                            <img className="editIcon" onClick={this.toggleName} src={editIcon} alt="edit"/>
                        </div>

                        :
                        <div className="nameInputContainer">
                            <button onClick={this.addedNewName} className="addNewNameBtn">&#10004;</button>                            
                            <input className="nameInput" maxLength="40" placeholder="New name" name="newName" type="text" onChange={(e)=> {this.handleChange(e, 'name')}} value={this.state.newName}/>
                            <img className="editIcon editNameIcon" onClick={this.toggleName} src={editIcon} alt="edit"/>
                            
                        </div>
                    }
                </div>


                    <div className="imgContainer">
                        <div>
                            <img className="imgPlaceholder" src={this.props.user.profilepic ? this.props.user.profilepic : marauder} alt='user'/>
                        </div>
                    </div>




                <div className='nameWrapper emergencyWrapper'>
                    {
                        (this.props.emergencyGroup.hasOwnProperty("contact_id") && this.props.emergencyGroup.contact_id.length > 0) || !this.state.emergencyToggle
                        ?
                        <div className="safehavenContainer">
                            <p className="safeHaven">Emergency Settings</p>
                            <img onClick={() => this.setState({emergencyToggle: true})} className="editIcon" src={editIcon} alt="edit"/>
                        </div>
                        :
                        <div className="safeHavenInputContainer">
                            <button onClick={() => this.changeEmergencySettings()} className="addNewNameBtn changeEmergencyStuffBtn">&#10004;</button>                                                        
                            <span style={{color: '#d13030'}}>Emergency Settings</span>
                            <img className="editIcon editNameIcon" onClick={() => this.setState({emergencyToggle: true})} src={editIcon} alt="edit"/>
                            <p>Contacts:</p>
                            <div className="recipWrapper names">
                                {this.state.newEmergencyGroupMembers.map((e, i) => {
                                    console.log(e);
                                    if (i !== this.state.newEmergencyGroupMembers.length - 1) {
                                        return `${e.friend_firstname} ${e.friend_lastname}, `
                                    } else {
                                        return `${e.friend_firstname} ${e.friend_lastname}`                                        
                                    }
                                })}
                            </div>
                            <div className="recipWrapper">
                                {this.props.friends.map((e, i) => {
                                    return <button key={`${i}${e.friend_username}`} id={e.friend_user_id} onClick={event => this.toggleFriend(event, e)} >{`${e.friend_firstname} ${e.friend_lastname}`}</button>
                                })}
                            </div>
                            <div className="messageWrapper">
                                <h3>Message:</h3>
                                <textarea maxLength="180" value={this.state.emergencyMessage} onChange={e => this.saveMessage(e)}></textarea>
                            </div>
                        </div>
                    }
                </div>


                {/*DO WE NEED???*/}
                {/*<div className='nameWrapper safeHavenWrapper'>
                    SafeHaven:
                    {
                        !this.state.toggleSafeHavenInput
                        ?
                        <div className="safehavenContainer">
                            <p className="safeHaven">{this.props.user.safe_haven}</p>
                            <img onClick={this.toggleSafeHaven} className="editIcon" src={editIcon} alt="edit"/>
                        </div>
                        :
                        <div className="safeHavenInputContainer">
                            <button onClick={this.changeSafeHaven} className="addNewNameBtn">&#10004;</button>                                                        
                            <input type="text" className="safeHavenInput" name="newSafeHaven" placeholder="New safeHaven" onChange={e=>this.handleChange(e)} value={this.state.newSafeHaven}/>
                            <img className="editIcon editNameIcon" onClick={this.toggleSafeHaven} src={editIcon} alt="edit"/>
                        </div>
                    }
                </div>*/}


                <div className="navigationBtns">
                    <Link className="contacts" to="/contacts">CONTACTS</Link>
                    <Link className="contacts" to="/groups">GROUPS</Link>
                    <a href='http://localhost:3069/auth/logout'> <p className="logOut">LOGOUT</p> </a>
                    {
                        !this.state.delete
                        ?
                        <button onClick={()=> {this.deleteModal('popup')}} className="deleteBtn">DELETE YOUR ACCOUNT</button>
                        :
                        <div className="deleteModal">
                            <img src={x} alt='close' className="close" onClick={()=> {this.deleteModal('nvm')}}/>
                            <p className="head">ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?</p>
                            <div className="deleteBtns">
                                <button onClick={()=> {this.deleteModal('nvm')}} className="no">NO, I WANT TO CONTINUE FEELING SAFE</button>
                                <Link className="yes" to="/"><button onClick={()=> this.confirmDelete()}>YES, I WANT TO FEEL UNSAFE</button></Link>
                            </div>
                        </div>
                    }
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    // let {user} = state;
    // return {user}
    return state;
}

let outputActions = {
    editUser,
    getUserInfo
}

export default connect(mapStateToProps, outputActions)(Profile);
