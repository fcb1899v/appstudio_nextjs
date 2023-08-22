import { NextPage } from 'next'
import React, { CSSProperties } from 'react';
import '../../src/app/globals.css';
import Link from 'next/link';
import { isSP, updatedDate, terms, policyTitle, policys } from '../../public/utils/constants';

interface Props {
  width: number
  isJa: boolean
}

const PrivacyPolicy: NextPage<Props> = ({width, isJa}) => { 

  const termsStyle: CSSProperties = {
    maxWidth: 800,
    fontSize: isSP(width) ? 14: 18,
    display: "flex",
    color: "white",
    flexDirection: "column", 
    margin: 20, 
  }
  const dateStyle: CSSProperties = {
    fontSize: isSP(width) ? 14: 18,
    fontWeight: "bold",
    textAlign: "right",
    margin: "20px 20px 0px auto",
  }
  const termsTitlesStyle = (i: number): CSSProperties => ({
    fontSize: (i == 0) ? (isSP(width) ? 24: 28): (isSP(width) ? 20: 24),
    fontWeight: (i == 0) ? "bold": "normal",
    textAlign: "center",
    margin: "10px 0 30px 0",
  })
  const policyStyle: CSSProperties = {
    fontSize: isSP(width) ? 24: 28,
    fontWeight: "bold",
    textAlign: "center",
    margin: "40px 0 30px 0",
  }
  const titlesStyle: CSSProperties = {
    fontSize: isSP(width) ? 20: 24,
    textAlign: "center",
    margin: "10px 0 40px 0",
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
    <p style={dateStyle}>{updatedDate(isJa)}</p>
    {terms(isJa).map((term, i) => <div style={containerStyle} key={`terms_${i}`}>
      <h1 style={termsTitlesStyle(i)}>{term.title}</h1>
      {term.message.map((message, j) => <p style={messageStyle} key={`termsMessage_${i}_${j}`}>{message}</p>)}
    </div>)}
    <p style={policyStyle}>{policyTitle(isJa)}</p>
    {policys(isJa).map((policy, k) => <div style={containerStyle} key={`policy_${k}`}>
      <h1 style={titlesStyle}>{policy.title}</h1>
      {policy.message.map((message, l) => <p style={messageStyle} key={`policyMessage_${k}_${l}`}>{message}</p>)}
      {(policy.link[0] != "") && policy.link.map((link, m) => <li style={policyLinkTitleStyle} key={`policyLink_${k}_${m}`}>
        <Link href={policy.url[m]}>{link}</Link>
      </li>)}
    </div>)}
  </div>
}



export default PrivacyPolicy
