import React, {Component} from 'react'
import MapContainer from './../MapContainer/MapContainer';
import {connect} from 'react-redux';
import {getActiveLocations} from './../../ducks/reducer';
import TweenMax from 'gsap'
import $ from 'jquery'

class AlertPage extends Component{
    constructor() {
        super();
        this.state = {
            name: 'Nemo',
            situation: 'Lost at Sea',
            message: 'Nobody, nobody.',
            coordinates: {
                lat: 0,
                lng: 0
            }
        }
    }

    componentWillMount() {
        // console.log('just logged on',this.props);
        console.log(this.props.activeLocations)
        console.log(this.props.match.params)
        let name = this.props.match.params.senderName.split('-').join(' ')
        let situation = this.props.match.params.situation.split('-').join(' ')
        let message = 'Nobody, nobody...'
        let coordinates = {
            lat: 0,
            lng: 0
        }
        this.props.activeLocations[this.props.match.params.situationLevel].map(e => {
            if(e.senderName === name && e.situation === situation){
                message = e.message;
                coordinates = e.coordinates;
            }
        })
        this.setState({
            name,
            situation,
            coordinates,
            message
        })

    }
    componentDidMount() {
        
    }


    render(){
        return(
            <div id="AlertPage">
                <div className="info">
                    <div className="name">{this.state.name}</div>
                    <div className="situation" style={{color: this.props.match.params.situationLevel === "2" ? "#FEF36E" : this.props.match.params.situationLevel === "3" ? "#d13030" : "#efefef"}}>{this.state.situation}</div>
                    <div className="message">{this.state.message}</div>
                </div>
                <MapContainer isHome={false} styleMapContainer={{height: '60vh', width: '100vw'}} canary={{name: this.state.name, lat: this.state.coordinates.lat, lng: this.state.coordinates.lng}}/>
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

export default connect(mapStateToProps, outputActions)(AlertPage);