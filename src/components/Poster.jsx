import { posterStyles } from '../styles';
import { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';

const Poster = ({ movies }) => {
    const [index, setIndex] = useState(0);
    const [activeMovie, setActiveMovie] = useState();
    
    useEffect(() => {
        if (!movies || movies.length === 0) return;

        setActiveMovie(movies[index]);

        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % movies.length;
                setActiveMovie(movies[nextIndex]);
                return nextIndex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [movies]);

    return (
        <View style={posterStyles.container}>
            {activeMovie ? (
                <Image source={{ uri: activeMovie.Poster }} style={{ width: 200, height: 300 }} />
            ) : (
                <Text style={posterStyles.text}>{activeMovie ? activeMovie : 'Sin datos de película'}</Text>
            )}
        </View>
    );
};

export default Poster;
