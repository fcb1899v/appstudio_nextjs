import { NextPage } from 'next'
import React, { CSSProperties, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import '../../src/app/globals.css';
import AccountIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Edit from '@mui/icons-material/Edit';
import { myForm } from "../../public/utils/constants";

interface Props {
  isJa: boolean
}

const ContactBody: NextPage<Props> = ({isJa}) => { 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sentMessage, setSentMessage] = useState(false);
  const [buttonColor, setButtonColor] = useState(['gray', 'white']);
  const handleFamilyNameChange = (e: any) => { setName(e.target.value); };
  const handleEmailChange = (e: any) => { setEmail(e.target.value); };
  const handleMessageChange = (e: any) => { setMessage(e.target.value); };

  useEffect(() => {
    setAlertMessage(
      (sentMessage) ? myForm(isJa)[0].alert.success:
      (name === "" && email === "" && message === "") ? myForm(isJa)[0].alert.default:
      (name === "") ? myForm(isJa)[0].alert.name:
      (email === "") ? myForm(isJa)[0].alert.email:
      (!email.match(/.+@.+\..+/)) ? myForm(isJa)[0].alert.invalid:
      (message === "") ? myForm(isJa)[0].alert.message:
      myForm(isJa)[0].alert.submit
    );
    setButtonColor(
      (
        name != "" && 
        email != "" && 
        email.match(/.+@.+\..+/) && 
        message != "" 
      ) ? ['#F7B249', 'black']: ['gray', 'white']
    );
    if (submitted) {
      setName("");
      setEmail("");
      setMessage("");  
      setSentMessage(true);
      setTimeout(() => { window.location.href = "/";}, 3000);     
    }
  }, [name, email, message, sentMessage, submitted]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (buttonColor[1] == "black") {
      setSubmitted(true);
      alert(myForm(isJa)[0].alert.confirm);
      e.target.submit();
    } 
  };
  const handleIframeLoad = (e: any) => {};

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
  const buttonStyle = {
    width: "100%", 
    marginTop: 5, 
    borderRadius: 25,
    fontSize: 18, 
    backgroundColor: buttonColor[0], 
    color: buttonColor[1],
  }
  const alertStyle = {
    color: '#F7B249', 
    fontWeight: "bold",
    margin: "20px 0",
  }

  return (
    <div style={contactStyle}>
      <h2 style={titleStyle}>{myForm(isJa)[0].title}</h2>
      <p style={alertStyle}>{alertMessage}</p>
      <form action={myForm(isJa)[0].url} method="POST" target="hidden_iframe" onSubmit={handleSubmit}>
        <TextField style={textFieldStyle} type="text" required
          name={myForm(isJa)[0].number.name} color="warning" variant="filled"
          label={<><AccountIcon style={labelStyle}/>{myForm(isJa)[0].label.name}</>} 
          value={name} onChange={handleFamilyNameChange} 
        />
        <TextField style={textFieldStyle} type="text" required 
          name={myForm(isJa)[0].number.email} color="warning" variant="filled"
          label={<><MailIcon style={labelStyle}/>{myForm(isJa)[0].label.email}</>} 
          value={email} onChange={handleEmailChange}
        />
        <TextField 
          style={textFieldStyle} type="text" required multiline rows={6}
          name={myForm(isJa)[0].number.message} color="warning" variant="filled"
          label={<><Edit style={labelStyle}/>{myForm(isJa)[0].label.message}</>} 
          value={message} onChange={handleMessageChange}
        />
        <Button type="submit" style={buttonStyle}>
          <p>{myForm(isJa)[0].submit}</p>
        </Button>
      </form>
      <iframe name="hidden_iframe" style={{display:"none"}} onLoad={handleIframeLoad}></iframe>
    </div>
  );
};

export default ContactBody