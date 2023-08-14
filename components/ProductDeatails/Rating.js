import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Rating = ({ rating, ratingsCount }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? "star" : "staro"}
          size={10}
          color={i <= rating ? "gold" : "gray"}
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>{renderStars()}</View>
      <Text style={styles.ratingNumText}> ({ratingsCount}) </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  star: {
    marginHorizontal: 2,
  },
  ratingNumText: {
    fontFamily: "sans-serif",
    marginVertical: 5,
    fontSize: 12,
    fontWeight: 400,
    color: "#A9A9A9",
  },
  root: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Rating;
