import React from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./ChatScreenStyles";

const chat = [
  {
    sender: 1,
    receiver: 2,
    msg: "hey man",
  },
  {
    sender: 2,
    receiver: 1,
    msg: "sup!",
  },
  {
    sender: 1,
    receiver: 2,
    msg: "hows it going?",
  },
];

export default function ChatScreen({ createdRoomID }) {
  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {/* <View style={styles.receiverChatBubble}>
          <Text style={styles.chatText}>Hello</Text>
        </View> */}

        {chat.map((message) => {
          if (message.sender === 1) {
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
      <TextInput style={styles.textInput} placeholder="Enter a message..." />
    </View>
  );
}
