import { StyleSheet } from 'react-native';
import { ColorPalette } from '../constants';

export const searchControlStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 'auto',
        width: '100%',
        padding: 16,
        backgroundColor: ColorPalette.SECONDARY,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        backgroundColor: ColorPalette.BOARD,
        borderRadius: 4,
    },
    button: {
        borderColor: ColorPalette.PRIMARY,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: ColorPalette.ACTION,
    },
});