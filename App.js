import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, Image } from 'react-native';
import { useState } from 'react';
import Constants from 'expo-constants';

const COLOR_PALETTE = {
    board: '#bcb8b6',
    primary: '#54504a',
    secondary: '#7d7d7d',
    action: '#988f86',
    pale: '#edeae5',
};

export default function App() {
    const [input, setInput] = useState();
    const [movie, setMovie] = useState();

    const searchMovie = async () => {
        const response = await fetch(API_URL + input, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: API_KEY,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.success) {
                setMovie(data.result[0]);
            } else Alert.alert('Error', 'Movie not found', [{ text: 'OK' }]);
        } else Alert.alert('Error', 'Connection error', [{ text: 'OK' }]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CompuMovie</Text>

            <View style={styles.poster}>
                {movie ? (
                    <Image source={{ uri: movie.Poster }} style={{ width: 200, height: 300 }} />
                ) : (
                    <Text style={styles.posterText}>{movie ? movie : 'No movie data'}</Text>
                )}
            </View>

            <View style={styles.footer}>
                <TextInput style={styles.input} onChangeText={(text) => setInput(text)} value={input} />

                <Pressable
                    android_ripple={{ color: COLOR_PALETTE.primary }}
                    style={styles.button}
                    onPress={searchMovie}
                >
                    <Text
                        style={{
                            color: COLOR_PALETTE.primary,
                            fontWeight: 'bold',
                        }}
                    >
                        Search Movie
                    </Text>
                </Pressable>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_PALETTE.board,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLOR_PALETTE.primary,
    },
    poster: {
        width: 220,
        height: 320,
        borderWidth: 10,
        borderColor: COLOR_PALETTE.primary,
        backgroundColor: COLOR_PALETTE.pale,
        marginBottom: 'auto',
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    posterText: {
        color: COLOR_PALETTE.primary,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
    },
    footer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 'auto',
        width: '100%',
        padding: 16,
        backgroundColor: COLOR_PALETTE.secondary,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        backgroundColor: COLOR_PALETTE.board,
        borderRadius: 4,
    },
    button: {
        borderColor: COLOR_PALETTE.primary,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: COLOR_PALETTE.action,
    },
});
