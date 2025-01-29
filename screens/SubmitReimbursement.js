import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Platform,
	Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SubmitReimbursementScreen = ({ navigation }) => {
	const [amount, setAmount] = useState("");
	const [transactionDate, setTransactionDate] = useState(new Date());
	const [description, setDescription] = useState("");
	const [invoiceNumber, setInvoiceNumber] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);
	const [category, setCategory] = useState("");

	const handlePickDocument = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ["image/*", "application/pdf"],
				copyToCacheDirectory: true, // Changed to true
			});

			if (result.assets && result.assets[0]) {
				// Check for assets array
				const file = result.assets[0];

				// Check file size (5MB = 5 * 1024 * 1024 bytes)
				if (file.size > 5 * 1024 * 1024) {
					alert("File size must be less than 5MB");
					return;
				}

				setUploadedFile(file);
			}
		} catch (err) {
			console.error("Error picking document:", err);
		}
	};

	const handleTakePhoto = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			alert("Camera permission is required to take a photo");
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		if (!result.canceled) {
			setUploadedFile(result.assets[0]);
		}
	};

	const handleDateChange = (event, selectedDate) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setTransactionDate(selectedDate);
		}
	};

	const handleSubmit = async () => {
		if (!amount || !transactionDate || !description || !category) {
			alert("Please fill in all required fields");
			return;
		}

		const newExpense = {
			id: `EXP${Date.now() + Math.floor(Math.random() * 1000)}`,
			type: category,
			status: "Pending Your Approval",
			amount,
			statusColor: "#FF9500",
			date: transactionDate.toISOString(),
			description,
			attachments: uploadedFile ? 1 : 0,
			uri: uploadedFile ? uploadedFile.uri : null,
			reimbursed: false,
		};

		try {
			const storedExpenses = await AsyncStorage.getItem("expenses");
			const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
			expenses.push(newExpense);
			await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
			alert("Expense submitted successfully");
			navigation.goBack();
		} catch (error) {
			console.error("Error saving expense:", error);
			alert("Failed to submit expense");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<MaterialCommunityIcons name="chevron-left" size={24} color="#000" />
					<Text style={styles.backText}>Home</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Submit Reimbursement</Text>
			</View>

			<ScrollView style={styles.content}>
				{/* Upload Section */}
				<View style={styles.uploadSection}>
					<TouchableOpacity
						style={styles.uploadButton}
						onPress={handlePickDocument}
					>
						<MaterialCommunityIcons name="upload" size={24} color="#4CAF50" />
						<Text style={styles.uploadText}>Pick from device</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.uploadButton}
						onPress={handleTakePhoto}
					>
						<MaterialCommunityIcons name="camera" size={24} color="#4CAF50" />
						<Text style={styles.uploadText}>Take a photo</Text>
					</TouchableOpacity>
					{uploadedFile && (
						<View style={styles.filePreview}>
							{uploadedFile.uri && (
								<Image
									source={{ uri: uploadedFile.uri }}
									style={styles.imagePreview}
								/>
							)}
							<Text style={styles.fileName}>{uploadedFile.name}</Text>
						</View>
					)}
				</View>

				{/* Invoice Details */}
				<Text style={styles.sectionTitle}>Invoice Details</Text>

				<View style={styles.formGroup}>
					<TextInput
						style={styles.input}
						placeholder="Amount *"
						value={amount}
						onChangeText={setAmount}
						keyboardType="decimal-pad"
						placeholderTextColor="#6B7280"
					/>
				</View>

				<TouchableOpacity
					style={styles.formGroup}
					onPress={() => setShowDatePicker(true)}
				>
					<View style={styles.dateInput}>
						<TextInput
							style={styles.input}
							placeholder="Transaction Date *"
							value={transactionDate.toLocaleDateString()}
							editable={false}
							placeholderTextColor="#6B7280"
						/>
						<MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
					</View>
				</TouchableOpacity>

				<View style={styles.formGroup}>
					<TextInput
						style={styles.input}
						placeholder="Description *"
						value={description}
						onChangeText={setDescription}
						placeholderTextColor="#6B7280"
					/>
				</View>

				<View style={styles.formGroup}>
					<TextInput
						style={styles.input}
						placeholder="Category *"
						value={category}
						onChangeText={setCategory}
						placeholderTextColor="#6B7280"
					/>
				</View>

				<View style={styles.formGroup}>
					<TextInput
						style={styles.input}
						placeholder="Invoice# Optional"
						value={invoiceNumber}
						onChangeText={setInvoiceNumber}
						placeholderTextColor="#6B7280"
					/>
				</View>

				{showDatePicker && (
					<DateTimePicker
						value={transactionDate}
						mode="date"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						onChange={handleDateChange}
					/>
				)}
			</ScrollView>

			{/* Submit Button */}
			<TouchableOpacity
				style={[
					styles.submitButton,
					(!amount || !description || !category) && styles.submitButtonDisabled,
				]}
				onPress={handleSubmit}
				disabled={!amount || !description || !category}
			>
				<Text style={styles.submitButtonText}>Submit Request</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#F3F4F6",
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	backText: {
		fontSize: 16,
		color: "#000",
		marginLeft: 4,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: "500",
		marginLeft: 16,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	uploadSection: {
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 8,
		borderStyle: "dashed",
		backgroundColor: "#F9FAFB",
		marginBottom: 24,
	},
	uploadButton: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	uploadText: {
		fontSize: 14,
		color: "#4CAF50",
		marginLeft: 8,
	},
	fileName: {
		fontSize: 12,
		color: "#4CAF50",
		marginTop: 8,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 16,
	},
	formGroup: {
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 8,
		padding: 12,
		fontSize: 14,
		color: "#1F2937",
	},
	dateInput: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 8,
		paddingRight: 12,
	},
	submitButton: {
		backgroundColor: "#4CAF50",
		padding: 16,
		margin: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	submitButtonDisabled: {
		backgroundColor: "#E5E7EB",
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "500",
	},
	filePreview: {
		alignItems: "center",
		marginTop: 16,
	},
	imagePreview: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginBottom: 8,
	},
});

export default SubmitReimbursementScreen;
