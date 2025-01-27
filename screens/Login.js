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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [focusedInput, setFocusedInput] = useState(null);

	const handleLogin = () => {
		// Implement login logic here
		console.log("Login pressed with:", { email, password });
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
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
	},
	loginContainer: {
		width: width * 0.9,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
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
