import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from "react-native";
const CODE_LENGTH = new Array(6).fill(0);

export default class App extends Component {
  input = React.createRef();
  state = {
    value: "",
    focused: false,
  };

  handleClick = () => {
    this.input.current.focus();
  };
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({
      focused: false,
    });
  };
  handleKeyPress = e => {
    if (e.nativeEvent.key === "Backspace") {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };
  handleChange = value => {
    this.setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length),
      };
    });
  };
  render() {
    const { value, focused } = this.state;

    const values = value.split("");

    const selectedIndex =
      values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;

    const hideInput = !(values.length < CODE_LENGTH.length);

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handleClick}>
          <View style={styles.wrap}>
            <TextInput
              value=""
              ref={this.input}
              onChangeText={this.handleChange}
              onKeyPress={this.handleKeyPress}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={[
                styles.input,
                {
                  left: selectedIndex * 32,
                  opacity: hideInput ? 0 : 1,
                },
              ]}
            />
            {CODE_LENGTH.map((v, index) => {
              const selected = values.length === index;
              const filled =
                values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;
              const removeBorder = index === CODE_LENGTH.length - 1 ? styles.noBorder : undefined;

              return (
                <View style={[styles.display, removeBorder]} key={index}>
                  <Text style={styles.text}>{values[index] || ""}</Text>
                  {(selected || filled) && focused && <View style={styles.shadows} />}
                </View>
              );
            })}
          </View>
        </TouchableWithoutFeedback>
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
  wrap: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    position: "relative",
    flexDirection: "row",
  },

  input: {
    position: "absolute",
    fontSize: 32,
    textAlign: "center",
    backgroundColor: "transparent",
    width: 32,
    top: 0,
    bottom: 0,
  },
  display: {
    borderRightWidth: 1,
    borderRightColor: "rgba(0, 0, 0, 0.2)",
    width: 32,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  text: {
    fontSize: 32,
  },
  noBorder: {
    borderRightWidth: 0,
  },
  shadows: {
    position: "absolute",
    left: -4,
    top: -4,
    bottom: -4,
    right: -4,
    borderColor: "rgba(58, 151, 212, 0.28)",
    borderWidth: 4,
  },
});
