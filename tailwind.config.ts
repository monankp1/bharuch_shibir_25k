/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('tailwindcss').Config} */

const tailwindClass = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: "var(--inter)",
      roboto: "var(--font-roboto)",
    },
    fontSize: {
      "2xl": ["1.2rem", { lineHeight: "1.6rem" }],
      "3xl": ["1.4rem", { lineHeight: "2rem" }],
      "4xl": ["1.6rem", { lineHeight: "2.4rem" }],
      "5xl": ["1.8rem", { lineHeight: "2.4rem" }],
      "6xl": ["2.2rem", { lineHeight: "2.4rem" }],
      "7xl": ["2.4rem", { lineHeight: "2.6rem" }],
    },
    screens: {
      sm: "767px",
      md: "991px",
      lg: "1200px",
      xl: "1280px",
      "2xl": "1360px",
    },
    colors: {
      transparent: "transparent",
      secondary: "#F7F7F9",
      white: "#FFFFFF",
      black: "#000000",
      "custom-gray": "#9DA6AF",
      gray: {
        black: "#333333",
        light: "#262626",
        dark: "#4B4C4E",
        10: "#28282B",
        20: "#f1f1f3",
        30: "#ceceda",
        50: "#F9FAFB",
        60: "#484851",
        70: "#35353b",
        80: "#232328",
        90: "#141417",
        100: "#f3f4f6",
        200: "#E5E7EB",
        300: "#d1d5db",
        400: "#98A2B3",
        500: "#6B7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#D9D9D9",
      },
      slate: {
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#b6c2d1",
        500: "#9fa3a3",
        600: "#62626C",
        700: "#334155",
      },
      orange: {
        base: "#FA9131",
        100: "#FFEDD5",
        200: "#FAA831",
        500: "#F97316",
        600: "#EA580C",
        700: "#C2410C",
        900: "#7C2D12",
      },
      purple: {
        600: "#5f55ee",
      },
      red: {
        dark: "#FF3030",
        100: "#FEE2E2",
        200: "#EDCCCC",
        300: "#FFEFEF",
        400: "#f32d2d",
        600: "#DC2626",
        700: "#FDF0F0",
      },
      green: {
        dark: "#15803D",
        100: "#249f5d",
        200: "#E2FAE2",
      },
      yellow: {
        dark: "#F2C94C",
        100: "#FFF6D9",
      },
    },
    borderRadius: {
      none: "0px",
      sm: "2px",
      md: "4px",
      lg: "6px",
      xl: "8px",
      full: "100%",
    },
    zIndex: {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
    },
    extend: {
      maxWidth: {
        "custom-1000": "1000px",
        "custom-500": "500px",
      },
      width: {
        "custom-500": "500px",
        "custom-550": "550px",
        "custom-80": "80px",
      },
      minWidth: {
        "custom-500": "500px",
        "custom-550": "550px",
        "custom-1000": "1000px",
      },
      height: {
        "custom-80": "80px",
        "custom-250": "250px",
      },
      minHeight: {
        "custom-250": "250px",
      },
      borderRadius: {
        "t-8": "8px 8px 0 0",
      },
    },
  },

  plugins: [
    function ({ addBase, theme }: any) {
      function extractColorVars(colorObj: any, colorGroup = ""): any {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          const cssVariable =
            colorKey === "DEFAULT"
              ? `-${colorGroup}`
              : `-${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === "string"
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};

export default tailwindClass;
