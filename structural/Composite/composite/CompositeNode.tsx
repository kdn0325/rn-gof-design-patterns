import React from "react";
import { Alert, Image } from "react-native";
import { Container } from "./Container";
import { CustomText } from "../components/CustomText";
import { CustomButton } from "../components/CustomButton";

interface Node {
  type: "container" | "text" | "image" | "button";
  value?: string;
  isTitle?: boolean;
  src?: string;
  onPressMessage?: string;
  children?: Node[];
}

interface Props {
  node: Node;
}
// 컨테이너 역할 컴포넌트 (컴포지트 패턴에서 Composite 역할)
export const CompositeNode: React.FC<Props> = ({ node }) => {
  switch (node.type) {
    case "container":
      return (
        <Container>
          {node.children?.map((child, i) => (
            <CompositeNode key={i} node={child} />
          ))}
        </Container>
      );
    case "text":
      return <CustomText text={node.value || ""} isTitle={node.isTitle} />;
    case "image":
      return (
        <Image
          source={{ uri: node.src || "" }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginVertical: 8,
          }}
        />
      );
    case "button":
      return (
        <CustomButton
          title={node.value || "버튼"}
          onPress={() => Alert.alert(node.onPressMessage || "버튼 눌림")}
        />
      );
    default:
      return null;
  }
};
