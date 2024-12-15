import { NextPage } from 'next'
import React, { CSSProperties } from 'react';
import '../../src/app/globals.css';
import Link from 'next/link';
import { isSP, createdDate, updatedDate, termsLabel, termsTitle, termsMessage, policyLabel, policyTitle, policyMessage, policyLink } from '../../public/utils/constants';

interface Props {
  width: number
  isJa: boolean
}

const TermsPage: NextPage<Props> = ({width, isJa}) => { 

  const termsStyle: CSSProperties = {
    maxWidth: 800,
    fontSize: isSP(width) ? 14: 18,
    display: "flex",
    color: "white",
    flexDirection: "column", 
    margin: 20, 
  }
  const dateStyle: CSSProperties = {
    fontSize: isSP(width) ? 14: 16,
    fontWeight: "bold",
    textAlign: "right",
    margin: "10px 20px 0px auto",
  }
  const termsLabelStyle: CSSProperties = {
    fontSize: isSP(width) ? 24: 28,
    fontWeight: "bold",
    textAlign: "center",
    margin: "60px 0px 10px 0px",
  }
  const termsTitleStyle: CSSProperties = {
    fontSize: isSP(width) ? 18: 22,
    fontWeight: "normal",
    textAlign: "left",
    textDecoration: 'underline',
    margin: "10px 10px 20px 10px",
  }
  const containerStyle: CSSProperties = {
    margin: "20px 0",
  }
  const messageStyle: CSSProperties = {
    textAlign: 'left', 
    margin: 5,
  }
  const policyLinkTitleStyle: CSSProperties = {
    margin: 5,
    textDecoration: "underline"
  }

  return <div className="flex_center" style={termsStyle}>
    <p style={termsLabelStyle}>{termsLabel(isJa)}</p>
    <p style={dateStyle}>{createdDate(isJa)}</p>
    <p style={dateStyle}>{updatedDate(isJa)}</p>
    {termsTitle(isJa).map((term, i) => <div style={containerStyle} key={`termsTitle_${i}`}>
      <h1 style={termsTitleStyle}>{`${i+1}. ${termsTitle(isJa)[i]}`}</h1>
      <p style={messageStyle} key={`termsMessage_${i}`}>{termsMessage(isJa)[i]}</p>
    </div>)}
    <p style={termsLabelStyle}>{policyLabel(isJa)}</p>
    <p style={dateStyle}>{createdDate(isJa)}</p>
    <p style={dateStyle}>{updatedDate(isJa)}</p>
    {policyTitle(isJa).map((title, k) => <div style={containerStyle} key={`policyTitle_${k}`}>
      <h1 style={termsTitleStyle}>{`${k+1}. ${title}`}</h1>
      <p style={messageStyle} key={`policyMessage_${k}`}>{policyMessage(isJa)[k]}</p>
      {(k == 2) && policyLink.map((link, m) => <li style={policyLinkTitleStyle} key={`policyLink_${m}`}>
        <Link href={link.url}>{link.title}</Link>
      </li>)}
    </div>)}
  </div>
}

export default TermsPage
