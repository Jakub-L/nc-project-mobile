import React from 'react';
import {
  AsyncStorage, StyleSheet, Text, View, Button,
} from 'react-native';
import { Map } from './index';
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Map
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          navigation={navigation}
          pins={pins}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Home Screen</Text>
          <Button title="Add pin" onPress={() => navigation.navigate('AddPin')} />
          <Button
            title="Go to AR"
            onPress={() => navigation.navigate('AR', { pins })}
          />
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
