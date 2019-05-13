import React from 'react';
import {
  Text, View, Dimensions, ScrollView, Linking,
} from 'react-native';
import Image from 'react-native-scalable-image';
import { convertIsoDate } from '../utils/pin-utils';
import pinScreenStyle from '../styles/PinScreen-style';

class PinScreen extends React.Component {
  state = { imageLoading: false };

  render() {
    const { width } = Dimensions.get('window');
    const { navigation } = this.props;
    const {
      email, creator, timestamp, note, photo_url,
    } = navigation.getParam('pin');
    return (
      <View style={pinScreenStyle.container}>
        {photo_url && (
          <Image style={pinScreenStyle.image} width={width} source={{ uri: photo_url }} />
        )}
        <ScrollView style={pinScreenStyle.noteContainer}>
          {note.length > 0 ? <Text style={pinScreenStyle.noteText}>{note}</Text> : null}
          <View style={pinScreenStyle.userFooter}>
            <Text>{creator}</Text>
            <Text onPress={() => Linking.openURL(`mailto:${email}`)}>{email}</Text>
            <Text>{convertIsoDate(timestamp)}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PinScreen;
