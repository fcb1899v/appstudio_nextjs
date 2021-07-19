'use strict';

{
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const overlay = document.querySelector('.overlay');
  //メニューを開いた時の処理
  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
  });
  //メニューを閉じた時の処理
  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
  })
};

{
  const jpworddefault = [
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

  const jpworddefault0 = [
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

  function jpwordWord(word) {
    switch (word) {
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
      default: return ["","","", "","",""];
    }
  }

  function jpwordPicture(word) {
    switch (word) {
      case "あ": return ["img/jpwordwebapp/image/ahiru.png", "img/jpwordwebapp/image/aisukurimu.png"];
      case "い": return ["img/jpwordwebapp/image/ichigo.png", "img/jpwordwebapp/image/iruka.png"];
      case "う": return ["img/jpwordwebapp/image/udon.png", "img/jpwordwebapp/image/usagi.png"];
      case "え": return ["img/jpwordwebapp/image/enpitsu.png", "img/jpwordwebapp/image/elevator.png"];
      case "お": return ["img/jpwordwebapp/image/otamajakushi.png", "img/jpwordwebapp/image/omurice.png"];
      case "か": return ["img/jpwordwebapp/image/kasa.png", "img/jpwordwebapp/image/kabutomushi.png"];
      case "き": return ["img/jpwordwebapp/image/kitsune.png", "img/jpwordwebapp/image/kiwi.png"];
      case "く": return ["img/jpwordwebapp/image/kujira.png", "img/jpwordwebapp/image/cookie.png"];
      case "け": return ["img/jpwordwebapp/image/keshigomu.png", "img/jpwordwebapp/image/cake.png"];
      case "こ": return ["img/jpwordwebapp/image/koumori.png", "img/jpwordwebapp/image/coffee.png"];
      case "さ": return ["img/jpwordwebapp/image/satsumaimo.png", "img/jpwordwebapp/image/same.png"];
      case "し": return ["img/jpwordwebapp/image/shingo.png", "img/jpwordwebapp/image/shimauma.png"];
      case "す": return ["img/jpwordwebapp/image/suzume.png", "img/jpwordwebapp/image/suika.png"];
      case "せ": return ["img/jpwordwebapp/image/seiza.png", "img/jpwordwebapp/image/sweater.png"];
      case "そ": return ["img/jpwordwebapp/image/soba.png", "img/jpwordwebapp/image/softcream.png"];
      case "た": return ["img/jpwordwebapp/image/taiyo.png", "img/jpwordwebapp/image/tanuki.png"];
      case "ち": return ["img/jpwordwebapp/image/chikyu.png", "img/jpwordwebapp/image/cheese.png"];
      case "つ": return ["img/jpwordwebapp/image/tsukushi.png", "img/jpwordwebapp/image/tsubame.png"];
      case "て": return ["img/jpwordwebapp/image/tentoumushi.png", "img/jpwordwebapp/image/tissue.png"];
      case "と": return ["img/jpwordwebapp/image/tora.png", "img/jpwordwebapp/image/tomato.png"];
      case "な": return ["img/jpwordwebapp/image/natto.png", "img/jpwordwebapp/image/namazu.png"];
      case "に": return ["img/jpwordwebapp/image/niji.png", "img/jpwordwebapp/image/ninjin.png"];
      case "ぬ": return ["img/jpwordwebapp/image/nunomask.png", "img/jpwordwebapp/image/inu.png"];
      case "ね": return ["img/jpwordwebapp/image/neko.png", "img/jpwordwebapp/image/negi.png"];
      case "の": return ["img/jpwordwebapp/image/norimaki.png", "img/jpwordwebapp/image/note.png"];
      case "は": return ["img/jpwordwebapp/image/hasami.png", "img/jpwordwebapp/image/hamberger.png"];
      case "ひ": return ["img/jpwordwebapp/image/hikouki.png", "img/jpwordwebapp/image/hitsuji.png"];
      case "ふ": return ["img/jpwordwebapp/image/fujisan.png", "img/jpwordwebapp/image/fukurou.png"];
      case "へ": return ["img/jpwordwebapp/image/hebi.png", "img/jpwordwebapp/image/helicopter.png"];
      case "ほ": return ["img/jpwordwebapp/image/hourensou.png", "img/jpwordwebapp/image/hotaru.png"];
      case "ま": return ["img/jpwordwebapp/image/maguro.png", "img/jpwordwebapp/image/mango.png"];
      case "み": return ["img/jpwordwebapp/image/mikan.png", "img/jpwordwebapp/image/mitsubachi.png"];
      case "む": return ["img/jpwordwebapp/image/mushiba.png", "img/jpwordwebapp/image/mukade.png"];
      case "め": return ["img/jpwordwebapp/image/medaka.png", "img/jpwordwebapp/image/melon.png"];
      case "も": return ["img/jpwordwebapp/image/momo.png", "img/jpwordwebapp/image/mogura.png"];
      case "や": return ["img/jpwordwebapp/image/yakan.png", "img/jpwordwebapp/image/yakisoba.png"];
      case "ゆ": return ["img/jpwordwebapp/image/yukidaruma.png", "img/jpwordwebapp/image/yuri.png"];
      case "よ": return ["img/jpwordwebapp/image/yosenabe.png", "img/jpwordwebapp/image/yacht.png"];
      case "ら": return ["img/jpwordwebapp/image/rakuda.png", "img/jpwordwebapp/image/ramune.png"];
      case "り": return ["img/jpwordwebapp/image/ringo.png", "img/jpwordwebapp/image/risu.png"];
      case "る": return ["img/jpwordwebapp/image/kaeru.png", "img/jpwordwebapp/image/rupe.png"];
      case "れ": return ["img/jpwordwebapp/image/renkon.png", "img/jpwordwebapp/image/restaurant.png"];
      case "ろ": return ["img/jpwordwebapp/image/rousoku.png", "img/jpwordwebapp/image/rocket.png"];
      case "わ": return ["img/jpwordwebapp/image/wakame.png", "img/jpwordwebapp/image/wani.png"];
      case "ん": return ["img/jpwordwebapp/image/shinkansen.png", "img/jpwordwebapp/image/kirin.png"];
      case "が": return ["img/jpwordwebapp/image/gakkou.png", "img/jpwordwebapp/image/gumtape.png"];
      case "ぎ": return ["img/jpwordwebapp/image/ginkou.png", "img/jpwordwebapp/image/guitar.png"];
      case "ぐ": return ["img/jpwordwebapp/image/gunte.png", "img/jpwordwebapp/image/grapefruit.png"];
      case "げ": return ["img/jpwordwebapp/image/gengorou.png", "img/jpwordwebapp/image/game.png"];
      case "ご": return ["img/jpwordwebapp/image/gobou.png", "img/jpwordwebapp/image/gorilla.png"];
      case "ざ": return ["img/jpwordwebapp/image/zakuro.png", "img/jpwordwebapp/image/zarigani.png"];
      case "じ": return ["img/jpwordwebapp/image/jinjya.png", "img/jpwordwebapp/image/jetcoaster.png"];
      case "ず": return ["img/jpwordwebapp/image/zundamochi.png", "img/jpwordwebapp/image/zucchini.png"];
      case "ぜ": return ["img/jpwordwebapp/image/zenzai.png", "img/jpwordwebapp/image/jelly.png"];
      case "ぞ": return ["img/jpwordwebapp/image/zouni.png", "img/jpwordwebapp/image/zou.png"];
      case "だ": return ["img/jpwordwebapp/image/daibutsu.png", "img/jpwordwebapp/image/dacho.png"];
      case "づ": return ["img/jpwordwebapp/image/mikaduki.png", "img/jpwordwebapp/image/oriduru.png"];
      case "で": return ["img/jpwordwebapp/image/densha.png", "img/jpwordwebapp/image/display.png"];
      case "ど": return ["img/jpwordwebapp/image/donguri.png", "img/jpwordwebapp/image/donut.png"];
      case "ば": return ["img/jpwordwebapp/image/bara.png", "img/jpwordwebapp/image/bike.png"];
      case "び": return ["img/jpwordwebapp/image/biwa.png", "img/jpwordwebapp/image/building.png"];
      case "ぶ": return ["img/jpwordwebapp/image/budou.png", "img/jpwordwebapp/image/buta.png"];
      case "べ": return ["img/jpwordwebapp/image/bento.png", "img/jpwordwebapp/image/vest.png"];
      case "ぼ": return ["img/jpwordwebapp/image/akatombo.png", "img/jpwordwebapp/image/ball.png"];
      case "ぱ": return ["img/jpwordwebapp/image/kappa.png", "img/jpwordwebapp/image/panda.png"];
      case "ぴ": return ["img/jpwordwebapp/image/happi.png", "img/jpwordwebapp/image/pizza.png"];
      case "ぷ": return ["img/jpwordwebapp/image/onpu.png", "img/jpwordwebapp/image/pudding.png"];
      case "ぺ": return ["img/jpwordwebapp/image/penguin.png", "img/jpwordwebapp/image/petbuttle.png"];
      case "ぽ": return ["img/jpwordwebapp/image/kiritamponabe.png", "img/jpwordwebapp/image/pot.png"];
      case "きゃ": return ["img/jpwordwebapp/image/kyabetsu.png", "img/jpwordwebapp/image/campfire.png"];
      case "きゅ": return ["img/jpwordwebapp/image/kyukyusha.png", "img/jpwordwebapp/image/kyuri.png"];
      case "きょ": return ["img/jpwordwebapp/image/kyoryu.png", "img/jpwordwebapp/image/rakkyo.png"];
      case "しゃ": return ["img/jpwordwebapp/image/shachi.png", "img/jpwordwebapp/image/shirt.png"];
      case "しゅ": return ["img/jpwordwebapp/image/shuriken.png", "img/jpwordwebapp/image/shumai.png"];
      case "しょ": return ["img/jpwordwebapp/image/shokupan.png", "img/jpwordwebapp/image/shoppingmall.png"];
      case "ちゃ": return ["img/jpwordwebapp/image/akachan.png", "img/jpwordwebapp/image/gachagacha.png"];
      case "ちゅ": return ["img/jpwordwebapp/image/chusha.png", "img/jpwordwebapp/image/turip.png"];
      case "ちょ": return ["img/jpwordwebapp/image/chocho.png", "img/jpwordwebapp/image/chocolate.png"];
      case "ひょ": return ["img/jpwordwebapp/image/hyotan.png", "img/jpwordwebapp/image/hyo.png"];
      case "りゅ": return ["img/jpwordwebapp/image/ryu.png", "img/jpwordwebapp/image/ruck.png"];
      case "ぎゅ": return ["img/jpwordwebapp/image/gyudon.png", "img/jpwordwebapp/image/figureskate.png"];
      case "ぎょ": return ["img/jpwordwebapp/image/kingyo.png", "img/jpwordwebapp/image/gyoza.png"];
      case "じゃ": return ["img/jpwordwebapp/image/janken.png", "img/jpwordwebapp/image/jagaimo.png"];
      case "じゅ": return ["img/jpwordwebapp/image/momijimanjyu.png", "img/jpwordwebapp/image/juice.png"];
      case "じょ": return ["img/jpwordwebapp/image/jyokikikansha.png", "img/jpwordwebapp/image/jyouro.png"];
      case "びょ": return ["img/jpwordwebapp/image/byoin.png", "img/jpwordwebapp/image/gabyo.png"];
      default: return ["", ""];
    }
  }

  var i = 0;
  var index = 0;
  var jpwordcharlist = jpworddefault;
  var hiraganachar = document.getElementById("hiraganachar");
  var katakanachar = document.getElementById("katakanachar");
  var image1 = document.getElementById("image1");
  var image2 = document.getElementById("image2");
  var word11 = document.getElementById("word11");
  var word12 = document.getElementById("word12");
  var word13 = document.getElementById("word13");
  var word21 = document.getElementById("word21");
  var word22 = document.getElementById("word22");
  var word23 = document.getElementById("word23");
  var soundbutton1 = document.getElementById("soundbutton1");
  var soundbutton2 = document.getElementById("soundbutton2");
  var returnbutton = document.getElementById("returnbutton");
  var shufflebutton = document.getElementById("shufflebutton");
  var backbutton = document.getElementById("backbutton");
  var nextbutton = document.getElementById("nextbutton");
  var gridlist = document.getElementById("gridjpword");
  
  for (var i = 0; i < jpwordcharlist.length; i++) {
    const div = document.createElement('div');
    div.classList.add('gridjpword');
    div.textContent = jpwordcharlist[i];
    document.body.appendChild(div);
    div.id = "char" + String(i);
    const charbutton = document.getElementById("char" + String(i));
    charbutton.addEventListener( 'click', ( function(i) {
      return function () {   
        jpwordcharlist = jpworddefault;   
        setWord(i);
        index = i
      };
    })(i));
  }

  returnbutton.addEventListener('click', () => {
    jpwordcharlist = jpworddefault;
    index = 0;
    setWord(index);
  })  

  shufflebutton.addEventListener('click', () => {
    jpwordcharlist = jpworddefault0.shuffle();
    setWord(index);
  })  

  backbutton.addEventListener('click', () => {
    index -= 1;
    if (index == -1){index = jpwordcharlist.length - 1;}
    setWord(index);
  })  

  nextbutton.addEventListener('click', () => {
    index += 1;
    if (index == jpwordcharlist.length){index = 0;}
    setWord(index);
  })  

  function setWord(index) {
    hiraganachar.textContent = jpwordcharlist[index];
    katakanachar.textContent = hiraToKata(jpwordcharlist[index]);
    word11.textContent = jpwordWord(jpwordcharlist[index])[0];
    word12.textContent = jpwordWord(jpwordcharlist[index])[1];
    word13.textContent = jpwordWord(jpwordcharlist[index])[2];
    word21.textContent = jpwordWord(jpwordcharlist[index])[3];
    word22.textContent = jpwordWord(jpwordcharlist[index])[4];
    word23.textContent = jpwordWord(jpwordcharlist[index])[5];
    image1.src = jpwordPicture(jpwordcharlist[index])[0];
    image2.src = jpwordPicture(jpwordcharlist[index])[1];
  }

  Array.prototype.shuffle = function() {
    //配列内の要素をランダムに並べ替える。
    //元の配列に影響する。
    //Fisher–Yates shuffle
    var i, j, temp;
    i = this.length;
    while(i) {
      j = Math.floor(Math.random() * i);
      i--;
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
    return this;
  }

  const hiraToKata = text =>{
    return text.replace( /[\u3042-\u3093]/g, 
                 m => String.fromCharCode(m.charCodeAt(0) + 96)
             );
  };
  
  function speechWord(text) {
    if (!'SpeechSynthesisUtterance' in window) {
      alert('Speech synthesis(音声合成) APIには未対応です.');
      console.log('Speech synthesis(音声合成) APIには未対応です.');
      return;
    }  
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();  
    msg.text = text;
    msg.voice = voices[0];
    msg.volume = 1;
    msg.lang = "ja";
    speechSynthesis.speak(msg);
  }

  image1.addEventListener('click', () => {
    var text = word11.textContent + word12.textContent + word13.textContent 
    speechWord(text);
  })  

  image2.addEventListener('click', () => {
    var text = word21.textContent + word22.textContent + word23.textContent 
    speechWord(text);
  })  

  soundbutton1.addEventListener('click', () => {
    var text = word11.textContent + word12.textContent + word13.textContent 
    speechWord(text);
  })  

  soundbutton2.addEventListener('click', () => {
    var text = word21.textContent + word22.textContent + word23.textContent 
    speechWord(text);
  }) 
}
