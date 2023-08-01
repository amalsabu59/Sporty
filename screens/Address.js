import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddressCard from "../components/Address/AddressCard";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/UI/CustomButton";

function Address() {
  const navigation = useNavigation();
  return (
    <View>
      <AddressCard />
      {/* Plus button */}
      <TouchableOpacity
        style={styles.plusButtonContainer}
        onPress={() => navigation.navigate("Shipping Address")}
      >
        <View style={styles.plusButton}>
          <Text style={styles.plusButtonText}>+</Text>
        </View>
      </TouchableOpacity>
      <View style={{ margin: 32 }}>
        <CustomButton text="Checkout" />
      </View>
    </View>
  );
}
export default Address;

const styles = StyleSheet.create({
  plusButtonContainer: {
    padding: 16,
    alignItems: "flex-end", // Add this to center the plus button horizontally
    justifyContent: "flex-end", // Add this to center the plus button vertically
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#28B446",
    justifyContent: "center",
    alignItems: "center",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.22))", // CSS filter for drop shadow
  },
  plusButtonText: {
    color: "#FFF",
    fontSize: 20,
    lineHeight: 32,
  },
});
