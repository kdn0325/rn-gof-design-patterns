import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

import ApiClientClass from "../core/class/ApiClient";
import createApiClientFunction from "../core/function/ApiClient";

type Post = {
  id: number;
  title: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<"class" | "function" | null>(
    null
  );

  // 클래스형 싱글톤 사용 예제
  // - 클래스 내부에 정적 인스턴스 변수를 가지고 있음
  // - getInstance() 메서드를 통해 유일한 인스턴스를 얻음
  // - 객체지향적이며 상태와 메서드를 클래스 내에서 관리
  const fetchPostsClass = async () => {
    setLoadingType("class");
    setLoading(true);
    try {
      const api = ApiClientClass.getInstance();
      const response = await api.get<Post[]>("/posts?_limit=10");
      setPosts(response.data);
    } catch (error) {
      console.error("API 호출 실패:", error);
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  };

  // 함수형 싱글톤 사용 예제
  // - 클로저를 활용해 인스턴스를 은닉하고 재사용함
  // - 함수 호출 시 내부에서 최초 한 번만 인스턴스를 생성
  // - 더 간결하고 함수형 프로그래밍 스타일에 적합
  const fetchPostsFunction = async () => {
    setLoadingType("function");
    setLoading(true);
    try {
      const api = createApiClientFunction();
      const response = await api.get<Post[]>("/posts?_limit=10");
      setPosts(response.data);
    } catch (error) {
      console.error("API 호출 실패:", error);
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <Button
            title={
              loadingType === "class" && loading
                ? "클래스형 싱글톤"
                : "클래스형 싱글톤 예제"
            }
            onPress={fetchPostsClass}
            disabled={loadingType === "class" && loading}
          />
          <Button
            title={
              loadingType === "function" && loading
                ? "함수형 싱글톤"
                : "함수형 싱글톤 예제"
            }
            onPress={fetchPostsFunction}
            disabled={loadingType === "function" && loading}
          />
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.title}</Text>
          )}
          style={{ marginTop: 20, width: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
  },
});
