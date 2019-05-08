import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="I am a pin" onPress={() => this.props.navigation.navigate('Pin')} />
        <Button title="Go to AR" onPress={() => this.props.navigation.navigate('AR')} />
        <Button title="Add Pin" onPress={() => this.props.navigation.navigate('AddPin')} />
      </View>
    );
  }
}

export default HomeScreen;
