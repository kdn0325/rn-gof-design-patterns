import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNotification } from "../hooks/useNotification";

const NotificationBanner: React.FC = () => {
  const message = useNotification();

  if (!message) return null;

  return (
    <View style={styles.notification}>
      <Text style={styles.notificationText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    backgroundColor: "#4CAF50",
    padding: 10,
    alignItems: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 14,
  },
});

export default NotificationBanner;
