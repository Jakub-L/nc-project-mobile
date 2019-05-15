import React from 'react';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import Map from './Map';
import homeScreenStyle from '../styles/HomeScreen-style';
import arupStyles from '../styles/arupStyles';
import * as api from '../utils/api';

class HomeScreen extends React.Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    this.fetchPins();
  }

  fetchPins = () => {
    api.getPins().then(pins => this.setState({ pins }));
  };

  findSelectedPin = (selectedPinID) => {
    const { navigation } = this.props;
    const { pins } = this.state;
    const selectedPinArray = pins.filter(pin => pin.pin_id === selectedPinID);
    const pin = selectedPinArray[0];
    navigation.navigate('Pin', { pin });
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

    return (
      <View style={homeScreenStyle.container}>
        <Map style={homeScreenStyle.map} navigation={navigation} pins={pins} />
        <View style={homeScreenStyle.buttonContainer}>
          <TouchableOpacity
            style={arupStyles.blueButton}
            onPress={() => navigation.navigate('AddPin', { addNewPin: this.addNewPin })
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

export default HomeScreen;
