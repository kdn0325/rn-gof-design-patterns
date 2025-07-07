import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

// UI 역할: 전달받은 안내문 데이터를 렌더링하는 컴포넌트
interface Props {
  title: string;
  message: string;
  ctaText: string;
  onPress: () => void;
}

export const NoticeCard: React.FC<Props> = ({
  title,
  message,
  ctaText,
  onPress,
}) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    <Button title={ctaText} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    marginBottom: 16,
  },
});
