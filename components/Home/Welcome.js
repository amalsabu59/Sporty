import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

function Welcome() {
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.greetingText}>Morning Azie !</Text>
        </View>
        <View>
          <Text style={styles.welcomText}>
            Lets find your {"\n"}sports outfit !
          </Text>
        </View>
      </View>
      <View style={styles.notifictionContainer}>
        <View style={styles.icon}>
          <Ionicons name="notifications" size={22} color={"black"} />
        </View>
        <View style={styles.notificationCount}>
          <Text style={styles.number}>2</Text>
        </View>
      </View>
    </View>
  );
}
export default Welcome;
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    margin: 16,
  },
  textContainer: {
    // backgroundColor: "green",
    display: "flex",
    // margin: 16,
    height: 100,
  },
  greetingText: {
    // margin: 16,
    fontFamily: "sans-serif",
    fontSize: RFValue(16),
    fontWeight: 400,
  },
  welcomText: {
    // margin: 16,
    fontFamily: "sans-serif",
    fontSize: RFValue(24),
    fontWeight: 700,
    color: "#1E1D1D",
  },
  notifictionContainer: {
    // padding: 32,
    display: "flex",
    flexDirection: "row",
    height: 100,
    marginLeft: "40%",
    marginRight: 16,
  },
  notificationCount: {
    // marginRight: 12,
    marginVertical: 16,
    // marginRight: 100,
    backgroundColor: "#28B446",
    width: 14,
    height: 14,
    borderRadius: 50,
  },
  icon: {
    marginVertical: 20,
    height: 24,
    width: 24,
    backgroundColor: "#F9F9F9",
    borderRadius: 50,
  },
  number: {
    display: "flex",

    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
});
