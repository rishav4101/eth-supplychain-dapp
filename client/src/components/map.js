import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const mapStyles = {
  width: '95%',
  // height: '50%',
  
  borderRadius:"10px",
  // maxWidth:"400px",
  height: "350px",
  zIndex: "10 !important",
  border:"2px solid #1a237e",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    // var point = [];
    // prodData.map((data) =>{
    //      point.push({latitude:data[0][7],longitude: data[0][7]});

    // });
    var points =[];
    if(props.prodData[0][7].length !== 0) { points.push({latitude: props.prodData[0][7], longitude: props.prodData[0][6]})};
    if(props.prodData[2][0].length !== 0) {points.push( {latitude: props.prodData[2][0], longitude: props.prodData[1][7]})};
    if(props.prodData[2][3].length !== 0) {points.push({latitude: props.prodData[2][3], longitude: props.prodData[2][2]})};

    this.state = {
      stores: points
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 22.572, lng: 88.363}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}

MapContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(MapContainer);