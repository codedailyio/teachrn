import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

export default class App extends React.Component {
  state = {
    animation: new Animated.Value(1),
  };
  componentDidMount = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 15000,
    }).start();
  };

  render() {
    const animation = {
      right: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["100%", "0%"],
      }),
      // transform: [
      //   {
      //     translateX: this.state.animation.interpolate({
      //       inputRange: [0, 1],
      //       outputRange: [-96, 0],
      //     }),
      //   },
      // ],
    };

    return (
      <View style={styles.container}>
        <View style={styles.pill}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.fill, animation]} />
          <View style={styles.wrap}>
            <View style={[StyleSheet.absoluteFill, styles.content]}>
              <View style={styles.img}>
                <Text style={styles.text}>JB</Text>
              </View>
              <View>
                <Text style={styles.text}>$100.00</Text>
              </View>
            </View>
          </View>
        </View>
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
  pill: {
    width: 96,
    backgroundColor: "#48aa77",
    borderRadius: 48,
    overflow: "hidden",
    transform: [{ scale: 2 }],
  },
  fill: {
    backgroundColor: "#25573d",
  },
  wrap: {
    height: 28,
    width: '100%',
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4
  },
  img: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 14,
  },
});
