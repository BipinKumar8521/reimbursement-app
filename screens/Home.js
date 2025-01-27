// screens/HomeScreen.js
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

const INITIAL_EXPENSES = [
	{
		id: "TR",
		type: "Travel",
		status: "Missing Fields",
		amount: "12,333",
		statusColor: "#FF9500",
		date: new Date().toISOString(),
	},
	{
		id: "FO",
		type: "Food",
		status: "Missing Receipts",
		amount: "12,333",
		statusColor: "#FF3B30",
		date: new Date().toISOString(),
	},
	{
		id: "OI",
		type: "Office Item",
		status: "Pending Your Approval",
		amount: "12,333",
		statusColor: "#FF9500",
		date: new Date().toISOString(),
	},
	{
		id: "PP",
		type: "Petty Purchase",
		status: "Missing Receipts",
		amount: "12,333",
		statusColor: "#FF3B30",
		date: new Date().toISOString(),
	},
];

const HomeScreen = ({ navigation }) => {
	const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
	const [activeTab, setActiveTab] = useState("My Invoices");
	const [loading, setLoading] = useState(true);
	const [showProfileModal, setShowProfileModal] = useState(false);

	useEffect(() => {
		loadExpenses();
	}, []);

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
		// Handle expense item press
		console.log("Expense pressed:", expense);
	};

	const ExpenseItem = ({ id, type, status, amount, statusColor }) => (
		<TouchableOpacity
			style={styles.expenseItem}
			onPress={() =>
				handleExpensePress({ id, type, status, amount, statusColor })
			}
		>
			<View style={styles.expenseLeft}>
				<View style={styles.expenseIcon}>
					<Text style={styles.expenseIconText}>{id}</Text>
				</View>
				<View style={styles.expenseDetails}>
					<Text style={styles.expenseType}>{type}</Text>
					<Text style={[styles.expenseStatus, { color: statusColor }]}>
						{status}
					</Text>
				</View>
			</View>
			<Text style={styles.expenseAmount}>₹{amount}</Text>
		</TouchableOpacity>
	);

	const ProfileModal = () => (
		<Modal
			visible={showProfileModal}
			animationType="slide"
			transparent={true}
			onRequestClose={() => setShowProfileModal(false)}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Profile</Text>
					<TouchableOpacity
						style={styles.modalOption}
						onPress={() => setShowProfileModal(false)}
					>
						<Text>Settings</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.modalOption}
						onPress={() => setShowProfileModal(false)}
					>
						<Text style={{ color: "#FF3B30" }}>Logout</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.modalCloseButton}
						onPress={() => setShowProfileModal(false)}
					>
						<Text>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#34C759" />
			</View>
		);
	}

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
				{expenses.map((expense) => (
					<ExpenseItem key={expense.id} {...expense} />
				))}
			</ScrollView>

			{/* FAB */}
			<TouchableOpacity
				style={styles.fab}
				onPress={() => navigation.navigate("SubmitReimbursement")}
			>
				<Text style={styles.fabText}>+</Text>
			</TouchableOpacity>

			{/* Bottom Navigation */}
			<View style={styles.bottomNav}>
				<TouchableOpacity style={styles.navItem}>
					<MaterialCommunityIcons name="home" size={24} color="#34C759" />
					<Text style={[styles.navText, styles.activeNavText]}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navItem}>
					<MaterialCommunityIcons
						name="file-document-outline"
						size={24}
						color="#8E8E93"
					/>
					<Text style={styles.navText}>My Invoices</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navItem}>
					<MaterialCommunityIcons name="refresh" size={24} color="#8E8E93" />
					<Text style={styles.navText}>Reimbursements</Text>
				</TouchableOpacity>
			</View>

			<ProfileModal />
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
		fontSize: 12,
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
	expenseStatus: {
		fontSize: 12,
	},
	expenseAmount: {
		fontSize: 16,
		fontWeight: "500",
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
	bottomNav: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 8,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#F2F2F7",
	},
	navItem: {
		alignItems: "center",
	},
	navText: {
		fontSize: 12,
		color: "#8E8E93",
		marginTop: 4,
	},
	activeNavText: {
		color: "#34C759",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 20,
	},
	modalOption: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#F2F2F7",
	},
	modalCloseButton: {
		marginTop: 20,
		alignItems: "center",
		padding: 15,
	},
});

export default HomeScreen;
