import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import x from '../../images/x.png'
import marauder from './../../images/placeholder_map.gif';
import editIcon from '../../images/whiteEditIcon.svg';
import $ from 'jquery';
import TweenMax from 'gsap';
import {connect} from 'react-redux';
import {getUserInfo} from './../../ducks/reducer';
import {editUser, createEmergencyGroup, editEmergencyMessage, addEmergencyContact, updateUser, editSafeHaven, heartbeat, deleteUser} from './../../controllers/socketCTRL';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');

class Profile extends Component{
    constructor(){
        super()

        this.state={
            newUsername: '',
            toggleNameInput: false,
            emergencyToggle: false,
            delete: false,
            emergencyGroupMembersByID: [],
            emergencyGroupMembersByName: [],
            emergencyMessage: ''
        }
        this.toggleName = this.toggleName.bind(this)
        this.addedNewName = this.addedNewName.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteModal = this.deleteModal.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    componentDidMount(){
        
        updateUser(getUserInfo)
 
        if(this.props.emergencyGroup.length === 0){
            this.setState({
                emergencyToggle: true
            })
        } else if (this.props.emergencyGroup){
            let x = [];
            let y = [];
            this.props.emergencyGroup.map(e => {
                x.push(e.emergency_contact_id)
                y.push(`${e.emergency_contact_firstname.toUpperCase()} ${e.emergency_contact_lastname.toUpperCase()}`)
            })
            this.setState({
                emergencyGroupMembersByID: x,
                emergencyGroupMembersByName: y,
                emergencyMessage: this.props.emergencyGroup[0].emergency_message
            })
        }
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
        if(this.props.emergencyGroup.length === 0) {
            createEmergencyGroup({message: this.state.emergencyMessage, group: this.state.emergencyGroupMembersByID}) 
        } else {
            addEmergencyContact(this.state.emergencyGroupMembersByID);
            editEmergencyMessage(this.state.emergencyMessage);
        }
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

    toggleFriend(event, friend) {
        event.preventDefault()
        let index = this.state.emergencyGroupMembersByID.indexOf(friend.friend_user_id)
        let r = this.state.emergencyGroupMembersByID.slice(0);
        let n = this.state.emergencyGroupMembersByName.slice(0);
    
        if(index >= 0) {
            r.splice(index, 1);
            n.splice(index, 1);
        } else {
            r.push(friend.friend_user_id);
            n.push(`${friend.friend_firstname.toUpperCase()} ${friend.friend_lastname.toUpperCase()}`);
        }

        this.setState({
            emergencyGroupMembersByID: r,
            emergencyGroupMembersByName: n
        })

    }

    render(){
        let {user} = this.props;

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
                        (!this.state.emergencyToggle)
                        ?
                        <div className="safehavenContainer">
                            <p className="safeHaven">Emergency Settings</p>
                            <img onClick={() => this.setState({emergencyToggle: true})} className="editIcon" src={editIcon} alt="edit"/>
                        </div>
                        :
                        <div className="safeHavenInputContainer">
                            <button onClick={() => {if(this.state.emergencyGroupMembersByID.length > 0) {this.changeEmergencySettings()}} } className="addNewNameBtn changeEmergencyStuffBtn">&#10004;</button>                                                        
                            <span style={{color: '#d13030'}}>Emergency Settings</span>
                            <img className="editIcon editNameIcon" onClick={() => {if(this.state.emergencyGroupMembersByID.length > 0) {this.setState({emergencyToggle: false})} }} src={editIcon} alt="edit"/>
                            <p>Contacts:</p>
                            <div className="recipWrapper names">
                                {this.state.emergencyGroupMembersByName.map((e, i) => {
                                    if (i !== this.state.emergencyGroupMembersByName.length - 1) {
                                        return `${e}, `
                                    } else {
                                        return `${e}`                                        
                                    }
                                })}
                            </div>
                            <div className="recipWrapper">
                                {this.props.friends.map((e, i) => {
                                    return <button key={`${i}${e.friend_user_id}`} id={e.friend_user_id} style={{ backgroundColor: this.state.emergencyGroupMembersByID.indexOf(e.friend_user_id) < 0 ? 'rgba(239, 239, 239, 0.3)' : '#fef36e', color: this.state.emergencyGroupMembersByID.indexOf(e.friend_user_id) < 0 ? '#efefef' : '#111'}} onClick={event => this.toggleFriend(event, e)} >{`${e.friend_firstname} ${e.friend_lastname}`}</button>
                                })}
                            </div>
                            <div className="messageWrapper">
                                <h3>Message:</h3>
                                <textarea maxLength="180" value={this.state.emergencyMessage} onChange={e => this.saveMessage(e)}></textarea>
                            </div>
                        </div>
                    }
                </div>


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
