import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { event, cond, eq, Value } = Animated;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    var state = new Value(-1);

    this.onStateChange = event([{
      nativeEvent: {
        state: state,
      },
    }]);

    this._opacity = cond(eq(state, State.BEGAN), 0.2, 1);
  }
  render() {
    return (
      <View style={styles.container}>
        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
          <Animated.View style={[styles.box, { opacity: this._opacity }]} />
        </TapGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#000",
    width: 200,
    height: 200,
  },
});
