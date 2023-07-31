import { StyleSheet, Text, View } from "react-native";
import Welcome from "../components/Home/Welcome";
import Search from "../components/Home/Search";
import CategoryButton from "../components/Home/CategoryButton";
import ProductCard from "../components/Home/ProductCards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/slices/loginSlice";
import { getProducts } from "../redux/slices/productsSlice";

function Home() {
  const products = useSelector((state) => state.products.products);
  const [productsAccToCategory, setproductsAccToCategory] = useState(products);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState("All");
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (searchKeyWord) {
      setSelectedCat("All");
      const filteredProduct = products.filter(({ title }) => {
        const item = title.toLowerCase();
        return item.includes(searchKeyWord.toLocaleLowerCase());
      });

      if (filteredProduct.length > 0) {
        setproductsAccToCategory(filteredProduct);
      } else {
        setproductsAccToCategory([]);
      }
    } else {
      setproductsAccToCategory(products);
    }
  }, [searchKeyWord, products]);

  const handleButtonPress = (type) => {
    setSelectedCat(type);
    if (type === "All") {
      return setproductsAccToCategory(products);
    }

    const filteredProduct = products.filter((item) => {
      return item.categories.includes(type);
    });

    setproductsAccToCategory(filteredProduct);
  };

  return (
    <View style={styles.container}>
      <Welcome />
      <Search
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
      />
      <View style={styles.categoryButtonContainer}>
        <CategoryButton
          title="All"
          onPress={() => handleButtonPress("All")}
          selected={selectedCat === "All"}
        />
        <CategoryButton
          title="Trending"
          onPress={() => handleButtonPress("Trending")}
          selected={selectedCat === "Trending"}
        />
        <CategoryButton
          title="Men"
          onPress={() => handleButtonPress("Men")}
          selected={selectedCat === "Men"}
        />
        <CategoryButton
          title="Women"
          onPress={() => handleButtonPress("Women")}
          selected={selectedCat === "Women"}
        />
        <CategoryButton
          title="Children"
          onPress={() => handleButtonPress("Children")}
          selected={selectedCat === "Children"}
        />
      </View>
      <ProductCard products={productsAccToCategory} />
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
