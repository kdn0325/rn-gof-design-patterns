import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ShareInterface } from "../bridge/abstractions/ShareInterface";

type ShareButtonProps = {
  content: string;
  implementation: ShareInterface;
};

// ✅ Abstraction(추상화 역할)
// - 공유 버튼 UI 및 추상적인 공유 동작 정의
// - 실제 공유 로직은 구현체(implementation)에 위임

export const ShareButton = ({ content, implementation }: ShareButtonProps) => {
  const handlePress = () => {
    implementation.share(content);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>공유하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6a5acd",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
