import React, {Component} from 'react'
import Alert from './Alert'
import MapContainer from './../MapContainer/MapContainer';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getActiveLocations} from './../../ducks/reducer';
import TweenMax from 'gsap'
import $ from 'jquery'

class AlertBubble extends Component{

    render(){
        // console.log('in the render', this.props)
        return(
            <div className="alertBubble">
                <div>
                    {this.props.activeLocations["3"].map((alert, index) => {
                        let specificID = `${alert.senderName.split(' ').join('')}${alert.situation.split(' ')[0]}${alert.message.split(' ')[0]}` 
                        let linkURL = `/alerts/3/${alert.senderName.split(' ').join('-')}/${alert.situation.split(' ').join('-')}`
                        return (
                            <Link to={linkURL} key={`3${specificID}`} ><div className="container" style={{backgroundColor: '#d13030'}} id={`3${specificID}`}>
                                <p className="from"><em>+</em> {alert.senderName} - {alert.situation}</p>
                            </div></Link>)
                    })}
                    {this.props.activeLocations["2"].map((alert, index) => {
                        let specificID = `${alert.senderName.split(' ').join('')}${alert.situation.split(' ')[0]}${alert.message.split(' ')[0]}`   
                        let linkURL = `/alerts/2/${alert.senderName.split(' ').join('-')}/${alert.situation.split(' ').join('-')}`                                             
                        return (
                            <Link to={linkURL} key={`2${specificID}`}><div className="container" style={{backgroundColor: '#FEF36E', color: '#111'}} id={`2${specificID}`}>
                                <p className="from" style={{color: '#111'}}><em>+</em> {alert.senderName} - {alert.situation}</p>
                            </div></Link>)
                    })}
                    {this.props.activeLocations["1"].reverse().map((alert, index) => {
                        let specificID = `${alert.senderName.split(' ').join('')}${alert.situation.split(' ')[0]}${alert.message.split(' ')[0]}`
                        let linkURL = `/alerts/1/${alert.senderName.split(' ').join('-')}/${alert.situation.split(' ').join('-')}`                                             
                        return (
                            <Link to={linkURL} key={`1${specificID}`}><div className="container" style={{backgroundColor: 'rgba(239, 239, 239, 0.3)'}} id={`1${specificID}`}>
                                <p className="from"><em>+</em> {alert.senderName} - {alert.situation}</p>
                            </div></Link>)
                    })}
                </div>
            </div>  
        )
    }
}

function mapStateToProps(state){
    return state;
}

let outputActions = {
    getActiveLocations
}

export default connect(mapStateToProps, outputActions)(AlertBubble);