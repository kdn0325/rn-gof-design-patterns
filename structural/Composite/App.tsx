import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import treeDataRaw from "./data/treeData.json";
import { ComponentNode } from "./type";
import { CompositeNode } from "./composite/CompositeNode";

// JSON 데이터로부터 UI 트리 렌더링
const treeData = treeDataRaw as ComponentNode;

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eee" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <CompositeNode node={treeData} />
      </ScrollView>
    </SafeAreaView>
  );
}
