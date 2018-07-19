import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";

const {
  cond,
  eq,
  set,
  neq,
  and,
  Value,
  event,
  Clock,
  startClock,
  stopClock,
  timing,
  block,
  interpolate,
  Extrapolate,
} = Animated;

const runOpacityTimer = (clock, gestureState) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 300,
    toValue: new Value(-1),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 1),
      startClock(clock),
    ]),
    cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    interpolate(state.position, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
  ]);
};

export default class Example extends Component {
  gestureState = new Value(-1);
  clock = new Clock();
  onStateChange = event([
    {
      nativeEvent: { state: this.gestureState },
    },
  ]);
  opacity = runOpacityTimer(this.clock, this.gestureState);

  render() {
    return (
      <View style={styles.container}>
        <TapGestureHandler minDist={0} onHandlerStateChange={this.onStateChange}>
          <Animated.View
            style={[
              styles.rect,
              {
                opacity: this.opacity,
              },
            ]}
          />
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
  rect: {
    width: 200,
    height: 200,
    backgroundColor: "tomato",
  },
});
