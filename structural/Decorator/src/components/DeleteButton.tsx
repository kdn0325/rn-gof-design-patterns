import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  onDelete: () => void;
};

export const DeleteButton = ({ onDelete }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onDelete}>
    <Text style={styles.buttonText}>데이터 삭제</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E74C3C",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
