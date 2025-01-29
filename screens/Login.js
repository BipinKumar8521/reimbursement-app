import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Dimensions,
	Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation, onLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [focusedInput, setFocusedInput] = useState(null);

	const handleLogin = () => {
		if (email === "test@example.com" && password === "password") {
			onLogin();
		} else {
			alert("Invalid credentials");
		}
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Image source={require("../assets/user.jpg")} style={styles.logo} />
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>Welcome Back</Text>
					<Text style={styles.subHeaderText}>Sign in to continue</Text>
				</View>

				<View style={styles.inputContainer}>
					<View
						style={[
							styles.inputWrapper,
							focusedInput === "email" && styles.inputWrapperFocused,
						]}
					>
						<MaterialCommunityIcons
							name="email-outline"
							size={24}
							color={focusedInput === "email" ? "#4c669f" : "#666"}
							style={styles.inputIcon}
						/>
						<TextInput
							style={styles.input}
							placeholder="Email"
							placeholderTextColor="#666"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
							onFocus={() => setFocusedInput("email")}
							onBlur={() => setFocusedInput(null)}
						/>
					</View>

					<View
						style={[
							styles.inputWrapper,
							focusedInput === "password" && styles.inputWrapperFocused,
						]}
					>
						<MaterialCommunityIcons
							name="lock-outline"
							size={24}
							color={focusedInput === "password" ? "#4c669f" : "#666"}
							style={styles.inputIcon}
						/>
						<TextInput
							style={styles.input}
							placeholder="Password"
							placeholderTextColor="#666"
							value={password}
							onChangeText={setPassword}
							secureTextEntry={!isPasswordVisible}
							onFocus={() => setFocusedInput("password")}
							onBlur={() => setFocusedInput(null)}
						/>
						<TouchableOpacity
							onPress={togglePasswordVisibility}
							style={styles.visibilityIcon}
						>
							<MaterialCommunityIcons
								name={isPasswordVisible ? "eye-off" : "eye"}
								size={24}
								color="#666"
							/>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity style={styles.forgotPassword}>
					<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
					<Text style={styles.loginButtonText}>LOGIN</Text>
				</TouchableOpacity>

				<View style={styles.signupContainer}>
					<Text style={styles.signupText}>Don't have an account? </Text>
					<TouchableOpacity>
						<Text style={styles.signupLink}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: height,
		width: width,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f2f2f2",
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	headerContainer: {
		alignItems: "center",
		marginBottom: 30,
	},
	headerText: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#000000",
		marginBottom: 10,
	},
	subHeaderText: {
		fontSize: 16,
		color: "#000000",
	},
	inputContainer: {
		marginBottom: 20,
		width: "90%",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#e8f5e9",
		borderRadius: 10,
		marginBottom: 15,
		paddingHorizontal: 15,
		height: 50,
		borderWidth: 1,
		borderColor: "#c8e6c9",
	},
	inputWrapperFocused: {
		borderColor: "#2e7d32",
		backgroundColor: "#fff",
	},
	inputIcon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		color: "#1d1d1d",
		fontSize: 16,
	},
	visibilityIcon: {
		padding: 5,
	},
	forgotPassword: {
		alignItems: "flex-end",
		marginBottom: 20,
		width: "90%",
	},
	forgotPasswordText: {
		color: "#2e7d32",
		fontSize: 14,
	},
	loginButton: {
		backgroundColor: "#2e7d32",
		borderRadius: 10,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: "90%",
	},
	loginButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	signupContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	signupText: {
		color: "#080808",
		fontSize: 14,
	},
	signupLink: {
		color: "#2e7d32",
		fontSize: 14,
		fontWeight: "bold",
	},
});

export default LoginScreen;
