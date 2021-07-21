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
  const phonicsdefault = [
    "a", "a'", "b", "c", "c'", "d", "e", "f", "g", "g'", "h",
    "i", "i'", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "s'", "t", "u", "v", "w", "x", "y", "z",
    "er", "ir", "or", "ur", "ear'", "ie", "igh", "-y", "_i_e", "ou", "ow",
    "ēē", "ēā", "īē", "ey", "_e_e", "eer", "ear",
    "ue", "ui", "ew", "ōō", "ōū", "_u_e", "oo",
    "ai", "ay", "_a_e", "air", "ea",
    "au", "aw", "our", "oy", "oa", "ōw", "all",
    "ph", "ch", "sh", "th", "th'", "wh", "ck", "ng", "lly"
  ];

  const phonicsdefault0 = [
    "a", "a'", "b", "c", "c'", "d", "e", "f", "g", "g'", "h",
    "i", "i'", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "s'", "t", "u", "v", "w", "x", "y", "z",
    "er", "ir", "or", "ur", "ear'", "ie", "igh", "-y", "_i_e", "ou", "ow",
    "ēē", "ēā", "īē", "ey", "_e_e", "eer", "ear",
    "ue", "ui", "ew", "ōō", "ōū", "_u_e", "oo",
    "ai", "ay", "_a_e", "air", "ea",
    "au", "aw", "our", "oy", "oa", "ōw", "all",
    "ph", "ch", "sh", "th", "th'", "wh", "ck", "ng", "lly"
  ];

  function phonicsWord(word) {
    switch (word) {
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
      case "lly": return ["je","lly","", "be","lly",""]; 
      default: return ["", ""];
    }
  }

  function phonicsPicture(word) {
    switch (word) {
      case "a": return ["img/phonicswebapp/image/apple.png", "img/phonicswebapp/image/ant.png"];
      case "a'": return ["img/phonicswebapp/image/acorn.png", "img/phonicswebapp/image/angelfish.png"];
      case "b": return ["img/phonicswebapp/image/banana.png", "img/phonicswebapp/image/bee.png"];
      case "c": return ["img/phonicswebapp/image/cinnamonroll.png", "img/phonicswebapp/image/cicada.png"];
      case "c'": return ["img/phonicswebapp/image/corn.png", "img/phonicswebapp/image/cat.png"];
      case "d": return ["img/phonicswebapp/image/donut.png", "img/phonicswebapp/image/dog.png"];
      case "e": return ["img/phonicswebapp/image/egg.png", "img/phonicswebapp/image/elephant.png"];
      case "f": return ["img/phonicswebapp/image/flower.png", "img/phonicswebapp/image/frog.png"];
      case "g": return ["img/phonicswebapp/image/ginger.png", "img/phonicswebapp/image/giraffe.png"];
      case "g'": return ["img/phonicswebapp/image/grapes.png", "img/phonicswebapp/image/gorilla.png"];
      case "h": return ["img/phonicswebapp/image/hamburger.png", "img/phonicswebapp/image/horse.png"];
      case "i": return ["img/phonicswebapp/image/indoorshoes.png", "img/phonicswebapp/image/injector.png"];
      case "i'": return ["img/phonicswebapp/image/icecream.png", "img/phonicswebapp/image/island.png"];
      case "j": return ["img/phonicswebapp/image/juice.png", "img/phonicswebapp/image/jellyfish.png"];
      case "k": return ["img/phonicswebapp/image/kiwi.png", "img/phonicswebapp/image/koala.png"];
      case "l": return ["img/phonicswebapp/image/lemon.png", "img/phonicswebapp/image/lion.png"];
      case "m": return ["img/phonicswebapp/image/mango.png", "img/phonicswebapp/image/mantis.png"];
      case "n": return ["img/phonicswebapp/image/nut.png", "img/phonicswebapp/image/needle.png"];
      case "o": return ["img/phonicswebapp/image/orange.png", "img/phonicswebapp/image/ostrich.png"];
      case "p": return ["img/phonicswebapp/image/pineapple.png", "img/phonicswebapp/image/pig.png"];
      case "q": return ["img/phonicswebapp/image/question.png", "img/phonicswebapp/image/quilt.png"];
      case "r": return ["img/phonicswebapp/image/rabbit.png", "img/phonicswebapp/image/rainbow.png"];
      case "s": return ["img/phonicswebapp/image/sweetpotato.png", "img/phonicswebapp/image/squirrel.png"];
      case "s'": return ["img/phonicswebapp/image/television.png", "img/phonicswebapp/image/cheese.png"];
      case "t": return ["img/phonicswebapp/image/tomato.png", "img/phonicswebapp/image/tiger.png"];
      case "u": return ["img/phonicswebapp/image/umbrella.png", "img/phonicswebapp/image/up.png"];
      case "v": return ["img/phonicswebapp/image/vegetables.png", "img/phonicswebapp/image/vest.png"];
      case "w": return ["img/phonicswebapp/image/watermelon.png", "img/phonicswebapp/image/witch.png"];
      case "x": return ["img/phonicswebapp/image/xylophone.png", "img/phonicswebapp/image/fox.png"];
      case "y": return ["img/phonicswebapp/image/yogurt.png", "img/phonicswebapp/image/yacht.png"];
      case "z": return ["img/phonicswebapp/image/zebra.png", "img/phonicswebapp/image/zero.png"];
      //[アー]
      case "er": return ["img/phonicswebapp/image/hamster.png", "img/phonicswebapp/image/cucumber.png"];
      case "ir": return ["img/phonicswebapp/image/girl.png", "img/phonicswebapp/image/t-shirt.png"];
      case "or": return ["img/phonicswebapp/image/elevator.png", "img/phonicswebapp/image/escalator.png"];
      case "ur": return ["img/phonicswebapp/image/turtle.png", "img/phonicswebapp/image/burdock.png"];
      case "ear'": return ["img/phonicswebapp/image/earth.png", "img/phonicswebapp/image/heart.png"];
    //[アィ]:3
      case "ie": return ["img/phonicswebapp/image/meatpie.png", "img/phonicswebapp/image/necktie.png"]; 
      case "igh": return ["img/phonicswebapp/image/trafficlight.png", "img/phonicswebapp/image/eight.png"];
      case "-y": return ["img/phonicswebapp/image/cherry.png", "img/phonicswebapp/image/butterfly.png"];
      case "_i_e": return ["img/phonicswebapp/image/fireengine.png", "img/phonicswebapp/image/nine.png"]; 
    //[アゥ]
      case "ou": return ["img/phonicswebapp/image/mouse.png", "img/phonicswebapp/image/house.png"];
      case "ow": return ["img/phonicswebapp/image/cow.png", "img/phonicswebapp/image/tower.png"];
    //[イー]:2
      case "ēē": return ["img/phonicswebapp/image/beetle.png", "img/phonicswebapp/image/coffee.png"];
      case "ēā": return ["img/phonicswebapp/image/peach.png", "img/phonicswebapp/image/eagle.png"];
      case "īē": return ["img/phonicswebapp/image/cookie.png", "img/phonicswebapp/image/zombie.png"]; 
      case "ey": return ["img/phonicswebapp/image/honey.png", "img/phonicswebapp/image/monkey.png"];
      case "_e_e": return ["img/phonicswebapp/image/centipede.png", "img/phonicswebapp/image/concrete.png"];
    //[イァ]:4
      case "eer": return ["img/phonicswebapp/image/deer.png", "img/phonicswebapp/image/beer.png"]; 
      case "ear": return ["img/phonicswebapp/image/ear.png", "img/phonicswebapp/image/gear.png"]; 
    //[ウー]:2
      case "ue": return ["img/phonicswebapp/image/blueberry.png", "img/phonicswebapp/image/tissue.png"];
      case "ui": return ["img/phonicswebapp/image/passionfruit.png", "img/phonicswebapp/image/suit.png"]; //
      case "ew": return ["img/phonicswebapp/image/stew.png", "img/phonicswebapp/image/newspaper.png"]; 
      case "ōō": return ["img/phonicswebapp/image/badtooth.png", "img/phonicswebapp/image/kangaroo.png"];
      case "ōū": return ["img/phonicswebapp/image/soup.png", "img/phonicswebapp/image/rouge.png"];
      case "_u_e": return ["img/phonicswebapp/image/perfume.png", "img/phonicswebapp/image/sugarcube.png"];
    //[ウッ]
      case "oo": return ["img/phonicswebapp/image/good.png", "img/phonicswebapp/image/bookstore.png"];
    //[エィ]:1
      case "ai": return ["img/phonicswebapp/image/train.png", "img/phonicswebapp/image/snail.png"];
      case "ay": return ["img/phonicswebapp/image/okay.png", "img/phonicswebapp/image/mantaray.png"]; 
      case "_a_e": return ["img/phonicswebapp/image/cake.png", "img/phonicswebapp/image/snake.png"];
    //[エァ]
      case "air": return ["img/phonicswebapp/image/airplane.png", "img/phonicswebapp/image/hairdryer.png"];
    //[エ]:1
      case "ea": return ["img/phonicswebapp/image/bread.png", "img/phonicswebapp/image/feather.png"];
    //[オー]:4
      case "au": return ["img/phonicswebapp/image/santaclaus.png", "img/phonicswebapp/image/sausage.png"]; 
      case "aw": return ["img/phonicswebapp/image/strawberry.png", "img/phonicswebapp/image/seesaw.png"]; 
      case "our": return ["img/phonicswebapp/image/court.png", "img/phonicswebapp/image/four.png"]; 
    //[オィ]
      case "oy": return ["img/phonicswebapp/image/boy.png", "img/phonicswebapp/image/soybeans.png"];
    //[オゥ]:2
      case "oa": return ["img/phonicswebapp/image/goat.png", "img/phonicswebapp/image/toast.png"];
      case "ōw": return ["img/phonicswebapp/image/snowman.png", "img/phonicswebapp/image/owl.png"];
      case "_o_e": return ["img/phonicswebapp/image/rose.png", "img/phonicswebapp/image/tadpole.png"];
    //[オーゥ]:2
      case "all": return ["img/phonicswebapp/image/ball.png", "img/phonicswebapp/image/mall.png"]; 
    //[フ]:
      case "ph": return ["img/phonicswebapp/image/dolphin.png", "img/phonicswebapp/image/smartphone.png"];
    //[チュッ]:
      case "ch": return ["img/phonicswebapp/image/chocolate.png", "img/phonicswebapp/image/chicken.png"];
    //[シュ]:
      case "sh": return ["img/phonicswebapp/image/mushroom.png", "img/phonicswebapp/image/shark.png"];
    //[ス]:
      case "th": return ["img/phonicswebapp/image/thunder.png", "img/phonicswebapp/image/three.png"];
    //[ズ]:
      case "th'": return ["img/phonicswebapp/image/mother.png", "img/phonicswebapp/image/rhythm.png"];
    //[ハウッ]
      case "wh": return ["img/phonicswebapp/image/whale.png", "img/phonicswebapp/image/ferriswheel.png"];
    //[クッ]
      case "ck": return ["img/phonicswebapp/image/duck.png", "img/phonicswebapp/image/clock.png"];
    //[ングゥ]
      case "ng": return ["img/phonicswebapp/image/pudding.png", "img/phonicswebapp/image/fryingpan.png"];
    //[リィ]:4
      case "lly": return ["img/phonicswebapp/image/jelly.png", "img/phonicswebapp/image/belly.png"]; 
      default: return ["", ""];
    }
  }

  var i = 0;
  var index = 0;
  var phonicscharlist = phonicsdefault;
  var char = document.getElementById("phonicschar");
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
  var gridlist = document.getElementById("gridphonics");
  
  for (var i = 0; i < phonicscharlist.length; i++) {
    const div = document.createElement('div');
    div.classList.add('gridphonics');
    div.textContent = phonicscharlist[i];
    document.body.appendChild(div);
    div.id = "char" + String(i);
    const charbutton = document.getElementById("char" + String(i));
    charbutton.addEventListener( 'click', ( function(i) {
      return function () {   
        phonicscharlist = phonicsdefault;   
        setWord(i);
        index = i
      };
    })(i));
  }

  returnbutton.addEventListener('click', () => {
    phonicscharlist = phonicsdefault;
    index = 0;
    setWord(index);
  })  

  shufflebutton.addEventListener('click', () => {
    phonicscharlist = phonicsdefault0.shuffle();
    setWord(index);
  })  

  backbutton.addEventListener('click', () => {
    index -= 1;
    if (index == -1){index = phonicscharlist.length - 1;}
    setWord(index);
  })  

  nextbutton.addEventListener('click', () => {
    index += 1;
    if (index == phonicscharlist.length){index = 0;}
    setWord(index);
  })  

  function setWord(index) {
    char.textContent = phonicscharlist[index];
    word11.textContent = phonicsWord(phonicscharlist[index])[0];
    word12.textContent = phonicsWord(phonicscharlist[index])[1];
    word13.textContent = phonicsWord(phonicscharlist[index])[2];
    word21.textContent = phonicsWord(phonicscharlist[index])[3];
    word22.textContent = phonicsWord(phonicscharlist[index])[4];
    word23.textContent = phonicsWord(phonicscharlist[index])[5];
    image1.src = phonicsPicture(phonicscharlist[index])[0];
    image2.src = phonicsPicture(phonicscharlist[index])[1];
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
    msg.lang = "en-US";
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
