import React from 'react';

export interface CardNavLink {
  label: string;
  href: string;
  ariaLabel?: string;
  active?: boolean;
}

export interface CardNavItem {
  label: string;
  description?: string;
  bgColor?: string;
  textColor?: string;
  links?: CardNavLink[];
}

export interface CardNavProps {
  logo?: React.ReactNode;
  logoAlt?: string;
  logoHref?: string;
  items?: CardNavItem[];
  cta?: {
    label: string;
    href?: string;
    onClick?: (event: React.MouseEvent) => void;
  };
  cartSlot?: React.ReactNode;
  theme?: 'dark' | 'light';
  surface?: 'glass' | 'solid';
  openOn?: 'click' | 'hover';
  cardEffect?: 'rise' | 'unfold' | 'fade';
  stagger?: number;
  bounce?: number;
  speed?: number;
  cardHeight?: number;
  maxWidth?: number | string;
  accentColor?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ease?: string;
  menuLabel?: boolean;
  intro?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  linkComponent?: React.ElementType;
  onLinkClick?: (link: CardNavLink, item: CardNavItem, event: React.MouseEvent) => void;
  currentPath?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare const CardNav: React.FC<CardNavProps>;
export default CardNav;
