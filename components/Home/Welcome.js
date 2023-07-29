import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";

function Welcome() {
  const userName = useSelector((state) => state.user.currentUser.name);
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.greetingText}>
            Hello {userName ? userName : " user"} !
          </Text>
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
    marginHorizontal: 16,
    marginVertical: 4,
    // backgroundColor: "red",
    alignItems: "center", // Center items vertically in the root container
    justifyContent: "space-between", // Align items with space between
  },
  textContainer: {
    display: "flex",
    height: 100,
  },
  greetingText: {
    fontFamily: "sans-serif",
    fontSize: RFValue(16),
    fontWeight: "400",
  },
  welcomText: {
    fontFamily: "sans-serif",
    fontSize: RFValue(24),
    fontWeight: "700",
    color: "#1E1D1D",
  },
  notifictionContainer: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center", // Align items vertically in the center
  },
  notificationCount: {
    backgroundColor: "#28B446",
    width: 14, // Adjust the width as needed
    height: 14, // Adjust the height as needed
    borderRadius: 50,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    // marginLeft: 10, // Add some margin to separate the icon and count
  },
  icon: {
    marginTop: 8,
    height: 24,
    width: 19,
    backgroundColor: "#F9F9F9",
    borderRadius: 50,
  },
  number: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white", // Add a color for the text to make it visible
  },
});
