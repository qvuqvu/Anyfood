// export interface ColorState {
//   default: string;
//   disabled: string;
// }

// export interface ButtonColors {
//   [key: string]: ColorState;
//   // existing color properties
// }
export interface ButtonProps {
  color?: string;
  path?: string;
  size?: "small" | "medium" | "large";
  state?: "default" | "active" | "disabled";
  iconRight?: boolean;
  custom?: boolean;
  children?: string;
  padding?: string;
  isOpen?: boolean | null;
  handleOpen?: () => void;
  handleItemClick?: (index: number) => void;
  onClick?: () => void;
  dropItem?: any[];
  form?: any;
} 
export interface LinkButtonProps extends ButtonProps {
  color?: "light" | "dark" | "primary" | "secondary";
  size?: "small" | "large";
}

export interface NormalButtonProps extends ButtonProps {
  color?: "primary" | "secondary" | "white" | "ghost" | "opaque" | "red";
  size?: "small" | "medium";
}
