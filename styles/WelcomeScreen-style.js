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
});
