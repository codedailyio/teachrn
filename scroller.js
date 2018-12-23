import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
const cards = Array(20).fill(0);

class Scroller extends Component {
  render() {
    return (
      <ScrollView horizontal style={styles.scroll}>
        {cards.map((v, index) => {
          return <View key={index} style={[styles.card, { backgroundColor: randomHsl() }]} />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    height: 300,
  },
  card: {
    height: "100%",
    width: 200,
  },
});

export default Scroller;
