import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import BasicARScene from "./components/BasicARScene";
import AddPinScreen from "./components/AddPinScreen";
import PinScreen from "./components/PinScreen";
import AddPhotoScreen from "./components/AddPhotoScreen";
import Map from './components/Map'
import * as api from './api';


class HomeScreen extends React.Component {
  state = {
    pins: [],
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Map style={{ flex: 1, alignItems: "center", justifyContent: "center" }} navigation={this.props.navigation} pins={this.state.pins}></Map>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="I am a pin"
          onPress={() => this.props.navigation.navigate("Pin")}
        />
        <Button
          title="Go to AR"
          onPress={() => this.props.navigation.navigate("AR", {pins:this.state.pins})}
        />
        <Button
          title="Add Pin"
          onPress={() => this.props.navigation.navigate("AddPin")}
        />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.fetchPins();
  }

  fetchPins = () => {
    api
      .getPins()
      .then(pins => this.setState({ pins }))
      .then(console.log(this.state.pins))
  };

}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Pin: PinScreen,
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
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  map : {
    flex: 2

  }
});

export default createAppContainer(AppNavigator);
