import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  borderColor: string;
  color: string;
}

export const ThemedInput: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  borderColor,
  color,
}) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChange}
    style={[styles.input, { borderColor, color }]}
    placeholderTextColor={color}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
});
