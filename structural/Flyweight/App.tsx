import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import { NotificationItem } from "./src/components/NotificationItem";
import { notifications } from "./src/data/notifications";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem type={item.type} username={item.username} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}
