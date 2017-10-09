import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import x from '../../images/x.png'
import marauder from './../../images/placeholder_map.gif';
import editIcon from '../../images/whiteEditIcon.svg'
import {connect} from 'react-redux';
import {getUserInfo} from './../../ducks/reducer';
import {editUser, updateUser, editSafeHaven, heartbeat, deleteUser} from './../../controllers/socketCTRL';

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
            delete: false
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

    // componentDidMount(){
    //     socket.emit('save socket_id', {socketID: socket.id})
    // }

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




                <div className='nameWrapper safeHavenWrapper'>
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
