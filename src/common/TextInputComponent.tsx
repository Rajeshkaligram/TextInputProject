import { Clipboard, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CurrencyInput from 'react-native-currency-input';
import { colors, fonts, showToast } from './constant';
import ButtonComponent from './ButtonComponent';

interface InputProps {
    placeholder: string
    customStyle?: any
}

const TextInputComponent: React.FC<InputProps> = (props) => {
    // Destructure the props value
    const { placeholder, customStyle } = props;

    // Define all State values here
    const [inputValue, setInputValue] = useState<number | null>(null);
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [history, setHistory] = useState<number[]>([]);
    const [redoHistory, setRedoHistory] = useState<number[]>([]);
    const [waring, setWaring] = useState<boolean>(false);

    const handleBlur = () => {
        if (previousValue && inputValue && inputValue < previousValue) {
            setWaring(true);
        } else {
            setWaring(false);
        }
        // Update the previous value on blur
        setPreviousValue(inputValue);
        // set all history value one by one
        if (inputValue !== null) {
            setHistory((prevHistory) => [...prevHistory, inputValue]);
        }
    };

    // Push the value to redoHistory state
    // Remove the last value from history state
    const handleUndo = () => {
        if (history?.length > 1) {
            const lastValue = history[history?.length - 2];
            setInputValue(lastValue);
            setRedoHistory((prevRedoHistory) => [history[history.length - 1], ...prevRedoHistory]);
            setHistory((prevHistory) => prevHistory.slice(0, -1));
        }
    };

    // Push the value to history state
    // Remove the last value from redoHistory state
    const handleRedo = () => {
        if (redoHistory?.length > 0) {
            const redoValue = redoHistory[0];
            setInputValue(redoValue);
            setHistory((prevHistory) => [...prevHistory, redoValue]);
            setRedoHistory((prevRedoHistory) => prevRedoHistory.slice(1));
        }
    };

    // Check buttons should be enabled or disabled
    const isUndoDisabled = history?.length <= 1;
    const isRedoDisabled = redoHistory?.length === 0;
    const isCopyDisabled = inputValue === null;

    // Copy the value to clipboard and show toast message
    const handlePress = () => {
        if (inputValue !== null) {
            Clipboard.setString(inputValue.toString()); // Copy the value to clipboard
            showToast({ message: 'Value copied successfully!' });
        }
    };

    // Paste the value from clipboard and update the inputValue state
    const handlePaste = async () => {
        const pastedValue = await Clipboard.getString();
        if (pastedValue) {
            setInputValue(parseFloat(pastedValue));
        }
    };

    // Render TextInput and Button
    return (
        <View style={styles.main}>
            <CurrencyInput
                value={inputValue}
                onChangeValue={setInputValue}
                prefix="$"
                delimiter=","
                separator="."
                precision={2}
                placeholder={placeholder}
                style={{ ...styles.inputStyle, ...customStyle }}
                placeholderTextColor={colors.darkGrey}
                keyboardType="number-pad"
                onBlur={handleBlur}
            />
            {waring && <Text style={styles.warningText}>The current value is less than the previous value.</Text>}
            <View style={styles.buttonContainer}>
                <ButtonComponent
                    onPress={handleUndo}
                    title="Undo"
                    disabled={isUndoDisabled}
                    customStyle={styles.width20}
                />
                <ButtonComponent
                    onPress={handleRedo}
                    title="Redo"
                    disabled={isRedoDisabled}
                    customStyle={styles.width20}
                />
            </View>

            <View>
                <ButtonComponent
                    title="Copy Current Value"
                    customStyle={styles.width80}
                    onPress={handlePress}
                    disabled={isCopyDisabled}
                />
                <ButtonComponent
                    onPress={handlePaste}
                    title="Paste Value"
                    customStyle={styles.width80}
                />
            </View>
        </View>
    );
};

export default TextInputComponent;

const styles = StyleSheet.create({
    main: {
        width: '95%',
        backgroundColor: colors.white,
    },
    inputStyle: {
        borderColor: colors.borderColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '400',
        color: colors.darkGrey,
        fontFamily: fonts.light,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    warningText: {
        color: colors.red,
        fontWeight: '500',
        fontSize: 12,
        marginLeft: 5,
        marginTop: 5,
    },
    width20: {
        width: '20%',
    },
    width80: {
        width: '90%',
    },
});
