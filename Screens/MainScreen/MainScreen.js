import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import VideoPlayerScreen from "./VideoPlayerScreen/VideoPlayerScreen";
import ChatScreen from "./ChatScreen/ChatScreen";
import { io } from "socket.io-client";

const socket = io(`http://192.168.1.5:8000/`);

export default function MainScreen({ route, navigation }) {
  const { urlText } = route.params;

  useEffect(() => {
    socket.on("connection", () => {
      console.log(socket.id);
    });
  });

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
      <VideoPlayerScreen />
      <ChatScreen />
    </View>
  );
}
