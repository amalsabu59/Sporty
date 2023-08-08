import React, { useEffect } from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Voice from "@react-native-voice/voice";

const useSpeechToText = () => {
  const [isListening, setIsListening] = React.useState(false);
  const [recognizedText, setRecognizedText] = React.useState("");

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    const text = event.value[0];
    setRecognizedText(text);
  };

  const startSpeechToText = async () => {
    try {
      setIsListening(true);
      await Voice.start("en-US"); // You can specify the language here
    } catch (error) {
      console.error(error);
    }
  };

  const stopSpeechToText = async () => {
    try {
      setIsListening(false);
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isListening,
    recognizedText,
    startSpeechToText,
    stopSpeechToText,
    setRecognizedText,
  };
};

const Search = ({ searchKeyWord, setSearchKeyWord }) => {
  const {
    isListening,
    recognizedText,
    startSpeechToText,
    stopSpeechToText,
    setRecognizedText,
  } = useSpeechToText();
  const handleSearchTextChange = (text) => {
    console.log(text);
    setSearchKeyWord(text);
    if (text.length === 0) setRecognizedText("");
  };

  useEffect(() => {
    if (recognizedText) {
      setSearchKeyWord(recognizedText);
    }
  }, [isListening, recognizedText]);
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="gray" style={styles.iconLeft} />
        <TextInput
          style={styles.input}
          placeholder="Search Products"
          onChangeText={handleSearchTextChange}
          value={searchKeyWord}
        />
        <Pressable
          onPress={isListening ? stopSpeechToText : startSpeechToText}
          style={({ pressed }) => isListening && styles.micIconContainer}
        >
          <Icon
            name={isListening ? "mic-off" : "mic"}
            size={20}
            color="gray"
            style={styles.iconRight}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    // borderWidth: 1,
    backgroundColor: "#F9F9F9",
    width: "80%",
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  iconLeft: {
    marginRight: 10,
  },
  micIconContainer: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(40, 180, 70, 0.55)",
    borderRadius: 50,
  },
  iconRight: {
    // marginLeft: 10,
  },
  input: {
    flex: 1,
  },
});

export default Search;
