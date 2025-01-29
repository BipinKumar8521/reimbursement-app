import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";

const ProfileModal = ({ visible, onClose, onLogout }) => {
	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Profile</Text>
					<TouchableOpacity style={styles.modalOption} onPress={onClose}>
						<Text>Settings</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.modalOption} onPress={onLogout}>
						<Text style={{ color: "#FF3B30" }}>Logout</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
						<Text>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
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

export default ProfileModal;
