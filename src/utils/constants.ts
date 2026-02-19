import { AppNumber, MenuNumber } from '@/types/app';

/**
 * Check if screen width is smartphone size
 * @param width - Screen width in pixels
 * @returns True if width is less than 600px
 */
export const isSP = (width: number) => (width < 600);

/**
 * Check if screen width is PC size
 * @param width - Screen width in pixels
 * @returns True if width is greater than 1024px
 */
export const isPC = (width: number) => (width > 1024);

/**
 * App number constants for navigation and identification
 * Each app has a unique number for routing and state management
 */
export const myAppNumber: AppNumber = {
  home: 0,
  elevator: 1,
  elevatorNeo: 2,
  signal: 3,
  crossing: 4,
  toilet: 5,
  allowance: 6,
  transit: 7,
  phonics: 8,
  japanese: 9
}

/**
 * Menu number constants for navigation
 * Used for menu routing and state management
 */
export const myMenuNumber: MenuNumber = {
  home: 0,
  terms: 1,
  contact: 2,
  other: 100,
}

/**
 * URL segment to app number. Used for dynamic app routes (e.g. /elevator, /signal).
 * Excludes home (no dedicated app page at /home).
 */
export const APP_SLUG_TO_NUMBER: Record<string, number> = {
  elevator: myAppNumber.elevator,
  elevatorneo: myAppNumber.elevatorNeo,
  signal: myAppNumber.signal,
  crossing: myAppNumber.crossing,
  toilet: myAppNumber.toilet,
  allowance: myAppNumber.allowance,
  transit: myAppNumber.transit,
  phonics: myAppNumber.phonics,
  japanese: myAppNumber.japanese,
} as const;

/** Valid app slugs for route params */
export const APP_SLUGS = Object.keys(APP_SLUG_TO_NUMBER) as string[];

/**
 * Main app configuration array
 * Contains all app data including text, styling, and navigation
 * @param width - Screen width for responsive design
 * @param isJa - Whether to use Japanese or English text
 * @returns Array of app configurations
 */
export const myApp = (width: number, isJa: boolean) => [
  {
    app: "Home",
    appNumber: myAppNumber.home,
    folder: "appstudio",
    icon: "/images/appstudio/icon.png",
    text: {
      header: "Nakajima Masao App Studio",
      menu: isJa ? "ホーム": "Home",
      title: isJa ? "ホーム": "Home",
      message: [[""]],
      features: [[""]],
    },
    font: {
      header: undefined,
      menu: undefined,
      title: undefined,
      message: undefined,
    },
    size: {
      header: isJa ? 36: 44,
      menu: isJa ? 18: 20,
      title: isJa ? 36: 44,  
      subTitle: isJa ? 26: 32,
      message: undefined,
    },
    image: {
      pictures: "",
      features: [""],
      howtouse: "",
    },
    color: {
      header: "var(--black)",
      spHeader: "var(--black)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--white)",
      background: "var(--black)",
      title: "var(--white)",
      message: "var(--white)",
      features: "var(--black)",
      howtouse: "var(--black)",
    },
    link: {
      link: `${isJa ? "/ja": "/"}`,
      ios: "/",
      android: "/",
      youtube: "/",
    },
  },
  {
    app: "LETS ELEVATOR",
    appNumber: myAppNumber.elevator,
    folder: "elevator",
    icon: "/images/elevator/icon.png",
    text: {
      header: (width < 400) ? "LETS/ELEVATOR": "LETS ELEVATOR",
      menu: isJa ? "レッツ・エレベーター": "LETS ELEVATOR",
      title: isJa ? "レッツ・エレベーター": "LETS ELEVATOR",
      dlnumber: "100,000",
      message: isJa ? [
        ["大好きなエレベーター遊びが", "いつでも・どこでも"], 
        ["ボタン操作だけの ", "リアルなエレベーターアプリ"]
      ]: [
        ["Play with your favorite elevator ", "anytime, anywhere"],
        ["Realistic elevator with ", "only buttons operation"],
      ],
      features: isJa ? [
        ["あの『1000のボタン』で有名な", "島田電機製作所とコラボが実現！"],
        ["『1000のボタンモード』で", "うわさのボタンを押してみよう！"]
      ]: [
        ["Collaboration with Shimada Company", "famous for 1000 elevator buttons"],
        ["Try pressing the rumored buttons", "in '1000 Buttons Mode'!"]
      ],
    },
    font: {
      header: "cornerStone",
      menu: isJa ? undefined: "cornerStone",
      title: isJa ? undefined: "cornerStone",
      message: undefined,
    },
    size: {
      header: (width < 500) ? 36: 44,
      menu: isJa ? 18: 24,
      title: (isJa && (width < 500)) ? 30: isJa ? 32: 44,
      subTitle: isJa ? 26: 40,
      message: undefined,
    },
    image: {
      picture: "/images/elevator/pictures.png",
      features: [
        `/images/elevator/bignews/1000buttonsmode.png`,
        `/images/elevator/bignews/to1000buttonsmode_${isJa ? "ja": "en"}.png`,
        `/images/elevator/bignews/30schallenge_${isJa ? "ja": "en"}.png`,
        `/images/elevator/bignews/toReproduce1000buttons_${isJa ? "ja": "en"}.png`,
      ],
      howtouse: `/images/elevator/howtouse_${isJa ? "ja": "en"}.png`,
    },
    color: {
      header: "var(--lamp)",
      spHeader: "var(--dark)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--white)",
      background: "var(--dark)",
      title: "var(--white)",
      message: "var(--dark)",
      features: "linear-gradient(to bottom, var(--dark) 0%, var(--lamp) 100%)",
      howtouse: "var(--lamp)",
    },
    link: {
      link: `/elevator${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/lets-elevator/id1577024337`, 
      android: "https://play.google.com/store/apps/details?id=com.nakajimamasaoappstudio.letselevator",
      youtube: isJa ? "CQuYL0wG47E": "oMhqBiNHAtA",
    },
  },
  {
    app: "LETS ELEVATOR NEO",
    appNumber: myAppNumber.elevatorNeo,
    folder: "elevatorneo",
    icon: "/images/elevatorneo/icon.png",
    text: {
      header: (width < 400) ? "LETS/ELEVATOR": "LETS ELEVATOR",
      title: isJa ? "レッツ・エレベーター・ネオ": "LETS ELEVATOR NEO",
      menu: isJa ? "レッツ・エレベーター・ネオ": "LETS ELEVATOR NEO",
      dlnumber: "50,000",
      message: isJa ? [
        ["大好きなエレベーター遊びが", "いつでも・どこでも"], 
        ["話題の生成AIで作成された", "超リアルなエレベーターアプリ"]
      ]: [
        ["Play with your favorite elevator ", "anytime, anywhere"],
        ["Super realistic elevator sim app ", "powered by generative Al"],
      ],
      features: [[],[],[],[],[],],
    },
    font: {
      header: "cornerStone",
      menu: isJa ? undefined: "cornerStone",
      title: isJa ? undefined: "cornerStone",
      message: undefined,
    },
    size: {
      header: (width < 500) ? 36: 44,
      menu: isJa ? 18: 24,
      title: (isJa && (width < 500)) ? 26: isJa ? 32: 44,
      subTitle: isJa ? 26: 40,
      message: undefined,
    },
    image: {
      picture: `/images/elevatorneo/introduction_${isJa ? "ja": "en"}.png`,
      features: [
        `/images/elevatorneo/menu_${isJa ? "ja": "en"}.png`,
        `/images/elevatorneo/settings1_${isJa ? "ja": "en"}.png`,
        `/images/elevatorneo/settings2_${isJa ? "ja": "en"}.png`,
        `/images/elevatorneo/settings3_${isJa ? "ja": "en"}.png`,
        `/images/elevatorneo/settings4_${isJa ? "ja": "en"}.png`,
      ],
      howtouse: `/images/elevator/howtouse_${isJa ? "ja": "en"}.png`,
    },
    color: {
      header: "var(--dark)",
      spHeader: "var(--white)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--dark)",
      background: "var(--white)",
      title: "var(--dark)",
      message: "var(--dark)",
      features: "linear-gradient(to bottom, var(--white) 0%, var(--lamp) 100%)",
      howtouse: "var(--lamp)",
    },
    link: {
      link: `/elevatorneo${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/lets-elevator-neo/id6479341144`, 
      android: "https://play.google.com/store/apps/details?id=nakajimamasao.appstudio.letselevatorneo",
      youtube: isJa ? "CQuYL0wG47E": "oMhqBiNHAtA",
    },
  },
  {
    app: "LETS SIGNAL",
    appNumber: myAppNumber.signal,
    folder: "signal",
    icon: "/images/signal/icon.png",
    text: {
      header: "LETS SIGNAL",
      menu: isJa ? "レッツ・シン・ゴー": "LETS SIGNAL",
      title: isJa ? "レッツ・シン・ゴー": "LETS SIGNAL",
      dlnumber: "30,000",
      message: isJa ? [
        ["大好きな信号遊びが", "いつでも・どこでも"], 
        ["押しボタン操作だけの", "リアルな信号アプリ"]
      ]: [
        ["Play with your favorite signal", "anytime, anywhere"],
        ["Realistic signal with only", "push button operation"],
      ],
      features: isJa ? [
        ["4カ国・全7種類の歩行者信号が無料","プレミアムプランで車両信号も体験できる"],
      ]: [
        ["Free pedestrian signals: 4 countries, 7 types", "Vehicle signals available with the premium plan"]
      ],
    },
    font: {
      header: "beon",
      menu: "beon",
      title: isJa ? undefined: "beon",
      message: undefined,
    },
    size: {
      header: (width < 500) ? 36: 44,
      menu: isJa ? 18: 24,
      title: isJa ? 32: 40,
      subTitle: isJa ? 26: 40,  
      message: undefined,
    },
    image: {
      picture: `/images/signal/pictures_${isJa ? "ja": "en"}.png`,
      features: [`/images/signal/allsignals.png`],
      howtouse: `/images/signal/howtoUse_${isJa ? "ja": "en"}.png`,  
    },
    color: {
      header: "var(--signalGreen)",
      spHeader: "var(--dark)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--white)",
      background: "var(--dark)",
      title: "var(--white)",
      message: "var(--white)",      
      features: "linear-gradient(to bottom, var(--dark) 10%, var(--signalGreen) 70%)",
      howtouse: "var(--signalGreen)",
    },
    link: {
      link: `/signal${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/lets-signal/id1627839408`, 
      android: "https://play.google.com/store/apps/details?id=nakajimamasao.appstudio.signalbutton",
      youtube: "/",
    },
  },
  {
    app: "LETS CROSSING",
    appNumber: myAppNumber.crossing,
    folder: "crossing",
    icon: "/images/crossing/icon.png",
    text: {
      header: "LETS CROSSING",
      menu: isJa ? "レッツ・カンカン": "LETS CROSSING",
      title: isJa ? "レッツ・カンカン": "LETS CROSSING",
      dlnumber: "10,000",
      message: isJa ? [
        ["大好きな踏切遊びが", "いつでも・どこでも"], 
        ["話題の生成AIによる", "世界初！撮り鉄体験アプリ"],
      ]: [
        ["Play at your favorite railroad crossing ", "anytime, anywhere"],
        ["World's 1st train photo app ", "with cutting-edge generative AI"],
      ],
      features: isJa ? [
        ["4カ国の踏切が無料で体験できる"],
        ["リアルなAI撮り鉄画像がゲットできる", "毎日1枚無料・追加チケットも購入可能"],
      ]: [
        ["Free railroad crossing: 4 countries"],
        ["Get 1 free realistic AI train photo daily " , "with more available for purchase"],
      ],
    },
    font: {
      header: "cornerStone",
      menu: "cornerStone",
      title: isJa ? undefined: "cornerStone",
      message: undefined,
    },
    size: {
      header: (width < 500) ? 36: 44,
      menu: isJa ? 18: 24,
      title: isJa ? 32: 40,
      subTitle: isJa ? 26: 40,
      message: undefined,
    },
    image: {
      picture: `/images/crossing/pictures_${isJa ? "ja": "en"}.png`,
      features: [
        `/images/crossing/features_${isJa ? "ja": "en"}1.png`, 
        `/images/crossing/features_${isJa ? "ja": "en"}2.png`, 
      ],
      howtouse: "",  
    },
    color: {
      header: "var(--crossingRed)",
      spHeader: "var(--white)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--dark)",
      background: "var(--white)",
      title: "var(--dark)",
      message: "var(--dark)",      
      features: "linear-gradient(to bottom, var(--white) 0%, var(--crossingRed) 50%)",
      howtouse: "var(--dark)",
    },
    link: {
      link: `/crossing${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/lets-crossing/id6615077678`, 
      android: "https://play.google.com/store/apps/details?id=nakajimamasao.appstudio.railwaycrossing",
      youtube: "/",
    },
  },
  {
    app: "LETS TOILET",
    appNumber: myAppNumber.toilet,
    folder: "toilet",
    icon: "/images/toilet/icon.png",
    text: {
      header: "LETS TOILET",
      menu: isJa ? "レッツ・トイレ": "LETS TOILET",
      title: isJa ? "レッツ・トイレ": "LETS TOILET",
      dlnumber: "5,000",
      message: isJa ? [
        ["大好きなトイレ遊びが", "いつでも・どこでも"], 
        ["ボタン操作だけの", "リアルなトイレ"]
      ]: [
        ["Play with your favorite toilet", "anytime, anywhere"],
        ["Realistic toilet with only", "push button operation"],
      ],
      features: [[""]],
    },
    font: {
      header: "cornerStone",
      menu: "cornerStone",
      title: isJa ? undefined: "cornerStone",
      message: undefined,
    },
    size: {
      header: (width < 500) ? 36: 44,
      menu: isJa ? 18: 24,
      title: isJa ? 32: 44,
      subTitle: isJa ? 26: 40,  
      message: undefined,
    },
    image: {
      picture: `/images/toilet/pictures.png`,
      background: "/images/toilet/back.png", // 白い壁紙の背景画像
      features: [""],
      howtouse: `/images/toilet/howtouse_${isJa ? "ja": "en"}.png`,  
    },
    color: {
      header: "var(--toiletBlue)",
      spHeader: "var(--white)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--dark)",
      background: "var(--white)",
      title: "var(--dark)",
      message: "var(--dark)",
      features: "var(--dark)",
      howtouse: "var(--toiletBlue)",
    },
    link: {
      link: `/toilet${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/lets-toilet/id1604124583`, 
      android: "https://play.google.com/store/apps/details?id=nakajimamasao.appstudio.letswashlet",
      youtube: "/",
    },
  },
  {
    app: "Sweet Easy Pocket",
    appNumber: myAppNumber.allowance,
    folder: "allowance",
    icon: "/images/allowance/icon.png",
    text: {
      header: (isJa && width < 450) ? "かわいい/おこづかいちょう": isJa ? "かわいいおこづかいちょう": "Sweet Easy Pocket",
      menu: isJa ? "かわいいおこづかいちょう": "Sweet Easy Pocket",
      title: isJa ? "かわいいおこづかいちょう": "Sweet Easy Pocket",
      message: isJa ? [
        ["大人も子どもも使える", "かわいい簡単おこづかい帳アプリ"]
      ]: [
        ["helps manage", "your allowance easily", "Kawaii Allowance Tracker"]
      ],
      features: isJa ? [
        ["おこづかいとおかいものが","簡単に登録できる"],
        ["ログインすれば","データをバックアップもできる"]
      ]: [
        ["Easily register ", "pocket money and expenses"],
        ["Data can be backed up", "by logging in"]
      ],
    },
    font: {
      header: isJa ? "riipop": "pacifico",
      menu: isJa ? "riipop": "pacifico",
      title: isJa ? "riipop": "pacifico",
      message: isJa ? "riipop": "pacifico",
    },
    size: {
      header: (isJa && width < 400) ? 24: (isJa && width < 500) ? 28: isJa ? 30: 36,
      title: (isJa && width < 400) ? 24: (isJa && width < 500) ? 28: isJa ? 30: 36,
      subTitle: 28,
      message: (isJa && (width < 400)) ? 19: (width < 400) ? 22: 24,  
    },
    image: {
      picture: `/images/allowance/pictures_${isJa ? "ja": "en"}.png`,
      features: [
        `/images/allowance/features_${isJa ? "ja": "en"}1.png`, 
        `/images/allowance/features_${isJa ? "ja": "en"}2.png`,
      ],
      howtouse: "",  
    },
    color: {
      header: "var(--allowancePurple)",
      spHeader: "var(--allowancePurple)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--white)",
      background: "linear-gradient(to bottom right, #00FFFF 0%, #FF40FF 80%)",
      text: "var(--allowancePurple)",
      title: "var(--white)", 
      message: "var(--white)", 
      features: "var(--transp)",
      howtouse: "var(--transp)",
    },
    link: {
      link: `/allowance${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/sweet-easy-pocket/id6450860275`, 
      android: "https://play.google.com/store/apps/details?id=nakajimamasao.appstudio.allowancetracker",
      youtube: "/",
    },
  },
  {
    app: "My Transit Makers",
    appNumber: myAppNumber.transit,
    folder: "transit",
    icon: "/images/transit/icon.png",
    text: {
      header: (isJa && width < 450) ? "マイ乗換ルート/メーカー": isJa ? "マイ乗換ルートメーカー": "My Transit Makers",
      menu: isJa ? "マイ乗換ルートメーカー": "My Transit Makers",
      title: isJa ? "マイ乗換ルートメーカー": "My Transit Makers",
      message: isJa ? [[
        "毎日の通勤・通学を快適に"
      ]]: [[
        "Make your daily commute comfortable!"
      ]],
      features: isJa ? [[
        "出発までのカウントダウン","２ルートの同時比較","帰宅/外出のルート切替", "時刻表の自動生成"],
      ]: [[
        "Departure Countdown", "Dual Route Comparison", "Home/Out Route Toggle", "Auto generate timetable"],
      ],
    },
    font: {
      header: undefined,
      menu: undefined,
      title: undefined,
      message: undefined,
    },
    size: {
      header: (isJa && width < 450) ? 26: isJa ? 28: (width < 450) ? 28 :32,
      menu: isJa ? 18: 20,
      title: (isJa && width < 450) ? 26: isJa ? 28: (width < 450) ? 28 :32,
      subTitle: isJa ? 26: 32,
      message: 18,  
    },
    image: {
      picture: `/images/transit/pictures_ja.png`,
      features: [`/images/transit/screenshots1_ja.png`, `/images/transit/screenshots2_ja.png`],
      howtouse: ["/images/transit/howtouse1_ja.mp4", "/images/transit/howtouse2_ja.mp4", "/images/transit/howtouse3_ja.mp4"],  
    },
    color: {
      header: "var(--transitBlue)",
      spHeader: "var(--transitBlue)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--white)",
      background: "linear-gradient(to bottom, #3700B3, #03DAC5)",
      title: "var(--white)",
      message: "var(--white)",
      features: "var(--transp)",
      howtouse: "var(--transp)",
    },
    link: {
      link: `/transit${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/my-transit-makers/id1537219072`, 
      android: "https://play.google.com/store/apps/details?id=com.mytimetablemaker",
      youtube: "/",
    },
  },
  {
    app: "Study Phonics",
    appNumber: myAppNumber.phonics,
    folder: "phonics",
    icon: "/images/phonics/icon.png",
    text: {
      header: "Study Phonics",
      menu: "Study Phonics",
      title: `/images/phonics/title.png`,
      message: [[""]],
      features: isJa ? [["かわいいイラスト"],["きいて学べる"],["150たんごいじょう"]]: 
        [["Cute illustrations"],["Learn by listening"],["Over 150 words"]],
    },
    font: {
      header: isJa ? "kodomo": "riipop",  
      menu: isJa ? "kodomo": "riipop",  
      title: isJa ? "kodomo": "riipop",  
      message: isJa ? "kodomo": "riipop",
    },
    size: {
      header: (width < 400) ? 32: 36,
      menu: isJa ? 22: 20,
      title: 32,
      subTitle: 32,
      message: 24,  
    },
    image: {
      picture: `/images/phonics/pictures.png`,
      features: [`/images/phonics/screenshots.png`],
      howtouse: "",  
    },
    color: {
      header: "var(--enBlue)",
      spHeader: "var(--enBlue)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--white)",
      background: "linear-gradient(to bottom, #03A9F4 10%, #FF69B4 70%)",
      title: "var(--white)",
      message: "var(--white)",
      features: "var(--transp)",
      howtouse: "var(--enPink)",
    },
    link: {
      link: `/phonics${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/study-phonics/id1548240927`, 
      android: "https://play.google.com/store/apps/details?id=com.nakajimamasao.studyphonics",
      youtube: "/",
    },
  },
  {
    app: "Enjoy Japanese",
    appNumber: myAppNumber.japanese,
    folder: "japanese",
    icon: "/images/japanese/icon.png",
    text: {
      header: (isJa && width < 700) ? "たのしくまなぶ/ひらがな・カタカナ": isJa ? "たのしくまなぶ・ひらがな・カタカナ": "Enjoy Japanese",
      menu: isJa ? "ひらがな・カタカナ": "Enjoy Japanese",
      title: `/images/japanese/title.png`,
      message: [[""]],
      features: isJa ? [["かわいいイラスト"],["きいて学べる"],["180たんごいじょう"]]: 
        [["Cute illustrations"],["Learn by listening"],["Over 180 words"]],
    },
    font: {
      header: isJa ? "kodomo": "riipop",
      menu: isJa ? "kodomo": "riipop",  
      title: isJa ? "kodomo": "riipop",  
      message: isJa ? "kodomo": "riipop",
    },
    size: {
      header: (isJa && width < 400) ? 25: isJa ? 28: (width < 400) ? 28 :32,
      menu: isJa ? 22: 20,
      title: 32,
      subTitle: 32,
      message: 24,
    },
    image: {
      picture: `/images/japanese/pictures.png`,
      features: [`/images/japanese/screenshots.png`],
      howtouse: "",  
    },
    color: {
      header: "var(--jaBlue)",
      spHeader: "var(--jaBlue)",
      headerFg: "var(--white)",
      spHeaderFg: "var(--white)",
      background: "linear-gradient(to bottom, #0077FF 10%, #FFA500 70%)",
      title: "var(--white)",
      message: "var(--white)",
      features: "var(--transp)",
      howtouse: "var(--jaYellow)",
    },
    link: {
      link: `/japanese${isJa ? "/ja": ""}`,
      ios: `https://apps.apple.com/${isJa ? "jp": "us"}/app/enjoy-japanese/id1550720866`, 
      android: "https://play.google.com/store/apps/details?id=com.nakajimamasao.studyjpword",
      youtube: "/",
    },
  },
];

///Menu
export const myMenu = (isJa: boolean) => [
  {
    menuNumber: myMenuNumber.home,
    title: isJa ? "ホーム": "Home",
    link: `${isJa ? "/ja": "/"}`,
  },
  {
    menuNumber: myMenuNumber.terms,
    title: isJa ? "利用規約・プライバシーポリシー": "Terms & Privacy policy",
    link: `/terms${isJa ? "/ja": ""}`,  
  },
  {
    menuNumber: myMenuNumber.contact,
    title: isJa ? "お問い合わせ": "Contact",
    link: `/contact${isJa ? "/ja": ""}`,  
  },
];

///SNS
export const mySNS = [
  {
    title: "Github",
    image: `/images/sns/github_w.svg`,
    link: "https://www.github.com/fcb1899v",
  },
  {
    title: "Youtube",
    image: `/images/sns/youtube_w.svg`,
    link: "https://www.youtube.com/@letselevator5598",
  },
  {
    title: "Instagram",
    image: `/images/sns/instagram_w.svg`,
    link: "https://www.instagram.com/letselevator/",
  },
  {
    title: "X",
    image: `/images/sns/x_w.png`,
    link: "https://twitter.com/letselevator",
  },
  {
    title: "Shopping",
    image: `/images/sns/present_w.svg`,
    link: "https://letselevator.designstore.jp/",
  },
];

///App Store
export const myBadge = [
  {
    title: "appstore_badge", 
    image: "/images/button/appstore_badge.svg", 
  },
  {
    title: "googleplay_badge",
    image: "/images/button/googleplay_badge.png",
  },
];

///Contact
export const myForm = (isJa: boolean) => [
  {
    title: isJa ? "お問い合わせフォーム": "Contact Form",
    url: `https://docs.google.com/forms/d/${process.env.NEXT_PUBLIC_GOOGLE_FORM}/formResponse`,
    submit: isJa ? "送信": "Submit",
    label: {
      name: isJa ? "お名前": "Name",
      email: isJa ? "メールアドレス": "Email address",
      app: isJa ? "アプリ": "App",
      message: isJa ? "お問い合わせ内容": "Inquiry",
    },
    number: {
      name: "entry.1179215924", 
      email: "entry.21222962", 
      app: "entry.914237572",
      message: "entry.1423252519",
    },
    alert: {
      default: isJa ? "以下をご記入ください": "Please fill out the following",
      name: isJa ? 'お名前を入力してください': 'Enter your name',
      email: isJa ? 'メールアドレスを入力してください': 'Enter your email',
      invalid: isJa ? 'メールアドレスをご確認ください': 'Confirm your email address',
      app: isJa ? 'アプリを選択してください': 'Please select an app',
      message: isJa ? 'お問い合わせ内容を入力してください': 'enter your inquiry',
      success: isJa ? 'お問い合わせありがとうございました': 'Thank you for your inquiry',
      submit: isJa ? '送信ボタンを押してください': 'Press the submit button',
      confirm: isJa ? 'メールをご確認ください。\n確認メールが届かない場合はもう一度お問い合わせください。': "Check your email. \nContact us again, if you don't receive a confirmation email.",
      error: isJa ? 'メール送信エラー': 'Email sending error',
    }
  }
]

///Terms
export const termsCreatedDate = (isJa: boolean) => isJa ? "発行日：2023/08/01": "Effective Date: Aug. 1, 2023";
export const termsUpdatedDate = (isJa: boolean) => isJa ? "改訂日：2025/02/03": "Revised Date: Feb. 3, 2025";
export const termsLabel = (isJa: boolean) => isJa ? "利用規約": "Terms of Service";
export const termsTitle = (isJa: boolean) => isJa ? [
  "規約への同意",
  "アプリのライセンス付与および範囲",
  "アプリ内購入およびサブスクリプション",
  "変更およびアップデート",
  "保証の否認",
  "責任制限",
  "ユーザー行為",
  "外部サービスに関する免責",
  "広告、分析、およびデータ収集",
  "メールアドレスの収集",
  "AI画像生成サービスの利用",
  "データ使用料および費用",
  "知的財産権",
  "プライバシーおよび個人情報",
  "契約終了",
  "準拠法および紛争解決",
  "完全合意および可分性",
]: [
  "Acceptance of the Terms",
  "License Grant and Scope of the App",
  "In-App Purchases and Subscriptions",
  "Changes and Updates",
  "Disclaimer of Warranties",
  "Limitation of Liability",
  "User Conduct",
  "Disclaimer Regarding External Services",
  "Advertising, Analytics, and Data Collection",
  "Collection of Email Addresses",
  "Use of AI Image Generation Services",
  "Data Usage Fees and Costs",
  "Intellectual Property Rights",
  "Privacy and Personal Information",
  "Termination",
  "Governing Law and Dispute Resolution",
  "Entire Agreement and Severability",
]
export const termsMessage = (isJa: boolean) => isJa ? [
  "　本利用規約（以下「本規約」）は、当方が提供するアプリケーション（以下「本アプリ」）ならびに当方が提供するウェブサイト（以下「本サイト」）の利用を規定します。ユーザーが本アプリをダウンロード、インストール、または利用すること、もしくは本サイトを閲覧または利用することにより、本規約を読み、理解し、これに従うことに同意したものとみなされます。同意されない場合は、本アプリおよび本サイトをダウンロード、インストール、利用、または閲覧しないでください。",
  "　本アプリは販売されるのではなく、ライセンス付与されます。ユーザーが本規約に従うことを条件に、ユーザーは所有または管理する対応デバイス上で、個人的かつ非商用目的で本アプリを非譲渡的かつ非独占的に使用する権利を付与されます。適用されるストアの利用規約で認められる場合を除き、複数のデバイスからネットワーク経由で本アプリを利用可能にすることはできません。また、本アプリを賃貸、リース、貸与、販売、再配布、またはサブライセンスすることはできません。ユーザーは、法で明示的に許可される場合を除き、本アプリまたはそのアップデートをコピー、逆コンパイル、リバースエンジニアリング、逆アセンブル、ソースコードの抽出、改変、または派生物の作成を行ってはなりません。",
  "　本アプリ内の一部機能はアプリ内購入またはサブスクリプションを必要とする場合があります。これらの取引は、第三者サービスプロバイダーであるRevenueCatを通じて管理されます。購入またはサブスクライブすることにより、ユーザーは<RevenueCatの利用規約>に加えて、本規約にも従うことに同意します。すべての支払いはRevenueCatを通じて処理され、RevenueCatの利用規約の対象となります。",
  "　当方は、事前の通知なく、いつでも本アプリおよび本サイト（その機能やコンテンツを含む）の修正、中断、中止、またはアクセス制限を行う権利を有します。ユーザーは、当方が本アプリや本サイトを維持、サポート、更新、または改訂する義務を負わないことを了承します。",
  "　適用法で認められる最大限の範囲において、本アプリおよび本サイトは「現状有姿」かつ「提供可能な状態」で提供され、いかなる種類の保証も伴いません。当方は、明示または黙示であるかを問わず、本アプリおよび本サイトに関する商品性、特定目的適合性、正確性、信頼性、非侵害性など一切の保証を明示的に否認します。また、本アプリおよび本サイトがエラーなく、中断なく、安全に、または遅延・障害なしで機能することを保証しません。当方または当方の認定代表者による口頭または書面での情報や助言は、いかなる保証も生み出しません。",
  "　適用法で禁止されていない限り、当方はユーザーによる本アプリまたは本サイトの使用または使用不能に起因または関連する、逸失利益、データ損失、事業中断、その他の商業的損失を含む、間接的、付随的、特別、結果的、または懲罰的損害について、一切責任を負いません。これには、当方がそのような損害の可能性について知らされていた場合でも該当します。いかなる場合も、当方のユーザーに対する損害賠償責任総額は、合計5,000日本円を超えないものとします。",
  "　ユーザーは、本アプリおよび本サイトを適用法令および第三者の権利を侵害しない方法で利用し、他のユーザーや第三者を差別・誹謗中傷・脅迫・嫌がらせする行為、または公序良俗に反する行為を行ってはなりません。ユーザーは、本アプリおよび本サイトにおいて、不正アクセス、データの改ざん、プログラムの改変等の不正行為を行わないものとします。ユーザーが本条項に違反した場合、当方は通知なくユーザーの利用権を取り消すことができるものとします。",
  "　本アプリおよび本サイトは、第三者が運営するサービスやウェブサイト（以下「外部サービス」）へのアクセスまたは連携機能を提供する場合があります。当方は、外部サービスの内容や安全性、合法性、正確性を保証せず、ユーザーが外部サービスを利用または信頼することにより発生した損害や損失に対し、一切の責任を負いません。",
  "　当方は、Googleの各種外部サービス（Google Analytics、AdMob、Firebase など）や RevenueCat 等の外部ツールを利用して、個人を特定しない匿名化データを収集し、本アプリおよび本サイトの改善や広告配信の最適化を行います。また、ユーザーは、本アプリおよび本サイトを利用することにより、これら外部サービス上でのデータ保管ならびに匿名化データの収集に同意したものとみなされます。詳細は、<Googleの利用規約>および<RevenueCatの利用規約>をご参照ください。",  
  "　ユーザーは、ログイン時に、データバックアップ、ユーザーサポート、統計分析、調査、およびアプリ改善を目的としたマーケティング活動のためにメールアドレスを任意で提供できます。ユーザーのアカウントやアプリの利用情報等を保管する場合があります。メールアドレスの提供は任意であり、提供しない場合は一部の機能が利用できない可能性があります。本アプリは、Googleの外部サービスFirebase（Firestoreなど）を利用してデータバックアップをします。詳細は、<Googleの利用規約>をご参照ください。",
  "　当方は、Google Cloud（Vertex AIなど）や OpenAI（DALL·E 3など）などの外部サービスを利用して、ユーザーがリクエストした画像を生成する場合があります。生成される画像の正確性や合法性、著作権上の問題等について、当方は一切保証せず、ユーザーの入力プロンプトや生成データが当該外部サービスへ送信される可能性があることをご了承ください。詳細は、<Googleの利用規約>および<OpenAIの利用規約>をご参照ください。",
  "　本アプリをダウンロード、インストール、利用する際、または本サイトを閲覧する際に発生するデータ通信料やその他の費用は、すべてユーザーの負担となります。",
  "　本アプリおよび本サイトならびに関連コンテンツに関するすべての知的財産権は、当方または第三者のライセンサーが所有しています。無断での複製、改変、配布、公開は固く禁じられています。",
  "　当方は、本アプリおよび本サイトを通じて収集した個人情報を、当方のプライバシーポリシーおよび適用法令に従って取り扱います。法律で要求される場合またはユーザーの同意がある場合を除き、個人情報を第三者に開示することはありません。",
  "　本規約は、ユーザーまたは当方が終了するまで有効です。ユーザーが本規約に違反した場合、ユーザーの本アプリおよび本サイトの利用権は自動的に終了します。終了後、ユーザーは本アプリおよび本サイトの利用を直ちに停止し、すべてのコピーを削除する必要があります。",
  "　本規約およびその履行に起因または関連する紛争は、日本法に準拠します。いかなる紛争も、日本の東京地方裁判所を専属的な管轄裁判所として解決されるものとします。",
  "　本規約およびプライバシーポリシーは、本アプリおよび本サイトの利用に関するユーザーと当方との間の完全な合意を構成します。いずれかの条項が無効または法的強制力を欠くと判断された場合でも、他の条項は引き続き有効に存続します。",
]:[
  "These Terms of Service (hereinafter referred to as 'the Terms') govern the use of the application (hereinafter referred to as 'the App') and the website (hereinafter referred to as 'the Site') provided by us. By downloading, installing, or using the App, or by browsing or using the Site, users are deemed to have read, understood, and agreed to follow these Terms. If you do not agree with the Terms, please refrain from downloading, installing, using, or browsing the App or the Site.",
  "The App is licensed, not sold. Subject to your compliance with these Terms, you are granted a non-transferable and non-exclusive right to use the App on a device that you own or control, for personal and non-commercial purposes. Unless permitted by the applicable store's terms of service, the App may not be used across multiple devices over a network. You may not rent, lease, lend, sell, redistribute, or sublicense the App. Unless explicitly allowed by law, you may not copy, decompile, reverse engineer, disassemble, extract source code, modify, or create derivative works from the App or any updates to it.",
  "Certain features of the App may require in-app purchases or subscriptions. These transactions are managed through the third-party service provider, RevenueCat. By purchasing or subscribing, users agree to comply with both the <RevenueCat's terms of service> and privacy policy, as well as these Terms. All payments are processed through RevenueCat and are subject to RevenueCat's terms of service.",
  "We reserve the right, without prior notice, to modify, suspend, discontinue, or restrict access to the App and the Site (including any of their features or content) at any time. Users acknowledge that we are not obligated to maintain, support, update, or revise the App or the Site.",
  "To the maximum extent permitted by applicable law, the App and the Site are provided on an 'as is' and 'as available' basis, without any kind of warranty. We expressly disclaim all warranties, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, reliability, or non-infringement with respect to the App and the Site. We do not guarantee that the App or the Site will be error-free, uninterrupted, secure, or operate without delays or defects. Any oral or written information or advice provided by us or our authorized representatives does not create any warranty.",
  "As permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, loss of data, business interruption, or other commercial damages arising out of or in connection with your use or inability to use the App or the Site, even if we have been advised of the possibility of such damages. In any event, our total liability to any user for damages shall not exceed Japanese 5,000 yen in total.",
  "Users agree to use the App and the Site in a manner that does not violate applicable laws or infringe on the rights of third parties. Users shall not engage in acts of discrimination, defamation, threats, or harassment against other users or third parties, nor any acts contrary to public order and morals. Users also agree not to engage in unauthorized access, data tampering, or modification of programs within the App or the Site. If users violate these provisions, we may revoke their right to use the App or the Site without notice.",
  "The App and the Site may provide access to or integration with services or websites operated by third parties ('External Services'). We make no guarantees regarding the content, security, legality, or accuracy of such External Services, and we assume no responsibility for any damages or losses arising from your use of or reliance on these External Services.",
  "We use various external tools and services provided by Google (Google Analytics, AdMob, Firebase, etc.) and RevenueCat to collect anonymized, non-personally identifiable data in order to improve the App and the Site and optimize advertising distribution. By using the App and the Site, users are deemed to have consented to data storage and anonymized data collection through these external services. For details, please refer to <Google's terms of service> and <RevenueCat's terms of service>.",
  "Users may voluntarily provide their email address during login for purposes such as data backup, user support, statistical analysis, research, and marketing activities aimed at improving the App. We may also store account and usage information for the App. Providing an email address is optional, but failure to do so may limit access to certain features. The App uses external services such as Firebase (Firestore, etc.) for data backup. For more details, please refer to <Google's terms of service>.",
  "We may use external services such as Google Cloud (e.g., Vertex AI) or OpenAI (e.g., DALL·E 3) to generate images based on user requests. We do not guarantee the accuracy, legality, or compliance with intellectual property rights of the generated images, and users acknowledge that their input prompts and generated data may be transmitted to these external services. For details, please refer to <Google's terms of service> and <OpenAI's terms of service>.",
  "Users are responsible for any data communication fees or other costs that arise when they download, install, or use the App, or when they browse or use the Site.",
  "All intellectual property rights related to the App and the Site, as well as any related content, are owned by us or our licensors. Reproduction, modification, distribution, or publication without authorization is strictly prohibited.",
  "We handle personal information collected through the App and the Site in accordance with our Privacy Policy and applicable laws. Unless required by law or with the user's consent, we will not disclose personal information to third parties.",
  "These Terms remain in effect until terminated by either the user or us. If a user violates any of these Terms, their right to use the App and the Site will automatically terminate. After termination, users must immediately cease using the App and the Site and delete all copies.",
  "These Terms and any disputes arising out of or in connection with their performance shall be governed by the laws of Japan. All disputes shall be settled exclusively in the Tokyo District Court of Japan.",
  "These Terms and the Privacy Policy constitute the entire agreement between you and us regarding the use of the App and the Site. If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
]

///Privacy Policy
export const policyCreatedDate = (isJa: boolean) => isJa ? "発行日：2023/08/01": "Effective Date: Aug. 1, 2023";
export const policyUpdatedDate = (isJa: boolean) => isJa ? "改訂日：2025/02/03": "Revised Date: Feb. 3, 2025";
export const policyLabel = (isJa: boolean) => isJa ? "プライバシーポリシー": "Privacy Policy";
export const policyTitle = (isJa: boolean) => isJa ? [
  "データ管理およびセキュリティ",
  "個人情報の利用および開示",
  "広告、分析、およびデータ収集",
  "メールアドレスの収集",
  "AI画像生成におけるデータ送信",
  "ユーザーの権利",
  "クッキーおよび類似技術",
  "子供のプライバシー",
  "データ保持期間",
  "国際データ転送",
  "プライバシーポリシーの変更",
  "連絡先情報",
]: [
  "Data Management and Security",
  "Use and Disclosure of Personal Information",
  "Advertising, Analytics, and Data Collection",
  "Collection of Email Addresses",
  "Transmission of Data for AI Image Generation",
  "User Rights",
  "Cookies and Similar Technologies",
  "Children's Privacy",
  "Data Retention Period",
  "International Data Transfers",
  "Changes to This Privacy Policy",
  "Contact Information",
]
export const policyMessage = (isJa: boolean) => isJa ? [
  "　当方は、本アプリおよび本サイトを通じて取得したユーザーの個人情報・ログデータなどについて、不正アクセス、改ざん、漏洩、破壊などを防止するため、適切なセキュリティ対策を講じます。また、当方はこれらのデータを外部サービス上で保管する場合があります。",
  "　個人情報は、本規約に記載した目的および適用法に従ってのみ使用されます。法律で要求される場合を除き、またはユーザーの明示的な同意がない限り、個人情報を第三者に開示しません。",
  "　前述のとおり、当方はGoogleの各種外部サービス（Google Analytics、AdMob、Firebaseなど）、およびRevenueCatなどの第三者ツールを使用して匿名化データを収集し、本アプリおよび本サイトの改善や広告配信の最適化に利用します。RevenueCatはアプリ内購入およびサブスクリプションの管理を行い、これらの取引を円滑に進めるために一定のデータを収集する場合があります。詳細は<Googleのプライバシーポリシー>および<RevenueCatのプライバシーポリシー>をご参照ください。",
  "　当方は、ユーザーから提供されたメールアドレスおよびバックアップデータは、Googleが提供するFirebaseなどの外部サービスを用いて管理しています。これに伴い、データが海外のサーバーに保存される場合がありますが、当方は適切な契約上の保護措置を講じたうえで、ユーザーのデータを安全に取り扱うよう努めています。詳細は<Googleのプライバシーポリシー>をご参照ください。",
  "　当方は、ユーザーがリクエストした画像生成（Google Cloud の Vertex AI や OpenAI の DALL·E 3 など）を実行するために、入力されたテキスト（プロンプト）や関連情報をこれら外部サービスへ送信する場合があります。送信されるデータは、画像生成プロセスに必要な範囲に限られます。詳細は<Googleのプライバシーポリシー>および<OpenAIのプライバシーポリシー>をご参照ください。",
  "　ユーザーは、適用法令に従い、当方が保有するご自身の個人情報にアクセス、訂正、または削除を要求する権利を有します。お問い合わせは、問い合わせページよりご連絡ください。",
  "　当方は、本アプリおよび本サイトで、ユーザーエクスペリエンスの向上や分析目的、広告配信の最適化のためにクッキーや類似技術を使用する場合があります。ユーザーがクッキーの使用に同意しない場合、ブラウザの設定等でクッキーを無効にすることが可能ですが、その場合、一部の機能が制限される可能性があります。具体的なクッキーの種類や管理方法については、<クッキーポリシー>をご参照ください。",
  "　本アプリおよび本サイトは、13歳未満の子供から意図的に個人情報を収集することはありません。子供の個人情報が意図せず収集された場合、速やかに削除します。",
  "　本アプリおよび本サイトを通じて収集された個人情報は、本プライバシーポリシーに記載された目的を達成するために必要な期間のみ保持されます。法律で要求または許可される場合を除き、データは必要以上に長期間保持されることはありません。",
  "　当方が利用するサーバーや外部サービス（Google Cloud、OpenAI など）は日本国外に所在する場合があります。ユーザーは、本アプリおよび本サイトを利用することで、これらの国・地域へのデータ転送に同意したものとみなされます。当方は、これら外部サービスのプライバシー規定や適用法令の下で適切な保護措置を講じるよう努めています。",
  "　当方は、本プライバシーポリシーを随時更新する権利を有します。変更があった場合、アプリ内や本サイト上で通知いたします。ユーザーは、定期的にプライバシーポリシーを確認し、変更内容を理解することをお勧めします。プライバシーポリシーの変更後に本アプリおよび本サイトを継続して利用することは、改訂版プライバシーポリシーに同意したものとみなされます。",
  "　本プライバシーポリシーに関する質問、懸念、または要求がある場合は、お問い合わせページを通じてご連絡ください。",
]: [
  "We take appropriate security measures to protect the personal information, log data, and other user data obtained through the App and the Site from unauthorized access, alteration, leakage, destruction, and similar risks. We may store this data on external services.",
  "Personal information is used only for the purposes specified in these Terms and in accordance with applicable laws. Unless required by law or with the explicit consent of the user, personal information will not be disclosed to third parties.",
  "As mentioned above, we use various services from Google (Google Analytics, AdMob, Firebase, etc.) and third-party tools like RevenueCat to collect anonymized data, which helps improve the App and the Site and optimize advertising distribution. RevenueCat manages in-app purchases and subscriptions and may collect certain data to facilitate these transactions. For more details, please refer to <Google's privacy policies> and <RevenueCat's privacy policies>.",
  "We manage user-provided email addresses and backup data using external services such as Firebase (Firestore, etc.). Accordingly, data may be stored on servers located outside your country of residence. We take appropriate contractual and technological measures to ensure the security of such data. For more information, please refer to <Google's privacy policies>.",
  "We may send text prompts or relevant information provided by the user to external services such as Google Cloud's Vertex AI or OpenAI's DALL·E 3 in order to generate requested images. Only the data necessary for the image generation process is transmitted, but such data is handled in accordance with the terms of service and privacy policies of the respective external services. For details on data retention and deletion, please refer to <Google's privacy policies> and <RevenueCat's privacy policies>.",
  "In accordance with applicable laws, users have the right to access, correct, or request deletion of their personal information held by us. Please contact us through the inquiry page if you wish to exercise these rights.",
  "We may use cookies and similar technologies in the App and on the Site to enhance user experience, analyze usage, and optimize advertising. If you do not consent to the use of cookies, you may disable them in your browser settings; however, doing so may limit certain functions. For details on the types of cookies and how to manage them, please refer to the <Cookie Policy> below.",
  "We do not knowingly collect personal information from children under the age of 13. If we become aware that such information has been collected inadvertently, we will promptly delete it.",
  "We retain personal information collected through the App and the Site only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless otherwise required or permitted by law. Data that is no longer needed will be deleted or anonymized in a timely manner.",
  "The servers and external services (such as Google Cloud and OpenAI) we use may be located outside of your country of residence. By using the App or the Site, you consent to the transfer of data to such countries or regions. We strive to ensure appropriate safeguards in compliance with the data protection regulations and privacy policies of these external services.",
  "We reserve the right to update this Privacy Policy from time to time. Should there be any changes, we will notify users within the App or on the Site. We recommend periodically reviewing this Privacy Policy to stay informed of any updates. By continuing to use the App or the Site after changes are made, you are deemed to have accepted the revised Privacy Policy.",
  "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us through the inquiry page on the Site.",
]

///Cookie Policy
export const cookieCreatedDate = (isJa: boolean) => isJa ? "発行日：2025/02/01": "Effective Date: Feb. 1, 2025";
export const cookieUpdatedDate = (isJa: boolean) => isJa ? "改訂日：2025/02/03": "Revised Date: Feb. 3, 2025";
export const cookieLabel = (isJa: boolean) => isJa ? "クッキーポリシー": "Cookie Policy";
export const cookieTitle = (isJa: boolean) => isJa ? [
  "クッキーとは",
  "クッキーの種類",
  "クッキーの管理方法",
  "サードパーティクッキー",
  "クッキーの保存期間",
  "同意の撤回",
  "クッキーポリシーの変更",
]: [
  "What Are Cookies?",
  "Types of Cookies",
  "Managing Cookies",
  "Third-Party Cookies",
  "Cookie Retention Period",
  "Withdrawal of Consent",
  "Changes to the Cookie Policy",
]
export const cookieMessage = (isJa: boolean) => isJa ? [
  "　当サイトは、クッキーや類似技術を使用して、パーソナライズされた広告を表示し、ユーザーの体験を向上させています。クッキーとは、ウェブサイトが効率的に機能し、ユーザーの設定を記憶し、ターゲットコンテンツを提供するために使用するデバイスに保存される小さなテキストファイルです。このデータは氏名や生年月日など、利用者個人を特定・追跡するものではありませんクッキーとは、ユーザーがウェブサイトを訪問した際にブラウザ上に保存される小さなテキストファイルです。クッキーはユーザーのデバイスを識別したり、サイトの利用状況や設定を記憶するなどの目的に使用されます。",
  "　当サイトは、以下のクッキーを使用します。１）必須クッキー（サイトやアプリの基本機能を提供するために必要なクッキー）、２）分析クッキー（Google Analytics などを用いて、本アプリおよび本サイトの利用状況を統計的に分析するクッキー）、３）広告クッキー（AdMob などの広告サービスによる、ユーザーの興味・行動に基づいた広告配信や最適化するクッキー）、４）機能性クッキー（言語設定や地域設定など、ユーザーの選択を記憶し、よりパーソナライズされた機能を提供するクッキー）",
  "　ユーザーはブラウザ設定により、クッキーの受け取りを拒否したり、クッキーが保存される前に警告を表示するよう変更できます。ただし、必須クッキーを拒否すると、一部の機能が正常に利用できない可能性があります。",
  "　当サイトは、Googleの各種外部サービス（Google Analytics、AdMob、Firebaseなど）などの外部サービスを利用する場合があります。これらサービスは独自にクッキーを設定し、サイトやアプリの利用状況の解析や広告の最適化を行います。詳細は<Googleのクッキーポリシー>をご確認ください。",
  "　クッキーの保存期間は、その種類や目的によって異なります。セッション終了時に削除されるものもあれば、長期間ブラウザに保存され続けるものもあります。当方は、利用目的に合致する必要最小限の期間でクッキーを管理しています。",
  "　ユーザーはブラウザ設定等を変更することにより、クッキー使用に関する同意をいつでも撤回できます。ただし、同意撤回後も、すでに蓄積されているクッキーが直ちに削除されるわけではありません。必要に応じてブラウザのクッキーを手動で削除することも可能です。",
  "　当方は、本ポリシーを必要に応じて変更する権利を有します。重要な変更がある場合は、本サイト上またはアプリ内で告知します。変更後も継続して本アプリ・本サイトを利用する場合、改訂版クッキーポリシーに同意したものとみなされます。",
]:[
  "This Site uses cookies and similar technologies to display personalized advertisements and improve user experience. A cookie is a small text file stored on your device to enable efficient website functionality, remember user preferences, and serve targeted content. Cookies do not contain personally identifiable information such as names, birthdates, or any other data that can be used to personally identify individual users.",
  "Our Site uses the following types of cookies. 1) Essential Cookies: Necessary for providing the basic functionality of the Site or App. 2) Analytics Cookies: Used (e.g., by Google Analytics) to statistically analyze App and Site usage. 3) Advertising Cookies: Used by ad services (e.g., AdMob) to deliver and optimize ads based on user interests or behavior. 4) Functionality Cookies: Remember user selections such as language or region to offer a more personalized experience.",
  "You can configure your browser to refuse cookies or to alert you before cookies are saved. However, disabling essential cookies may result in certain features not functioning properly.",
  "We may use external services such as Google's services (Google Analytics, AdMob, Firebase, etc.) which independently set cookies to analyze usage of the Site or App and optimize ads. For more details, please refer to <Google's cookie policies>.",
  "The duration for which cookies remain stored varies based on their type and purpose. Some are deleted at the end of a session, while others may remain in your browser for a longer period. We manage cookies for the minimum necessary duration consistent with their intended use.",
  "You can withdraw your consent to the use of cookies at any time by adjusting your browser settings. Note that withdrawing consent does not automatically delete cookies already accumulated. You may need to delete them manually from your browser.",
  "We reserve the right to modify this policy as needed. If significant changes occur, we will provide notice on the Site or within the App. By continuing to use the App or the Site after changes are made, you are deemed to have agreed to the revised Cookie Policy.",
]
export const cookieConsentMessage = (isJa: boolean) => isJa ? [
  "当サイトでは、パーソナライズされた広告の提供、トラフィックの分析、そしてお客様の体験向上のためにクッキーを使用します。",
  "「OK」を選択してクッキーの使用を許可してください。詳細については、",
  "をご覧ください。"
]: [
  'This site uses cookies to improve your experience, serve personalized ads, and analyze traffic.',
  'Please select "OK" to allow the use of these cookies. For more details, please see the ',
  '.'
];
export const termsLinkWords = (isJa: boolean) => [
  { word: (isJa) ? '<Googleの利用規約>': "<Google's terms of service>", href: 'https://policies.google.com/terms' },
  { word: (isJa) ? '<RevenueCatの利用規約>': "<RevenueCat's terms of service>", href: 'https://www.revenuecat.com/terms/' },
  { word: (isJa) ? '<OpenAIの利用規約>': "<OpenAI's terms of service>", href: 'https://openai.com/policies/terms-of-use/'},
  { word: (isJa) ? '<利用規約>': '<Terms of Service>', href: '#terms' },
  { word: (isJa) ? '<プライバシーポリシー>': '<Privacy Policy>', href: '#policy' },
  { word: (isJa) ? '<クッキーポリシー>': '<Cookie Policy>', href: '#cookie' },
];
export const privacyLinkWords = (isJa: boolean) => [
  { word: (isJa) ? '<Googleのプライバシーポリシー>': "<Google's privacy policies>", href: 'https://policies.google.com/privacy' },
  { word: (isJa) ? '<RevenueCatのプライバシーポリシー>': "<RevenueCat's privacy policies>", href: 'https://www.revenuecat.com/privacy/' },
  { word: (isJa) ? '<OpenAIのプライバシーポリシー>': "<OpenAI's privacy policies>", href: 'https://openai.com/policies/row-privacy-policy/' },
  { word: (isJa) ? '<利用規約>': '<Terms of Service>', href: '#terms' },
  { word: (isJa) ? '<プライバシーポリシー>': '<Privacy Policy>', href: '/policy' },
  { word: (isJa) ? '<クッキーポリシー>': '<Cookie Policy>', href: '#cookie' },
];
export const cookieLinkWords = (isJa: boolean) => [
  { word: (isJa) ? '<Googleのクッキーポリシー>': "<Google's cookie policies>" , href: 'https://policies.google.com/technologies/cookies' },
  { word: (isJa) ? '<利用規約>': '<Terms of Service>', href: '#terms' },
  { word: (isJa) ? '<プライバシーポリシー>': '<Privacy Policy>', href: '/policy' },
  { word: (isJa) ? '<クッキーポリシー>': '<Cookie Policy>', href: '#cookie' },
];
export const cookiePolicyLink = (isJa: boolean) => `/terms${isJa ? '/ja': ''}/#cookie`;