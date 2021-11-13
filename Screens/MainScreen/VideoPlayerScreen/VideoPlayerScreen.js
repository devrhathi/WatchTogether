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
  const [sliderInterval, setSliderInterval] = useState(0);

  useEffect(() => {
    socket.on("playVideo", () => {
      playVideo();
    });

    socket.on("pauseVideo", (timeElapsedOnOtherDevice) => {
      setTimeElapsed(timeElapsedOnOtherDevice);
      pauseVideo();
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (sliderRef) {
        setSliderInterval(
          setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
          }, 1000)
        );
      }
    } else {
      clearInterval(sliderInterval);
    }
  }, [isPlaying]);

  const initializeVideoSlider = () => {
    if (youtubePlayerRef && youtubePlayerRef.current) {
      youtubePlayerRef.current.getDuration().then((duration) => {
        setVideoDuration(duration);
      });
    }
  };

  const playVideo = () => {
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    setIsPlaying(false);
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
            playVideo();
            socket.emit("playClicked", currRoomID);
          }}
        >
          <Entypo name="controller-play" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            pauseVideo();
            socket.emit("pauseClicked", { timeElapsed, currRoomID });
          }}
        >
          <FontAwesome name="pause" size={26} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.videoSlider}>
          <View
            style={{
              ...styles.videoSliderTrackerBox,
              left: `${((timeElapsed * 100) / videoDuration) * 8}%`,
            }}
            ref={sliderRef}
          />
          <View style={styles.videoSliderHorizontalLine} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
