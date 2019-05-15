import { StyleSheet } from 'react-native';
import arup from './arupStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoButtonsContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  image: {
    height: 300,
    width: 300,
    margin: 10,
    marginTop: 60,
  },
  noteField: {
    flex: 3,
    backgroundColor: arup.white,
    margin: 10,
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 20,
    color: arup['black-100'],
    borderRadius: 5,
    borderWidth: 1,
    borderColor: arup['black-60'],
  },
  icon: {
    fontSize: 80,
    color: arup.white,
    textAlign: 'center',
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    margin: 10,
    backgroundColor: arup.blueBg,
    borderRadius: 5,
  },
  iconButtonText: {
    color: arup.white,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
  },
  disabledButton: {
    height: 40,
    margin: 10,
    marginRight: 100,
    marginLeft: 100,
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: arup['black-60'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  disabledButtonText: {
    fontSize: 20,
    color: '#ffffff',
  },
});
