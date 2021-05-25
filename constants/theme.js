/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#FC6D3F", // orange
    secondary: "#CDCDD2",   // gray
    tertiary: '#EDF2FF', // skyblue

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    h5: 16,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 11,

    // app dimensions
    width: width,
    height: height,
};

export const FONTS = {
    largeTitle: { fontFamily: "BMDOHYEON", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "BMDOHYEON", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "BMDOHYEON", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "BMDOHYEON", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "BMDOHYEON", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "BMDOHYEON", fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: "BMDOHYEON", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "AirbnbCereal-Black", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "AirbnbCereal-Light", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "AirbnbCereal-Black.ttf", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "AirbnbCereal-Bold.ttf", fontSize: SIZES.body5, lineHeight: 22 },
    body6: { fontFamily: "AirbnbCereal-Light.ttf", fontSize: SIZES.body6, lineHeight: 22 },
};

export const FONTS2 = {
    h1: { fontFamily: "AppleSDGothicNeoB", fontSize: SIZES.h1, lineHeight: 32 },
    h2: { fontFamily: "AppleSDGothicNeoB", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "AppleSDGothicNeoB", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "AppleSDGothicNeoB", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "AppleSDGothicNeoB", fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: "AppleSDGothicNeoL", fontSize: SIZES.body1, lineHeight: 33 },
    body2: { fontFamily: "AppleSDGothicNeoL", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "AppleSDGothicNeoL", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "AppleSDGothicNeoL", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "AppleSDGothicNeoL", fontSize: SIZES.body5, lineHeight: 22 },
    body6: { fontFamily: "AppleSDGothicNeoL", fontSize: SIZES.body6, lineHeight: 22 },
};

export const FONTS3 = {
    h1: { fontFamily: "경기천년제목_Medium", fontSize: SIZES.h1, lineHeight: 32 },
    h2: { fontFamily: "경기천년제목_Medium", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "경기천년제목_Medium", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "경기천년제목_Medium", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "경기천년제목_Medium", fontSize: SIZES.h5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS, FONTS2, FONTS3 };

export default appTheme;