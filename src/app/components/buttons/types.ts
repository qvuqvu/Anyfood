export interface ButtonProps {
    children: React.ReactNode;
    color?: 'light' | 'dark';
    size?: 'small' | 'large';
    path?: string;
    onClick?: () => void;
  }
  