import React from 'react';
import { MapView, Location, Permissions, Marker} from 'expo';

export default class Map extends React.Component {
  state = {
    mapRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    markers: [],
  };

  render() {
    return (
      <MapView
        style={{ alignSelf: 'stretch', height: 550 }}
        region={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      >
        {this.props.pins.map(pin => (
          <MapView.Marker
            key={pin.pin_id}
            coordinate={{ latitude: Number(pin.latitude), longitude: Number(pin.longitude) }}
            title={pin.creator}
            description={pin.timestamp}
            onPress={() => this.props.navigation.navigate('Pin', {
              pin,
            })
            }
          />
        ))}
      </MapView>
    );
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
  };


}
