import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TweenMax from 'gsap';
import $ from 'jquery';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3069');

export default class Situations extends Component{

    render(){
        return(
            <div id='Situations'>
                <div className="wrapper">
                    <div className="levelOne">
                        <Link to="/levelOne/out_with_friends">out with friends</Link>
                        <Link to="/levelOne/on_a_date">on a date</Link>
                        <Link to="/levelOne/running">running</Link>
                        <Link to="/levelOne/traveling">traveling</Link>
                        <Link className="custom" to="/levelOne/custom">custom</Link>
                    </div>
                    <div className="levelTwo">
                        <Link to="/levelTwo/uncomfortable_situation">Uncomfortable</Link>
                        <Link to="/levelTwo/in_a_bad_area">In a Bad Area</Link>
                    </div>
                    <div className="levelThree">
                        <Link to="/levelThree/emergency">emergency</Link>
                    </div>
                </div>
            </div>
        )
    }
}
