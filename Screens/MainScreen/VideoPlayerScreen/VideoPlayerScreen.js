import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { socket } from "../../../SocketContext";
import { styles } from "./VideoPlayerStyles";

//Player Controls
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function VideoPlayerScreen({ currRoomID, currSocketID }) {
  const youtubePlayerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const sliderRef = useRef();
  const [videoDuration, setVideoDuration] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderIntervalID, setSliderIntervalID] = useState();

  const initializeVideoSlider = () => {
    if (youtubePlayerRef && youtubePlayerRef.current) {
      youtubePlayerRef.current.getDuration().then((duration) => {
        setVideoDuration(duration);
      });
    }
  };

  const startVideoSlider = () => {
    if (sliderRef) {
      let tempTime = timeElapsed;
      let sliderInterval = setInterval(() => {
        //move slider to right, called every second
        tempTime++;
        setSliderLeft((tempTime * 100) / videoDuration);
        setTimeElapsed(tempTime);
      }, 1000);
      setSliderIntervalID(sliderInterval);
    }
  };

  return (
    <View style={styles.container}>
      <YoutubePlayer
        ref={youtubePlayerRef}
        videoId={currRoomID}
        width={"100%"}
        height={"86%"}
        initialPlayerParams={{ controls: false }}
        play={isPlaying}
        onReady={initializeVideoSlider}
      />
      <View style={styles.videoControlsContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsPlaying(true);
            startVideoSlider();
          }}
        >
          <Entypo name="controller-play" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsPlaying(false);
            clearInterval(sliderIntervalID);
          }}
        >
          <FontAwesome name="pause" size={26} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.videoSlider}>
          <View
            style={{ ...styles.videoSliderTrackerBox, left: `${sliderLeft}%` }}
            ref={sliderRef}
          />
          <View style={styles.videoSliderHorizontalLine} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
