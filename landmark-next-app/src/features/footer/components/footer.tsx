import React from 'react'
import Image from 'next/image'
import githubLogo from '@/images/socialMediaIcons/github-white.svg';
import linkedInLogo from '@/images/socialMediaIcons/linkedin-white.svg';

export type FooterProps = {
  fixedToBottomPosition: boolean;
}

const Footer = (footerProps: FooterProps) => {

  let footerPositionCSSClassVal: string;

  if (footerProps.fixedToBottomPosition)
  {
    footerPositionCSSClassVal = "absolute bottom-0";
  }
  else
  {
    footerPositionCSSClassVal = "sticky";
  }

  return (//items-center p-4 footer sm:footer-horizontal bg-neutral text-neutral-content rounded
    <footer className={`footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 ${footerPositionCSSClassVal}`}>
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">

        <a href="https://github.com/jpg157" target="_blank">
          <Image
            src={githubLogo}
            alt='github_link'
            height={32}
            width={32}
          />
        </a>

        <a href="https://www.linkedin.com/in/jason-lau1/" target="_blank">
          <Image
            src={linkedInLogo}
            alt='linkedin_link'
            height={32}
            width={32}
          />
        </a>

      </nav>
    </footer>
  )
}

export default Footer
