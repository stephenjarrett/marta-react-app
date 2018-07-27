import React from 'react';
import MartaTrain from './MartaTrain.js';
import MartaLine from './MartaLine.js';

const MARTA_URL = 'https://my-little-cors-proxy.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';

class MartaDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            visibleLineNames: ['red', 'green', 'blue', 'gold']
        };
    }

    render() {

        let martaLines = this.state.visibleLineNames.map(line => {
        return <MartaLine lineName={line} trainArray={this.state.data} />;
        })

        return (
            <div>
                <h1>It's Marta Time</h1>
                <div className="btn-container">
                    <button onClick={() => {this._toggleLine("all")}}>all</button>
                    <button onClick={() => {this._toggleLine("red")}}>red</button>
                    <button onClick={() => {this._toggleLine("green")}}>green</button>
                    <button onClick={() => {this._toggleLine("blue")}}>blue</button>
                    <button onClick={() => {this._toggleLine("gold")}}>gold</button>
                </div>
                {martaLines}
            </div>
        );
    }

    componentDidMount () {
        this._fetchMartaData();
        setInterval(this._fetchMartaData, 10000)
    }

    _toggleLine = (nameOfLine) => {
        // Check if nameOfLine is "all"
        if (nameOfLine === "all") {
            this.setState({
                visibleLineNames: ["green", "blue", "red", "gold"]
            })
        } else {
            this.setState({
                visibleLineNames: [nameOfLine]
            });
        }
    }

    // Calls on MARTA API, cleans the data and sorts it by time
    _fetchMartaData = () => {
        fetch(MARTA_URL, {
                method: 'get'
            }).then((response) => {
                return response.json()
            }).then(this._cleanJSONMartaData)
            .then(this._sortByTime)
            .then((jsonData) => {
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
}
    
export default MartaDashboard;
