export interface WindowSize {
  width: number;
  height: number;
}

export interface AppProps {
  appNumber: number;
  width: number;
  isJa: boolean;
}

export interface MenuProps {
  menuNumber: number;
  width: number;
  isJa: boolean;
}

export interface FooterProps extends AppProps {
  menuNumber: number;
}

export interface AppsListProps {
  width: number;
  height: number;
  isJa: boolean;
} 