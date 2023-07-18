import { StyleSheet, Text, View } from "react-native";
import Welcome from "../components/Home/Welcome";
import Search from "../components/Home/Search";
import CategoryButton from "../components/Home/CategoryButton";
import ProductCard from "../components/Home/ProductCards";

function Home() {
  const handleButtonPress = () => {
    console.log("Button Pressed!");
    // Perform your desired action here
  };
  return (
    <View style={styles.container}>
      <Welcome />
      <Search />
      <View style={styles.categoryButtonContainer}>
        <CategoryButton title="All" onPress={handleButtonPress} selected />
        <CategoryButton title="Trending" onPress={handleButtonPress} />
        <CategoryButton title="Men" onPress={handleButtonPress} />
        <CategoryButton title="Women" onPress={handleButtonPress} />
        <CategoryButton title="Children" onPress={handleButtonPress} />
      </View>
      <ProductCard />
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
  categoryButtonContainer: {
    margin: 16,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
