import React, { Component } from 'react';
import x from '../../images/x.png';
import axios from 'axios';
import {requestFriend, friendSearch, searchResults} from './../../controllers/socketCTRL';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');



class FriendSearchModal extends Component{
  constructor(){
    super()
    this.state={
      searchTerm: '',
      searchResults: [],
    //   searchResults2: [{firstname: 'Duck', lastname: 'Smith', username: "dontTouchMe", email: "ducky.smith@gmail.com", profilepic:"https://unsplash.it/200/?random", id: 8},
    // {firstName: 'Duck', lastName: 'Smith', username: "dontTouchMe", email: "ducky.smitawetr5y45644h@gmail.com", img:"https://unsplash.it/200/?random", id: 6}]
    }
    this.saveToState = this.saveToState.bind(this);
  }

  handleChange(val){
    this.setState({
      searchTerm: val
    })
  }

  handleClick(){
    friendSearch(this.state.searchTerm)
    // socket.emit("friend search", this.state.searchTerm)
    this.setState({
      searchTerm: ''
    })
  }

  componentDidMount(){
    searchResults(this.saveToState)
  }

  saveToState(data){
    this.setState({
      searchResults: data
    })
  }


  render(){
    // console.log(this.state.searchResults);
    let results;
    if(this.state.searchResults) {

      results = this.state.searchResults.map((c,i)=>{
        // console.log(c)
        return (<div className='result'>
        <div className='things'>
          <img src={c.profilepic}/>
          <button onClick={()=>requestFriend(c.id)}>Send Request</button>
          </div>
          <div className='text'>
            <div>
              <h3>First: {c.firstname}</h3>
              <h3>Last: {c.lastname}</h3>
              <h3>Username: {c.username}</h3>
              <h4>Email: {c.email}</h4>
            </div>
          </div>
        </div>)
      })
    }

    return(
      <div className='modalContainer'>
        <div className="imgWrap">
          <img className="x" onClick={_=>this.props.toggleSearch()} src={x} alt="close"/>
        </div>
        <div className="searchWrap">
          <input value={this.state.searchTerm} onChange={e=>this.handleChange(e.target.value)} className="input" placeholder='Name'></input>
          <button onClick={_=>this.handleClick()} className="friendbuttn">Search</button>
        </div>
        <div className='results'>
          {results}
        </div>
      </div>
    )
  }

}
export default FriendSearchModal;
