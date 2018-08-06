import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import HandleBack from "./back";

class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile",
  };
  state = {
    editing: false,
  };
  onBack = () => {
    if (this.state.editing) {
      Alert.alert(
        "You're still editing!",
        "Are you sure you want to go home with your edits not saved?",
        [
          { text: "Keep Editing", onPress: () => {}, style: "cancel" },
          { text: "Go Home", onPress: () => this.props.navigation.goBack() },
        ],
        { cancelable: false },
      );
      return true;
    }

    return false;

  };
  render() {
    const { editing } = this.state;
    return (
      <HandleBack onBack={this.onBack}>
        <View>
          <TouchableOpacity onPress={() => this.setState({ editing: !editing })}>
            <Text>Toggle Editing {editing ? "Off" : "On"} </Text>
          </TouchableOpacity>
        </View>
      </HandleBack>
    );
  }
}

export default ProfileScreen;
