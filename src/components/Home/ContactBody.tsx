import { NextPage } from 'next'
import React, { CSSProperties, useEffect, useState} from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import '@/app/globals.css';
import AccountIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Edit from '@mui/icons-material/Edit';
import IoSquareOutline from '@mui/icons-material/CropSquare';
import { myForm, myApp, myAppNumber } from "@/utils/constants";

interface Props {
  isJa: boolean
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

const ContactBodyInner: NextPage<Props> = ({isJa}) => { 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);
  const [buttonColor, setButtonColor] = useState(['gray', 'white']);

  // For Recaptcha v3
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  // onChange handler of input form
  const handleFamilyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAppChange = (event: any) => { setSelectedApp(event.target.value); };
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMessage(e.target.value); };

  useEffect(() => {
    setAlertMessage(
      (sentMessage) ? myForm(isJa)[0].alert.success:
      (name === "" && email === "" && message === "" && selectedApp === "") ? myForm(isJa)[0].alert.default:
      (name === "") ? myForm(isJa)[0].alert.name:
      (email === "") ? myForm(isJa)[0].alert.email:
      (!email.match(/.+@.+\..+/)) ? myForm(isJa)[0].alert.invalid:
      (selectedApp === "") ? myForm(isJa)[0].alert.app:
      (message === "") ? myForm(isJa)[0].alert.message:
      myForm(isJa)[0].alert.submit
    );
    setButtonColor(
      (
        name != "" && 
        email != "" && 
        email.match(/.+@.+\..+/) && 
        selectedApp != "" &&
        message != "" 
      ) ? ['#F7B249', 'black']: ['gray', 'white']
    );
    if (submitted) {
      setName("");
      setEmail("");
      setSelectedApp("");
      setMessage("");
      setSentMessage(true);
      setTimeout(() => { window.location.href = "/";}, 3000);     
    }
  }, [isJa, name, email, selectedApp, message, sentMessage, submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (buttonColor[1] == "black") {
      if (!executeRecaptcha || typeof executeRecaptcha !== 'function') {
        alert(myForm(isJa)[0].alert.error);
        return;
      }
      
      try {
        const token = await executeRecaptcha("submit_form");
        setRecaptchaToken(token);
  
        // サーバーサイドでreCAPTCHA検証
        const response_server = await fetch("/api/recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!response_server.ok) {
          alert(myForm(isJa)[0].alert.error);
          return;
        }

        // reCAPTCHA検証成功後、Googleフォームに送信
        const formResponse = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            app: selectedApp,
            message: message
          }),
        });

        const result = await formResponse.json();
        if (result.success) {
          setSubmitted(true);
          alert(myForm(isJa)[0].alert.confirm);
        } else {
          alert('送信に失敗しました: ' + result.message);
        }
      } catch {
        alert(myForm(isJa)[0].alert.error);
      }
    }
  };

  const handleIframeLoad = () => {};

  const contactStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column", 
    margin: 20, 
    maxWidth: 500, 
    textAlign: "center"
  }
  const titleStyle = {
    color: "white",
    fontSize: 24, 
    fontWeight: "bold",
    marginTop: 20, 
  }
  const textFieldStyle: CSSProperties = {
    width: "100%", 
    marginBottom: 20, 
    backgroundColor: "white", 
    borderRadius: 5,
  };
  const labelStyle: CSSProperties = { 
    fontSize: 20, 
    margin: "0px 10px 4px 5px"
  }
  const buttonStyle: CSSProperties = {
    width: "100%", 
    marginTop: 5, 
    borderRadius: 25,
    fontSize: 18, 
    backgroundColor: buttonColor[0], 
    color: buttonColor[1],
  }
  const alertStyle: CSSProperties = {
    color: '#F7B249', 
    fontWeight: "bold",
    margin: "20px 0",
  }

  // 共通の入力フィールドスタイル
  const inputFieldSx = {
    '& .MuiFilledInput-input': {
      paddingLeft: '20px',
      paddingRight: '20px'
    }
  };

  // 複数行入力フィールド用スタイル
  const multilineFieldSx = {
    '& .MuiFilledInput-input': {
      padding: '10px'
    }
  };

  // セレクトボックス用スタイル
  const selectSx = {
    '& .MuiSelect-select': {
      textAlign: 'left',
      justifyContent: 'flex-start',
      paddingLeft: '20px',
      paddingRight: '20px'
    }
  };

  // アプリ一覧を取得（ホーム以外）
  const appList = myApp(1024, isJa).filter((_, index) => index !== myAppNumber.home);

  return <div style={contactStyle}>
    <h2 style={titleStyle}>{myForm(isJa)[0].title}</h2>
    <p style={alertStyle}>{alertMessage}</p>
    <form onSubmit={handleSubmit}>
      <TextField style={textFieldStyle} type="text" required
        name={myForm(isJa)[0].number.name} color="warning" variant="filled"
        label={<><AccountIcon style={labelStyle}/>{myForm(isJa)[0].label.name}</>} 
        value={name} onChange={handleFamilyNameChange} 
        sx={inputFieldSx}
      />
      <TextField style={textFieldStyle} type="text" required 
        name={myForm(isJa)[0].number.email} color="warning" variant="filled"
        label={<><MailIcon style={labelStyle}/>{myForm(isJa)[0].label.email}</>} 
        value={email} onChange={handleEmailChange}
        sx={inputFieldSx}
      />
      <FormControl style={textFieldStyle} variant="filled" color="warning" required>
        <InputLabel><IoSquareOutline style={labelStyle}/>{myForm(isJa)[0].label.app}</InputLabel>
        <Select
          value={selectedApp}
          onChange={handleAppChange}
          name={myForm(isJa)[0].number.app}
          sx={selectSx}
        >
          <MenuItem value="">
            <em>{isJa ? "アプリを選択してください" : "Please select an app"}</em>
          </MenuItem>
          {appList.map((app, index) => (
            <MenuItem key={index} value={app.text.menu}>
              {app.text.menu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField 
        style={textFieldStyle} type="text" required multiline rows={6}
        name={myForm(isJa)[0].number.message} color="warning" variant="filled"
        label={<><Edit style={labelStyle}/>{myForm(isJa)[0].label.message}</>} 
        value={message} onChange={handleMessageChange}
        sx={multilineFieldSx}
      />
      <input
        type="hidden"
        name="g-recaptcha-response"
        value={recaptchaToken}
      />
      <Button type="submit" style={buttonStyle}>
        <p>{myForm(isJa)[0].submit}</p>
      </Button>
    </form>
    <iframe name="hidden_iframe" style={{display:"none"}} onLoad={handleIframeLoad}></iframe>
  </div> 
}

const ContactBody: NextPage<Props> = ({ isJa }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey} language={isJa ? 'ja': 'en'}>
      <ContactBodyInner isJa={isJa} />
    </GoogleReCaptchaProvider>
  );
};

export default ContactBody;