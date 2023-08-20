import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import AddProductForm from "../components/Admin/AddProdoductForm";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "../components/Admin/ProductsList";
import {
  addProducts,
  clearFormData,
  createFormData,
  editProducts,
} from "../redux/slices/productsSlice";
import { useToast } from "react-native-toast-notifications";
const Admin = () => {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("Add"); // Active tab state

  const products = useSelector((state) => state.products.products);
  const formData = useSelector((state) => state.products.formData);
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState(formData.values.images);

  useEffect(() => {
    if (activeTab === "View") dispatch(clearFormData());
  }, [activeTab]);
  const handleImagePicker = async () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: true, // Allow multiple image selection
        maxFiles: 4 - selectedImages.length,
      }).then(async (images) => {
        const newImages = [];
        setUploading(true);
        for (const image of images) {
          console.log(image);
          const blob = await convertToBlob(image.path);
          const url = await uploadFile(blob);
          newImages.push(url);
        }
        console.log(
          newImages,
          "exiting upload>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        setUploading(false);

        let formattedImages = [
          ...selectedImages,
          ...formData.values.images,
          ...newImages,
        ];

        formattedImages = [...new Set(formattedImages)];
        dispatch(
          createFormData({
            ["images"]: formattedImages,
          })
        );
        setSelectedImages(formattedImages);
      });
    } catch (error) {
      console.log("ImagePicker Error: ", error);
    }
  };

  const convertToBlob = async (path) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("Error converting image to Blob"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", path, true);
      xhr.send(null);
    });
  };
  const uploadFile = async (file) => {
    try {
      const fileName = new Date().getTime() + ".png";
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      // Wait for the upload task to complete
      await uploadTask;

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log("downloadURL", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);

    setSelectedImages(newImages);

    const formDataImages = [...formData.values.images];
    formDataImages.splice(index, 1); // Remove the element from the array

    dispatch(createFormData({ ["images"]: formDataImages }));
  };
  const toast = useToast();
  const handleAddProducts = () => {
    if (
      !formData.values?.title ||
      !formData.values.desc ||
      !formData.values.price ||
      formData.values.categories.length === 0 ||
      formData.values.size.length === 0 ||
      formData.values.images.length === 0
    ) {
      return toast.show("* fields are mandatory!", {
        type: "danger",
      });
    }

    if (formData.values?.id) {
      console.log("first");
      dispatch(
        editProducts({ data: formData.values, id: formData.values?.id })
      );
    } else {
      dispatch(addProducts(formData.values));
    }

    setActiveTab("View");
    dispatch(clearFormData());
  };
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Add" && styles.activeTab]}
          onPress={() => setActiveTab("Add")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Add" && styles.activeText,
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "View" && styles.activeTab]}
          onPress={() => setActiveTab("View")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "View" && styles.activeText,
            ]}
          >
            View
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "View" ? (
        <ScrollView>
          {products.map((item) => {
            return (
              <ProductsList
                {...item}
                setActiveTab={setActiveTab}
                key={item._id}
              />
            );
          })}
        </ScrollView>
      ) : (
        <>
          <AddProductForm />

          <View style={{ display: "flex", flexDirection: "row" }}>
            <FlatList
              data={formData.values?.images}
              keyExtractor={(item, index) => item}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.imageRow}>
                    <TouchableOpacity
                      style={styles.removeIcon}
                      onPress={() => removeImage(index)}
                    >
                      <Ionicons
                        name="close"
                        size={16}
                        color="gray"
                        style={{ marginLeft: 30 }}
                      />
                    </TouchableOpacity>

                    <Image source={{ uri: item }} style={styles.image} />
                  </View>
                );
              }}
              contentContainerStyle={styles.imageList}
              horizontal // Display images horizontally
            />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImagePicker}
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#28B446" />
            </TouchableOpacity>
            {uploading && <ProgressBar />}
          </View>
          <CustomButton text="Upload" onPress={handleAddProducts} />
        </>
      )}
    </View>
  );
};
const ProgressBar = () => {
  return <Text>Uploading...</Text>;
  // Implement your progress bar component here
  // You can use ActivityIndicator or any other suitable component
};
const styles = StyleSheet.create({
  // Your existing styles
  container: {
    flex: 1,
    padding: 16,
  },
  uploadButton: {
    width: 50,
    height: 40,
    // backgroundColor: "blue",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  imageList: {
    flexGrow: 1,
    alignItems: "center", // Center the row horizontally
  },
  imageRow: {
    flexDirection: "column", // Each image and icon in its own column
    alignItems: "center",
    marginRight: 10, // Add margin between images
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginBottom: 10,
  },
  removeIcon: {
    marginTop: 5, // Add margin at the top of each remove icon
  },
  tabContainer: {
    width: "50%",
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 0,
    marginBottom: 10,
    marginRight: "auto",
    marginLeft: "auto",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 10,
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#1C1C1C",
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#1C1C1C",
  },
  tabButtonText: {
    color: "#1C1C1C",
  },
  activeText: {
    color: "#fff",
  },
});

export default Admin;
