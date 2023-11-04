import { searchControlStyles } from '../styles';
import { Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { ColorPalette } from '../constants';

const SearchControl = ({ onSearch }) => {
    const [input, setInput] = useState();

    return (
        <View style={searchControlStyles.container}>
            <TextInput style={searchControlStyles.input} onChangeText={(text) => setInput(text)} value={input} />

            <Pressable android_ripple={{ color: ColorPalette.PRIMARY }} style={searchControlStyles.button} onPress={() => onSearch(input)}>
                <Text
                    style={{
                        color: ColorPalette.PRIMARY,
                        fontWeight: 'bold',
                    }}
                >
                    Buscar Película
                </Text>
            </Pressable>
        </View>
    );
};

export default SearchControl;
