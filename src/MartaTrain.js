import React from 'react';

const MartaTrain = ({train}) => {

    return (
        <div className="trainContainer">
                <h1>{train.LINE}</h1>
                <ul className="trainInfo">
                    <li>Destination: {train.DESTINATION}</li>
                    <li>Direction: {train.DIRECTION}</li>
                    <li>Waiting Time: {train.WAITING_TIME}</li>
                    <li>Last Update: {train.EVENT_TIME}</li>
                </ul>
        </div>
    );
}

export default MartaTrain;
