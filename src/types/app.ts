/** Text elements of an app configuration. */
export interface AppText {
  header: string;
  menu: string;
  title: string;
  dlnumber?: string;
  message: string[][];
  features: string[][];
}

/** Custom fonts per text element. */
export interface AppFont {
  header?: string;
  menu?: string;
  title?: string;
  message?: string;
}

/** Font sizes per text element. */
export interface AppSize {
  header: number;
  menu: number;
  title: number;
  subTitle: number;
  message?: number;
}

/** Image paths for screenshots and features. */
export interface AppImage {
  picture?: string;
  pictures?: string;
  background?: string;
  features: string[];
  howtouse: string | string[];
}

/** Color scheme per UI element. */
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

/** URLs for app pages and external links. */
export interface AppLink {
  link: string;
  ios: string;
  android: string;
  youtube: string;
}

/** Complete app configuration, combining the interfaces above. */
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

/** Unique app number per app. */
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

/** Unique number per menu item. */
export interface MenuNumber {
  home: number;
  terms: number;
  contact: number;
  other: number;
}

/** Window dimensions. */
export interface WindowSize {
  width: number;
  height: number;
}

/** App component props. */
export interface AppProps {
  appNumber: number;
  width: number;
  isJa: boolean;
}

/** Menu component props. */
export interface MenuProps {
  menuNumber: number;
  width: number;
  isJa: boolean;
}

/** Footer component props. */
export interface FooterProps extends AppProps {
  menuNumber: number;
}

/** Apps list component props. */
export interface AppsListProps {
  width: number;
  height: number;
  isJa: boolean;
} 