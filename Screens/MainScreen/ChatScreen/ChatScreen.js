import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { socket } from "../../../SocketContext";
import { styles } from "./ChatScreenStyles";

export default function ChatScreen({ currRoomID, currSocketID }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("messageReceived", (msgObj) => {
      addNewMessage(msgObj);
    });
  }, []);

  const sendMessage = () => {
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
        {messages &&
          messages.map((message) => {
            if (message.sender === currSocketID) {
              return (
                <View style={styles.senderTextBubble} key={message.msg}>
                  <Text style={styles.chatText}>{message.msg}</Text>
                </View>
              );
            } else {
              return (
                <View style={styles.receiverChatBubble} key={message.msg}>
                  <Text style={styles.chatText}>{message.msg}</Text>
                </View>
              );
            }
          })}
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
