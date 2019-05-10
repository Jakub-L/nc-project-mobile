import React from 'react';
import {
  AsyncStorage, StyleSheet, Text, View, Button,
} from 'react-native';
import { Map } from './index';

class HomeScreen extends React.Component {
  state = {
    user: {},
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
          <Button title="I am a pin" onPress={() => navigation.navigate('Pin')} />
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
