// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/Home";
import SubmitReimbursementScreen from "./screens/SubmitReimbursement";
import MyInvoicesScreen from "./screens/MyInvoices";
import ReimbursementsScreen from "./screens/Reimbursements";
import LoginScreen from "./screens/Login";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ handleLogout }) {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = "home";
					} else if (route.name === "MyInvoices") {
						iconName = "file-document-outline";
					} else if (route.name === "Reimbursements") {
						iconName = "refresh";
					}

					return (
						<MaterialCommunityIcons name={iconName} size={size} color={color} />
					);
				},
				tabBarActiveTintColor: "#34C759",
				tabBarInactiveTintColor: "#8E8E93",
			})}
		>
			<Tab.Screen
				name="Home"
				component={(props) => (
					<HomeScreen {...props} handleLogout={handleLogout} />
				)}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="MyInvoices"
				component={MyInvoicesScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Reimbursements"
				component={ReimbursementsScreen}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkLoginStatus = async () => {
			const userToken = await AsyncStorage.getItem("userToken");
			setIsLoggedIn(!!userToken);
		};

		checkLoginStatus();
	}, []);

	const handleLogin = async () => {
		await AsyncStorage.setItem("userToken", "dummy-token");
		setIsLoggedIn(true);
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem("userToken");
		setIsLoggedIn(false);
		navigation.reset({
			index: 0,
			routes: [{ name: "Login" }],
		});
	};

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={isLoggedIn ? "HomeTabs" : "Login"}>
				{!isLoggedIn && (
					<Stack.Screen
						name="Login"
						component={(props) => (
							<LoginScreen {...props} onLogin={handleLogin} />
						)}
						options={{ headerShown: false }}
					/>
				)}
				{isLoggedIn && (
					<>
						<Stack.Screen
							name="HomeTabs"
							component={(props) => (
								<HomeTabs {...props} handleLogout={handleLogout} />
							)}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="SubmitReimbursement"
							component={SubmitReimbursementScreen}
							options={{ headerShown: false }}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
