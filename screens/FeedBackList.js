import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import List from "../components/FeedBackList/List";
import BottomHalfModal from "../components/Modal/BottomHalfModal";
import RatingModal from "../components/Modal/RatingModal";
import StarRating from "../components/FeedBackList/StartRating";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProductId } from "../redux/slices/ordersSlice";
import { updateRating } from "../redux/slices/productsSlice";
import { useToast } from "react-native-toast-notifications";

function FeedBackList({ route }) {
  const [ratingModalVisible, setRatingModalVisible] = useState(false); // State to control modal visibility
  const [rating, setRating] = useState(false);
  const [opinion, setOpinion] = useState("");
  const products = route.params.products;
  const toast = useToast();
  const selectedProductId = useSelector(
    (state) => state.orders.selectedProductId
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedProductId) {
      setRatingModalVisible(true);
    }
  }, [selectedProductId]);

  function handleRatingChange(newRating) {
    console.log("New rating:", newRating);
    setRating(newRating);

    // dispatch(setSelectedProductId(null));
    // setRatingModalVisible(false); // Close the modal when the rating changes
    // You can update your state or perform any other action based on the new rating
  }

  function handleBackgroundPress() {
    dispatch(setSelectedProductId(null));
    setRatingModalVisible(false); // Close the modal when background is pressed
    console.log("feedback received", selectedProductId);
  }

  const handleChange = (text) => {
    setOpinion(text); // Update the state with the new input value
  };
  const handleReviewUpdate = () => {
    if (!rating) {
      return toast.show("Select a Star Rating", {
        type: "danger",
      });
    }

    dispatch(
      updateRating({ id: selectedProductId, data: { rating, review: opinion } })
    );

    setRatingModalVisible(false);
    dispatch(setSelectedProductId(null));
    return toast.show("Rating added successfully", {
      type: "success",
    });
  };
  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={styles.container}>
        <ScrollView style={styles.list}>
          {products.map((product) => {
            return (
              <>
                <List
                  product={product}
                  selectedProductId={selectedProductId}
                  key={product.id}
                />
              </>
            );
          })}
        </ScrollView>

        <RatingModal
          visible={ratingModalVisible}
          onRequestClose={() => setRatingModalVisible(false)}
          style={styles.modalStyle}
        >
          <Text style={styles.headingText}>What is your rate?</Text>
          <StarRating rating={0} onRatingChange={handleRatingChange} />
          <Text style={styles.headingText}>
            Please share your opinion {"\n"} about the product
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your opinion"
              value={opinion} // Set the value of the input to the state value
              onChangeText={handleChange} // Call the handleChange function when the input changes
              multiline
              maxLength={200}
            />
          </View>
          <CustomButton text="Send Review" onPress={handleReviewUpdate} />
        </RatingModal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    // height: "100%",
  },
  modalStyle: {
    // margin: 29,
  },
  headingText: {
    margin: 15,
    color: "#000",
    fontFamily: "sans-serif",
    alignItems: "center",
    textAlign: "center",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    // lineHeight: 22,
  },
  textInputContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    marginTop: 10,
    padding: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    padding: 10,
  },
});

export default FeedBackList;
