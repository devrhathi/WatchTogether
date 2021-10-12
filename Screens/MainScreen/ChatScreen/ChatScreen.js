import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    flex: 7,
    // height: "70%",
  },
});

export default function ChatScreen({ createdRoomID }) {
  return (
    <View style={styles.container}>
      <Text>{createdRoomID}</Text>
    </View>
  );
}
