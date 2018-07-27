// Creating a MartaLine Component

// Similar to the MartaTrain component, create a MartaLine component
// Each MartaLine should display MartaTrain components
// Your MartaDashboard component should render MartaLine components instead of MartaTrain components
// Pass an array of train information to each MartaLine, with each array only containing trains that are on the Red Line(or Gold, or Blue)

import React from 'react';
import MartaTrain from './MartaTrain.js'

const MartaLine = (props) => {

    // the lineName is props.lineName
    // Let's filter by the lineName.
    // As we filter, we'll compare to the lower case version
    // of the train's LINE property
    let filteredTrainArray = props.trainArray.filter(train => {
        return train.LINE.toLowerCase() === props.lineName;
    });


    // I can map through my props.trainArray
    // to draw each MartaTrain
    let trainComponents = filteredTrainArray.map(_convertTrainToElement)

    return (
        <div className="train-line">
            <div className="all-trains-container">
                {trainComponents}
            </div>
        </div>
    );
}

const _convertTrainToElement = (train) => {
    return <MartaTrain key={train.TRAIN_ID} train={train} />
};

export default MartaLine;
