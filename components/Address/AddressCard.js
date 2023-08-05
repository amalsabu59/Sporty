import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  createFormData,
  selectedAddress,
} from "../../redux/slices/addressSlice";
import { useNavigation } from "@react-navigation/native";

function AddressCard({
  _id,
  user_id,
  name,
  address,
  city,
  state,
  zipcode,
  phone,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedAddressId = useSelector(
    (state) => state.address.selectedAddress
  );
  const editAddressHandler = () => {
    dispatch(
      createFormData({
        _id,
        user_id,
        name,
        address,
        city,
        state,
        zipcode,
        phone,
      })
    );
    navigation.navigate("Shipping Address");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.addressText}>
              {address}, {city}, {state}
            </Text>
            <Text style={styles.addressText}>
              {zipcode} ,{phone}
            </Text>
            <View style={styles.checkboxSelectionContiner}>
              <Checkbox
                value={selectedAddressId === _id ? selectedAddressId : null}
                onValueChange={() => dispatch(selectedAddress(_id))}
                // color="black"
              />
              <Text style={styles.useAsShippingText}>
                Use as the shipping address
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editAddressHandler(_id)}
          >
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
