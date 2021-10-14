import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    // backgroundColor: "#000000",
    width: "100%",
    height: 230,
    // flex: 2.8,
  },
});

export default function VideoPlayerScreen({ currRoomID }) {
  const tellStateChange = (e) => {
    console.log("state changed");
  };

  return (
    <View style={styles.container}>
      <YoutubePlayer videoId={currRoomID} width={"100%"} height={"100%"} />
    </View>
  );
}
