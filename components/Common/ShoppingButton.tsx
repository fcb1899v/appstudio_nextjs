import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, useEffect, useState } from 'react';
import { myApp } from '../../public/utils/constants';

interface Props {
  appNumber: number
}

const ShoppingButton: NextPage<Props> = ({appNumber}) => {

  const link = 'https://letselevator.designstore.jp/'
  const image = `/images/sns/present_w.svg`

  // const [isVisible, setIsVisible] = useState(true);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isTop = (window.scrollY == 0);
  //     setIsVisible(!isTop);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const shoppingButtonStyle: CSSProperties = {
    position: "fixed", 
    top: 20, 
    right: 20, 
    zIndex: 101, 
    cursor: "pointer"
  }

  return <Link href={link} style={shoppingButtonStyle}>
    <Image src={image} alt={'shopping'} width={30} height={30}/>
  </Link>
}

export default ShoppingButton;