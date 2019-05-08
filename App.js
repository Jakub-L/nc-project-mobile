import React from 'react';
import {
  Button, Image, Text, View,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreenStyle from './styles/WelcomeScreen-style';
import * as arup from './styles/arupStyles';
import logo from './assets/logo-white-large.png';
import {
  BasicARScene, AddPinScreen, AddPhotoScreen, HomeScreen,
} from './components';

class WelcomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={WelcomeScreenStyle.container}>
        <Image source={logo} />
        <Text>Welcome Screen</Text>
        <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Home: HomeScreen,
    Pin: AddPinScreen,
    AddPin: AddPinScreen,
    AR: BasicARScene,
    AddPhoto: AddPhotoScreen,
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#28aae1',
      },
      headerTintColor: '#ffffff',
    },
  },
);

export default createAppContainer(AppNavigator);
