import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import type { ThemeOptions } from "@mui/material/styles";


/* ===================== TOKENS ===================== */

export const spacingTokens = {
  xs: "4px",
  sm: "8px",
  md: "20px",
  lg: "28px",
  xl: "32px",
} as const;

export const shadowTokens = {
  small: "0px 0px 6px rgba(32, 33, 35, 0.05)",
  medium: "0px 4px 10px rgba(32, 33, 35, 0.08)",
  large: "0px 8px 16px rgba(32, 33, 35, 0.1)",
  xl: "0px 12px 24px rgba(32, 33, 35, 0.12)",
} as const;

export const radiusTokens = {
  xs: "4px",
  sm: "6px",
  md: "10px",
  lg: "12px",
} as const;

/* ===================== COLORS ===================== */

export const colors = {
  primary: "#C62141",
  secondary: "#FF8C42",

  background: "#FFFFFF",
  cardBackground: "#F7F7F7",
  modalBackground: "rgba(0,0,0,0.4)",

  textPrimary: "#000000ff",
  textSecondary: "#4a4a4a",
  textLight: "#888888",
  textInverse: "#FFFFFF",

  success: "#4CAF50",
  error: "#E53935",
  warning: "#FFB300",

  border: "#d8d8d8ff",
} as const;

export const colorTokens = {
  primary: {
    50: "#4E6F40",
    100: "#F2F4F8",
    500: "#F3FFF8",
    600: "#12C2B9",
    900: "#39464E",
  },
  neutral: {
    50: "#FFFFFF",
    100: "#EAF0F8",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#475569",
    900: "#0F172A",
    950: "#D3FFE6",
  },
  status: {
    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",
    info: "#0A6DD8",
  },
  semantic: {
    success: "#22C55E",
    warning: "#FACC15",
    error: "#EF4444",
  },
  border: {
    primary: "#CBCBCB",
  },
  background: {
    primary: "#4E9E70",
    secondary: "#D3FFE6",
    tertiary: "#E9E9E9",
  },
  gradients: {
    primary: "linear-gradient(90deg, #12C2B9 0%, #0A6DD8 100%)",
  },
} as const;

/* ===================== TYPOGRAPHY ===================== */

export const typographyTokens = {
  fontSizes: {
    xs: "10px",
    sm: "12px",
    base: "13px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "28px",
    "4xl": "32px",
    "5xl": "36px",
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    "semi-bold": 600,
    bold: 700,
  },
  lineHeights: {
    tight: "18px",
    normal: "20px",
    relaxed: "24px",
    "2xl": "26px",
    "3xl": "28px",
    "4xl": "32px",
    "5xl": "36px",
  },
} as const;

/* ===================== MUI THEME ===================== */

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: colorTokens.primary[50],
      dark: colorTokens.primary[900],
      light: colorTokens.primary[500],
      contrastText: colorTokens.neutral[50],
    },
    secondary: {
      main: colorTokens.primary[600],
    },
    background: {
      default: colorTokens.neutral[100],
      paper: colorTokens.neutral[50],
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    success: { main: colors.success },
    error: { main: colors.error },
    warning: { main: colors.warning },
    divider: colors.border,
  },

  typography: {
    fontFamily: "Poppins, sans-serif",

    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },

    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },

    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },


  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: colorTokens.neutral[50],
          boxShadow: shadowTokens.small,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.sm,
          fontWeight: typographyTokens.fontWeights["semi-bold"],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: colorTokens.neutral[200],
          backgroundColor: colorTokens.neutral[50],
        },
        head: {
          backgroundColor: colorTokens.background.secondary,
          fontWeight: typographyTokens.fontWeights.medium,
          color: colorTokens.primary[600],
          fontSize: typographyTokens.fontSizes.lg,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.sm,
          boxShadow: shadowTokens.small,
        },
      },
    },
  },
};

export const appTheme = createTheme(themeOptions);
export default appTheme;
