import React from 'react';
import { MapView, Location, Permissions, Marker } from 'expo';

export default class Map extends React.Component {
    state = {
        mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        locationResult: null,
        location: {coords: { latitude: 37.78825, longitude: -122.4324}},
        markers : [
            {
              latitude: 53.811434,
              longitude: -1.566018,
              title: 'Fake Place',
              subtitle: 'Hello'
            }
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
<MapView.Marker
coordinate={{latitude: 53.811434,
    longitude: -1.566018}}
    title={"Fake Place"}
    description={"Fraser"}
>

</MapView.Marker>
      </MapView>
    );
  }

  componentDidMount() {
    this._getLocationAsync();
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




}