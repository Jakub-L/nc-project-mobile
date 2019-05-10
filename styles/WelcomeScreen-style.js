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
  button: {
    height: 40,
    margin: 10,
    marginRight: 100,
    marginLeft: 100,
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: arup.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: arup['black-60'],
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonText: {
    fontSize: 20,
    color: arup.blueText,
    textTransform: 'uppercase',
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
});
