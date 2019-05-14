import React from 'react';
import {
  AsyncStorage,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { ImagePicker, Permissions, Location } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import uuid from 'uuid';
import * as firebase from 'firebase';
import axios from 'axios';
import firebaseConfig from '../firebaseConfig';
import addPinScreenStyle from '../styles/AddPinScreen-style';
import arup from '../styles/arupStyles';

firebase.initializeApp(firebaseConfig);

class AddPinScreen extends React.Component {
  static navigationOptions = {
    title: 'Add pin',
  };

  state = {
    user: { user_id: null, creator: null, email: null },
    site: { site_id: 1, site_name: 'West Ardenborough' },
    selecting: false,
    photo: null,
    note: '',
    site_id: 1,
    uploading: false,
    location: {
      timestamp: null, // milliseconds since epoch - needs converted to ISOString before POST
      coords: {
        latitude: null,
        longitude: null,
        altitude: null,
        heading: null, // horizontal direction of travel of device, in degrees where due north = 0, east = 90, etc.
        speed: null, // metres per second
        accuracy: null, // uncertainty radius in metres
      },
    },
  };

  async componentWillMount() {
    await this.setState({ user: this.props.navigation.getParam('user') });
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.LOCATION);
    const user = await AsyncStorage.getItem('user');
    this.setState({ user: JSON.parse(user) });
  }

  getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    this.setState({ location });
  };

  handleTakePhoto = async () => {
    const photo = await ImagePicker.launchCameraAsync();
    if (!photo.cancelled) {
      this.setState({ selecting: true });
      this.setState({ photo });
    }
  };

  handleChoosePhoto = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync();
    if (!photo.cancelled) {
      this.setState({ selecting: true });
      this.setState({ photo });
    }
  };

  handleUploadPhoto = async () => {
    try {
      this.setState({
        uploading: true,
      });
      await this.getLocation();
      const {
        photo, user, site, note, location,
      } = this.state;
      const { timestamp, coords } = location;
      const { latitude, longitude, altitude } = coords;
      let photo_url = '';
      if (photo) {
        photo_url = await uploadImageAsync(photo.uri);
      }
      const { data } = await axios.post('https://site-seeing.herokuapp.com/api/pins', {
        user_id: user.user_id,
        site_id: site.site_id,
        timestamp: new Date(timestamp).toISOString(),
        latitude,
        longitude,
        altitude,
        photo_url,
        note,
      });
      const addedPin = data.pin;
      addedPin.creator = user.name;
      addedPin.user_photo = user.user_photo;
      addedPin.site_name = site.site_name;
      const addNewPin = this.props.navigation.getParam('addNewPin');
      addNewPin(addedPin);
    } catch (e) {
      alert(`Error! Upload failed with error: ${e}`);
    } finally {
      this.setState({
        uploading: false,
        note: '',
        photo: null,
        selecting: false,
      });
      alert('Upload successful!');
    }
  };

  render() {
    const {
      photo, note, uploading, selecting,
    } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={60}
        style={addPinScreenStyle.container}
      >
        {photo ? (
          <Image style={addPinScreenStyle.image} source={{ uri: photo.uri }} />
        ) : (
          <View style={addPinScreenStyle.photoButtonsContainer}>
            <TouchableOpacity
              onPress={this.handleChoosePhoto}
              activeOpacity={0.8}
              style={addPinScreenStyle.iconButton}
              disabled={selecting}
            >
              {selecting ? (
                <ActivityIndicator size="large" color={arup.white} />
              ) : (
                <View>
                  <FontAwesome style={addPinScreenStyle.icon} name="file-photo-o" />
                  <Text style={addPinScreenStyle.iconButtonText}>Pick photo</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleTakePhoto}
              activeOpacity={0.8}
              style={addPinScreenStyle.iconButton}
              disabled={selecting}
            >
              {selecting ? (
                <ActivityIndicator size="large" color={arup.white} />
              ) : (
                <View>
                  <FontAwesome style={addPinScreenStyle.icon} name="camera" />
                  <Text style={addPinScreenStyle.iconButtonText}>Take photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          onChangeText={note => this.setState({ note })}
          value={note}
          style={addPinScreenStyle.noteField}
          placeholder="Enter note..."
          editable
          multiline
        />
        <TouchableOpacity
          style={photo || note ? arup.blueButton : addPinScreenStyle.disabledButton}
          disabled={(!photo && !note) || uploading}
          onPress={this.handleUploadPhoto}
          activeOpacity={0.8}
        >
          {uploading ? (
            <ActivityIndicator size="small" color={arup.white} />
          ) : (
            <Text style={arup.blueButtonText}>Upload pin</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export default AddPinScreen;
