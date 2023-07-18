import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Onboarding from "./screens/Onboarding";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Favorites from "./screens/Favorites";
import Cart from "./screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const RenderMainApp = () => (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: { display: "none" },
        headerShown: false,
        tabBarActiveTintColor: "#28B446", // Color of the active tab
        tabBarInactiveTintColor: "#D9D9D9", // Color of the inactive tabs
        style: {
          backgroundColor: "#FFFFFF", // Background color of the tab bar
        },

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
            marginBottom: 28,
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
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="apps" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="cart" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
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
    <NavigationContainer>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="MainApp" component={RenderMainApp} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
