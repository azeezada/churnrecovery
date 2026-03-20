/**
 * Design System Tokens — ChurnRecovery
 * Option D: Editorial/Content-First (Anthropic-inspired)
 *
 * These tokens are the single source of truth for the design system.
 * Use in JS/JSX as: import { tokens } from '../lib/design-tokens'
 * CSS variables are defined in styles/globals.css
 */

export const tokens = {
  colors: {
    bg: '#FAF9F5',
    text: '#191919',
    gray: '#666666',
    grayLight: '#999999',
    accent: '#D97757',
    accentHover: '#C4603D',
    border: '#E5E5E5',
    borderDark: '#D0D0D0',
    white: '#FFFFFF',
    // Semantic
    success: '#2D7D46',
    warning: '#B45309',
    error: '#B91C1C',
  },

  fonts: {
    sans: '"Instrument Sans", sans-serif',
    serif: '"Merriweather", serif',
  },

  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    md: '1.125rem',    // 18px
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
    '4xl': '3.5rem',   // 56px
    '5xl': '4.5rem',   // 72px
  },

  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },

  letterSpacings: {
    tight: '-0.03em',
    snug: '-0.02em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.08em',
  },

  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
  },

  layout: {
    containerMax: '1200px',
    containerPadding: '24px',
    containerPaddingMd: '40px',
    headerHeight: '72px',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.10)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
  },

  transitions: {
    fast: '0.15s ease',
    base: '0.2s ease',
    slow: '0.3s ease',
  },
}

/**
 * Utility: get a CSS var by token name
 * e.g. cssVar('color-anthropic-accent') → var(--color-anthropic-accent)
 */
export function cssVar(name) {
  return `var(--${name})`
}

/**
 * Common inline style objects reused across pages
 */
export const commonStyles = {
  container: {
    width: '100%',
    maxWidth: tokens.layout.containerMax,
    marginInline: 'auto',
    padding: `${tokens.spacing[20]} ${tokens.layout.containerPadding}`,
    paddingTop: '120px',
  },

  heading: {
    fontFamily: tokens.fonts.sans,
    fontWeight: tokens.fontWeights.semibold,
    letterSpacing: tokens.letterSpacings.snug,
    lineHeight: tokens.lineHeights.tight,
    color: tokens.colors.text,
  },

  bodyText: {
    fontFamily: tokens.fonts.serif,
    fontSize: tokens.fontSizes.md,
    lineHeight: tokens.lineHeights.relaxed,
    color: tokens.colors.text,
  },

  accentButton: {
    display: 'inline-block',
    background: tokens.colors.accent,
    color: tokens.colors.white,
    fontFamily: tokens.fonts.sans,
    fontWeight: tokens.fontWeights.medium,
    fontSize: tokens.fontSizes.base,
    padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
    borderRadius: tokens.radii.sm,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: `background ${tokens.transitions.base}`,
  },

  ghostButton: {
    display: 'inline-block',
    background: 'transparent',
    color: tokens.colors.text,
    fontFamily: tokens.fonts.sans,
    fontWeight: tokens.fontWeights.medium,
    fontSize: tokens.fontSizes.base,
    padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
    borderRadius: tokens.radii.sm,
    textDecoration: 'none',
    border: `1px solid ${tokens.colors.border}`,
    cursor: 'pointer',
    transition: `border-color ${tokens.transitions.base}`,
  },

  divider: {
    border: 'none',
    borderTop: `1px solid ${tokens.colors.border}`,
    margin: '0 0 48px 0',
  },

  tag: {
    display: 'inline-block',
    fontFamily: tokens.fonts.sans,
    fontSize: tokens.fontSizes.xs,
    fontWeight: tokens.fontWeights.medium,
    color: tokens.colors.gray,
    background: tokens.colors.border,
    padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
    borderRadius: tokens.radii.full,
    letterSpacing: tokens.letterSpacings.wide,
    textTransform: 'uppercase',
  },
}

export default tokens
