import { Text, View } from 'react-native';
import { useState } from 'react';
import { mainStyles } from './styles';
import { api } from './services/api';
import Poster from './components/Poster';
import SearchControl from './components/SearchControl';

export default function App() {
    const [movies, setMovies] = useState();

    const searchMovie = async (name) => {
        const moviesData = await api.getMovies(name);
        setMovies(moviesData);
    };

    return (
        <View style={mainStyles.container}>
            <Text style={mainStyles.title}>CompuMovie</Text>

            <Poster movies={movies} />

            <SearchControl onSearch={searchMovie} />
        </View>
    );
}
