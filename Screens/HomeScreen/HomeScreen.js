import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./HomeScreenStyles";

export default function HomeScreen({ navigation }) {
  const [urlText, setUrlText] = useState("");

  const handleGoButton = () => {
    navigation.navigate("MainScreen", {
      urlText: urlText,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}> Enter URL : </Text>
      <TextInput
        style={styles.textInput}
        placeholder="ex : https://youtube.com/url"
        value={urlText}
        onChangeText={setUrlText}
      />
      <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonText} onPress={handleGoButton}>
            Go
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
