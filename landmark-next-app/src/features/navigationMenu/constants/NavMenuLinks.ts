import { NavigationMenuItem } from "../types/navigationMenuItem";

export const homePageNavItemProps: NavigationMenuItem[] = [
  {navItemLabel: "About",     navLinkHref: "/about",    isDropdown: false},
  {navItemLabel: 'Features',  navLinkHref: '/features', isDropdown: false},
  {navItemLabel: 'Contact',   navLinkHref: '/contact',  isDropdown: false},
];

export const mainPageNavItemProps: NavigationMenuItem[] = [
  {navItemLabel: 'Categories', navLinkHref: '/categories', isDropdown: true},
  {navItemLabel: 'About',      navLinkHref: '/about',      isDropdown: false},
];