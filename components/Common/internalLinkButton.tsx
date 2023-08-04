import { NextPage } from 'next'

interface Props {
  title: string
  link: string
}

const internalLinkButton: NextPage<Props> = ({ title, link }) => { 
  const handleClick = () => {
    const target = document.getElementById(link);
    if (target) {
      target.scrollIntoView({behavior: "smooth", block: "start",});
    }
  };
  return <button onClick={handleClick}>{title}</button>;
}

export default internalLinkButton