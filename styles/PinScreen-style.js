import { StyleSheet } from 'react-native';
import arup from './arupStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    marginBottom: 10,
  },
  noteContainer: {
    flex: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  userFooter: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 20,
  },
  noteText: {
    fontSize: 22,
    textAlign: 'justify',
    lineHeight: 30,
    color: arup['grey-80'],
    marginBottom: 10,
  },
});
