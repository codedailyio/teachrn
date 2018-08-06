import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home",
  };
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.push("Profile")}>
          <Text>Go To Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
