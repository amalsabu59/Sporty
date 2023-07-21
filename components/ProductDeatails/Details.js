import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomHalfModal from "../Modal/BottomHalfModal";
import { Button } from "react-native";
import Login from "../../screens/Login";
function Details() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sizeSelected, setSizeSeleted] = useState("XS");
  const navigation = useNavigation();
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.productNameText}>Nike Therma-FIT</Text>
      </View>
      <View>
        <Text style={styles.productDescriptionText}>
          Худи с молнией во всю длину для зимнего
        </Text>
      </View>
      <Text style={styles.sizeAndPriceText}> Size</Text>
      <View style={styles.sizeAndPriceContainer}>
        {["XS", "S", "M", "L"].map((size, index) => (
          <View style={styles.sizeSelection} key={index}>
            <View
              style={sizeSelected === size ? styles.selectedSize : styles.size}
            >
              <Text
                style={
                  sizeSelected === size
                    ? styles.selectedSizesText
                    : styles.sizesText
                }
              >
                {size}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.sizeAndPriceText}> Price</Text>
      <Text style={styles.price}>150$</Text>
      <Text style={styles.priceDisclamer}> Price inclusive of all taxes</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="cart" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Add To Bag</Text>
        </TouchableOpacity>
      </View>
      <BottomHalfModal visible={modalVisible} onRequestClose={closeModal}>
        <Login />
      </BottomHalfModal>
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,

    // flex: 1,
  },
  productNameText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: 400,
  },
  productDescriptionText: {
    fontFamily: "sans-serif",
    marginVertical: 5,
    fontSize: 14,
    fontWeight: 400,
    color: "#A9A9A9",
  },
  sizeAndPriceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    // marginVertical: 1,
  },
  sizeAndPriceText: {
    marginVertical: 8,
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 600,
  },
  sizeSelection: {
    marginTop: 6,
  },
  selectedSize: {
    marginVertical: 6,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: "#2B2A2A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  size: {
    marginVertical: 6,
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSizesText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#fff",
  },
  sizesText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#3C3C3C",
  },
  price: {
    // marginTop: 6,
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: 700,
  },
  priceDisclamer: {
    margin: 0,
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#A9A9A9",
  },
  buttonContainer: {
    margin: 16,
    // padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    width: 315,
    height: 48,
    padding: 10,
    paddingLeft: 86,
    paddingRight: 85,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    backgroundColor: "#28B446",
    borderRadius: 8,
    flexShrink: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  icon: {
    marginRight: 15,
  },
});
