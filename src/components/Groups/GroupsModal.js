import React, {Component} from 'react';
import addFriend from '../../images/addFriendIconReal.png';
import x from '../../images/x.png';
import editIcon from '../../images/EDIT_ICON.svg'
import Groups from './Groups'
import {friendSearch, searchResults, deleteGroup, renameGroup, removeFriendFromGroup, addFriendToGroup} from './../../controllers/socketCTRL';

// import io from 'socket.io-client';

export default class GroupsModal extends Component{

    constructor(props){
        super(props)

        this.state={
            friends: '',
            groupName: '',
            newGroupName:'',
            editGroupName: false
        }
        // this.deleteFriendFromGroup = this.deleteFriendFromGroup.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.setState({
            friends: this.props.group.members,
            groupName: this.props.group.groupName
        })
        console.log(this.state);
    }

    // deleteFriendFromGroup(i){
    //     let friends=[...this.state.friends]
    //     friends.splice(i, 1) 
    //     this.setState({
    //         friends 
    //     })
    // }

    handleChange(e){
        console.log(e.target.value)
        this.setState({
            newGroupName: e.target.value
        })
    }


    toggleEdit(input){
        if(input==='edit'){
            this.setState({
                editGroupName: true,
            })
        }else if(input==='added'){
            this.setState({
                editGroupName: false,
                groupName: this.state.newGroupName
            }, _=>{
                console.log('this.state.newGroupName:', this.state.newGroupName)
                console.log('this.groupName', this.state.groupName)
            })
            renameGroup({group_name: this.state.newGroupName, id: this.props.group.groupID})
        }
    }



    render(){
        let {group, exit, toggleGroupName} = this.props;
        let membersOfGroup;
        // console.log(this.props.group)
        {this.state.friends? (
            membersOfGroup = this.state.friends.map((friend, i) => {
                return(
                    <div className="singleFriend" key={i}>
                        <p>{friend.username}</p>
                        <img className="deleteFriend" onClick={()=> removeFriendFromGroup(group.groupID, friend.userID)} src={x} alt="delete"/>
    
    
                    </div>
                )
            })

        ): null}

        return(
            <div className='GroupsModal'>
                <div className="groupsBox">
                    <div className="closeModal">
                        <img className="close" onClick={_=>exit()} src={x} alt='close'/>
                    </div>

                    <div className="header">

                        {
                            this.state.editGroupName
                            ?
                            <div className='inputArea'>
                                <input type="text" className="newGroupName" onChange={e=>this.handleChange(e)} value={this.state.newGroupName}/>
                                <button className="addBtn" onClick={_=>this.toggleEdit('added')}>&#10004;</button>
                            </div>
                            :
                            <div className="heady">
                                {console.log(group)}
                                <p className="head">{this.state.groupName}</p>
                                <img className="edit" onClick={_=>this.toggleEdit('edit')} src={editIcon} alt="edit"/>
                            </div>
                        }

                    </div>

                    <div>
                        <p className="title">members:</p>
                        <div className="list">{membersOfGroup}</div>
                    <button className="deleteButton" onClick={()=> deleteGroup(this.props.group.groupID)}>DELETE THIS GROUP</button>
                    </div>

                </div>
            </div>
        )
    }
}