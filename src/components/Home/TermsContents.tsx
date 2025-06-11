import { NextPage } from 'next'
import React, { CSSProperties, useEffect } from 'react';
import '@/app/globals.css';
import Link from 'next/link';
import { termsLabel, termsCreatedDate, termsUpdatedDate, termsTitle, termsMessage, termsLinkWords,
         policyLabel, policyCreatedDate, policyUpdatedDate, policyTitle, policyMessage, privacyLinkWords,  
         cookieLabel, cookieCreatedDate, cookieTitle, cookieMessage, cookieLinkWords, cookieUpdatedDate,  
} from '@/utils/constants';

interface Props {
  isJa: boolean
}

const TermsContents: NextPage<Props> = ({isJa}) => { 

  useEffect(() => {
    // Executes when the page is mounted on the client side
    const hash = window.location.hash; // Example: "#cookie", etc.
    if (hash) {
      // Find the target element and scroll to it
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const termsStyle: CSSProperties = {
    maxWidth: 840,
    fontSize: 18,
    display: "flex",
    color: "white",
    flexDirection: "column", 
    margin: 20, 
  }
  const dateStyle: CSSProperties = {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    margin: "10px 20px 0px auto",
  }
  const termsLabelStyle: CSSProperties = {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    margin: "60px 0px 10px 0px",
  }
  const cookieLabelStyle: CSSProperties = {
    ...termsLabelStyle,
    scrollMarginTop: "100px",
  }
  const termsTitleStyle: CSSProperties = {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    textDecoration: 'underline',
    margin: "10px 10px 20px 10px",
  }
  const containerStyle: CSSProperties = {
    margin: "20px 0",
  }
  const messageStyle: CSSProperties = {
    fontSize: 16,
    textAlign: 'left', 
    margin: 5,
  }
  
  return <div className="flex_center" style={termsStyle}>
    {/* // Terms of services */}
    <p id={"terms"} style={termsLabelStyle}>{termsLabel(isJa)}</p>
    <p style={dateStyle}>{termsCreatedDate(isJa)}</p>
    <p style={dateStyle}>{termsUpdatedDate(isJa)}</p>
    {termsTitle(isJa).map((term, i) => <div style={containerStyle} key={`termsTitle_${i}`}>
      <h1 style={termsTitleStyle}>{`${i+1}. ${term}`}</h1>
      <p style={messageStyle} key={`termsMessage_${i}`}>
        {transformTextWithLinks(termsMessage(isJa)[i], termsLinkWords(isJa))}
      </p>
    </div>)}
    {/* // Privacy Policy */}
    <p id={"policy"} style={termsLabelStyle}>{policyLabel(isJa)}</p>
    <p style={dateStyle}>{policyCreatedDate(isJa)}</p>
    <p style={dateStyle}>{policyUpdatedDate(isJa)}</p>
    {policyTitle(isJa).map((title, j) => <div style={containerStyle} key={`policyTitle_${j}`}>
      <h1 style={termsTitleStyle}>{`${j+1}. ${title}`}</h1>
      <p style={messageStyle} key={`policyMessage_${j}`}>
        {transformTextWithLinks(policyMessage(isJa)[j], privacyLinkWords(isJa))}
      </p>
    </div>)}
    {/* // Cookie Policy */}
    <p id={"cookie"} style={cookieLabelStyle}>{cookieLabel(isJa)}</p>
    <p style={dateStyle}>{cookieCreatedDate(isJa)}</p>
    <p style={dateStyle}>{cookieUpdatedDate(isJa)}</p>
    {cookieTitle(isJa).map((cookie, k) => <div style={containerStyle} key={`cookieTitle_${k}`}>
      <h1 style={termsTitleStyle}>{`${k+1}. ${cookie}`}</h1>
      <p style={messageStyle} key={`cookieMessage_${k}`}>
        {transformTextWithLinks(cookieMessage(isJa)[k], cookieLinkWords(isJa))}
      </p>
    </div>)}
  </div>
}

// Function to replace words in the text with <Link> for creating hyperlinks
function transformTextWithLinks(text: string, linkWords: {word: string; href: string;}[]): React.ReactNode {
  // Escape special characters in regular expressions if the word might contain them
  function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  // Combine all the words in linkWords into an "OR" condition
  // Example: generate a regular expression like /(Terms of Service|Privacy Policy|...)/g
  const pattern = new RegExp(
    `(${linkWords.map(({ word }) => escapeRegExp(word)).join('|')})`,
    'g'
  );
  // When splitting, the "matched strings" are also kept as array elements
  // ["normal text", "Terms of Service", "other text", "Privacy Policy", ...]
  const parts = text.split(pattern);
  // Iterate over parts, create <Link> for words that should be linked, otherwise return as normal text
  return parts.map((part, index) => {
    // Find the matching word in linkWords
    const matched = linkWords.find(({ word }) => word === part);
    if (matched) {
      // If it’s a word to be linked, return <Link>
      return (
        <Link
          key={index}
          href={matched.href}
          style={{ color: '#F7B249', textDecoration: 'underline' }}
        >
          {matched.word.replace(/[<>]/g, '')}
        </Link>
      );
    } else {
      // Otherwise, return the text as normal text
      return <React.Fragment key={index}>{part}</React.Fragment>;
    }
  });
}

export default TermsContents
