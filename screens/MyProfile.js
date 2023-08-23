import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  openLoginModal,
  closeLoginModal,
} from "../redux/slices/loginSlice";
import { Alert } from "react-native";
import BottomHalfModal from "../components/Modal/BottomHalfModal";
import Login from "./Login";
const ProfileComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.currentUser?.isAdmin);
  const currentUser = useSelector((state) => state.user.currentUser);
  const modalState = useSelector((state) => state.user.loginModal);
  // console.log(isAdmin);
  const clearAsyncStorage = async () => {
    try {
      Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            // await AsyncStorage.clear();
            dispatch(logOut());
            navigation.navigate("Onboarding");
          },
        },
      ]);
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };
  const closeModal = () => {
    dispatch(closeLoginModal());
  };
  const loginHanlder = () => {
    dispatch(openLoginModal("profile"));
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          resizeMode="cover"
          source={require("../assets/icons/avatar.png")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{currentUser.name || "User"}</Text>
          <Text style={styles.email}>
            {currentUser.phone || currentUser.email || ""}{" "}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionContainer}
          onPress={() => navigation.navigate("My Orders")}
        >
          <Text style={styles.sectionTitle}>My Orders</Text>
          <Text style={styles.sectionDescription}>View orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionContainer}
          onPress={() =>
            navigation.navigate("Shipping Addresses", { showCheckout: false })
          }
        >
          <Text style={styles.sectionTitle}>Shipping addresses</Text>
          <Text style={styles.sectionDescription}>View Addresses</Text>
        </TouchableOpacity>
        {isAdmin && (
          <TouchableOpacity
            style={styles.sectionContainer}
            onPress={() => navigation.navigate("Admin")}
          >
            <Text style={styles.sectionTitle}>Admin</Text>
            <Text style={styles.sectionDescription}>Products,sales</Text>
          </TouchableOpacity>
        )}
        {currentUser._id && (
          <TouchableOpacity
            style={[
              styles.sectionContainer,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
            onPress={() => clearAsyncStorage()}
          >
            <View>
              <Text style={styles.sectionTitle}>Logout</Text>
            </View>
            <View>
              <Ionicons name="log-out" size={20} color="#9B9B9B" />
            </View>
          </TouchableOpacity>
        )}
        {!currentUser._id && (
          <TouchableOpacity
            style={[
              styles.sectionContainer,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
            onPress={() => loginHanlder()}
          >
            <View>
              <Text style={styles.sectionTitle}>Login</Text>
              <BottomHalfModal
                visible={modalState}
                onRequestClose={closeModal}
                loginFrom={"profile"}
              >
                <Login />
              </BottomHalfModal>
            </View>
            <View>
              <Ionicons name="log-in" size={20} color="#9B9B9B" />
            </View>
          </TouchableOpacity>
        )}

        {/* Render orders here */}
        {/* You can map through the user's orders and display them */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    padding: 16,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
  },
  name: {
    color: "#000",
    fontFamily: "sans-serif",
    lineHeight: 22,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
  email: {
    fontSize: 16,
    color: "#9B9B9B",
    fontFamily: "sans-serif",
    lineHeight: 20,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
  },
  section: {
    marginTop: 16,
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    color: "#222",
    fontFamily: "sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
  },
  sectionDescription: {
    color: "#9B9B9B",
    fontFamily: "sans-serif",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "400",
  },

  // Add more styles as needed
});

export default ProfileComponent;
