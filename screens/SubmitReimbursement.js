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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";

const SubmitReimbursementScreen = ({ navigation }) => {
	const [amount, setAmount] = useState("");
	const [transactionDate, setTransactionDate] = useState(new Date());
	const [description, setDescription] = useState("");
	const [invoiceNumber, setInvoiceNumber] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);

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

	const handleDateChange = (event, selectedDate) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setTransactionDate(selectedDate);
		}
	};

	const handleSubmit = () => {
		if (!amount || !transactionDate || !description) {
			alert("Please fill in all required fields");
			return;
		}

		// Handle submission logic here
		console.log({
			amount,
			transactionDate,
			description,
			invoiceNumber,
			uploadedFile,
		});
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
				<TouchableOpacity
					style={styles.uploadSection}
					onPress={handlePickDocument}
				>
					<MaterialCommunityIcons name="upload" size={24} color="#4CAF50" />
					<Text style={styles.uploadText}>
						<Text style={styles.uploadGreen}>Click to upload</Text> or drag and
						drop
					</Text>
					<Text style={styles.uploadSubtext}>PDF, PNG or JPG (Max. 5 MB)</Text>
					{uploadedFile && (
						<Text style={styles.fileName}>{uploadedFile.name}</Text>
					)}
				</TouchableOpacity>

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
					(!amount || !description) && styles.submitButtonDisabled,
				]}
				onPress={handleSubmit}
				disabled={!amount || !description}
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
	uploadText: {
		fontSize: 14,
		color: "#6B7280",
		marginTop: 8,
	},
	uploadGreen: {
		color: "#4CAF50",
	},
	uploadSubtext: {
		fontSize: 12,
		color: "#9CA3AF",
		marginTop: 4,
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
});

export default SubmitReimbursementScreen;
