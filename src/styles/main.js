import { StyleSheet } from 'react-native';
import { ColorPalette, Expo } from '../constants';

export const mainStyles = StyleSheet.create({
    container: {
        paddingTop: Expo.statusBarHeight,
        flex: 1,
        alignItems: 'center',
        backgroundColor: ColorPalette.BOARD,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: ColorPalette.PRIMARY,
    },
});