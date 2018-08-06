import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "react-navigation";

import HomeScreen from "./home";
import ProfileScreen from "./profile";

const Navigation = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
