import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { socket } from "../../../SocketContext";
import { styles } from "./ChatScreenStyles";

export default function ChatScreen({ currRoomID, currSocketID }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    socket.on("messageReceived", (msgObj) => {
      addNewMessage(msgObj);
    });

    Keyboard.addListener("keyboardDidShow", () => {
      if (flatListRef) {
        console.log("popped up");
        flatListRef.current.scrollToEnd();
      }
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    let tempMsgObj = {
      roomID: currRoomID,
      sender: currSocketID,
      msg: msg,
    };
    socket.emit("sendMessage", tempMsgObj);
    addNewMessage(tempMsgObj);
    setMsg("");
  };

  const addNewMessage = (msgObj) => {
    setMessages((prev) => {
      return [...prev, msgObj];
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          keyboardDismissMode={false}
          keyboardShouldPersistTaps="always"
          ref={flatListRef}
          onContentSizeChange={() => {
            flatListRef.current.scrollToEnd();
          }}
          data={messages}
          keyExtractor={(element, index) => index.toString()}
          renderItem={(element) => {
            if (element.item.sender === currSocketID) {
              return (
                <View style={styles.senderTextBubble}>
                  <Text style={styles.chatText}>{element.item.msg}</Text>
                </View>
              );
            } else {
              return (
                <View style={styles.receiverChatBubble}>
                  <Text style={styles.chatText}>{element.item.msg}</Text>
                </View>
              );
            }
          }}
        />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Enter a message..."
        value={msg}
        onChangeText={setMsg}
        onSubmitEditing={sendMessage}
      />
    </View>
  );
}
