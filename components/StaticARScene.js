import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class StaticARScene extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Satic ARScreen</Text>
        <Button
          title="Map Screen"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Add Pin"
          onPress={() => this.props.navigation.navigate("AddPin")}
        />
      </View>
    );
  }
}

export default StaticARScene;
