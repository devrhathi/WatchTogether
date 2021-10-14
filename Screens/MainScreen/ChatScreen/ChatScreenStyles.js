import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    width: "100%",
    // height: 500,
    flex: 7,
  },

  textInput: {
    borderColor: "black",
    borderWidth: 1.5,
    margin: 4,
    padding: 8,
    fontSize: 20,
  },

  chatContainer: {
    // borderColor: "red",
    // borderWidth: 4,
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    // overflow: "hidden",
  },

  chatText: {
    fontSize: 20,
  },

  senderTextBubble: {
    borderRadius: 8,
    backgroundColor: "#A4CDDA",
    alignSelf: "flex-end",
    margin: 8,
    padding: 6,
  },
  receiverChatBubble: {
    borderRadius: 8,
    backgroundColor: "#F2AC44",
    alignSelf: "baseline",
    margin: 8,
    padding: 6,
  },
});
