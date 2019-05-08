import React from 'react';
import {
  Button, Image, Text, View,
} from 'react-native';
import { createStackNavigator, createAppContainer, Icon } from 'react-navigation';
import welcomeScreenStyle from './styles/WelcomeScreen-style';
import navigatorStyle from './styles/Navigator-style';
import logo from './assets/logo-white-large.png';
import {
  BasicARScene, AddPinScreen, AddPhotoScreen, HomeScreen,
} from './components';
import arupStyles from './styles/arupStyles';

class WelcomeScreen extends React.Component {
  static navigationOptions = { headerMode: 'none', headerStyle: { backgroundColor: arupStyles.blueBg } }

  render() {
    const { navigation } = this.props;
    return (
      <View style={welcomeScreenStyle.container}>
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
      headerTransparent: true,
      headerTintColor: arupStyles.white,
      headerStyle: navigatorStyle.header,
    },
  },
);

export default createAppContainer(AppNavigator);
