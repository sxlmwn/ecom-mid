/* eslint-disable */
'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import './CardNav.css';

const THEMES = {
  dark: {
    '--cn-panel': 'rgba(38, 35, 46, 0.72)',
    '--cn-solid': '#26232e',
    '--cn-edge': 'rgba(255, 255, 255, 0.08)',
    '--cn-highlight': 'rgba(255, 255, 255, 0.07)',
    '--cn-shadow': '0 24px 48px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
    '--cn-text': '#f4f4f5',
    '--cn-muted': 'rgba(244, 244, 245, 0.56)',
    '--cn-hover': 'rgba(255, 255, 255, 0.06)',
    '--cn-ring': 'rgba(244, 244, 245, 0.55)',
    '--cn-tile': 'linear-gradient(180deg, #34303d 0%, #27242f 100%)',
    '--cn-tile-rim':
      'inset 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 10px -4px rgba(0, 0, 0, 0.6)',
    '--cn-cta': 'linear-gradient(180deg, #ffffff 0%, #ebebf0 100%)',
    '--cn-cta-ink': '#121016',
    '--cn-cta-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 6px 16px -6px rgba(0, 0, 0, 0.6)',
    '--cn-cta-hover': 'brightness(0.94)'
  },
  light: {
    '--cn-panel': 'rgba(255, 248, 240, 0.95)',
    '--cn-solid': '#FFF8F0',
    '--cn-edge': 'rgba(75, 46, 32, 0.12)',
    '--cn-highlight': 'rgba(255, 255, 255, 0.95)',
    '--cn-shadow': '0 20px 40px -15px rgba(43, 27, 18, 0.18), 0 4px 12px -4px rgba(43, 27, 18, 0.08)',
    '--cn-text': '#4B2E20',
    '--cn-muted': 'rgba(75, 46, 32, 0.72)',
    '--cn-hover': 'rgba(75, 46, 32, 0.06)',
    '--cn-ring': '#E67E22',
    '--cn-tile': 'linear-gradient(180deg, #ffffff 0%, #fdf8f4 100%)',
    '--cn-tile-rim':
      'inset 0 0 0 1px rgba(75, 46, 32, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1), 0 4px 10px -5px rgba(43, 27, 18, 0.15)',
    '--cn-cta': '#E67E22',
    '--cn-cta-ink': '#ffffff',
    '--cn-cta-shadow': '0 4px 12px -2px rgba(230, 126, 34, 0.35)',
    '--cn-cta-hover': 'brightness(0.95)'
  }
};

const ROOT = 'card-nav';
const PANEL = 'card-nav__panel';
const RIM = 'card-nav__rim';
const BAR = 'card-nav__bar';
const MENU = 'card-nav__menu';
const BURGER = 'card-nav__burger';
const LINE_TOP = 'card-nav__line card-nav__line--top';
const LINE_BOTTOM = 'card-nav__line card-nav__line--bottom';
const MENU_LABEL = 'card-nav__menu-label';
const WORD_OPEN = 'card-nav__word card-nav__word--open';
const WORD_CLOSE = 'card-nav__word card-nav__word--close';
const LOGO = 'card-nav__logo';
const CTA = 'card-nav__cta';
const CTA_WIDE = 'card-nav__cta card-nav__cta--wide';
const CONTENT = 'card-nav__content';
const CARDS = 'card-nav__cards';
const CARD = 'card-nav__card';
const CARD_HEAD = 'card-nav__card-head';
const LABEL = 'card-nav__label';
const DESCRIPTION = 'card-nav__description';
const LINKS = 'card-nav__links';
const LINK = 'card-nav__link';
const ARROW = 'card-nav__arrow';
const ARROW_OUT = 'card-nav__arrow-icon card-nav__arrow-icon--out';
const ARROW_IN = 'card-nav__arrow-icon card-nav__arrow-icon--in';

const DEFAULT_ITEMS = [
  {
    label: 'Menu',
    description: 'Fresh campus meals & daily artisan brews',
    links: [
      { label: 'Breakfast', href: '/breakfast' },
      { label: 'Lunch', href: '/lunch' },
      { label: 'Fast Food', href: '/fast-food' },
      { label: 'Beverages', href: '/beverages' }
    ]
  },
  {
    label: 'Shop',
    description: 'All 35 student items & academic stationery',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Bestsellers', href: '/shop?bestseller=1' },
      { label: 'Stationery', href: '/stationery' }
    ]
  },
  {
    label: 'Cafe',
    description: 'COMSATS University student dining center',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
      { label: 'Visit Us', href: '/contact' },
      { label: 'How to Order', href: '/#how-to-order' }
    ]
  }
];

const NARROW = 768;
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const easeOut = t => 1 - (1 - t) ** 3;

const CardNav = ({
  logo,
  logoAlt = 'CUI Cafe',
  logoHref = '/',
  items = DEFAULT_ITEMS,
  cta,
  cartSlot,
  theme = 'light',
  surface = 'glass',
  openOn = 'click',
  cardEffect = 'rise',
  stagger = 0.12,
  bounce = 0.2,
  speed = 1,
  cardHeight = 180,
  maxWidth = 1200,
  accentColor,
  baseColor = '#FFF8F0',
  menuColor = '#4B2E20',
  buttonBgColor = '#E67E22',
  buttonTextColor = '#FFFFFF',
  ease = 'power3.out',
  menuLabel = true,
  intro = true,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  linkComponent: LinkComponent = 'a',
  onLinkClick,
  currentPath = '',
  ariaLabel = 'Main Navigation',
  className = '',
  style
}) => {
  const contentId = useId();
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const menuRef = useRef(null);
  const cardRefs = useRef([]);
  const engineRef = useRef(null);
  const leaveRef = useRef(0);
  const barRef = useRef(null);
  const [openState, setOpenState] = useState(defaultOpen);
  const [narrow, setNarrow] = useState(false);
  const [shown, setShown] = useState(defaultOpen);

  const controlled = openProp !== undefined;
  const hasCta = Boolean(cta);
  const open = controlled ? openProp : openState;

  const settings = {
    open,
    cardEffect,
    stagger: clamp(stagger, 0, 0.3),
    bounce: clamp(bounce, 0, 1),
    speed: clamp(speed, 0.2, 3)
  };
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  });

  const palette = THEMES[theme] ?? THEMES.light;
  const vars = {
    ...palette,
    '--cn-max': maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : '100%',
    '--cn-bar': '62px',
    '--cn-inset': '8px',
    '--cn-gap': '12px',
    '--cn-radius': '20px',
    '--cn-logo': '28px',
    '--cn-card': `${cardHeight}px`
  };

  if (baseColor) {
    vars['--cn-panel'] = baseColor;
    vars['--cn-solid'] = baseColor;
  }
  if (menuColor) {
    vars['--cn-text'] = menuColor;
    vars['--cn-muted'] = 'rgba(75, 46, 32, 0.72)';
    vars['--cn-hover'] = 'rgba(75, 46, 32, 0.08)';
    vars['--cn-ring'] = menuColor;
  }
  if (buttonBgColor) {
    vars['--cn-cta'] = buttonBgColor;
  }
  if (buttonTextColor) {
    vars['--cn-cta-ink'] = buttonTextColor;
  }

  const setOpen = next => {
    if (next === open) return;
    if (!controlled) setOpenState(next);
    onOpenChange?.(next);
  };
  const setOpenRef = useRef(setOpen);

  useEffect(() => {
    setOpenRef.current = setOpen;
  });

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!panel || !content) return undefined;
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const measureBar = () => parseFloat(getComputedStyle(panel).getPropertyValue('--cn-bar')) || 62;
    const state = { p: settingsRef.current.open ? 1 : 0, v: 0, height: content.offsetHeight, bar: measureBar() };
    let raf = 0;
    let last = 0;

    const render = () => {
      const s = settingsRef.current;
      panel.style.height = `${state.bar + Math.max(0, state.p) * state.height}px`;
      const cards = cardRefs.current.filter(Boolean);
      const count = cards.length;
      const lag = count > 1 ? Math.min(s.stagger, 0.7 / (count - 1)) : 0;
      const span = 1 - lag * (count - 1);
      cards.forEach((card, index) => {
        const local = clamp((state.p - index * lag) / Math.max(span, 0.05), 0, 1);
        const e = easeOut(local);
        if (s.cardEffect === 'unfold') {
          card.style.transform = `translateY(${(1 - e) * -10}px) rotateX(${(1 - e) * -72}deg)`;
          card.style.opacity = `${clamp(local * 1.8, 0, 1)}`;
          card.style.filter = '';
        } else if (s.cardEffect === 'fade') {
          card.style.transform = `translateY(${(1 - e) * 6}px)`;
          card.style.opacity = `${e}`;
          card.style.filter = e < 0.999 ? `blur(${(1 - e) * 6}px)` : '';
        } else {
          card.style.transform = `translateY(${(1 - e) * 26}px) scale(${0.97 + 0.03 * e})`;
          card.style.opacity = `${e}`;
          card.style.filter = '';
        }
      });
    };

    const tick = now => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const target = s.open ? 1 : 0;
      if (reduce) {
        state.p = target;
        state.v = 0;
      } else {
        const k = 160 * s.speed * s.speed;
        const zeta = s.open ? 1 - 0.68 * s.bounce : 1;
        const steps = Math.ceil(dt / (1 / 240));
        const h = dt / steps;
        for (let i = 0; i < steps; i++) {
          state.v += (-k * (state.p - target) - 2 * zeta * Math.sqrt(k) * state.v) * h;
          state.p += state.v * h;
        }
      }
      const done = Math.abs(state.p - target) < 0.0005 && Math.abs(state.v) < 0.002;
      if (done) {
        state.p = target;
        state.v = 0;
      }
      render();
      if (done && target === 0) setShown(false);
      if (!done) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    engineRef.current = {
      wake,
      refresh: () => {
        state.height = content.offsetHeight;
        state.bar = measureBar();
        render();
      }
    };

    render();
    const observer = new ResizeObserver(() => {
      state.height = content.offsetHeight;
      state.bar = measureBar();
      render();
    });
    observer.observe(content);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      engineRef.current = null;
    };
  }, [items.length, hasCta, narrow]);

  useEffect(() => {
    if (open) setShown(true);
    engineRef.current?.refresh();
    engineRef.current?.wake();
  }, [open]);

  useEffect(() => {
    engineRef.current?.refresh();
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const measure = () => setNarrow(root.offsetWidth < NARROW);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = event => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setOpenRef.current(false);
    };
    const onKeyDown = event => {
      if (event.key !== 'Escape') return;
      setOpenRef.current(false);
      menuRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(leaveRef.current), []);

  useEffect(() => {
    setOpenRef.current(false);
  }, [currentPath]);

  const hover = openOn === 'hover';

  const onPointerEnter = event => {
    if (!hover || event.pointerType === 'touch') return;
    window.clearTimeout(leaveRef.current);
    setOpen(true);
  };

  const onPointerLeave = event => {
    if (!hover || event.pointerType === 'touch') return;
    window.clearTimeout(leaveRef.current);
    leaveRef.current = window.setTimeout(() => setOpenRef.current(false), 160);
  };

  const anchor = (target, props, children) => {
    if (!target.href) {
      return (
        <button type="button" {...props}>
          {children}
        </button>
      );
    }
    return (
      <LinkComponent href={target.href} {...props}>
        {children}
      </LinkComponent>
    );
  };

  const ctaButton = (target, wide) =>
    anchor(
      target,
      {
        className: wide ? CTA_WIDE : CTA,
        tabIndex: wide && !open ? -1 : undefined,
        onClick: event => {
          target.onClick?.(event);
          if (wide) setOpen(false);
        }
      },
      target.label
    );

  const isLinkActive = (href) => {
    if (!currentPath || !href) return false;
    if (href === '/') return currentPath === '/';
    if (href.startsWith('/#')) return false;
    const cleanHref = href.split('?')[0].split('#')[0];
    return currentPath === cleanHref || currentPath.startsWith(cleanHref + '/');
  };

  return (
    <div
      ref={rootRef}
      className={[ROOT, className].filter(Boolean).join(' ')}
      data-open={open ? '' : undefined}
      data-shown={shown || open ? '' : undefined}
      data-narrow={narrow ? '' : undefined}
      style={{ ...vars, ...style }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <nav ref={panelRef} className={PANEL} aria-label={ariaLabel}>
        <div ref={barRef} className={BAR}>
          {/* Left: Brand Logo */}
          <div className="card-nav__left">
            {logo && (
              <LinkComponent href={logoHref} className={LOGO} aria-label={logoAlt}>
                {typeof logo === 'string' ? <span>{logo}</span> : logo}
              </LinkComponent>
            )}
          </div>

          {/* Center: Menu Toggle */}
          <div className="card-nav__center">
            <button
              ref={menuRef}
              type="button"
              className={MENU}
              data-icon-only={menuLabel ? undefined : ''}
              aria-expanded={open}
              aria-controls={contentId}
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setOpen(!open)}
            >
              <span className={BURGER} aria-hidden="true">
                <span className={LINE_TOP} />
                <span className={LINE_BOTTOM} />
              </span>
              {menuLabel && (
                <span className={MENU_LABEL}>
                  <span className={WORD_OPEN} aria-hidden={open}>
                    Menu
                  </span>
                  <span className={WORD_CLOSE} aria-hidden={!open}>
                    Close
                  </span>
                </span>
              )}
            </button>
          </div>

          {/* Right: Cart Button Slot & Actions */}
          <div className="card-nav__right">
            {cartSlot}
            {cta && !narrow && ctaButton(cta, false)}
          </div>
        </div>

        <div ref={contentRef} id={contentId} className={CONTENT} aria-hidden={!open}>
          <div className={CARDS}>
            {items.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                ref={element => {
                  cardRefs.current[index] = element;
                }}
                className={CARD}
                data-tinted={item.bgColor ? '' : undefined}
                style={item.bgColor ? { background: item.bgColor, color: item.textColor } : undefined}
              >
                <div className={CARD_HEAD}>
                  <span className={LABEL}>{item.label}</span>
                  {item.description && <p className={DESCRIPTION}>{item.description}</p>}
                </div>
                <ul className={LINKS}>
                  {(item.links ?? []).map((link, linkIndex) => {
                    const active = isLinkActive(link.href);
                    return (
                      <li key={`${link.label}-${linkIndex}`}>
                        {anchor(
                          link,
                          {
                            className: `${LINK}${active ? ' card-nav__link--active' : ''}`,
                            'aria-label': link.ariaLabel || link.label,
                            'aria-current': active ? 'page' : undefined,
                            tabIndex: open ? undefined : -1,
                            onClick: event => {
                              onLinkClick?.(link, item, event);
                              setOpen(false);
                            }
                          },
                          <>
                            <span className={ARROW} aria-hidden="true">
                              <HugeiconsIcon className={ARROW_OUT} icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
                              <HugeiconsIcon className={ARROW_IN} icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
                            </span>
                            <span className={active ? 'card-nav__text--active' : ''}>
                              {link.label}
                            </span>
                            {active && (
                              <span className="card-nav__active-dot" aria-hidden="true" />
                            )}
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          {cta && narrow && (
            <div
              ref={element => {
                cardRefs.current[items.length] = element;
              }}
            >
              {ctaButton(cta, true)}
            </div>
          )}
        </div>
        <span className={RIM} />
      </nav>
    </div>
  );
};

export default CardNav;
