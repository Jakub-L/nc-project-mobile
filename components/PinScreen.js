import React from 'react';
import {
  Text, View, Dimensions, ScrollView, Linking, Image,
} from 'react-native';
import ScaleableImage from 'react-native-scalable-image';
import { convertIsoDate } from '../utils/pin-utils';
import pinScreenStyle from '../styles/PinScreen-style';

class PinScreen extends React.Component {
  state = { imageLoading: false };

  render() {
    const { width } = Dimensions.get('window');
    const { navigation } = this.props;
    const {
      email, creator, timestamp, note, photo_url, user_photo,
    } = navigation.getParam('pin');
    return (
      <View style={pinScreenStyle.container}>
        {photo_url ? (
          <ScaleableImage style={pinScreenStyle.image} width={width} source={{ uri: photo_url }} />
        ) : (
          <Text> </Text>
        )}
        <ScrollView style={pinScreenStyle.noteContainer}>
          <Text style={pinScreenStyle.noteText}>{note}</Text>
          <View style={pinScreenStyle.userFooter}>
            <Image source={{ uri: user_photo }} style={pinScreenStyle.userAvatar} />
            <View style={pinScreenStyle.userInfo}>
              <Text style={pinScreenStyle.userName}>{creator}</Text>
              <Text
                style={pinScreenStyle.userEmail}
                onPress={() => Linking.openURL(`mailto:${email}`)}
              >
                {email}
              </Text>
              <Text style={pinScreenStyle.userTimestamp}>{convertIsoDate(timestamp)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PinScreen;
