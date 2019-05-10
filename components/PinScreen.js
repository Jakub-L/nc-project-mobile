import React from 'react';
import {
  StyleSheet, Text, View, Button, Dimensions, ScrollView, Linking
} from 'react-native';
import Image from 'react-native-scalable-image';

class PinScreen extends React.Component {
  render() {
    const dimensions = Dimensions.get('window');
    const { navigation } = this.props;
    const pin = navigation.getParam('pin');
    return (
      <View>
        <Image width={Dimensions.get('window').width} source={{ uri: pin.photo_url }} />
        <ScrollView>
          <Text>
Posted by: {pin.creator}
          </Text>
<Text style={styles.email} onPress={() => Linking.openURL(`mailto:${pin.email}`) } >
{pin.email}
</Text>
<Text>
Date posted: {pin.timestamp}
          </Text>
          <Text>
            {'\n'}
            {pin.note}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  email: {
    color: 'blue',
  },
});

export default PinScreen;
