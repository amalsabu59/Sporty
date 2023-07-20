import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  PanResponder,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const ImageSlider = ({ currentIndex, setCurrentIndex, images }) => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 50) {
        handleSwipeLeft();
      } else if (gesture.dx < -50) {
        handleSwipeRight();
      } else {
        position.setValue({ x: 0, y: 0 });
      }
    },
  });

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleSwipeRight = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
    });
  };

  useEffect(() => {
    position.setValue({ x: 0, y: 0 });
  }, [currentIndex]);
  const minusUnit = SCREEN_HEIGHT > 700 ? 440 : 370;

  return (
    <View>
      <View style={styles.sliderContainer}>
        <Animated.View {...panResponder.panHandlers}>
          <View style={styles.shareIconContainer}>
            <Ionicons name="share-social-outline" size={22} color={"#A9A9A9"} />
          </View>
          <Image
            source={{ uri: images[currentIndex] }}
            resizeMode="contain"
            style={{
              width: SCREEN_WIDTH,
              //   height: 300,
              height: SCREEN_HEIGHT - 440,
              //   resizeMode: "cover",\
              backgroundColor: "#F2F2F2",
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    // flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },

  shareIconContainer: {
    position: "absolute",
    zIndex: 1000,
    right: "8%",
    top: "8%",
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
});

export default ImageSlider;
