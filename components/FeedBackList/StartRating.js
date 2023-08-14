import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Make sure you have 'expo-vector-icons' installed

function StarRating({ rating, onRatingChange }) {
  const [selectedRating, setSelectedRating] = useState(rating || 0);

  const handleStarPress = (newRating) => {
    setSelectedRating(newRating);
    onRatingChange && onRatingChange(newRating);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
          style={styles.starContainer}
        >
          <AntDesign
            name={i <= selectedRating ? "star" : "staro"}
            size={32}
            color={i <= selectedRating ? "goldenrod" : "gray"}
          />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  starContainer: {
    padding: 10,
  },
});

export default StarRating;
