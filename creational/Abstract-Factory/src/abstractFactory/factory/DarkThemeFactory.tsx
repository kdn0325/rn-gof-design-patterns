import React from "react";
import { ThemedButton } from "../products/ThemedButton";
import { ThemedInput } from "../products/ThemedInput";
import { UIFactory } from "./UIFactory";

export const darkThemeFactory: UIFactory = {
  createButton(label, onPress) {
    return (
      <ThemedButton
        label={label}
        onPress={onPress}
        backgroundColor="#333333"
        color="#FFFFFF"
      />
    );
  },

  createInput(placeholder, value, onChange) {
    return (
      <ThemedInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        borderColor="#666666"
        color="#FFFFFF"
      />
    );
  },

  // 배경색 반환
  getBackgroundColor() {
    return "#1a1a1a";
  },

  // 제목 텍스트 색상 반환
  getTitleColor() {
    return "#FFFFFF";
  },

  // 스위치 트랙 색상 반환 (false, true 각각)
  getSwitchTrackColor() {
    return { false: "#666666", true: "#4682B4" };
  },

  // 스위치 썸 색상 반환 (on/off에 따라)
  getSwitchThumbColor(value: boolean) {
    return value ? "#fff" : "#aaa";
  },
};
