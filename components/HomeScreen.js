import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { Map } from './index';
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

  render() {
    const { navigation } = this.props;
    const { pins } = this.state;

    return (
      <View style={homeScreenStyle.container}>
        <Map style={homeScreenStyle.map} navigation={navigation} pins={pins} />
        <View style={homeScreenStyle.buttonContainer}>
          <TouchableOpacity
            style={arupStyles.blueButton}
            onPress={() => navigation.navigate('AddPin')}
            activeOpacity={0.8}
          >
            <Text style={arupStyles.blueButtonText}>Add Pin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={arupStyles.blueButton}
            onPress={() => navigation.navigate('AR')}
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
