import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import x from '../../images/X.svg'
import TweenMax from 'gsap'
import $ from 'jquery'

//LINK TO REDUX --> be able to change if userLoggedIn flag
export default class Menu extends Component{

    
    render(){
      // console.log(this.props)

        return(
            <div className="Menu">

                <div className='navigateContainer'>

                    <div className='menuContainer'>
                      <Link to='/home' onClick={()=> this.props.toggleMenu('exit')} className="home buttn">Home</Link>
                      <Link onClick={()=> this.props.toggleMenu('exit')} to='/profile' className="profile buttn" > Profile</Link>
                      <Link onClick={()=> this.props.toggleMenu('exit')} to='/situations' className="situations buttn">Situations</Link>
                      <Link onClick={()=> this.props.toggleMenu('exit')} to='/about' className="about buttn">About</Link>
                      <a onClick={()=> this.props.toggleMenu('exit')} href='http://localhost:3069/auth/logout' className="logout buttn">Logout</a>
                      <div className="exit">
                          <img className="x" onClick={()=> this.props.toggleMenu('exit')} src={x} alt="close"/>
                      </div>
                    </div>

                </div>

            </div>
        )
    }
}
