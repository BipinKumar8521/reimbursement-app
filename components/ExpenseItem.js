import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExpenseItem = ({ expense, onPress }) => {
	const {
		id,
		type,
		status,
		amount,
		statusColor,
		description,
		attachments,
		reimbursed,
	} = expense;

	return (
		<TouchableOpacity
			style={styles.expenseItem}
			onPress={() => onPress(expense)}
		>
			<View style={styles.expenseLeft}>
				<View
					style={[styles.expenseIcon, { backgroundColor: `${statusColor}20` }]}
				>
					<Text style={[styles.expenseIconText, { color: statusColor }]}>
						{id}
					</Text>
				</View>
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
				{attachments > 0 && (
					<View style={styles.attachmentBadge}>
						<MaterialCommunityIcons
							name="paperclip"
							size={12}
							color="#8E8E93"
						/>
						<Text style={styles.attachmentCount}>{attachments}</Text>
					</View>
				)}
				{reimbursed && <Text style={styles.reimbursedText}>Reimbursed</Text>}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	expenseItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#F2F2F7",
		backgroundColor: "#fff",
	},
	expenseLeft: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	expenseRight: {
		alignItems: "flex-end",
	},
	expenseIcon: {
		width: 40,
		height: 40,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	expenseIconText: {
		fontSize: 14,
		fontWeight: "500",
	},
	expenseDetails: {
		flex: 1,
	},
	expenseType: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	expenseDescription: {
		fontSize: 14,
		color: "#8E8E93",
		marginBottom: 4,
	},
	expenseStatus: {
		fontSize: 12,
		fontWeight: "500",
	},
	expenseAmount: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
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
	reimbursedText: {
		fontSize: 12,
		color: "#34C759",
		marginTop: 4,
	},
});

export default ExpenseItem;
