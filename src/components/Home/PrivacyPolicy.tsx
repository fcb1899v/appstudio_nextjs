import { NextPage } from 'next'
import { CSSProperties } from 'react';
import '@/app/globals.css';
import { isSP, 
  termsCreatedDate, termsUpdatedDate, termsLabel, termsTitle, termsMessage, 
  policyCreatedDate, policyUpdatedDate, policyLabel, policyTitle, policyMessage, 
  cookieCreatedDate, cookieUpdatedDate, cookieLabel, cookieTitle, cookieMessage, 
} from '@/utils/constants';

/**
 * Interface for privacy policy component props
 * Defines the properties required for rendering privacy policy page
 */
interface Props {
  width: number
  isJa: boolean
}

/**
 * Component for displaying privacy policy page
 * Shows terms of service, privacy policy, and cookie policy
 * @param width - Screen width for responsive design
 * @param isJa - Language preference (Japanese or English)
 */
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

  return <div className="flex_center" style={termsStyle}>
    <p style={termsLabelStyle}>{termsLabel(isJa)}</p>
    <p style={dateStyle}>{termsCreatedDate(isJa)}</p>
    <p style={dateStyle}>{termsUpdatedDate(isJa)}</p>
    {termsTitle(isJa).map((_, i) => <div style={containerStyle} key={`termsTitle_${i}`}>
      <h1 style={termsTitleStyle}>{`${i+1}. ${termsTitle(isJa)[i]}`}</h1>
      <p style={messageStyle} key={`termsMessage_${i}`}>{termsMessage(isJa)[i]}</p>
    </div>)}
    <p style={termsLabelStyle}>{policyLabel(isJa)}</p>
    <p style={dateStyle}>{policyCreatedDate(isJa)}</p>
    <p style={dateStyle}>{policyUpdatedDate(isJa)}</p>
    {policyTitle(isJa).map((_, j) => <div style={containerStyle} key={`policyTitle_${j}`}>
      <h1 style={termsTitleStyle}>{`${j+1}. ${policyTitle(isJa)[j]}`}</h1>
      <p style={messageStyle} key={`policyMessage_${j}`}>{policyMessage(isJa)[j]}</p>
    </div>)}
    <p style={termsLabelStyle}>{cookieLabel(isJa)}</p>
    <p style={dateStyle}>{cookieCreatedDate(isJa)}</p>
    <p style={dateStyle}>{cookieUpdatedDate(isJa)}</p>
    {cookieTitle(isJa).map((_, k) => <div style={containerStyle} key={`cookieTitle_${k}`}>
      <h1 style={termsTitleStyle}>{`${k+1}. ${cookieTitle(isJa)[k]}`}</h1>
      <p style={messageStyle} key={`cookieMessage_${k}`}>{cookieMessage(isJa)[k]}</p>
    </div>)}
  </div>
}

export default TermsPage
