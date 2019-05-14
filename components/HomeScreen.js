import React from 'react';
import {
  AsyncStorage, StyleSheet, Text, View, Button,
} from 'react-native';
import { Map } from './index';
import * as api from '../utils/api';

class HomeScreen extends React.Component {
  state = {
    user: {},
    pins: [],
  };

  componentDidMount() {
    AsyncStorage.getItem('user').then((stringUser) => {
      const user = JSON.parse(stringUser);
      this.setState({ user });
    });
  }

  render() {
    const { navigation } = this.props;
    console.log(this.state.user);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Map
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          navigation={navigation}
          pins={this.state.pins}
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
          <Button
            title="Add pin"
            onPress={() => navigation.navigate('AddPin', { addNewPin: this.addNewPin, user: this.state.user })
            }
          />
          <Button
            title="Go to AR"
            onPress={() => this.props.navigation.navigate('AR', { pins: this.state.pins })}
          />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.fetchPins();
  }

  fetchPins = () => {
    api.getPins().then(pins => this.setState({ pins }));
  };

  addNewPin = (pin) => {
    this.setState((state) => {
      const { pins } = state;
      return { pins: [...pins, pin] };
    });
  };
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
