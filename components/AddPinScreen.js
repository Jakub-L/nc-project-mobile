import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class AddPinScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Add Pin Screen</Text>
        <Button
          title="Add Photo"
          onPress={() => this.props.navigation.navigate("AddPhoto")}
        />
        <Text>Type your note here...</Text>
        <Button
          title="Submit Pin"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

export default AddPinScreen;
