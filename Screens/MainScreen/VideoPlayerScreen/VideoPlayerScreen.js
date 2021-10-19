import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { socket } from "../../../SocketContext";
import { styles } from "./VideoPlayerStyles";

//Player Controls
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function VideoPlayerScreen({ currRoomID, currSocketID }) {
  const youtubePlayerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        ref={youtubePlayerRef}
        videoId={currRoomID}
        width={"100%"}
        height={"86%"}
        initialPlayerParams={{ controls: false }}
        play={isPlaying}
      />
      <View style={styles.videoControlsContainer}>
        <TouchableOpacity onPress={() => setIsPlaying(true)}>
          <Entypo name="controller-play" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPlaying(false)}>
          <FontAwesome name="pause" size={26} color="black" />
        </TouchableOpacity>

        <View style={styles.videoSlider}>
          <View style={styles.videoSliderTrackerBox} />
          <View style={styles.videoSliderHorizontalLine} />
        </View>
      </View>
    </View>
  );
}
