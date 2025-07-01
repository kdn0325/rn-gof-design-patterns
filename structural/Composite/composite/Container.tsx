import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";

// JSON 데이터 노드 타입에 따라 적절한 컴포넌트 렌더링 (컴포지트 패턴 구현)
// 재귀적으로 자식 노드를 처리하여 트리 구조

export const Container: React.FC<ViewProps> = ({
  children,
  style,
  ...rest
}) => (
  <View style={[styles.container, style]} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
