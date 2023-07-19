import { StyleSheet, Text, View } from "react-native";
import Welcome from "../components/Home/Welcome";
import Search from "../components/Home/Search";
import CategoryButton from "../components/Home/CategoryButton";
import ProductCard from "../components/Home/ProductCards";
import { useState } from "react";

function Home() {
  const [selectedCat, setSelectedCat] = useState("all");
  const handleButtonPress = (type) => {
    console.log("Button Pressed!");
    setSelectedCat(type);
    // Perform your desired action here
  };

  return (
    <View style={styles.container}>
      <Welcome />
      <Search />
      <View style={styles.categoryButtonContainer}>
        <CategoryButton
          title="All"
          onPress={() => handleButtonPress("all")}
          selected={selectedCat === "all"}
        />
        <CategoryButton
          title="Trending"
          onPress={() => handleButtonPress("trending")}
          selected={selectedCat === "trending"}
        />
        <CategoryButton
          title="Men"
          onPress={() => handleButtonPress("men")}
          selected={selectedCat === "men"}
        />
        <CategoryButton
          title="Women"
          onPress={() => handleButtonPress("women")}
          selected={selectedCat === "women"}
        />
        <CategoryButton
          title="Children"
          onPress={() => handleButtonPress("children")}
          selected={selectedCat === "children"}
        />
      </View>
      <ProductCard />
      {/* <View  style={styles.categoryButtonContainer}>
        <CategoryButton title="filter" onPress={handleButtonPress} selected />
      </View> */}
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  categoryButtonContainer: {
    alignItems: "center",
    justifyContent: "space-evenly", // Adjust this to distribute buttons evenly
    // overflow: "hidden",
    // backgroundColor: "red",
    marginVertical: 4,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap", // Allow buttons to wrap to the next line if necessary
  },
});
