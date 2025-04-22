import { NavigationMenuProps } from "../types/navigationMenuProps";

export const homePageNavItemProps: NavigationMenuProps[] = [
  {navItemLabel: "About",     navLinkHref: "/about",    isDropdown: false},
  {navItemLabel: 'Features',  navLinkHref: '/features', isDropdown: false},
  {navItemLabel: 'Contact',   navLinkHref: '/contact',  isDropdown: false},
];

export const mainPageNavItemProps: NavigationMenuProps[] = [
  {navItemLabel: 'Categories', navLinkHref: '/categories', isDropdown: true},
  {navItemLabel: 'About',      navLinkHref: '/about',      isDropdown: false},
];