import { NextPage } from 'next'
import React, { CSSProperties, useEffect, useState } from 'react';
import '../../src/app/globals.css';
import Link from 'next/link';

interface Props {
  width: number
  isJa: boolean
}

const PrivacyPolicy: NextPage<Props> = ({width, isJa}) => { 

  const isSP = (width < 600);

  const updatedDate = isJa ? "更新日: 2023/8/1": "Effective Date: August 1, 2023";
  const termsTitles = [
    isJa ? "利用規約": "Terms of Servive",
    isJa ? "＜免責事項＞": "  <Disclaimer>",
    isJa ? "＜知的財産権＞": "  <Intellectual Property>"
  ]
  const termsMessages = [
    [
      "本利用規約（以下「本規約」）は、本アプリを端末にインストールした個人（以下「利用者」）に適用されます。",
      "本アプリは、利用者本人が個人利用する目的でのみ利用することができます。",
      "本アプリを端末にインストールすることにより、利用者は本規約に同意したものとみなされます。",
      "本アプリの利用に際しては、本規約をよくお読みいただき、理解した上でご利用ください。",
      "本規約は予告なく変更されることがありますので、常に最新の内容を確認してください。",
      "本規約に関し、何かご質問や懸念がございましたら、お問い合わせのページからお問い合わせください。"
    ],
    [
      "本アプリに不具合が生じないこと、本アプリが利用者の端末に対応することを当方は保証いたしません。",
      "推奨のOS/端末であっても端末の状況により正常に動作しない場合があります。利用者が本アプリを利用できなかった場合、当方はその一切の責任を追いません。",
      "本アプリの内容を利用者の事前の承諾なしに変更することがあります。",
      "利用者が本アプリを利用した際に、当方の責のない理由によって損害を受けた場合、利用者が本アプリを利用して、他の利用者または第三者に対して損害を与えた場合、当方はその一切の責任を追いません。",
      "本アプリのダウンロードやその他利用時にかかる通信費用は、利用者が負担するものとします。",
    ],
    [
      "本アプリおよび本ウェブページに関する著作権等の全ての知的財産権は、当方またはコンテンツを提供した第三者に帰属し、全てのコンテンツの無断転載は禁止します。",
      "本アプリおよび本ウェブページに関して、知的財産権の問題が生じた場合、当方はその一切の責任を追いません。",
    ],
  ];
  const policy = isJa ? "プライバシーポリシー": "Privacy Policy";
  const policyTitles = [
    "＜データの管理・共有＞",
    "＜広告・利用情報の取得＞",
    "＜メールアドレスの取得＞",
  ]
  const policyMessages = [
    [
      "本アプリでは、取得した個人情報が漏洩、紛失、改竄、不正アクセスされないよう適切に管理します。",
      "利用者から同意を得た場合、もしくは法令に基づく開示要求があった場合を除き、原則として、個人情報を第三者に開示いたしません。",
    ],
    [
      "本アプリでは、Google LLCが提供するGoogle Analytics、AdMob、Firebase Analyticsを用いて、広告配信および利用状況の分析をしています。",
      "これらのサービスは、匿名化されたデータを使用し、個人を特定する情報は含まれていません。",
      "これらにより、より良いユーザーエクスペリエンスの提供やアプリの改善に役立てています。",
      "取得情報、利用目的、第三者への情報提供等の詳細につきましては、以下の利用規約・プライバシーポリシーのリンクをご確認ください。",
    ],  
    [
      "本アプリでは、ログインの際に、利用者のメールアドレスを取得する場合があります。これにより、利用者がデータのバックアップを取ることが可能になります。利用者の意思で、メールアドレスを提供しないことも選択できます。",
      "利用者のメールアドレスは、データのバックアップ、利用者への連絡、本アプリの品質向上のための統計、分析、アンケート等のマーケティング活動に利用いたします。",
    ],
  ]
  const policyLinks = [
    `https://policies.google.com/privacy`,
    `https://support.google.com/admob/answer/48182`,
    `https://firebase.google.com/policies/analytics`,
  ]
  const policyLinkTitles = [
    `Google Analytics`,
    `AdMob`,
    `Firebase Analytics`,
  ]

  const termsStyle: CSSProperties = {
    maxWidth: 800,
    fontSize: isSP ? 14: 18,
    display: "flex",
    color: "white",
    flexDirection: "column", 
    margin: 20, 
  }
  const dateStyle: CSSProperties = {
    fontSize: isSP ? 14: 18,
    fontWeight: "bold",
    textAlign: "right",
    margin: "20px 20px 0px auto",
  }
  const termsTitlesStyle = (i: number): CSSProperties => ({
    fontSize: (i == 0) ? (isSP ? 24: 28): (isSP ? 20: 24),
    fontWeight: (i == 0) ? "bold": "normal",
    textAlign: "center",
    margin: "10px 0 30px 0",
  })
  const policyStyle: CSSProperties = {
    fontSize: isSP ? 24: 28,
    fontWeight: "bold",
    textAlign: "center",
    margin: "40px 0 30px 0",
  }
  const titlesStyle: CSSProperties = {
    fontSize: isSP ? 20: 24,
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

  return (<div className="flex_center" style={termsStyle}>
    <p style={dateStyle}>{updatedDate}</p>
    {termsTitles.map((_, i) => (<div style={containerStyle} key={`terms_${i}`}>
      <h1 style={termsTitlesStyle(i)} key={`termsTitle_${i}`}>{termsTitles[i]}</h1>
      {termsMessages[i].map((_, j) => (<p style={messageStyle} key={`termsMessage_${i}_${j}`}>{termsMessages[i][j]}</p>))}
    </div>))}
    <p style={policyStyle}>{policy}</p>
    {policyTitles.map((_, i) => (<div style={containerStyle} key={`policy_${i}`}>
      <h1 style={titlesStyle} key={`policyTitle_${i}`}>{policyTitles[i]}</h1>
      {policyMessages[i].map((_, j) => (<p style={messageStyle} key={`policyMessage_${i}_${j}`}>{policyMessages[i][j]}</p>))}
      {(i == 1) && policyLinks.map((_, j) => (<li style={policyLinkTitleStyle} key={`policyLink_${j}`}>
        <Link href={policyLinks[j]}>{policyLinkTitles[j]}</Link>
      </li>))}
    </div>))}
  </div>);
};



export default PrivacyPolicy
