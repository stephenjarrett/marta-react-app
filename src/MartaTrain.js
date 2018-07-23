import React from 'react';

class MartaTrain extends React.Component {

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
            <div className='trainContainer'>
                <h1>{this.props.line}</h1>
                <ul className='trainInfo'>
                    <li>Destination: {this.state.destination}</li>
                    <li>Direction: {this.state.direction}</li>
                    <li>Waiting Time: {this.state.waitingTime}</li>
                    <li>Last Update: {this.props.eventTime}</li>
                </ul>
            </div>
        );
    }
}




export default MartaTrain;

