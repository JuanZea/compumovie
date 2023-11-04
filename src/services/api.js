import { Env } from '../constants';
import { Alert } from 'react-native';

export const api = {
    getMovies: async (name) => {
        const response = await fetch(Env.API_URL + name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: Env.API_KEY,
            },
        });

        
        if (response.ok) {
            const data = await response.json();
            if (data.success) return data.result;
            else Alert.alert('Error', 'Película no encontrada', [{ text: 'OK' }]);
        } else Alert.alert('Error', 'Error de conexión', [{ text: 'OK' }]);
    },
};
