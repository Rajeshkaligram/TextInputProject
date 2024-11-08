import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from './constant';

interface ButtonProps {
    onPress: () => void
    disabled?: boolean
    title: string
    customStyle?: any
}
const ButtonComponent: React.FC<ButtonProps> = (props) => {
    const { onPress, disabled = false, title, customStyle } = props;
    return (
        <TouchableOpacity style={{
            ...styles.button,
            backgroundColor: disabled ? colors.grey : colors.blue,
            ...customStyle,
        }}
            activeOpacity={0.9}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonComponent;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: colors.white,
        fontWeight: '500',
        fontSize: 16,
        fontFamily: fonts.regular,
    },
});
