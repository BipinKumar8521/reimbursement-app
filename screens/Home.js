import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	Image,
	StatusBar,
	Modal,
	ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseItem from "../components/ExpenseItem";
import ProfileModal from "../components/ProfileModal";
import ExpenseModal from "../components/ExpenseModal";

const HomeScreen = ({ navigation, handleLogout }) => {
	const [expenses, setExpenses] = useState([]);
	const [activeTab, setActiveTab] = useState("My Invoices");
	const [loading, setLoading] = useState(true);
	const [showProfileModal, setShowProfileModal] = useState(false);
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
				setExpenses(JSON.parse(storedExpenses));
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

	const ExpenseItem = ({ expense, onPress }) => (
		<TouchableOpacity onPress={() => onPress(expense)} style={styles.expenseItem}>
			<View style={styles.expenseLeft}>
				{expense.attachments > 0 && expense.uri ? (
					<Image source={{ uri: expense.uri }} style={styles.expenseImage} />
				) : (
					<View style={styles.expenseIcon}>
						<Text style={styles.expenseIconText}>
							{expense.type.slice(0, 2).toUpperCase()}
						</Text>
					</View>
				)}
				<View style={styles.expenseDetails}>
					<Text style={styles.expenseType}>{expense.type}</Text>
					<Text style={styles.expenseDescription} numberOfLines={1}>
						{expense.description}
					</Text>
					<Text style={[styles.expenseStatus, { color: expense.statusColor }]}>
						{expense.status}
					</Text>
				</View>
			</View>
			<View style={styles.expenseRight}>
				<Text style={styles.expenseAmount}>₹{expense.amount}</Text>
			</View>
		</TouchableOpacity>
	);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#34C759" />
			</View>
		);
	}

	const filteredExpenses = expenses.filter((expense) =>
		activeTab === "My Invoices" ? !expense.reimbursed : expense.reimbursed
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			{/* Header */}
			<View style={styles.header}>
				<View style={styles.profileSection}>
					<Image
						source={require("../assets/user.jpg")}
						style={styles.profileImage}
					/>
					<TouchableOpacity
						style={styles.profileButton}
						onPress={() => setShowProfileModal(true)}
					>
						<Text style={styles.profileName}>Pratilipi</Text>
						<MaterialCommunityIcons
							name="chevron-down"
							size={20}
							color="#000"
						/>
					</TouchableOpacity>
				</View>
				<Text style={styles.welcomeText}>Hello Devyanshi</Text>
			</View>

			{/* Tabs */}
			<View style={styles.tabsContainer}>
				<Text style={styles.sectionTitle}>Needs Review</Text>
				<View style={styles.tabs}>
					<TouchableOpacity
						style={[
							styles.tab,
							activeTab === "My Invoices" && styles.activeTab,
						]}
						onPress={() => setActiveTab("My Invoices")}
					>
						<Text
							style={[
								styles.tabText,
								activeTab === "My Invoices" && styles.activeTabText,
							]}
						>
							My Invoices
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.tab,
							activeTab === "Reimbursements" && styles.activeTab,
						]}
						onPress={() => setActiveTab("Reimbursements")}
					>
						<Text
							style={[
								styles.tabText,
								activeTab === "Reimbursements" && styles.activeTabText,
							]}
						>
							Reimbursements
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Expense List */}
			<ScrollView style={styles.expenseList}>
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#34C759" />
					</View>
				) : filteredExpenses.length > 0 ? (
					filteredExpenses.map((expense) => (
						<ExpenseItem
							key={expense.id}
							expense={expense}
							onPress={handleExpensePress}
						/>
					))
				) : (
					<View style={styles.noExpensesContainer}>
						<Text style={styles.noExpensesText}>No expenses found</Text>
					</View>
				)}
			</ScrollView>

			{/* FAB */}
			<TouchableOpacity
				style={styles.fab}
				onPress={() => navigation.navigate("SubmitReimbursement")}
			>
				<Text style={styles.fabText}>+</Text>
			</TouchableOpacity>

			<ProfileModal
				visible={showProfileModal}
				onClose={() => setShowProfileModal(false)}
				onLogout={handleLogout}
			/>
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
		backgroundColor: "#F2F2F7",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		padding: 16,
		backgroundColor: "#fff",
	},
	profileSection: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	profileImage: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 8,
	},
	profileButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F2F2F7",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	profileName: {
		fontSize: 14,
		fontWeight: "500",
		marginRight: 4,
	},
	welcomeText: {
		fontSize: 28,
		fontWeight: "bold",
	},
	tabsContainer: {
		backgroundColor: "#fff",
		paddingTop: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginLeft: 16,
		marginBottom: 12,
	},
	tabs: {
		flexDirection: "row",
		paddingHorizontal: 16,
	},
	tab: {
		marginRight: 24,
		paddingBottom: 12,
	},
	activeTab: {
		borderBottomWidth: 2,
		borderBottomColor: "#000",
	},
	tabText: {
		fontSize: 16,
		color: "#8E8E93",
	},
	activeTabText: {
		color: "#000",
		fontWeight: "500",
	},
	expenseList: {
		flex: 1,
		backgroundColor: "#fff",
	},
	fab: {
		position: "absolute",
		right: 16,
		bottom: 80,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	fabText: {
		fontSize: 32,
		color: "#000",
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
	expenseImage: {
		width: 36,
		height: 36,
		borderRadius: 8,
		marginRight: 12,
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
});

export default HomeScreen;
