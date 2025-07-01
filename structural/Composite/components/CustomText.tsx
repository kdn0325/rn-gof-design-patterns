import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  text: string;
  isTitle?: boolean;
}

export const CustomText: React.FC<CustomTextProps> = ({
  text,
  isTitle,
  style,
  ...rest
}) => (
  <Text style={[styles.text, isTitle && styles.title, style]} {...rest}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },
});
