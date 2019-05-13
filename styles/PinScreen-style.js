import { StyleSheet } from 'react-native';
import arup from './arupStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    marginTop: 60,
    marginBottom: 10,
  },
  noteContainer: {
    flex: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  userFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    borderTopColor: arup['black-60'],
    borderTopWidth: 1,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 22,
    textAlign: 'justify',
    lineHeight: 30,
    color: arup['black-80'],
    marginBottom: 10,
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 23,
    fontFamily: 'times-new-roman',
    color: arup.blueText,
  },
  userEmail: {
    fontSize: 20,
    fontFamily: 'times-new-roman',
    color: arup['black-100'],
    textDecorationLine: 'underline',
  },
  userTimestamp: {
    fontSize: 20,
    fontFamily: 'times-new-roman',
    color: arup['black-80'],
  },
});
