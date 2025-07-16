import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotificationBanner from "./components/NotificationBanner";
import ActionButtons from "./components/ActionButtons";

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
