import { DefaultTheme } from 'react-native-paper';

const COLORS = {
    main: '#264653',
    secondary: '#2a9d8f',
    tertiary: '#e9c46a',
    mainGray: '#D3D2D3',
    mainLightGray: '#E5E5E5',
    mainDark: '#4C4C4C',
    mainWhite: '#e9c46a',
    mainRed: '#e76f51',
};

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: COLORS.main,
        accent: COLORS.secondary,
    },
    fonts: {
        regular: 'Rajdhani-Regular',
        medium: 'Rajdhani-Medium',
        light: 'Rajdhani-Light',
        thin: 'Rajdhani-Bold',
    }
};

export {
    theme,
    COLORS,
};