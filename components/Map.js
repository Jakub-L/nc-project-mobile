import React from 'react';
import { MapView, Location, Permissions, Marker, TouchableHighlight, View, Text } from 'expo';

import * as api from "../api";

export default class Map extends React.Component {
    state = {
        mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        locationResult: null,
        location: {coords: { latitude: 37.78825, longitude: -122.4324}},
        markers: [],
        pins : [
          ]
      };
  render() {
    return (
      <MapView 
      style={{ alignSelf: 'stretch', height: 550 }}
      region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      showsUserLocation={true}
      // onRegionChangeComplete={this._handleMapRegionChange}
      // onPanDrag={this._handleDrag}
      >
      {this.state.pins.map(pin => (
        <MapView.Marker
        key={pin.pin_id}
coordinate={{latitude: Number(pin.latitude),
    longitude: Number(pin.longitude)}}
    title={pin.creator}
    description={pin.timestamp}
    onPress={() => this.props.navigation.navigate("Pin", {
      pin: pin
    })}
>
</MapView.Marker>
      ))}

      </MapView>
    );
  }

  componentDidMount() {
    this._getLocationAsync();
    this.fetchPins();
  }

//   _handleMapRegionChange = mapRegion => {
//     this.setState({ mapRegion });
//   };

//   _handleDrag = () => {
// this.setState({location: mapRegion })
//   }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };

  fetchPins = () => {
    api.getPins().then(pins => this.setState({ pins })).then(console.log(this.state.pins))
  };

  pinClick = () => {
      console.log('Working')
    // () => this.props.navigation.navigate("Pin")
  };


}
