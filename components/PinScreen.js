import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class StaticARScene extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Pin Screen</Text>
        <Text>Photo</Text>
        <Text>Notes about photo</Text>
        <Text>Contact Details</Text>
      </View>
    );
  }
}

export default StaticARScene;
