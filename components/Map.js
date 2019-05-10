import React from 'react';
import {
  MapView, Location,
} from 'expo';

export default class Map extends React.Component {
  state = {
    location: { coords: { latitude: 57.794671, longitude: -1.547202 } },
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    const { location } = this.state;
    const { pins, navigation } = this.props;
    return (
      <MapView
        style={{ alignSelf: 'stretch', height: 650 }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      >
        {pins.map(pin => (
          <MapView.Marker
            key={pin.pin_id}
            coordinate={{ latitude: Number(pin.latitude), longitude: Number(pin.longitude) }}
            title={pin.creator}
            description={pin.timestamp}
            onPress={() => navigation.navigate('Pin', {
              pin,
            })
            }
          />
        ))}
      </MapView>
    );
  }
}
