import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExpenseModal = ({ visible, expense, onClose, onDelete }) => {
	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>Expense Details</Text>
						<TouchableOpacity onPress={onClose}>
							<MaterialCommunityIcons name="close" size={24} color="#000" />
						</TouchableOpacity>
					</View>

					{expense && (
						<ScrollView style={styles.modalBody}>
							<View style={styles.expenseDetailSection}>
								{expense.attachments > 0 && expense.uri ? (
									<Image source={{ uri: expense.uri }} style={styles.expenseImage} />
								) : (
									<View style={[styles.expenseIcon, { backgroundColor: `${expense.statusColor}20` }]}>
										<Text style={[styles.expenseIconText, { color: expense.statusColor }]}>
											{expense.type.slice(0, 2).toUpperCase()}
										</Text>
									</View>
								)}
								<View style={styles.expenseDetailContent}>
									<Text style={styles.expenseDetailType}>{expense.type}</Text>
									<Text style={styles.expenseDetailDescription}>{expense.description}</Text>
								</View>
							</View>

							<View style={styles.expenseInfo}>
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Amount</Text>
									<Text style={styles.infoValue}>₹{expense.amount}</Text>
								</View>
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Status</Text>
									<Text style={[styles.infoValue, { color: expense.statusColor }]}>
										{expense.status}
									</Text>
								</View>
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Attachments</Text>
									<Text style={styles.infoValue}>{expense.attachments} files</Text>
								</View>
								<View style={styles.infoRow}>
									<Text style={styles.infoLabel}>Reimbursed</Text>
									<Text style={styles.infoValue}>{expense.reimbursed ? "Yes" : "No"}</Text>
								</View>
							</View>

							<TouchableOpacity style={styles.actionButton} onPress={() => onDelete(expense.id)}>
								<Text style={styles.actionButtonText}>Delete Expense</Text>
							</TouchableOpacity>
						</ScrollView>
					)}
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		maxHeight: "80%",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#F2F2F7",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	modalBody: {
		padding: 16,
	},
	expenseDetailSection: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	expenseImage: {
		width: 50,
		height: 50,
		borderRadius: 8,
		marginRight: 12,
	},
	expenseIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	expenseIconText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	expenseDetailContent: {
		flex: 1,
	},
	expenseDetailType: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
	},
	expenseDetailDescription: {
		fontSize: 14,
		color: "#666",
	},
	expenseInfo: {
		marginBottom: 16,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	infoLabel: {
		fontSize: 14,
		color: "#666",
	},
	infoValue: {
		fontSize: 14,
		fontWeight: "bold",
	},
	actionButton: {
		backgroundColor: "#ff3b30",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	actionButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default ExpenseModal;
