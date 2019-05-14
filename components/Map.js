import React from 'react';
import { Platform } from 'react-native';
import { MapView, Location } from 'expo';
import { convertIsoDate } from '../utils/pin-utils';

export default class Map extends React.Component {
  state = {
    location: { coords: { latitude: 53.795, longitude: -1.546 } },
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      this.setState({ location });
    }
  };

  render() {
    const { location } = this.state;
    const { pins, navigation } = this.props;
    return (
      <MapView
        style={{ alignSelf: 'stretch', height: Platform.OS === 'ios' ? 550 : 650 }}
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
