import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import BasicARScene from "./components/BasicARScene";
import AddPinScreen from "./components/AddPinScreen";
import AddPhotoScreen from "./components/AddPhotoScreen";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="I am a pin"
          onPress={() => this.props.navigation.navigate("Pin")}
        />
        <Button
          title="Go to AR"
          onPress={() => this.props.navigation.navigate("AR")}
        />
        <Button
          title="Add Pin"
          onPress={() => this.props.navigation.navigate("AddPin")}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Pin: AddPinScreen,
    AddPin: AddPinScreen,
    AR: BasicARScene,
    AddPhoto: AddPhotoScreen
  },
  {
    initialRouteName: "Home"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default createAppContainer(AppNavigator);
