import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, ImagePicker, Permissions, Location } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';
import axios from 'axios';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

class AddPinScreen extends React.Component {
  state = {
    user_id: 1,
    site_id: 1,
    photo: null,
    note: 'No note provided',
    uploading: false,
    upload_complete: false,
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
  }

  render() {
    let { photo, note, upload_complete, uploading } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
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

        <Button onPress={this.handleTakePhoto} title="Take a photo" />

        <TextInput
          onChangeText={note => this.setState({ note })}
          value={note}
          placeholder="Note"
          editable={true}
        />
      </View>
    );
  }

  handleTakePhoto = async () => {
    let photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    this.setState({
      photo,
      upload_complete: false,
      location,
    });
  };

  handleChoosePhoto = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // technically this is just the position where the photo was selected from the image library - NOT necessarily where it was taken
    this.setState({
      photo,
      upload_complete: false,
      location,
    });
  };

  handleUploadPhoto = async () => {
    try {
      const { photo, user_id, site_id, note, location } = this.state;
      const { timestamp, coords } = location;
      const { latitude, longitude, altitude } = coords;
      this.setState({
        uploading: true,
        upload_complete: false,
      });
      const photo_url = await uploadImageAsync(photo.uri);
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
      this.setState({
        upload_complete: true,
      });
    } catch (e) {
      alert('Unable to upload - please try again later');
    } finally {
      this.setState({
        uploading: false,
      });
    }
  };
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
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
