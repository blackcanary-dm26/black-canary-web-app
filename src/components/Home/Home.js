import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class Home extends Component{

    render(){
        return(
            <div>blah
                <Link to='/profile'>go to profile</Link>
            </div>
        )
    }
}