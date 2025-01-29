import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	StatusBar,
	Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseModal from "../components/ExpenseModal";

const MyInvoicesScreen = ({ navigation }) => {
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedExpense, setSelectedExpense] = useState(null);
	const [showExpenseModal, setShowExpenseModal] = useState(false);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			loadExpenses();
		});
		return unsubscribe;
	}, [navigation]);

	const loadExpenses = async () => {
		try {
			const storedExpenses = await AsyncStorage.getItem("expenses");
			if (storedExpenses) {
				const allExpenses = JSON.parse(storedExpenses);
				const invoiceExpenses = allExpenses.filter(
					(expense) => !expense.reimbursed
				);
				setExpenses(invoiceExpenses);
			}
			setLoading(false);
		} catch (error) {
			console.error("Error loading expenses:", error);
			setLoading(false);
		}
	};

	const handleExpensePress = (expense) => {
		setSelectedExpense(expense);
		setShowExpenseModal(true);
	};

	const handleDeleteExpense = async (expenseId) => {
		try {
			const updatedExpenses = expenses.filter(
				(expense) => expense.id !== expenseId
			);
			setExpenses(updatedExpenses);
			await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
			setShowExpenseModal(false);
		} catch (error) {
			console.error("Error deleting expense:", error);
		}
	};

	const ExpenseItem = ({
		id,
		type,
		status,
		amount,
		statusColor,
		description,
		attachments,
		uri,
	}) => (
		<View style={styles.expenseItem}>
			<View style={styles.expenseLeft}>
				{attachments > 0 && uri ? (
					<Image source={{ uri }} style={styles.expenseImage} />
				) : (
					<View style={styles.expenseIcon}>
						<Text style={styles.expenseIconText}>
							{type.slice(0, 2).toUpperCase()}
						</Text>
					</View>
				)}
				<View style={styles.expenseDetails}>
					<Text style={styles.expenseType}>{type}</Text>
					<Text style={styles.expenseDescription} numberOfLines={1}>
						{description}
					</Text>
					<Text style={[styles.expenseStatus, { color: statusColor }]}>
						{status}
					</Text>
				</View>
			</View>
			<View style={styles.expenseRight}>
				<Text style={styles.expenseAmount}>₹{amount}</Text>
			</View>
		</View>
	);

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
				<Text style={styles.headerTitle}>My Invoices</Text>
			</View>

			<ScrollView style={styles.expenseList}>
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#34C759" />
					</View>
				) : expenses.length > 0 ? (
					expenses.map((expense) => (
						<TouchableOpacity
							key={expense.id}
							onPress={() => handleExpensePress(expense)}
						>
							<ExpenseItem {...expense} />
						</TouchableOpacity>
					))
				) : (
					<View style={styles.noExpensesContainer}>
						<Text style={styles.noExpensesText}>No invoices found</Text>
					</View>
				)}
			</ScrollView>
			<ExpenseModal
				visible={showExpenseModal}
				expense={selectedExpense}
				onClose={() => setShowExpenseModal(false)}
				onDelete={handleDeleteExpense}
			/>
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
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	expenseList: {
		flex: 1,
		backgroundColor: "#fff",
	},
	expenseItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#F2F2F7",
	},
	expenseLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	expenseIcon: {
		width: 36,
		height: 36,
		borderRadius: 8,
		backgroundColor: "#F2F2F7",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	expenseIconText: {
		fontSize: 16,
		color: "#8E8E93",
	},
	expenseDetails: {
		flex: 1,
	},
	expenseType: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	expenseDescription: {
		fontSize: 14,
		color: "#8E8E93",
		marginBottom: 4,
	},
	expenseStatus: {
		fontSize: 12,
	},
	expenseAmount: {
		fontSize: 16,
		fontWeight: "500",
	},
	attachmentBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F2F2F7",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	attachmentCount: {
		fontSize: 12,
		color: "#8E8E93",
		marginLeft: 4,
	},
	noExpensesContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	noExpensesText: {
		fontSize: 16,
		color: "#8E8E93",
	},
	expenseImage: {
		width: 36,
		height: 36,
		borderRadius: 8,
		marginRight: 12,
	},
});

export default MyInvoicesScreen;
