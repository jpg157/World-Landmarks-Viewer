import { NavigationMenuProps } from "../types/navigationMenuProps";

// String hrefs should match component route folder names

export const homePageNavItemProps: NavigationMenuProps[] = [
  {navItemLabel: 'About',    navLinkHref: '/about',    isDropdown: false},
  {navItemLabel: 'Features', navLinkHref: '/features', isDropdown: false},
  {navItemLabel: 'Contact',  navLinkHref: '/contact',  isDropdown: false},
];

export const mainPageNavItemProps: NavigationMenuProps[] = [
  // {navItemLabel: 'Home', navLinkHref: '/home', isDropdown: true},
  {navItemLabel: 'Categories', navLinkHref: '/categories', isDropdown: true},
  {navItemLabel: 'Favourites', navLinkHref: '/favourites', isDropdown: false},
  {navItemLabel: 'About',      navLinkHref: '/about',      isDropdown: false},
];
