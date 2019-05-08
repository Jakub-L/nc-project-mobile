import React from 'react';
import {
  Button, Image, Text, View,
} from 'react-native';
import { createStackNavigator, createAppContainer, } from 'react-navigation';
import { Font } from 'expo';
import {
  BasicARScene, AddPinScreen, AddPhotoScreen, HomeScreen,
} from './components';
import welcomeScreenStyle from './styles/WelcomeScreen-style';
import navigatorStyle from './styles/Navigator-style';
import arupStyles from './styles/arupStyles';
import logo from './assets/logo-white-large.png';

class WelcomeScreen extends React.Component {
  state = { fontLoaded: false }
  static navigationOptions = { headerMode: 'none', headerStyle: { backgroundColor: arupStyles.blueBg } }

  async componentDidMount() {
    await Font.loadAsync({ 'times-new-roman': require('./assets/fonts/times-new-roman.ttf') })
    this.setState({ fontLoaded: true });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={welcomeScreenStyle.container}>
        <Image source={logo} />
        {this.state.fontLoaded ? <Text style={welcomeScreenStyle.appName}>Welcome Screen</Text> : null}
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
