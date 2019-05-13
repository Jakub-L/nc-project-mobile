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
    user: {},
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

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.LOCATION);
    const user = await AsyncStorage.getItem('user');
    this.setState({ user });
  }

  handleTakePhoto = async () => {
    const photo = await ImagePicker.launchCameraAsync();
    if (!photo.cancelled) {
      this.setState({ selecting: true });
      const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      this.setState({
        photo,
        location,
      });
    }
  };

  handleChoosePhoto = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync();
    if (!photo.cancelled) {
      this.setState({ selecting: true });
      const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
      this.setState({
        photo,
        location,
      });
    }
  };

  handleUploadPhoto = async () => {
    try {
      const {
        photo: { uri },
        user: { user_id },
        site_id,
        note,
        location,
      } = this.state;
      const { timestamp, coords } = location;
      const { latitude, longitude, altitude } = coords;
      this.setState({
        uploading: true,
      });
      const photo_url = uri ? await uploadImageAsync(uri) : '';
      const { data } = await axios.post('https://site-seeing.herokuapp.com/api/pins', {
        user_id,
        site_id,
        timestamp: new Date(timestamp).toISOString(),
        latitude,
        longitude,
        altitude,
        photo_url,
        note,
      });
    } catch (e) {
      alert('Unable to upload - please try again later');
    } finally {
      this.setState({
        uploading: false,
      });
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
          onPress={() => alert('uploaded')}
          activeOpacity={0.8}
        >
          {uploading ? (
            <ActivityIndicator size="small" color={arup.white} />
          ) : (
            <Text style={arup.blueButtonText}>Upload pin</Text>
          )}
        </TouchableOpacity>
        {/* {photo && (
          <React.Fragment>
            <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />
            {uploading ? (
              <ActivityIndicator size="large" />
            ) : upload_complete ? (
              <Text>Upload complete</Text>
            ) : (
              <Button onPress={this.handleUploadPhoto} title="Upload" />
            )}
          </React.Fragment>
        )}

        <Button onPress={this.handleChoosePhoto} title="Pick an image from camera roll" />

        <Button onPress={this.handleTakePhoto} title="Take a photo" /> */}
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
