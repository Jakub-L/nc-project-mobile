import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Map from './Map';
import homeScreenStyle from '../styles/HomeScreen-style';
import arupStyles from '../styles/arupStyles';
import * as api from '../utils/api';

class HomeScreen extends React.Component {
  state = {
    pins: [],
    selectedPin: {},
  };

  componentDidMount() {
    this.fetchPins();
  }

  fetchPins = () => {
    api.getPins().then(pins => this.setState({ pins }));
  };

  findSelectedPin = (selectedPinID) => {
    const selectedPinArray = this.state.pins.filter(pin => pin.pin_id === selectedPinID);
    const pin = selectedPinArray[0];
    this.props.navigation.navigate('Pin', { pin });
  };

  addNewPin = (pin) => {
    this.setState((state) => {
      const { pins } = state;
      return { pins: [...pins, pin] };
    });
  };

  render() {
    const { navigation } = this.props;
    const { pins } = this.state;
    const { selectedPin } = this.state;

    return (
      <View style={homeScreenStyle.container}>
        <Map style={homeScreenStyle.map} navigation={navigation} pins={pins} />
        <View style={homeScreenStyle.buttonContainer}>
          <TouchableOpacity
            style={arupStyles.blueButton}
            onPress={() => navigation.navigate('AddPin', { addNewPin: this.addNewPin, user: this.state.user })
            }
            activeOpacity={0.8}
          >
            <Text style={arupStyles.blueButtonText}>Add Pin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={arupStyles.blueButton}
            onPress={() => navigation.navigate('AR', { pins, findSelectedPin: this.findSelectedPin })
            }
            activeOpacity={0.8}
          >
            <Text style={arupStyles.blueButtonText}>Go to AR Viewer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  map: {
    flex: 2,
  },
});

export default HomeScreen;
