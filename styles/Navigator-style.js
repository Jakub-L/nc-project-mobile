import { Platform, StyleSheet } from 'react-native';
import arup from './arupStyles';

export default StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'ios' ? 0 : -45,
    backgroundColor: arup.blueBg,
  },
});
