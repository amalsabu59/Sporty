import { StyleSheet, Text, View } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Component</Text>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
});
