import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./src/components/Header";
import NotificationBanner from "./src/components/NotificationBanner";
import Sidebar from "./src/components/Sidebar";
import ActionButtons from "./src/components/ActionButtons";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <NotificationBanner />

      <View style={styles.content}>
        <Sidebar />
        <ActionButtons />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
});

export default App;
