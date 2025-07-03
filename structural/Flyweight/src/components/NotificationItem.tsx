import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getIcon } from "../flyweight/IconFactory";
import { getStyle } from "../flyweight/StyleFactory";
import { getMessageTemplate } from "../flyweight/MessageFactory";

interface NotificationItemProps {
  type: string;
  username: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  username,
}) => {
  const icon = getIcon(type);
  const styles = getStyle(type);
  const message = getMessageTemplate(type)(username);

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={defaultStyles.icon}>{icon}</Text>
      <Text style={[defaultStyles.message, styles.text]}>{message}</Text>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  message: {
    fontSize: 16,
  },
});
