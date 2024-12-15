import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { isSP, myApp, myAppNumber } from '../../public/utils/constants'
import { defaultCharList, defaultFirstChar, defaultImages, defaultSecondChar, defaultWords  } from '../../public/utils/functions'
import { getImages, getWords, hiraganaToKatakana, shuffle, speechWord } from '../../public/utils/functions'
import MusicIcon from '@mui/icons-material/MusicNote';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import BeforeIcon from '@mui/icons-material/NavigateBefore';
import NextIcon from '@mui/icons-material/NavigateNext';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

const WordWebApp: NextPage<Props> = ({ appNumber, width, isJa }) => {

  const isPhonics = (appNumber == myAppNumber.phonics);
  const title = isJa ? "＜おためし＞": "TRIAL";

  const audioColor = myApp(width, isJa)[appNumber].color.header;
  const operationColor = myApp(width, isJa)[appNumber].color.howtouse;

  const [charList, setCharList] = useState(defaultCharList(isPhonics));
  const [charNumber, setCharNumber] = useState(0);
  const [firstChar, setFirstChar] = useState(defaultFirstChar(isPhonics));
  const [secondChar, setSecondChar] = useState(defaultSecondChar);
  const [words, setWords] = useState(defaultWords(isPhonics));
  const [images, setImages] = useState(defaultImages(isPhonics));
  const squareRef1 = useRef<HTMLDivElement>(null);
  const squareRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCharNumber(charNumber);
    setFirstChar(charList[charNumber]);
    if (!isPhonics) setSecondChar(hiraganaToKatakana(charList[charNumber]));
    setWords(getWords(charList[charNumber]));
    setImages(getImages(charList[charNumber]));
    if (squareRef1.current && squareRef2.current) {
      const imageBoxWidth1 = squareRef1.current.clientWidth;
      const imageBoxWidth2 = squareRef2.current.clientWidth;
      squareRef1.current.style.height = `${imageBoxWidth1}px`;
      squareRef2.current.style.height = `${imageBoxWidth2}px`;
    }            
  }, [isPhonics, width, charNumber, charList]);
    
  const nextNumber = () => setCharNumber((charNumber + 1 == charList.length) ? 0: charNumber + 1);
  const backNumber = () => setCharNumber((charNumber == 0) ? charList.length - 1: charNumber - 1);
  const suffuleList = () => { setCharList(shuffle(charList)); setCharNumber(0); }
  const returnList = () => { setCharList(defaultCharList(isPhonics)); setCharNumber(0); }
 
  const titleStyle: CSSProperties = {    
    fontSize: myApp(width, isJa)[appNumber].size.subTitle, 
    fontWeight: isJa ? "bold": "normal", 
    color: myApp(width, isJa)[appNumber].color.title, 
    textAlign: "center", 
    padding: "20px 0"
  }  
  const webAppStyle : CSSProperties = {
    color: "#383635",
    backgroundColor: "white", 
    fontWeight: "bold",
    width: "90vw",
    maxWidth: 800,
    marginBottom: 30,
    paddingBottom: 10,
  }
  const phonicsCharStyle: CSSProperties = {    
    fontSize: 100, 
    textAlign: "center", 
    marginTop: 15,
  }
  const japaneseCharStyle: CSSProperties = {    
    fontSize: 65, 
    textAlign: "center", 
    margin: "30px 0 20px 0",
  }  
  const wordImageStyle: CSSProperties = {
    width: "50%", 
    margin: "0 0 auto 0",
  }
  const wordStyle: CSSProperties = {
    fontSize: isPhonics ? (isSP(width) ? width / 60 + 14 :24): ((width < 720) ? width / 60 + 10 :24),
    textAlign: "center", 
    margin: "10px 0 30px 0",
  }
  const imageBoxStyle: CSSProperties = {
    width: "80%",
    maxWidth: 200,
    maxHeight: 200,
    margin: "0 auto",
    overflow: "hidden",
    position: "relative",
  }
  const imageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
  const focusStyle: CSSProperties = {
    color: operationColor, 
    textDecoration: "underline",
  }
  const operationsStyle: CSSProperties = {
    width: "100%",
    margin: "0px auto 30px auto",
    columnGap: "3.3333333%",
  }
  const audioStyle: CSSProperties = {
    color: "white",
    width: "43.5%",  
    height: 50,
    backgroundColor: audioColor,
    borderRadius: 25,
    padding: 0,
    marginTop: 30,
  }
  const operationStyle: CSSProperties = {
    color: "white",
    width: "20%",  
    height: 50,
    backgroundColor: operationColor,
    borderRadius: 25,
    padding: 0,
  }

  return <div>
    <h1 className={myApp(width, isJa)[appNumber].font.title} style={titleStyle}>{title}</h1>
    <div style={webAppStyle}>
      {isPhonics && (<h1 style={phonicsCharStyle}>{firstChar}</h1>)}
      <div className="flex_center_wrap">
        <div style={wordImageStyle} onClick={() => speechWord(words, isPhonics, true)}>
          {!isPhonics && (<h1 style={japaneseCharStyle}>{firstChar}</h1>)}
          <p style={wordStyle}>
            {words[0]}
            <span style={focusStyle}>{words[1]}</span>
            {words[2]}
          </p>
          <div className="flex_center_wrap" ref={squareRef1} style={imageBoxStyle}>
            <Image src={images[0]} alt={`image1`} width={500} height={500} priority={true} style={imageStyle}/>
          </div>
        </div>
        <div style={wordImageStyle} onClick={() => speechWord(words, isPhonics, false)}>
          {!isPhonics && (<h1 style={japaneseCharStyle}>{secondChar}</h1>)}
          <p style={wordStyle}>
            {words[3]}
            <span style={focusStyle}>{words[4]}</span>
            {words[5]}
          </p>
          <div className="flex_center_wrap" ref={squareRef2} style={imageBoxStyle}>
            <Image src={images[1]} alt={`image2`} width={500} height={500} priority={true} style={imageStyle}/>
          </div>
        </div>
      </div>
      <div className="flex_center_wrap" style={operationsStyle}>
        <IconButton className="flex_center" style={audioStyle} onClick={() => speechWord(words, isPhonics, true)}><MusicIcon/></IconButton>
        <IconButton className="flex_center" style={audioStyle} onClick={() => speechWord(words, isPhonics, false)}><MusicIcon/></IconButton>
      </div>
      <div className="flex_center_wrap" style={operationsStyle}>
        <IconButton className="flex_center" style={operationStyle} onClick={returnList}><UndoIcon/></IconButton>
        <IconButton className="flex_center" style={operationStyle} onClick={suffuleList}><ShuffleIcon/></IconButton>
        <IconButton className="flex_center" style={operationStyle} onClick={backNumber}><BeforeIcon/></IconButton>
        <IconButton className="flex_center" style={operationStyle} onClick={nextNumber}><NextIcon/></IconButton>
      </div>
    </div>
  </div>
}

export default WordWebApp

