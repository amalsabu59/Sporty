import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import CustomButton from "../components/UI/CustomButton";

function Success() {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image
          // style={styles.image}
          resizeMode="cover"
          source={require("../assets/icons/bags.png")}
        />
      </View>

      <Text style={styles.sucessText}>Success!</Text>
      <View>
        <Text style={styles.descText}>
          Your order will be delivered soon.{"\n"}Thank you for choosing our
          app!
        </Text>
      </View>
      <View style={{ margin: 32, marginTop: 50 }}>
        <CustomButton
          text="Continue shopping"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // flex: 1,
  },
  imageContainer: {
    // backgroundColor: "red",
    marginTop: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  sucessText: {
    marginTop: "10%",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "400",
  },
  descText: {
    marginHorizontal: 50,
    // marginTop: "10%",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "center",
  },
});
export default Success;
