import { ToastAndroid } from 'react-native';

export const colors = {
    white: '#FFFFFF',
    black: '#000000',
    borderColor: '#797a7b',
    darkGrey: '#38393a',
    grey: '#b4b2b2',
    blue: '#3099fc',
    red: '#ff1414',
};

export const fonts = {
    bold: 'HostGrotesk-Bold',
    light: 'HostGrotesk-Light',
    medium: 'HostGrotesk-Medium',
    regular: 'HostGrotesk-Regular',
    semibold: 'HostGrotesk-Semibold',
};

export const showToast = ({ message }: { message: string }) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};
