import { ReactNode } from "react";

export interface UIFactory {
  createButton(label: string, onPress: () => void): React.ReactNode;
  createInput(
    placeholder: string,
    value: string,
    onChange: (text: string) => void
  ): React.ReactNode;

  getBackgroundColor(): string;
  getTitleColor(): string;
  getSwitchTrackColor(): { false: string; true: string };
  getSwitchThumbColor(value: boolean): string;
}
