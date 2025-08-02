/**
 * Interface for window dimensions
 * Defines the width and height of the browser window
 */
export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Interface for app component props
 * Defines common properties passed to app components
 */
export interface AppProps {
  appNumber: number;
  width: number;
  isJa: boolean;
}

/**
 * Interface for menu component props
 * Defines common properties passed to menu components
 */
export interface MenuProps {
  menuNumber: number;
  width: number;
  isJa: boolean;
}

/**
 * Interface for footer component props
 * Extends AppProps and adds menu number for footer functionality
 */
export interface FooterProps extends AppProps {
  menuNumber: number;
}

/**
 * Interface for apps list component props
 * Defines properties for the apps list component
 */
export interface AppsListProps {
  width: number;
  height: number;
  isJa: boolean;
} 