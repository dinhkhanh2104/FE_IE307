import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: '#F83758',
    white: '#FFFFFF',
    black: "#000000",
    darkGray: "#17223B",
    lightGray: "#A8A8A9",
    extraLightGray: "#F3F3F3",
    semiGray: "#626262",
    background: "#f9f9f9"
};

export const SIZES = {
    font12: 12,
    font14: 14,
    font16: 16,
    font18: 18,
    font20: 20,
    font22: 22,
    font24: 24,
    font36: 36,
    width,
    height,
}