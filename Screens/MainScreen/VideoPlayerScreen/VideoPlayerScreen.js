import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    width: "100%",
    flex: 3,
    // height: "30%",
  },
});

export default function VideoPlayerScreen() {
  return <View style={styles.container}></View>;
}
