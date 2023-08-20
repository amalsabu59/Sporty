import React from "react";
import { View, Modal, StyleSheet } from "react-native";

const BottomHalfModal = ({ visible, onRequestClose, loginFrom, children }) => {
  // Function to clone the children and pass onRequestClose prop
  const renderChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onRequestClose, loginFrom });
  });

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>{renderChildren}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
});

export default BottomHalfModal;
