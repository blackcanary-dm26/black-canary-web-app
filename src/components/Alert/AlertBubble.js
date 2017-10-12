import React, {Component} from 'react'
import Alert from './Alert'
import MapContainer from './../MapContainer/MapContainer';
import {connect} from 'react-redux';
import {getActiveLocations} from './../../ducks/reducer';
import TweenMax from 'gsap'
import $ from 'jquery'

class AlertBubble extends Component{

    componentWillMount() {
        // console.log('just logged on',this.props);
    }
    componentDidMount() {
        TweenMax.to($('.messageContainer'), 0, {height: '0', opacity: 0});
        TweenMax.to($('.mapHere'), 0, { opacity: 0});
        TweenMax.to($('.mapHere .map'), 0, {position: 'relative'});
    }

    toggleAlert(index) {
        // console.log(index);
        // console.log('I should run')
        if ($(`#${index} .messageContainer`).css('height') !== '500px'){
            TweenMax.to($(`#${index}`), 1, {backgroundColor: '#d13030'});
            TweenMax.to($(`#${index} .messageContainer`), 1, {height: '500px', opacity: 1});
            TweenMax.to($(`#${index} em`), 1, {transform: 'rotate(45deg)'});
            TweenMax.to($(`#${index} .mapHere`), 0.5, {opacity: 1, delay: 1});

        } else {
            TweenMax.to($(`#${index}`), 1, {backgroundColor: 'none'});            
            TweenMax.to($(`#${index} .mapHere`), 0.5, {opacity: 0, delay: 0});    
            TweenMax.to($(`#${index} em`), 1, {transform: 'none'});                    
            TweenMax.to($(`#${index} .messageContainer`), 1, {height: '0', opacity: 0, delay: 0.5});
        }
    }

    render(){
        // console.log('in the render', this.props)
        return(
            <div className="alertBubble">
                    {this.props.activeLocations["3"].map((alert, index) => {
                        let specificID = `${alert.senderName.split(' ').join('')}${alert.situation.split(' ')[0]}${alert.message.split(' ')[0]}`
                        return (
                            <div className="container" style={{backgroundColor: '#d13030'}} key={`3${specificID}`} id={`3${specificID}`}>
                                <p className="from"><em onClick={() => this.toggleAlert(`3${specificID}`)}>+</em> {alert.senderName} - {alert.situation}</p>
                                <div className="messageContainer">
                                    <p className="message">{alert.message}</p>
                                    <div id={`mapHere3${specificID}`} className="mapHere" style={{width: '100vw', height: '400px'}}>
                                        <MapContainer isHome={false} styleMapContainer={{width: '100vw', height: '400px'}} canary={{name: alert.senderName, lat: alert.coordinates.lat, lng: alert.coordinates.lng}}/>
                                    </div>
                                </div>
                            </div>)
                    })}
                    {this.props.activeLocations["2"].map((alert, index) => {
                        let specificID = `${alert.senderName.split(' ').join('')}${alert.situation.split(' ')[0]}${alert.message.split(' ')[0]}`                        
                        return (
                            <div className="container" style={{backgroundColor: 'rgba(254, 243, 110, 0.3)'}} key={`2${specificID}`} id={`2${specificID}`}>
                                <p className="from"><em onClick={() => this.toggleAlert(`2${specificID}`)}>+</em> {alert.senderName} - {alert.situation}</p>
                                <div className="messageContainer">
                                    <p className="message">{alert.message}</p>
                                    <div id={`mapHere2${specificID}`} className="mapHere" style={{width: '100vw', height: '400px'}}>
                                        <MapContainer isHome={false} styleMapContainer={{width: '100vw', height: '400px'}} canary={{name: alert.senderName, lat: alert.coordinates.lat, lng: alert.coordinates.lng}}/>
                                    </div>
                                </div>
                            </div>)
                    })}
                    {this.props.activeLocations["1"].reverse().map((alert, index) => {
                        let specificID = `${alert.senderName.split(' ').join('')}${alert.situation.split(' ')[0]}${alert.message.split(' ')[0]}`
                        {/* console.log(specificID) */}
                        return (
                            <div className="container" key={`1${specificID}`} id={`1${specificID}`}>
                                <p className="from"><em onClick={() => this.toggleAlert(`1${specificID}`)}>+</em> {alert.senderName} - {alert.situation}</p>
                                <div className="messageContainer" style={{height: '0px', overflow: 'hidden'}}>
                                    <p className="message">{alert.message}</p>
                                    <div id={`mapHere1${specificID}`} className="mapHere" style={{width: '100vw', height: '400px', position: 'relative'}}>
                                        <MapContainer isHome={false} styleMapContainer={{width: '100vw', height: '400px'}} canary={{name: alert.senderName, lat: alert.coordinates.lat, lng: alert.coordinates.lng}}/>
                                    </div>
                                </div>
                            </div>)
                    })}
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