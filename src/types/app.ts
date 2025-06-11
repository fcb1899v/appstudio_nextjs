export interface AppText {
  header: string;
  menu: string;
  title: string;
  dlnumber?: string;
  message: string[][];
  features: string[][];
}

export interface AppFont {
  header?: string;
  menu?: string;
  title?: string;
  message?: string;
}

export interface AppSize {
  header: number;
  menu: number;
  title: number;
  subTitle: number;
  message?: number;
}

export interface AppImage {
  picture?: string;
  pictures?: string;
  features: string[];
  howtouse: string;
}

export interface AppColor {
  header: string;
  background: string;
  title: string;
  message: string;
  features: string;
  howtouse: string;
}

export interface AppLink {
  link: string;
  ios: string;
  android: string;
  youtube: string;
}

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

export interface MenuNumber {
  home: number;
  terms: number;
  contact: number;
  other: number;
} 