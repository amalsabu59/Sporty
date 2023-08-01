import { Text, View } from "react-native";
import CartProductDetails from "../components/Cart/CartProductDetails";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: 1,
    name: "Pullover",
    price: 19.99,
    quantity: 10,
    imageUri:
      "https://s3-alpha-sig.figma.com/img/6e2a/6075/d2aebb9b52db31deea621f309362bab4?Expires=1690761600&Signature=Y93jvy3EyECzr8LVU6KOqZrin-RFVEywNvJIJRdXyLCNtCKD1liZlEwpc2t8t5333VI0VJuCvW650kjvn9jet1TH0wFIPSUU-5QnrBbuwRDvNfC20mf5k2KThYd~wDgJX9drGFiRFC6GeNXBOLobCrojcbKEL0G98GLimUbQWPQu6ceR~R33QWUaA9PAThAmtXCbIQLRl0jMT~h9YsjPXNMxzmQGYUKnupIB8hDDJrrG7FVVwwOAv56sgHV5I5IQD3l6csxUlnK4A5bDF-t2bVbR1~LY~AdBnwCJuMl~jxfIAXwHMdxtLcOadwK7Kv-fCE2sYiDN~X9iH10ijlK4oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    id: 2,
    name: "T-shirt",
    price: 14.99,
    quantity: 8,
    imageUri:
      "https://s3-alpha-sig.figma.com/img/5e93/8ec8/ffc8353c2e4119cf43ecf6db7e381d9d?Expires=1691366400&Signature=oaw0yIsLk3UcQO5i6Hcbp8RDZIzo1UZB3Iu4bjO7dYlYIFjrVS~OsujF9xX0cxbF69F-9z0jkUtRb9~OmpOEQYuLLQZZ31Rizwt-X1xbm-HH0JqWkWrtUJ0jOykP917AtQqvhEVDN0cPfPZjhyOWtxEX0oQd~LgDY4iQHOxhUWYFF9sywygLv~3aMHawcqs~RLyQTPmbIehKM35suFX754xTq51b1PT8Qrb15aRL6nHtLuKmS8ETlJVE0pxLwJ~c~NcndknI9Jeaf5Vx5-pior07OTqTw-AB2Rxd1j0MKJRLxl8cqX1do-IvHVHRccjiHIzcKVtw-HC8dEOx3Q6Eew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },

  {
    id: 3,
    name: "Sports Dress",
    price: 24.99,
    quantity: 12,
    imageUri:
      "https://s3-alpha-sig.figma.com/img/1821/5f62/e259b4c9081785e2fb7f4b553d1a8023?Expires=1691366400&Signature=D0Rqh-~SRGvJkzAwo4aVKt58Rw98F8TKss2pRmCqrRjLjYKa23lzQutA-IyrKaa0C-bcW9vTm031ZIRo8Fca0liCezKHXlSTbMNcneCswf66n4OpljCm2shixGTJC4wzM3xbN1v~smqDEnUpNy7AJzCD-7MvvPGua49PDGvKbJwuG2708-ML8qx9mLKLLH7FFpbK2StGaacbI6khSdqndAYYgDZWxfPuKIAWLJe~00tT-y~imMaO2K-sa6C4oXMKpELpC37sHYn~DEUcpy3ER8P17ltwNN6i3b0dX3HoI9MHbMffzsKESsd7PSGHpRgUGUU9~UZe4LqR9GKWFXbRqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
  {
    id: 4,
    name: "Sports Dress",
    price: 24.99,
    quantity: 12,
    imageUri:
      "https://s3-alpha-sig.figma.com/img/1821/5f62/e259b4c9081785e2fb7f4b553d1a8023?Expires=1691366400&Signature=D0Rqh-~SRGvJkzAwo4aVKt58Rw98F8TKss2pRmCqrRjLjYKa23lzQutA-IyrKaa0C-bcW9vTm031ZIRo8Fca0liCezKHXlSTbMNcneCswf66n4OpljCm2shixGTJC4wzM3xbN1v~smqDEnUpNy7AJzCD-7MvvPGua49PDGvKbJwuG2708-ML8qx9mLKLLH7FFpbK2StGaacbI6khSdqndAYYgDZWxfPuKIAWLJe~00tT-y~imMaO2K-sa6C4oXMKpELpC37sHYn~DEUcpy3ER8P17ltwNN6i3b0dX3HoI9MHbMffzsKESsd7PSGHpRgUGUU9~UZe4LqR9GKWFXbRqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  },
];

function Cart() {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const userStore = useSelector((state) => state.user);
  const cartStore = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCartItems(userStore?.currentUser?._id));
  }, [userStore?.currentUser?._id]);

  const totalAmount =
    cartStore?.reduce((acc, item) => acc + item.details.price, 0) || 0;
  return (
    <View style={styles.root}>
      <View style={[styles.cartDetails]}>
        <FlatList
          data={cartStore}
          renderItem={({ item }) => (
            <CartProductDetails
              title={item.details.title}
              price={item.details.price}
              quantity={item.quantity}
              imageUri={item.details.img[0]}
              id={item.details._id}
            />
          )}
          keyExtractor={(item) => item.details._id}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.totalAmountLabel}>Total amount</Text>
        <Text style={styles.totalAmountPrice}>{totalAmount} $</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Checkout"
          onPress={() => navigation.navigate("Shipping Addresses")}
        />
      </View>
    </View>
  );
}
export default Cart;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 28,
    // justifyContent: "space-between",
  },
  cartDetails: {
    width: "100%",
    height: "75%",
    marginBottom: "10%",
    // backgroundColor: "red",
  },
  buttonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    marginTop: 5,
  },
  textWrapper: {
    marginTop: 1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  totalAmountLabel: {
    fontFamily: "sans-serif",
    color: "#9B9B9B",
    fontWeight: 400,
    fontSize: 14,
  },
  totalAmountPrice: {
    fontFamily: "sans-serif",
    color: "#1A1A1A",
    fontWeight: "bold",
    fontSize: 14,
  },
});
