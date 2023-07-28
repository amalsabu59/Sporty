import { Button, StyleSheet, TouchableOpacity, Text, View } from "react-native";
// import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
function OnboardingContent() {
  const navigation = useNavigation();

  const onPressButton = () => {
    navigation.navigate("MainApp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>
          Unleash the Power {"\n"}of{" "}
          <Text style={{ color: "#28B446" }}>Convenience </Text>{" "}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Step into the world of athletic excellence and {"\n"}explore our
          curated collection of high- {"\n"}performance sportswear
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default OnboardingContent;

const styles = StyleSheet.create({
  container: {
    bottom: -400,
    margin: 6,
    position: "absolute",
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    height: 547,
    width: "96%",
    borderRadius: 40,
  },
  headerTextContainer: {
    marginTop: 44,
  },
  headerText: {
    fontFamily: "sans-serif",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: 600,
  },
  textContainer: {
    marginTop: 34,
  },
  text: {
    fontFamily: "sans-serif",
    alignItems: "center",
    textAlign: "center",
    color: "#A9A9A9",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 34,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#28B446",
    width: "80%",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    // fontWeight: "bold",
  },
});
