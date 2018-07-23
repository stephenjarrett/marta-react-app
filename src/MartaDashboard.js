import React from 'react';
import MartaTrain from './MartaTrain.js';
import MartaLine from './MartaLine.js';

const MARTA_URL = 'https://my-little-cors-proxy.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';

class MartaDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount () {
        // this._fetchMartaAPI
        setInterval(this._fetchMartaAPI, 10000);
    }

    // Calls on MARTA API, cleans the data and sorts it by time
    _fetchMartaAPI = () => {
        fetch(MARTA_URL, {
                method: 'get'
            }).then((response) => {
                return response.json()
            }).then(this._cleanJSONMartaData)
            .then(this._sortByTime)
            .then((jsonData) => {
                console.log(jsonData);
                this.setState({
                    data: jsonData
                });
            }).catch(function (err) {
                // Error :(
            });
    }

    // Lose lots of data since lots of trains share the same ID
    _cleanJSONMartaData = (allTrainArray) => {
        let trainsById = new Map();
        allTrainArray.forEach(train => {
            trainsById.set(train.TRAIN_ID, train);
        });
        let justTheTrains = trainsById.values();
        return Array.from(justTheTrains);
    }

    // Calls on MartaTrain component
    _convertTrainToElement = (train) => {
        let trainElement = (
                <MartaTrain key={train.TRAIN_ID} destination={train.DESTINATION} line={train.LINE} direction={train.DIRECTION} waitingTime={train.WAITING_TIME} eventTime={train.EVENT_TIME} />
        );

        return trainElement
    }

    // Sorts trains array by the provided json EVENT_TIME from smallest to largest
    _sortByTime = (trains) => {
            let sortedTrains = trains.sort(function (a, b) {
                if (a.EVENT_TIME < b.EVENT_TIME) {
                    return -1;
                } else if (a.EVENT_TIME > b.EVENT_TIME) {
                    return 1;
                } else {
                    return 0;
                }
            });
        return sortedTrains
    }

    render() {
        return (
            <div>
                <h1>
                It's Marta Time
                </h1>
                <div className='all-trains-container'>
                {this.state.data.map(this._convertTrainToElement)}
                </div>
            </div>
        );
    }
}

export default MartaDashboard;
