/**
 * Interface for app text content
 * Defines the structure for text elements in app configurations
 */
export interface AppText {
  header: string;
  menu: string;
  title: string;
  dlnumber?: string;
  message: string[][];
  features: string[][];
}

/**
 * Interface for app font configurations
 * Defines custom font settings for different text elements
 */
export interface AppFont {
  header?: string;
  menu?: string;
  title?: string;
  message?: string;
}

/**
 * Interface for app size configurations
 * Defines font sizes for different text elements
 */
export interface AppSize {
  header: number;
  menu: number;
  title: number;
  subTitle: number;
  message?: number;
}

/**
 * Interface for app image configurations
 * Defines image paths for app screenshots and features
 */
export interface AppImage {
  picture?: string;
  pictures?: string;
  background?: string;
  features: string[];
  howtouse: string | string[];
}

/**
 * Interface for app color configurations
 * Defines color schemes for different UI elements
 */
export interface AppColor {
  header: string;
  spHeader?: string;
  headerFg?: string;
  spHeaderFg?: string;
  background: string;
  text?: string;
  title: string;
  message: string;
  features: string;
  howtouse: string;
}

/**
 * Interface for app link configurations
 * Defines URLs for app pages and external links
 */
export interface AppLink {
  link: string;
  ios: string;
  android: string;
  youtube: string;
}

/**
 * Main app interface
 * Defines the complete structure for app configurations
 * Combines all other interfaces into a single app definition
 */
export interface App {
  app: string;
  appNumber: number;
  folder: string;
  icon: string;
  text: AppText;
  font: AppFont;
  size: AppSize;
  image: AppImage;
  color: AppColor;
  link: AppLink;
}

/**
 * Interface for app number constants
 * Defines unique identifiers for each app in the system
 */
export interface AppNumber {
  home: number;
  elevator: number;
  elevatorNeo: number;
  signal: number;
  crossing: number;
  toilet: number;
  allowance: number;
  transit: number;
  phonics: number;
  japanese: number;
}

/**
 * Interface for menu number constants
 * Defines unique identifiers for menu navigation items
 */
export interface MenuNumber {
  home: number;
  terms: number;
  contact: number;
  other: number;
}

/**
 * Interface for window dimensions
 */
export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Interface for app component props
 */
export interface AppProps {
  appNumber: number;
  width: number;
  isJa: boolean;
}

/**
 * Interface for menu component props
 */
export interface MenuProps {
  menuNumber: number;
  width: number;
  isJa: boolean;
}

/**
 * Interface for footer component props
 */
export interface FooterProps extends AppProps {
  menuNumber: number;
}

/**
 * Interface for apps list component props
 */
export interface AppsListProps {
  width: number;
  height: number;
  isJa: boolean;
} 