import { View, Image, StyleSheet } from "react-native";
import OnboardingContent from "../components/OnbordingContent";

function Onboarding({ navigation }) {
  return (
    <View style={{ margin: 16 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require("../assets/images/onboarding1.png")}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require("../assets/images/onboarding2.png")}
          />
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require("../assets/images/onboarding3.png")}
          />
        </View>
      </View>
      <OnboardingContent />
    </View>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginTop: 12,
    width: "100%",
  },
  imageContainer: {
    // backgroundColor: "red",
    // margin: 16,

    gap: 16,
    width: "45%",
    height: "auto",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    borderRadius: 20,
    // backgroundAttachment: "center",
    // resizeMode: "contain",
    // width: "100%",
    // height: "auto",
    // height: "80%",
  },
});
