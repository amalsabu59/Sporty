import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";

function AddressCard() {
  const [selected, setSelected] = useState(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Jane Doe</Text>
            <Text style={styles.addressText}>
              3 Newbridge Court Chino Hills, CA 91709, United States
            </Text>
            <TouchableOpacity style={styles.checkboxSelectionContiner}>
              <Checkbox
                value={selected}
                onValueChange={() => setSelected((prev) => !prev)}
                // color="black"
              />
              <Text style={styles.useAsShippingText}>
                Use as the shipping address
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Jane Doe</Text>
            <Text style={styles.addressText}>
              3 Newbridge Court Chino Hills, CA 91709, United States
            </Text>
            <TouchableOpacity style={styles.checkboxSelectionContiner}>
              <Checkbox
                value={selected}
                onValueChange={() => setSelected((prev) => !prev)}
                // color="black"
              />
              <Text style={styles.useAsShippingText}>
                Use as the shipping address
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: 21,
    marginBottom: 16,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
    padding: 20,
  },
  checkboxSelectionContiner: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  nameText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  addressText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    letterSpacing: -0.15,
  },
  useAsShippingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  editButton: {
    padding: 16,
    // alignItems: "center",
    // justifyContent: "center",
  },
  editButtonText: {
    color: "#28B446",
  },
});
