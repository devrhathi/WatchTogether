import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import VideoPlayerScreen from "./VideoPlayerScreen/VideoPlayerScreen";
import ChatScreen from "./ChatScreen/ChatScreen";
import { io } from "socket.io-client";

export default function MainScreen({ route, navigation }) {
  // const { roomIDText } = route.params;
  const roomIDText = "tqyquiHa981";
  const socket = io(`http://192.168.1.7:8000/`);
  // const socket = io(`http://localhost:8000/`);

  useEffect(() => {
    //after socket connection, emit a join room request along with the video id to join
    socket.emit("joinRoom", roomIDText, (socketID) => {
      console.log(socketID, "Joined the room");
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <VideoPlayerScreen />
      <ChatScreen createdRoomID={roomIDText} />
    </View>
  );
}
