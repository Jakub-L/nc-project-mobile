import { StyleSheet } from 'react-native';
import arup from './arupStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: arup.blueBg,
  },
  appName: {
    fontFamily: 'times-new-roman',
    fontSize: 50,
    letterSpacing: 15,
    marginTop: -75,
    marginBottom: 30,
    color: arup.white,
  },
  textInput: {
    backgroundColor: arup.white,
    height: 40,
    margin: 10,
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: arup['black-100'],
    borderRadius: 5,
  },
  loginFailed: {
    backgroundColor: arup.white,
    height: 40,
    margin: 10,
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#8b0000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 2,
  },
});
