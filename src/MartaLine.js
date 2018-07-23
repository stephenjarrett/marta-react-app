// Creating a MartaLine Component

// Similar to the MartaTrain component, create a MartaLine component
// Each MartaLine should display MartaTrain components
// Your MartaDashboard component should render MartaLine components instead of MartaTrain components
// Pass an array of train information to each MartaLine, with each array only containing trains that are on the Red Line(or Gold, or Blue)

import React from 'react';
import MartaTrain from './MartaTrain.js'

class MartaLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            waitingTime: this.props.waitingTime,
            destination: this.props.destination,
            direction: this.props.direction
        };
    }

    render() {
        return (
            
            <div className='train-line'> 
                <MartaTrain />

            <div className='trainContainer'>
                <h1>{this.props.line}</h1>
                <ul className='trainInfo'>
                    <li>Destination: {this.state.destination}</li>
                    <li>Direction: {this.state.direction}</li>
                    <li>Waiting Time: {this.state.waitingTime}</li>
                    <li>Last Update: {this.props.eventTime}</li>
                </ul>
            </div>
            </div>
        );
    }
}

export default MartaLine;

