// 利用可能な音声を確認する関数
export const showAvailableVoices = () => {
  if (!('SpeechSynthesisUtterance' in window)) {
    alert('Speech synthesis(音声合成) APIには未対応です.');
    return;
  }
  
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const japaneseVoices = voices.filter(voice => voice.lang.startsWith('ja'));
  
  let message = '利用可能な日本語音声:\n';
  japaneseVoices.forEach((voice, index) => {
    message += `${index}: ${voice.name} (${voice.lang})\n`;
  });
  
  alert(message);
};

// 特定の音声でテストする関数
export const testSpecificVoice = (voiceName: string, text: string = 'こんにちは、これはテスト音声です。') => {
  if (!('SpeechSynthesisUtterance' in window)) {
    alert('Speech synthesis(音声合成) APIには未対応です.');
    return;
  }
  
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const targetVoice = voices.find(voice => voice.name.includes(voiceName) && voice.lang.startsWith('ja'));
  
  if (targetVoice) {
    const msg = new SpeechSynthesisUtterance();
    msg.voice = targetVoice;
    msg.lang = targetVoice.lang;
    msg.text = text;
    msg.volume = 1;
    msg.rate = 0.8;
    msg.pitch = 1.0;
    
    alert(`テスト音声: ${targetVoice.name} (${targetVoice.lang})`);
    speechSynthesis.speak(msg);
  } else {
    alert(`音声 "${voiceName}" が見つかりませんでした。`);
  }
};

// 音声テスト用の関数
export const testVoice = (voiceIndex: number, text: string = 'こんにちは、これはテスト音声です。') => {
  if (!('SpeechSynthesisUtterance' in window)) {
    alert('Speech synthesis(音声合成) APIには未対応です.');
    return;
  }
  
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  
  if (voiceIndex >= 0 && voiceIndex < voices.length) {
    const voice = voices[voiceIndex];
    const msg = new SpeechSynthesisUtterance();
    msg.voice = voice;
    msg.lang = voice.lang;
    msg.text = text;
    msg.volume = 1;
    msg.rate = 0.8;
    msg.pitch = 1.0;
    
    speechSynthesis.speak(msg);
  } else {
    // 無効な音声インデックス
  }
};

export const speechWord = (words: string[], isPhonics: boolean, isFirst: boolean) => {
  if (!('SpeechSynthesisUtterance' in window)) {
    alert('Speech synthesis(音声合成) APIには未対応です.');
    return;
  }  
  const synth = window.speechSynthesis;
  
  // 音声の初期化を確実にする
  const initVoices = () => {
    const voices = synth.getVoices();
    const filteredVoices = voices.filter(voice => voice.lang.startsWith(isPhonics ? 'en': 'ja'));
    if (filteredVoices.length == 0) {
      alert('英語の音声が利用できません。');
      return null;
    }

    // より自然な音声を優先（日本語の場合は特に高品質な音声を優先）
    const preferredVoiceKeywords = isPhonics ? 
      ['Female', 'Zira', 'Google US English', 'Emma', 'Samantha']:
      ['Google 日本語', 'Microsoft Haruka', 'Microsoft Sayaka', 'Kyoko', '女性', 'Haruka', 'Sayaka'];
  

    const preferredVoices = voices.filter(voice => {
      return preferredVoiceKeywords.some(keyword => voice.name.includes(keyword)) && voice.lang.startsWith(isPhonics ? 'en': 'ja');
    });

    const selectedVoice = preferredVoices.length > 0 ? preferredVoices[0] : filteredVoices[0];
    return selectedVoice;
  };

  const speakWithSettings = (selectedVoice: SpeechSynthesisVoice) => {
    const msg = new SpeechSynthesisUtterance();
    msg.voice = selectedVoice;
    msg.lang = selectedVoice.lang;
    msg.text = isFirst ? `${words[0]}${words[1]}${words[2]}`: `${words[3]}${words[4]}${words[5]}`;
    msg.volume = 1;
    
    // 日本語の場合はより自然な設定
    if (!isPhonics) {
      msg.rate = 0.8; // よりゆっくりと
      msg.pitch = 1.0; // 自然な音程
    } else {
      msg.rate = 0.8;
      msg.pitch = 1;
    }
    
    speechSynthesis.speak(msg);
  };

  // 音声が読み込まれていない場合は待機
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => {
      const selectedVoice = initVoices();
      if (selectedVoice) {
        speakWithSettings(selectedVoice);
      }
    };
  } else {
    const selectedVoice = initVoices();
    if (selectedVoice) {
      speakWithSettings(selectedVoice);
    }
  }
}

export const shuffle = (array: string[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

export const hiraganaToKatakana = (text: string) => {
  return text.replace(/[\u3042-\u3093]/g, m => String.fromCharCode(m.charCodeAt(0) + 96));
};

export const defaultCharList = (isPhonics: boolean) => (isPhonics) ? [
    "a", "a'", "b", "c", "c'", "d", "e", "f", "g", "g'", "h",
    "i", "i'", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "s'", "t", "u", "v", "w", "x", "y", "z",
    "er", "ir", "or", "ur", "ear'", "ie", "igh", "-y", "_i_e", "ou", "ow",
    "ēē", "ēā", "īē", "ey", "_e_e", "eer", "ear",
    "ue", "ui", "ew", "ōō", "ōū", "_u_e", "oo",
    "ai", "ay", "_a_e", "air", "ea",
    "au", "aw", "our", "oy", "oa", "ōw", "all",
    "ph", "ch", "sh", "th", "th'", "wh", "ck", "ng", "lly"
  ]: [
    "あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ",
    "わ", "ん", "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ",
    "だ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
    "きゃ", "きゅ", "きょ", "しゃ", "しゅ", "しょ", "ちゃ", "ちゅ", "ちょ", "ひょ", "りゅ",
    // "にゃ", "にゅ", "にょ", "ひゃ", "ひゅ", "みゃ", "みゅ", "みょ", "りゃ", "りょ", "ぎゃ",
    "ぎゅ", "ぎょ", "じゃ", "じゅ", "じょ", "びょ",
    // "びゃ", "びゅ", "ぴゃ", "ぴゅ", "ぴょ",
];

export const defaultFirstChar = (isPhonics: boolean) => isPhonics ? "a": "あ";
export const defaultSecondChar = () => hiraganaToKatakana("あ");
export const defaultWords = (isPhonics: boolean) => isPhonics ? 
    ["", "a", "pple", "", "a", "nt"]: 
    ["", "あ", "ひる", "", "ア", "イスクリーム"];
export const defaultImages = (isPhonics: boolean) => isPhonics ? 
    ["/images/phonics/images/apple.png", "/images/phonics/images/ant.png"]: 
    ["/images/japanese/images/ahiru.png", "/images/japanese/images/aisukurimu.png"];

export function getWords(char: string) {
    switch (char) {
      case "あ": return ["", "あ", "ひる", "", "ア", "イスクリーム"];
      case "い": return ["", "い", "ちご", "", "イ", "ルカ"];
      case "う": return ["", "う", "どん", "", "ウ", "サギ"];
      case "え": return ["", "え", "んぴつ", "", "エ", "レベーター"];
      case "お": return ["", "お", "たまじゃくし", "", "オ", "ムライス"];
      case "か": return ["", "か", "さ", "", "カ", "ブトムシ"];
      case "き": return ["", "き", "つね", "", "キ", "ウイ"];
      case "く": return ["", "く", "じら", "", "ク", "ッキー"];
      case "け": return ["", "け", "しゴム", "", "ケ", "ーキ"];
      case "こ": return ["", "こ", "うもり", "", "コ", "ーヒー"];
      case "さ": return ["", "さ", "つまいも", "", "サ", "メ"];
      case "し": return ["", "し", "んごう", "", "シ", "マウマ"];
      case "す": return ["", "す", "ずめ", "", "ス", "イカ"];
      case "せ": return ["", "せ", "いざ", "", "セ", "ーター"];
      case "そ": return ["", "そ", "ば", "", "ソ", "フトクリーム"];
      case "た": return ["", "た", "いよう", "", "タ", "ヌキ"];
      case "ち": return ["", "ち", "きゅう", "", "チ", "ーズ"];
      case "つ": return ["", "つ", "くし", "", "ツ", "バメ"];
      case "て": return ["", "て", "んとうむし", "", "テ", "ィッシュ"];
      case "と": return ["", "と", "ら", "", "ト", "マト"];
      case "な": return ["", "な", "っとう", "", "ナ", "マズ"];
      case "に": return ["", "に", "じ", "", "ニ", "ンジン"];
      case "ぬ": return ["", "ぬ", "のマスク", "イ", "ヌ", ""];
      case "ね": return ["", "ね", "こ", "", "ネ", "ギ"];
      case "の": return ["", "の", "りまき", "", "ノ", "ート"];
      case "は": return ["", "は", "さみ", "", "ハ", "ンバーガー"];
      case "ひ": return ["", "ひ", "こうき", "", "ヒ", "ツジ"];
      case "ふ": return ["", "ふ", "じさん", "", "フ", "クロウ"];
      case "へ": return ["", "へ", "び", "", "へ", "リコプター"];
      case "ほ": return ["", "ほ", "うれんそう", "", "ホ", "タル"];
      case "ま": return ["", "ま", "ぐろ", "", "マ", "ンゴー"];
      case "み": return ["", "み", "かん", "", "ミ", "ツバチ"];
      case "む": return ["", "む", "しば", "", "ム", "カデ"];
      case "め": return ["", "め", "だか", "", "メ", "ロン"];
      case "も": return ["", "も", "も", "", "モ", "グラ"];
      case "や": return ["", "や", "かん", "", "ヤ", "キソバ"];
      case "ゆ": return ["", "ゆ", "きだるま", "", "ユ", "リ"];
      case "よ": return ["", "よ", "せなべ", "", "ヨ", "ット"];
      case "ら": return ["", "ら", "くだ", "", "ラ", "ムネ"];
      case "り": return ["", "り", "んご", "", "リ", "ス"];
      case "る": return ["かえ", "る", "", "", "ル", "ーペ"];
      case "れ": return ["", "れ", "んこん", "", "レ", "ストラン"];
      case "ろ": return ["", "ろ", "うそく", "", "ロ", "ケット"];
      case "わ": return ["", "わ", "かめ", "", "ワ", "ニ"];
      case "ん": return ["しんかんせ", "ん", "", "キリ", "ン", ""];
      case "が": return ["", "が", "っこう", "", "ガ", "ムテープ"];
      case "ぎ": return ["", "ぎ", "んこう", "", "ギ", "ター"];
      case "ぐ": return ["", "ぐ", "んて", "", "グ", "レープフルーツ"];
      case "げ": return ["", "げ", "んごろう", "", "ゲ", "ーム"];
      case "ご": return ["", "ご", "ぼう", "", "ゴ", "リラ"];
      case "ざ": return ["", "ざ", "くろ", "", "ザ", "リガニ"];
      case "じ": return ["", "じ", "んじゃ", "", "ジ", "ェットコースター"];
      case "ず": return ["", "ず", "んだもち", "", "ズ", "ッキーニ"];
      case "ぜ": return ["", "ぜ", "んざい", "", "ゼ", "リー"];
      case "ぞ": return ["", "ぞ", "うに", "", "ゾ", "ウ"];
      case "だ": return ["", "だ", "いぶつ", "", "ダ", "チョウ"];
      case "づ": return ["みか", "づ", "き", "オリ", "ヅ", "ル"];
      case "で": return ["", "で", "んしゃ", "", "デ", "ィスプレイ"];
      case "ど": return ["", "ど", "んぐり", "", "ド", "ーナツ"];
      case "ば": return ["", "ば", "ら", "", "バ", "イク"];
      case "び": return ["", "び", "わ", "", "ビ", "ル"];
      case "ぶ": return ["", "ぶ", "どう", "", "ブ", "タ"];
      case "べ": return ["お", "べ", "んとう", "", "べ", "スト"];
      case "ぼ": return ["あかとん", "ぼ", "", "", "ボ", "ール"];
      case "ぱ": return ["かっ", "ぱ", "", "", "パ", "ンダ"];
      case "ぴ": return ["はっ", "ぴ", "", "", "ピ", "ザ"];
      case "ぷ": return ["おん", "ぷ", "", "", "プ", "リン"];
      case "ぺ": return ["", "ぺ", "んぎん", "", "ペ", "ットボトル"];
      case "ぽ": return ["きりたん", "ぽ", "なべ", "", "ポ", "ット"];
      case "きゃ": return ["", "きゃ", "べつ", "", "キャ", "ンプファイヤー"];
      case "きゅ": return ["", "きゅ", "うきゅうしゃ", "", "キュ", "ウリ"];
      case "きょ": return ["", "きょ", "うりゅう", "ラッ", "キョ", "ウ"];
      case "しゃ": return ["", "しゃ", "ち", "", "シャ", "ツ"];
      case "しゅ": return ["", "しゅ", "りけん", "", "シュ", "ーマイ"];
      case "しょ": return ["", "しょ", "くパン", "", "ショ", "ッピングモール"];
      case "ちゃ": return ["あか", "ちゃ", "ん", "ガチャガ", "チャ", ""];
      case "ちゅ": return ["", "ちゅ", "うしゃ", "", "チュ", "ーリップ"];
      case "ちょ": return ["", "ちょ", "うちょ", "", "チョ", "コレート"];
      case "ひょ": return ["", "ひょ", "うたん", "", "ヒョ", "ウ"];
      case "りゅ": return ["", "りゅ", "う", "", "リュ", "ック"];
      case "ぎゅ": return ["", "ぎゅ", "うどん", "フィ", "ギュ", "アスケート"];
      case "ぎょ": return ["きん", "ぎょ", "", "", "ギョ", "ーザ"];
      case "じゃ": return ["", "じゃ", "んけん", "", "ジャ", "ガイモ"];
      case "じゅ": return ["もみじまん", "じゅ", "う", "", "ジュ", "ース"];
      case "じょ": return ["", "じょ", "うききかんしゃ", "", "ジョ", "ウロ"];
      case "びょ": return ["", "びょ", "ういん", "ガ", "ビョ", "ウ"];
      case "a": return ["", "a", "pple", "", "a", "nt"];              //[ア]と[エ]の中間
      case "a'": return ["", "a", "corn", "", "a", "ngelfish"];       //[エイ]
      case "b": return ["", "b", "anana", "", "b", "ee"];             //[ブッ]
      case "c": return ["", "c", "innamon roll", "", "c", "icada"];   //[ス]:1
      case "c'": return ["", "c", "orn", "", "c", "at"];              //[クッ]
      case "d": return ["", "d", "onut", "", "d", "og"];              //[ドッ]
      case "e": return ["", "e", "gg", "", "e", "lephant"];           //[エ]
      case "f": return ["", "f", "lower", "", "f", "rog"];            //[フ]
      case "g": return ["", "g", "inger", "", "g", "iraffe"];         //[ジュッ]
      case "g'": return ["", "g", "rapes", "", "g", "orilla"];        //[グッ]
      case "h": return ["", "h", "amburger", "", "h", "orse"];        //[ハ]
      case "i": return ["", "i", "ndoor shoes", "", "i", "njector"];  //[アイ]
      case "i'": return ["", "i", "ce cream", "", "i", "sland"];      //[イ]と[エ]の中間:1
      case "j": return ["", "j", "uice", "", "j", "ellyfish"];        //[ジュッ]
      case "k": return ["", "k", "iwi", "", "k", "oala"];             //[クッ]
      case "l": return ["", "l", "emon", "", "l", "ion"];             //[ウッ]
      case "m": return ["", "m", "ango", "", "m", "antis"];           //[ム]
      case "n": return ["", "n", "ut", "", "n", "eedle"];             //[ン]
      case "o": return ["", "o", "range", "", "o", "strich"];         //[ア]と[オ]の中間
      case "p": return ["", "p", "ineapple", "", "p", "ig"];          //[プッ]
      case "q": return ["", "q", "uestion", "", "q", "uilt"];         //[クワッ]:2
      case "r": return ["", "r", "abbit", "", "r", "ainbow"];         //[ウルッ]
      case "s": return ["", "s", "weet potato", "", "s", "quirrel"];  //[ス]
      case "s'": return ["televi", "s", "ion", "chee", "s", "e"];     //[ズ]
      case "t": return ["", "t", "omato", "", "t", "iger"];           //[トッ]
      case "u": return ["", "u", "mbrella", "", "u", "p"];            //[ア] 
      case "v": return ["", "v", "egetables", "", "v", "est"];        //[ヴ]
      case "w": return ["", "w", "atermelon", "", "w", "itch"];       //[ウッ]
      case "x": return ["", "x", "ylophone", "fo", "x", ""];          //[クス]
      case "y": return ["", "y", "ogurt", "", "y", "acht"];           //[ィヤ] 
      case "z": return ["", "z", "ebra", "", "z", "ero"];             //[ズ] 
      //[アー]
      case "er": return ["hamst","er","", "cucumb","er",""];
      case "ir": return ["g","ir","l", "t-sh","ir","t"];
      case "or": return ["elevat","or","", "escalat","or",""];
      case "ur": return ["t","ur","tle", "b","ur","dock"];
      case "ear'": return ["","ear","th", "h","ear","t"];
      //[アィ]
      case "ie": return ["meat p","ie","", "neck t","ie",""];
      case "igh": return ["traffic l","igh","t", "e","igh","t"];
      case "-y": return ["cherr","y","", "butterfl","y",""];
      case "_i_e": return ["", "fire"," engine", "","nine",""];
      //[アゥ]
      case "ou": return ["m","ou","se", "h","ou","se"];
      case "ow": return ["c","ow","", "t","ow","er"];
      //[イー]
      case "ēē": return ["b","ee","tle", "coff","ee",""];
      case "ēā": return ["p","ea","ch", "","ea","gle"];
      case "īē": return ["cook","ie","", "zomb","ie",""];
      case "ey": return ["hon","ey","", "monk","ey",""];
      case "_e_e": return ["centi","pede","", "conc","rete",""]; 
      //[イァ]
      case "eer": return ["d","eer","", "b","eer",""];
      case "ear": return ["","ear","", "g","ear",""]; 
      //[ウー]
      case "ue": return ["bl","ue","berry", "tiss","ue",""];
      case "ui": return ["passion fr","ui","t", "s","ui","t"];
      case "ew": return ["st","ew","", "n","ew","spaper"]; 
      case "ōō": return ["bad t","oo","th", "kangar","oo",""];
      case "ōū": return ["s","ou","p", "r","ou","ge"];
      case "_u_e": return ["per","fume","", "sugar ","cube",""]; 
      //[ウッ]
      case "oo": return ["g","oo","d", "b","oo","kstore"];
      //[エィ]:1
      case "ai": return ["tr","ai","n", "sn","ai","l"];
      case "ay": return ["ok","ay","", "manta r","ay",""]; 
      case "_a_e": return ["","cake","", "s","nake",""];
      //[エァ]
      case "air": return ["","air","plane", "h","air","dryer"];
      //[エ]:1
      case "ea": return ["br","ea","d", "f","ea","ther"];
      //[オー]:4
      case "au": return ["Santa Cl","au","s", "s","au","sage"];
      case "aw": return ["str","aw","berry", "see s","aw",""];
      case "our": return ["c","our","t", "f","our",""]; 
      //[オィ]
      case "oy": return ["b","oy","", "s","oy","beans"];
      //[オゥ]:2
      case "oa": return ["g","oa","t", "t","oa","st"];
      case "ōw": return ["sn","ow","man", "","ow","l"];
      case "_o_e": return ["","rose","", "tad","pole",""];
      //[オーゥ]:2
      case "all": return ["b","all","", "m","all",""];
      //[フ]:
      case "ph": return ["dol","ph","in", "smart","ph","one"];
      //[チュッ]:
      case "ch": return ["","ch","ocolate", "","ch","icken"];
      //[シュ]:
      case "sh": return ["mu","sh","room", "","sh","ark"];
      //[ス]:
      case "th": return ["","th","under", "","th","ree"];
      //[ズ]:
      case "th'": return ["mo","th","er", "rhy","th","m"];
      //[ハウッ]
      case "wh": return ["","wh","ale", "ferris ","wh","eel"];
      //[クッ]
      case "ck": return ["du","ck","", "clo","ck",""];
      //[ングゥ]
      case "ng": return ["puddi","ng","", "fryi","ng"," pan"];
      //[リィ]:4
      case "lly": return ["/images/phonics/images/jelly.png", "/images/phonics/images/belly.png"]; 
      default: return ["","","", "","",""];
    }
}
  
export function getImages(char: string) {
  switch (char) {
    case "あ": return ["/images/japanese/images/ahiru.png", "/images/japanese/images/aisukurimu.png"];
    case "い": return ["/images/japanese/images/ichigo.png", "/images/japanese/images/iruka.png"];
    case "う": return ["/images/japanese/images/udon.png", "/images/japanese/images/usagi.png"];
    case "え": return ["/images/japanese/images/enpitsu.png", "/images/japanese/images/elevator.png"];
    case "お": return ["/images/japanese/images/otamajakushi.png", "/images/japanese/images/omurice.png"];
    case "か": return ["/images/japanese/images/kasa.png", "/images/japanese/images/kabutomushi.png"];
    case "き": return ["/images/japanese/images/kitsune.png", "/images/japanese/images/kiwi.png"];
    case "く": return ["/images/japanese/images/kujira.png", "/images/japanese/images/cookie.png"];
    case "け": return ["/images/japanese/images/keshigomu.png", "/images/japanese/images/cake.png"];
    case "こ": return ["/images/japanese/images/koumori.png", "/images/japanese/images/coffee.png"];
    case "さ": return ["/images/japanese/images/satsumaimo.png", "/images/japanese/images/same.png"];
    case "し": return ["/images/japanese/images/shingo.png", "/images/japanese/images/shimauma.png"];
    case "す": return ["/images/japanese/images/suzume.png", "/images/japanese/images/suika.png"];
    case "せ": return ["/images/japanese/images/seiza.png", "/images/japanese/images/sweater.png"];
    case "そ": return ["/images/japanese/images/soba.png", "/images/japanese/images/softcream.png"];
    case "た": return ["/images/japanese/images/taiyo.png", "/images/japanese/images/tanuki.png"];
    case "ち": return ["/images/japanese/images/chikyu.png", "/images/japanese/images/cheese.png"];
    case "つ": return ["/images/japanese/images/tsukushi.png", "/images/japanese/images/tsubame.png"];
    case "て": return ["/images/japanese/images/tentoumushi.png", "/images/japanese/images/tissue.png"];
    case "と": return ["/images/japanese/images/tora.png", "/images/japanese/images/tomato.png"];
    case "な": return ["/images/japanese/images/natto.png", "/images/japanese/images/namazu.png"];
    case "に": return ["/images/japanese/images/niji.png", "/images/japanese/images/ninjin.png"];
    case "ぬ": return ["/images/japanese/images/nunomask.png", "/images/japanese/images/inu.png"];
    case "ね": return ["/images/japanese/images/neko.png", "/images/japanese/images/negi.png"];
    case "の": return ["/images/japanese/images/norimaki.png", "/images/japanese/images/note.png"];
    case "は": return ["/images/japanese/images/hasami.png", "/images/japanese/images/hamberger.png"];
    case "ひ": return ["/images/japanese/images/hikouki.png", "/images/japanese/images/hitsuji.png"];
    case "ふ": return ["/images/japanese/images/fujisan.png", "/images/japanese/images/fukurou.png"];
    case "へ": return ["/images/japanese/images/hebi.png", "/images/japanese/images/helicopter.png"];
    case "ほ": return ["/images/japanese/images/hourensou.png", "/images/japanese/images/hotaru.png"];
    case "ま": return ["/images/japanese/images/maguro.png", "/images/japanese/images/mango.png"];
    case "み": return ["/images/japanese/images/mikan.png", "/images/japanese/images/mitsubachi.png"];
    case "む": return ["/images/japanese/images/mushiba.png", "/images/japanese/images/mukade.png"];
    case "め": return ["/images/japanese/images/medaka.png", "/images/japanese/images/melon.png"];
    case "も": return ["/images/japanese/images/momo.png", "/images/japanese/images/mogura.png"];
    case "や": return ["/images/japanese/images/yakan.png", "/images/japanese/images/yakisoba.png"];
    case "ゆ": return ["/images/japanese/images/yukidaruma.png", "/images/japanese/images/yuri.png"];
    case "よ": return ["/images/japanese/images/yosenabe.png", "/images/japanese/images/yacht.png"];
    case "ら": return ["/images/japanese/images/rakuda.png", "/images/japanese/images/ramune.png"];
    case "り": return ["/images/japanese/images/ringo.png", "/images/japanese/images/risu.png"];
    case "る": return ["/images/japanese/images/kaeru.png", "/images/japanese/images/rupe.png"];
    case "れ": return ["/images/japanese/images/renkon.png", "/images/japanese/images/restaurant.png"];
    case "ろ": return ["/images/japanese/images/rousoku.png", "/images/japanese/images/rocket.png"];
    case "わ": return ["/images/japanese/images/wakame.png", "/images/japanese/images/wani.png"];
    case "ん": return ["/images/japanese/images/shinkansen.png", "/images/japanese/images/kirin.png"];
    case "が": return ["/images/japanese/images/gakkou.png", "/images/japanese/images/gumtape.png"];
    case "ぎ": return ["/images/japanese/images/ginkou.png", "/images/japanese/images/guitar.png"];
    case "ぐ": return ["/images/japanese/images/gunte.png", "/images/japanese/images/grapefruit.png"];
    case "げ": return ["/images/japanese/images/gengorou.png", "/images/japanese/images/game.png"];
    case "ご": return ["/images/japanese/images/gobou.png", "/images/japanese/images/gorilla.png"];
    case "ざ": return ["/images/japanese/images/zakuro.png", "/images/japanese/images/zarigani.png"];
    case "じ": return ["/images/japanese/images/jinjya.png", "/images/japanese/images/jetcoaster.png"];
    case "ず": return ["/images/japanese/images/zundamochi.png", "/images/japanese/images/zucchini.png"];
    case "ぜ": return ["/images/japanese/images/zenzai.png", "/images/japanese/images/jelly.png"];
    case "ぞ": return ["/images/japanese/images/zouni.png", "/images/japanese/images/zou.png"];
    case "だ": return ["/images/japanese/images/daibutsu.png", "/images/japanese/images/dacho.png"];
    case "づ": return ["/images/japanese/images/mikaduki.png", "/images/japanese/images/oriduru.png"];
    case "で": return ["/images/japanese/images/densha.png", "/images/japanese/images/display.png"];
    case "ど": return ["/images/japanese/images/donguri.png", "/images/japanese/images/donut.png"];
    case "ば": return ["/images/japanese/images/bara.png", "/images/japanese/images/bike.png"];
    case "び": return ["/images/japanese/images/biwa.png", "/images/japanese/images/building.png"];
    case "ぶ": return ["/images/japanese/images/budou.png", "/images/japanese/images/buta.png"];
    case "べ": return ["/images/japanese/images/bento.png", "/images/japanese/images/vest.png"];
    case "ぼ": return ["/images/japanese/images/akatombo.png", "/images/japanese/images/ball.png"];
    case "ぱ": return ["/images/japanese/images/kappa.png", "/images/japanese/images/panda.png"];
    case "ぴ": return ["/images/japanese/images/happi.png", "/images/japanese/images/pizza.png"];
    case "ぷ": return ["/images/japanese/images/onpu.png", "/images/japanese/images/pudding.png"];
    case "ぺ": return ["/images/japanese/images/penguin.png", "/images/japanese/images/petbuttle.png"];
    case "ぽ": return ["/images/japanese/images/kiritamponabe.png", "/images/japanese/images/pot.png"];
    case "きゃ": return ["/images/japanese/images/kyabetsu.png", "/images/japanese/images/campfire.png"];
    case "きゅ": return ["/images/japanese/images/kyukyusha.png", "/images/japanese/images/kyuri.png"];
    case "きょ": return ["/images/japanese/images/kyoryu.png", "/images/japanese/images/rakkyo.png"];
    case "しゃ": return ["/images/japanese/images/shachi.png", "/images/japanese/images/shirt.png"];
    case "しゅ": return ["/images/japanese/images/shuriken.png", "/images/japanese/images/shumai.png"];
    case "しょ": return ["/images/japanese/images/shokupan.png", "/images/japanese/images/shoppingmall.png"];
    case "ちゃ": return ["/images/japanese/images/akachan.png", "/images/japanese/images/gachagacha.png"];
    case "ちゅ": return ["/images/japanese/images/chusha.png", "/images/japanese/images/turip.png"];
    case "ちょ": return ["/images/japanese/images/chocho.png", "/images/japanese/images/chocolate.png"];
    case "ひょ": return ["/images/japanese/images/hyotan.png", "/images/japanese/images/hyo.png"];
    case "りゅ": return ["/images/japanese/images/ryu.png", "/images/japanese/images/ruck.png"];
    case "ぎゅ": return ["/images/japanese/images/gyudon.png", "/images/japanese/images/figureskate.png"];
    case "ぎょ": return ["/images/japanese/images/kingyo.png", "/images/japanese/images/gyoza.png"];
    case "じゃ": return ["/images/japanese/images/janken.png", "/images/japanese/images/jagaimo.png"];
    case "じゅ": return ["/images/japanese/images/momijimanjyu.png", "/images/japanese/images/juice.png"];
    case "じょ": return ["/images/japanese/images/jyokikikansha.png", "/images/japanese/images/jyouro.png"];
    case "びょ": return ["/images/japanese/images/byoin.png", "/images/japanese/images/gabyo.png"];
    case "a": return ["/images/phonics/images/apple.png", "/images/phonics/images/ant.png"];
    case "a'": return ["/images/phonics/images/acorn.png", "/images/phonics/images/angelfish.png"];
    case "b": return ["/images/phonics/images/banana.png", "/images/phonics/images/bee.png"];
    case "c": return ["/images/phonics/images/cinnamonroll.png", "/images/phonics/images/cicada.png"];
    case "c'": return ["/images/phonics/images/corn.png", "/images/phonics/images/cat.png"];
    case "d": return ["/images/phonics/images/donut.png", "/images/phonics/images/dog.png"];
    case "e": return ["/images/phonics/images/egg.png", "/images/phonics/images/elephant.png"];
    case "f": return ["/images/phonics/images/flower.png", "/images/phonics/images/frog.png"];
    case "g": return ["/images/phonics/images/ginger.png", "/images/phonics/images/giraffe.png"];
    case "g'": return ["/images/phonics/images/grapes.png", "/images/phonics/images/gorilla.png"];
    case "h": return ["/images/phonics/images/hamburger.png", "/images/phonics/images/horse.png"];
    case "i": return ["/images/phonics/images/indoorshoes.png", "/images/phonics/images/injector.png"];
    case "i'": return ["/images/phonics/images/icecream.png", "/images/phonics/images/island.png"];
    case "j": return ["/images/phonics/images/juice.png", "/images/phonics/images/jellyfish.png"];
    case "k": return ["/images/phonics/images/kiwi.png", "/images/phonics/images/koala.png"];
    case "l": return ["/images/phonics/images/lemon.png", "/images/phonics/images/lion.png"];
    case "m": return ["/images/phonics/images/mango.png", "/images/phonics/images/mantis.png"];
    case "n": return ["/images/phonics/images/nut.png", "/images/phonics/images/needle.png"];
    case "o": return ["/images/phonics/images/orange.png", "/images/phonics/images/ostrich.png"];
    case "p": return ["/images/phonics/images/pineapple.png", "/images/phonics/images/pig.png"];
    case "q": return ["/images/phonics/images/question.png", "/images/phonics/images/quilt.png"];
    case "r": return ["/images/phonics/images/rabbit.png", "/images/phonics/images/rainbow.png"];
    case "s": return ["/images/phonics/images/sweetpotato.png", "/images/phonics/images/squirrel.png"];
    case "s'": return ["/images/phonics/images/television.png", "/images/phonics/images/cheese.png"];
    case "t": return ["/images/phonics/images/tomato.png", "/images/phonics/images/tiger.png"];
    case "u": return ["/images/phonics/images/umbrella.png", "/images/phonics/images/up.png"];
    case "v": return ["/images/phonics/images/vegetables.png", "/images/phonics/images/vest.png"];
    case "w": return ["/images/phonics/images/watermelon.png", "/images/phonics/images/witch.png"];
    case "x": return ["/images/phonics/images/xylophone.png", "/images/phonics/images/fox.png"];
    case "y": return ["/images/phonics/images/yogurt.png", "/images/phonics/images/yacht.png"];
    case "z": return ["/images/phonics/images/zebra.png", "/images/phonics/images/zero.png"];
    //[アー]
    case "er": return ["/images/phonics/images/hamster.png", "/images/phonics/images/cucumber.png"];
    case "ir": return ["/images/phonics/images/girl.png", "/images/phonics/images/t-shirt.png"];
    case "or": return ["/images/phonics/images/elevator.png", "/images/phonics/images/escalator.png"];
    case "ur": return ["/images/phonics/images/turtle.png", "/images/phonics/images/burdock.png"];
    case "ear'": return ["/images/phonics/images/earth.png", "/images/phonics/images/heart.png"];
    //[アィ]:3
    case "ie": return ["/images/phonics/images/meatpie.png", "/images/phonics/images/necktie.png"]; 
    case "igh": return ["/images/phonics/images/trafficlight.png", "/images/phonics/images/eight.png"];
    case "-y": return ["/images/phonics/images/cherry.png", "/images/phonics/images/butterfly.png"];
    case "_i_e": return ["/images/phonics/images/fireengine.png", "/images/phonics/images/nine.png"]; 
    //[アゥ]
    case "ou": return ["/images/phonics/images/mouse.png", "/images/phonics/images/house.png"];
    case "ow": return ["/images/phonics/images/cow.png", "/images/phonics/images/tower.png"];
    //[イー]:2
    case "ēē": return ["/images/phonics/images/beetle.png", "/images/phonics/images/coffee.png"];
    case "ēā": return ["/images/phonics/images/peach.png", "/images/phonics/images/eagle.png"];
    case "īē": return ["/images/phonics/images/cookie.png", "/images/phonics/images/zombie.png"]; 
    case "ey": return ["/images/phonics/images/honey.png", "/images/phonics/images/monkey.png"];
    case "_e_e": return ["/images/phonics/images/centipede.png", "/images/phonics/images/concrete.png"];
    //[イァ]:4
    case "eer": return ["/images/phonics/images/deer.png", "/images/phonics/images/beer.png"]; 
    case "ear": return ["/images/phonics/images/ear.png", "/images/phonics/images/gear.png"]; 
    //[ウー]:2
    case "ue": return ["/images/phonics/images/blueberry.png", "/images/phonics/images/tissue.png"];
    case "ui": return ["/images/phonics/images/passionfruit.png", "/images/phonics/images/suit.png"]; //
    case "ew": return ["/images/phonics/images/stew.png", "/images/phonics/images/newspaper.png"]; 
    case "ōō": return ["/images/phonics/images/badtooth.png", "/images/phonics/images/kangaroo.png"];
    case "ōū": return ["/images/phonics/images/soup.png", "/images/phonics/images/rouge.png"];
    case "_u_e": return ["/images/phonics/images/perfume.png", "/images/phonics/images/sugarcube.png"];
    //[ウッ]
    case "oo": return ["/images/phonics/images/good.png", "/images/phonics/images/bookstore.png"];
    //[エィ]:1
    case "ai": return ["/images/phonics/images/train.png", "/images/phonics/images/snail.png"];
    case "ay": return ["/images/phonics/images/okay.png", "/images/phonics/images/mantaray.png"]; 
    case "_a_e": return ["/images/phonics/images/cake.png", "/images/phonics/images/snake.png"];
    //[エァ]
    case "air": return ["/images/phonics/images/airplane.png", "/images/phonics/images/hairdryer.png"];
    //[エ]:1
    case "ea": return ["/images/phonics/images/bread.png", "/images/phonics/images/feather.png"];
    //[オー]:4
    case "au": return ["/images/phonics/images/santaclaus.png", "/images/phonics/images/sausage.png"]; 
    case "aw": return ["/images/phonics/images/strawberry.png", "/images/phonics/images/seesaw.png"]; 
    case "our": return ["/images/phonics/images/court.png", "/images/phonics/images/four.png"]; 
    //[オィ]
    case "oy": return ["/images/phonics/images/boy.png", "/images/phonics/images/soybeans.png"];
    //[オゥ]:2
    case "oa": return ["/images/phonics/images/goat.png", "/images/phonics/images/toast.png"];
    case "ōw": return ["/images/phonics/images/snowman.png", "/images/phonics/images/owl.png"];
    case "_o_e": return ["/images/phonics/images/rose.png", "/images/phonics/images/tadpole.png"];
    //[オーゥ]:2
    case "all": return ["/images/phonics/images/ball.png", "/images/phonics/images/mall.png"]; 
    //[フ]:
    case "ph": return ["/images/phonics/images/dolphin.png", "/images/phonics/images/smartphone.png"];
    //[チュッ]:
    case "ch": return ["/images/phonics/images/chocolate.png", "/images/phonics/images/chicken.png"];
    //[シュ]:
    case "sh": return ["/images/phonics/images/mushroom.png", "/images/phonics/images/shark.png"];
    //[ス]:
    case "th": return ["/images/phonics/images/thunder.png", "/images/phonics/images/three.png"];
    //[ズ]:
    case "th'": return ["/images/phonics/images/mother.png", "/images/phonics/images/rhythm.png"];
    //[ハウッ]
    case "wh": return ["/images/phonics/images/whale.png", "/images/phonics/images/ferriswheel.png"];
    //[クッ]
    case "ck": return ["/images/phonics/images/duck.png", "/images/phonics/images/clock.png"];
    //[ングゥ]
    case "ng": return ["/images/phonics/images/pudding.png", "/images/phonics/images/fryingpan.png"];
    //[リィ]:4
    case "lly": return ["je","lly","", "be","lly",""]; 
    default: return ["", ""];
  }
}

  
  