import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const RatingModal = ({ visible, onRequestClose, children }) => {
  const screenHeight = Dimensions.get("window").height;

  // Function to clone the children and pass onRequestClose prop
  const renderChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onRequestClose });
  });

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalOverlay}
        onPress={onRequestClose}
      >
        <View style={[styles.modalContainer, { height: screenHeight / 2 }]}>
          <View style={styles.modalContent}>{renderChildren}</View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent overlay
    justifyContent: "flex-end",
  },
  modalContainer: {
    justifyContent: "flex-end",
    marginHorizontal: 14,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    elevation: 8,
  },
});

export default RatingModal;
