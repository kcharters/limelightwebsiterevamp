// theme.js

const customColors = {
    offWhite: "#FDFED3",
    highlight: "#D5E563",
    lightLime: "#A9E22D",
    lightGreen: "#99C61C",
    darkGreen: "#64AA27",
    grey: "#303030",
};

const customTypography = {
    // Define typography styles
    h1: { fontSize: "3rem", fontWeight: "700", lineHeight: "3.5rem", color: customColors.grey },
    h2: { fontSize: "2.25rem", fontWeight: "600", lineHeight: "2.75rem", color: customColors.grey },
    h3: { fontSize: "1.75rem", fontWeight: "600", lineHeight: "2.25rem", color: customColors.grey },
    h4: { fontSize: "1.5rem", fontWeight: "500", lineHeight: "2rem", color: customColors.grey },
    h5: { fontSize: "1.25rem", fontWeight: "500", lineHeight: "1.75rem", color: customColors.grey },
    h6: { fontSize: "1rem", fontWeight: "500", lineHeight: "1.5rem", color: customColors.grey },
    subtitle1: { fontSize: "1rem", fontWeight: "400", lineHeight: "1.5rem", color: customColors.grey },
    subtitle2: { fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.25rem", color: customColors.grey },
    body1: { fontSize: "1rem", fontWeight: "400", lineHeight: "1.5rem", color: customColors.grey },
    body2: { fontSize: "0.875rem", fontWeight: "400", lineHeight: "1.25rem", color: customColors.grey },
    button: { fontSize: "0.875rem", fontWeight: "600", lineHeight: "1rem", color: customColors.darkGreen, textTransform: "uppercase" },
    caption: { fontSize: "0.75rem", fontWeight: "400", lineHeight: "1rem", color: customColors.grey },
    overline: { fontSize: "0.75rem", fontWeight: "400", lineHeight: "1rem", letterSpacing: "1px", color: customColors.grey },
};

const customLightTheme = {
    dark: false,
    colors: {
        background: customColors.offWhite,
        surface: customColors.offWhite,
        primary: customColors.lightLime,
        secondary: customColors.lightGreen,
        highlight: customColors.highlight,
        accent: customColors.darkGreen,
        text: customColors.grey,
        elevation: customColors.grey,
    },
    typography: customTypography,
};

const customDarkTheme = {
    dark: true,
    colors: {
        background: customColors.grey,
        surface: customColors.grey,
        primary: customColors.lightLime,
        secondary: customColors.lightGreen,
        highlight: customColors.highlight,
        accent: customColors.offWhite,
        text: customColors.offWhite,
        elevation: customColors.lightGreen,
    },
    typography: {
        h1: { ...customTypography.h1, color: customColors.offWhite },
        h2: { ...customTypography.h2, color: customColors.offWhite },
        h3: { ...customTypography.h3, color: customColors.offWhite },
        body1: { ...customTypography.body1, color: customColors.offWhite },
        button: { ...customTypography.button, color: customColors.offWhite },
    },
};

export { customLightTheme, customDarkTheme, customColors, customTypography };
