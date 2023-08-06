// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Onboarding from "./screens/Onboarding";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ToastProvider } from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Favorites from "./screens/Favorites";
import Cart from "./screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductDetails from "./screens/ProductsDeatails";
import { TouchableOpacity } from "react-native";
import Login from "./screens/Login";
import OtpVerification from "./screens/OtpVerfication";
import AfterVerification from "./screens/AfterVerification";
import Address from "./screens/Address";
import AddressInput from "./screens/AddressInput";
import Orders from "./screens/Orders";
import Success from "./screens/Success";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  };

  const CartStack = createStackNavigator();

  const CartScreen = () => {
    return (
      <CartStack.Navigator>
        <CartStack.Screen
          name="MyBag"
          component={Cart}
          options={{
            headerTitle: "Cart",
          }}
        />
        {/* Add other screens related to the "Cart" tab if needed */}
      </CartStack.Navigator>
    );
  };

  const OrdersScreen = () => {
    return (
      <CartStack.Navigator>
        <CartStack.Screen
          name="MyOrders"
          component={Orders}
          options={{
            headerTitle: "My Orders",
          }}
        />
        {/* Add other screens related to the "Cart" tab if needed */}
      </CartStack.Navigator>
    );
  };

  const SearchIcon = () => (
    <TouchableOpacity onPress={() => console.log("Search icon pressed")}>
      <Ionicons
        name="search"
        size={24}
        color="#A9A9A9"
        style={{ marginRight: 20 }}
      />
    </TouchableOpacity>
  );
  const CartIcon = ({ cartItems = 0 }) => {
    const cartStore = useSelector((state) => state.cart.cart);
    cartItems = cartStore.length;
    return (
      <TouchableOpacity onPress={() => console.log("Cart icon pressed")}>
        <View style={styles.cartContainer}>
          <Ionicons
            name="cart"
            size={24}
            color="#A9A9A9"
            style={styles.cartIcon}
          />
          {cartItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    cartContainer: {
      position: "relative",
    },
    cartIcon: {
      marginRight: 28,
    },
    badge: {
      position: "absolute",
      top: -4,
      right: 20,
      backgroundColor: "#28B446",
      borderRadius: 12,
      width: 14,
      height: 14,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "white",
      fontSize: 10,
      // fontWeight: "bold",
    },
  });

  const RenderMainApp = () => (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: { display: "none" },
        headerShown: false,
        tabBarActiveTintColor: "#28B446", // Color of the active tab
        tabBarInactiveTintColor: "#D9D9D9", // Color of the inactive tabs

        tabBarLabelStyle: {
          fontSize: 16, // Font size of the tab labels
          fontWeight: "bold", // Font weight of the tab labels
        },
        // style: {},
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: "#1E1D1D",
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            borderRadius: 23,
            overflow: "hidden",
            marginBottom: 24,
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="My Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: () => "",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="apps" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: () => "",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="cart" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Success}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );

  // return (
  //   <View>
  //     <Onboarding />
  //   </View>
  // );

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <ToastProvider
          placement="top"
          duration={5000}
          animationType="zoom-in"
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          swipeEnabled={true}
          renderType={{
            custom: (toast) => (
              <View
                style={{
                  padding: 15,
                  borderRadius: 5,
                  backgroundColor: `rgba(30, 29, 29, 0.8)`,
                }}
              >
                <Text style={{ color: "#28B446" }}>{toast.message}</Text>
              </View>
            ),
          }}
        >
          {/* <StatusBar style="auto" /> */}
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          <Stack.Navigator>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainApp"
              component={RenderMainApp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{
                headerTitle: "", // Remove the header name
                headerRight: () => (
                  <View style={{ flexDirection: "row" }}>
                    <SearchIcon />
                    <CartIcon />
                  </View>
                ),
              }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Shipping Addresses" component={Address} />
            <Stack.Screen name="Shipping Address" component={AddressInput} />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{ headerTitle: "" }}
            />
            <Stack.Screen
              name="OtpVerification"
              component={OtpVerification}
              options={{ headerTitle: "" }}
            />
            <Stack.Screen
              name="afterVerification"
              component={AfterVerification}
              options={({ navigation }) => ({
                headerTitle: "",
                headerRight: () => (
                  <TouchableOpacity // Use TouchableOpacity instead of View
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.navigate("Cart")} // Wrap it inside an arrow function
                  >
                    <Text style={{ color: "#28B446" }}>Skip</Text>
                  </TouchableOpacity>
                ),
              })}
            />
          </Stack.Navigator>
          {/* </SafeAreaView> */}
        </ToastProvider>
      </NavigationContainer>
    </Provider>
  );
}
