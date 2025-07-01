export interface ComponentNode {
  type: "container" | "text" | "image" | "button";
  value?: string;
  isTitle?: boolean;
  src?: string;
  onPressMessage?: string;
  children?: ComponentNode[];
}
