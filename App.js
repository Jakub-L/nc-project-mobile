import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Font, Permissions } from 'expo';
import {
  BasicARScene, AddPinScreen, AddPhotoScreen, HomeScreen, PinScreen,
} from './components';
import * as api from './utils/api';
import welcomeScreenStyle from './styles/WelcomeScreen-style';
import navigatorStyle from './styles/Navigator-style';
import arupStyles from './styles/arupStyles';
import logo from './assets/logo-white-large.png';

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
    headerStyle: { backgroundColor: arupStyles.blueBg },
    headerRight: <Text> </Text>,
  };

  state = {
    fontLoaded: false,
    email: '',
    password: '',
    emailDefault: '',
    passwordDefault: '',
    attemptingLogin: false,
    loginFailed: false,
  };

  async componentDidMount() {
    console.disableYellowBox = true;
    await Font.loadAsync({
      'times-new-roman': require('./assets/fonts/times-new-roman.ttf'),
    });
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.LOCATION);
    await AsyncStorage.clear();
    this.setState({ fontLoaded: true });
  }

  dealWithDefaultsFocus = (field) => {
    if (field === 'email') {
      const { email, emailDefault } = this.state;
      if (email === emailDefault) this.setState({ email: '' });
    } else if (field === 'password') {
      const { password, passwordDefault } = this.state;
      if (password === passwordDefault) this.setState({ password: '' });
    }
  };

  dealWithDefaultsBlur = (field) => {
    if (field === 'email') {
      const { email, emailDefault } = this.state;
      if (email === '') this.setState({ email: emailDefault });
    } else if (field === 'password') {
      const { password, passwordDefault } = this.state;
      if (password === '') this.setState({ password: passwordDefault });
    }
  };

  attemptLogin = () => {
    const {
      email, password, emailDefault, passwordDefault,
    } = this.state;
    const { navigation } = this.props;
    this.setState({ attemptingLogin: true, loginFailed: false }, () => {
      api
        .loginUser(email, password)
        .then(user => AsyncStorage.setItem('user', JSON.stringify(user)))
        .then(() => {
          this.setState({ attemptingLogin: false });
          navigation.navigate('Home');
        })
        .catch(() => {
          this.setState({
            loginFailed: true,
            attemptingLogin: false,
            email: emailDefault,
            password: passwordDefault,
          });
        });
    });
  };

  render() {
    const {
      fontLoaded, email, password, attemptingLogin, loginFailed,
    } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={60}
        style={welcomeScreenStyle.container}
      >
        <Image source={logo} />
        {fontLoaded ? <Text style={welcomeScreenStyle.appName}>SiteSeeing</Text> : null}
        <TextInput
          onChangeText={email => this.setState({ email })}
          onFocus={() => {
            this.dealWithDefaultsFocus('email');
          }}
          onBlur={() => {
            this.dealWithDefaultsBlur('email');
          }}
          value={email}
          placeholder="Email"
          textContentType="emailAddress"
          placeholderTextColor={arupStyles['black-60']}
          style={loginFailed ? welcomeScreenStyle.loginFailed : welcomeScreenStyle.textInput}
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
          onFocus={() => {
            this.dealWithDefaultsFocus('password');
          }}
          onBlur={() => {
            this.dealWithDefaultsBlur('password');
          }}
          value={password}
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          placeholderTextColor={arupStyles['black-60']}
          style={loginFailed ? welcomeScreenStyle.loginFailed : welcomeScreenStyle.textInput}
        />
        <TouchableOpacity
          style={arupStyles.whiteButton}
          onPress={this.attemptLogin}
          activeOpacity={0.8}
          disabled={attemptingLogin}
        >
          {attemptingLogin ? (
            <ActivityIndicator size="small" color={arupStyles.blueBg} />
          ) : (
            <Text style={arupStyles.whiteButtonText}>Log in</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Home: HomeScreen,
    Pin: PinScreen,
    AddPin: AddPinScreen,
    AR: BasicARScene,
    AddPhoto: AddPhotoScreen,
  },
  {
    initialRouteName: 'Welcome',

    defaultNavigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTintColor: arupStyles.white,
      headerStyle: navigatorStyle.header,
      headerRight: (
        <Text
          style={welcomeScreenStyle.logoffText}
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate('Welcome');
          }}
        >
          Log off
        </Text>
      ),
    }),
  },
);

export default createAppContainer(AppNavigator);
