import React from 'react';

const MARTA_URL = 'https://my-little-cors-proxy.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';

class MartaDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount () {
        fetch(MARTA_URL, {
            method: 'get'
        }).then((response) => {
            return response.json()
        }).then((jsonData) => {
            console.log(jsonData);
            this.setState({
                data: jsonData
            });
        }).catch(function (err) {
            // Error :(
        });
    }

    render() {
        return (
            <div>It's Marta Time</div>
        );
    }
}




export default MartaDashboard;

