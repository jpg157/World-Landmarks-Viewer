import React from 'react'
import Image from 'next/image'

type FooterProps = {
  fixedToBottomPosition: boolean;
}

const Footer = (footerProps: FooterProps) => {

  let footerPositionCSSClass: string;

  if (footerProps.fixedToBottomPosition)
  {
    footerPositionCSSClass = "absolute bottom-0";
  }
  else
  {
    footerPositionCSSClass = "sticky";
  }

  return (
    <footer className={`footer bg-neutral text-neutral-content items-center p-4 ${footerPositionCSSClass}`}>
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">

        <a href="https://github.com/jpg157" target="_blank">
          <Image
            src="/socialMediaIcons/github-white.svg"
            alt='github_link'
            height={32}
            width={32}
          />
        </a>

        <a href="https://www.linkedin.com/in/jason-lau1/" target="_blank">
          <Image
            src="/socialMediaIcons/linkedin-white.svg"
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
