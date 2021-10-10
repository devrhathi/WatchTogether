import React from "react";
import { View, StyleSheet } from "react-native";
import VideoPlayerScreen from "./VideoPlayerScreen/VideoPlayerScreen";
import ChatScreen from "./ChatScreen/ChatScreen";

export default function MainScreen({ route, navigation }) {
  const { urlText } = route.params;

  const styles = StyleSheet.create({
    container: {
      borderColor: "red",
      borderWidth: 4,
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      {console.log(urlText)}

      <VideoPlayerScreen />
      <ChatScreen />
    </View>
  );
}
