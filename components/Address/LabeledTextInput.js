import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { createFormData } from "../../redux/slices/addressSlice";

function LabeledTextInput({
  label,
  name,
  inputValue,
  error = "",
  inputMode = "text",
  maxLength = 100,
  handleChangeText,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const labelAnim = useRef(new Animated.Value(inputValue ? -20 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelAnim, {
      toValue: -20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(labelAnim, {
      toValue: inputValue ? -20 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.root}>
      <View style={[styles.container, styles.card]}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [{ translateY: labelAnim }],
              fontSize: isFocused || inputValue ? 11 : 14,
              color: "#9B9B9B",
              marginBottom: 10,
            },
          ]}
        >
          {label}
        </Animated.Text>
        <TextInput
          ref={inputRef}
          style={[styles.input, error && styles.inputError]}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => handleChangeText(text, name)}
          inputMode={inputMode}
          maxLength={maxLength}
        />
        {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 5,
    backgroundColor: "#FFF",
    borderRadius: 4,
    elevation: 0.6,
  },
  container: {
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  label: {
    position: "absolute",
    top: 20,
    left: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    margin: 10,
    borderColor: "#ccc",
    fontSize: 14,
    paddingLeft: 6,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});

export default LabeledTextInput;
