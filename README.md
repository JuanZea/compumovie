# DOJO React Native
* Juan Fernando Lopera
* Eliana Janneth Puerta
* Juan David Zea

# Introducción - Compumovie
¡Bienvenido al proyecto CompuMovie! esta una aplicación desarrollada con React Native que permite a los usuarios buscar posters de películas utilizando su nombre original como referencia. Este proyecto está diseñado como un dojo para guiar a los desarrolladores paso a paso en la creación y estructuración de una aplicación React Native utilizando Expo.

> **Requisitos:** Antes de comenzar, asegúrate de tener instalado [Node.js](https://nodejs.org/dist/v20.9.0/node-v20.9.0-x64.msi) y npm en tu sistema.

## Creación de proyecto en Expo
Necesitarás una cuenta de [Expo](https://expo.dev/) desde donde podrás crear un nuevo proyecto:

![create_expo_proyect](/assets/create_expo_proyect.png)

![start_developing](/assets/start_developing.png)

```bash
npm install --global eas-cli && \
npx create-expo-app compumovie && \
cd compumovie && \
eas init --id YOUR_PROJECT_ID
```

**Nota:** Este último comando te pedirá que inicies sesión desde la consola.

## Estructura del proyecto
Al crear el proyecto debería verse de la siguiente manera:

```
compumovie/
├── assets/
├── node_modules/
├── App.js
├── app.json
├── babel.config.js
└── package.json
```

En la carpeta raíz del proyecto debes crear un archivo llamado `.env`, el cuál servirá para guardar las variables de entorno que se usarán posteriormente.

## Conexión con la API de películas
Se usará una API de la tienda [CollectAPI](https://collectapi.com/), allí deberás iniciar sesión o registrarte con el método que prefieras. Una vez hayas iniciado sesión debes dirigirte a [API IMBD](https://collectapi.com/api/imdb/imdb-api) que será la API a usar. Para poder obtener la API Key correspondiente deberás registrarte dando clic en "Try Free" luego elegir el plan "Free", por último deberás ir al [panel de usuario](https://collectapi.com/auth) y en la pestaña de "API Token" podrás copiar tu API KEY.

Una vez obtenida la API KEY volveremos al archivo `.env` que creamos en el paso anterior y definiremos la variables de entorno de la aplicación de la siguiente manera.

```bash
EXPO_PUBLIC_API_URL='https://api.collectapi.com/imdb/imdbSearchByName?query='
EXPO_PUBLIC_API_KEY='TU_API_KEY'
```

> Es importante que las variables de entorno definidas anteriormente contengan el prefijo **EXPO_PUBLIC_**

# Desarrollo

## División del código
Para mantener el código organizado y fácil de mantener, se recomienda dividirlo en componentes reutilizables. Para ello debes seguir los siguientes pasos:

1. Crear una carpeta llamada `src`
2. Dentro de ella tendrás que crear varias subcarpetas
   - `components` → Componentes usados 
   - `constants` → Constantes usadas en la aplicación
   - `services` → Herramientas usadas para el consumo de la API
   - `styles` → Definición de los estilos usados en la aplicación
3. Por último crearemos un archivo llamado `Main.jsx`

### Directorio `constants`
Procederemos a crear el archivo `colorPalette.js`, allí definiremos los colores en hexadecimal que serán usados a lo largo de la aplicación de la siguiente manera:

```js
export const ColorPalette = {
    BOARD: '#bcb8b6',
    PRIMARY: '#54504a',
    SECONDARY: '#7d7d7d',
    ACTION: '#988f86',
    PALE: '#edeae5',
};
```
*Podrás cambiar estos colores con total libertad.*

Luego crearemos el archivo `env.js`, el cuál permitirá acceder de manera más sencilla a las variables de entorno.

```js
export const Env = {
    API_URL: process.env.EXPO_PUBLIC_API_URL,
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
};
```
Crearemos el archivo `expo.js` para exportar desde el mismo directorio las constantes de Expo que serán utiles para la creación de algunos estilos.

```js
export { default as Expo } from 'expo-constants';
```

Por último crearemos un archivo llamado `index.js` que será utilizado para exportar y facilitar el uso de los archivos contenidos `constants` en directorios externos 
```js
export * from './env';
export * from './colorPalette';
export * from './expo';
```

### Directorio `services`
Ahora, cambiaremos de directorio y nos dirigimos a `services` y creamos un archivo llamado `api.js`

Allí importaremos `Env` de `constants` y `Alert` de la librería de react-native de la siguiente manera:
```js
import { Env } from '../constants';
import { Alert } from 'react-native';
```

Luego, crearemos un método asíncrono, el cuál realizará el llamado a la API. Cabe aclarar que aquí haremos uso de la API_KEY, ya que esta será enviada a través del *Header* de la petición. Además, dicho método recibirá como parámetro `name` el nombre de la película que de la cuál queremos obtener su póster.
```js
export const api = {
    getMovies: async (name) => {
        const response = await fetch(Env.API_URL + name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: Env.API_KEY,
            },
        });
        // Validaciones
    },
};
        
```
Le agregamos unas validaciones que nos permitan comprobar si se logró una correcta conexión a la API o si se encontró una película con el nombre otorgado.
```js
    if (response.ok) {
        const data = await response.json();
        if (data.success) return data.result;
        else Alert.alert('Error', 'Película no encontrada', [{ text: 'OK' }]);
    } else Alert.alert('Error', 'Error de conexión', [{ text: 'OK' }]);
```
### Directorio `styles`
Ahora, empezaremos a crear los diferentes estilos que tendrá la aplicación, por ende dentro del directorio de `styles` crearemos un archivo llamado `poster.js`, en el que importaremos la paleta de colores definida anteriormente y una hoja de estilos de la librería de react native

```js
import { StyleSheet } from 'react-native';
import { ColorPalette } from '../constants';
```

A continuación, creamos la hoja de estilos y agregamos los estilos que tendrá el poster que cargará las imágenes que serán traidas desde la API
```js
export const posterStyles = StyleSheet.create({
    container: {
        width: 220,
        height: 320,
        borderWidth: 10,
        borderColor: ColorPalette.PRIMARY,
        backgroundColor: ColorPalette.PALE,
        marginBottom: 'auto',
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: ColorPalette.PRIMARY,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
    },
});
```

Después, en el mismo directorio creamos un archivo llamado `searchControl.js`

Realizamos las mismas importaciones que se hizo en el paso anterior
```js
import { StyleSheet } from 'react-native';
import { ColorPalette } from '../constants';
```

Creamos la hoja de estilos que será usada para el input de búsqueda en el que se ingresará el nombre de la película.
```js
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
```
Volveremos a realizar los importes de la paleta de colores y la hoja de estilos, adicionalmente exportaremos las constantes de Expo.
```js
import { StyleSheet } from 'react-native';
import { ColorPalette, Expo } from '../constants';
```

Definimos la hoja de estilo y haremos uso de la constante de Expo para que la aplicación no se sobreponga sobre la barra de notificaciones que tienen los smartphone la parte superior de la pantalla.
```js
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
```

Por último, crearemos el archivo `index.js` que nos permitirá exportar los estilos creados para que estos puedan ser usados por los componentes que serán creados más adelante.


```js
export * from './env';
export * from './colorPalette';
export * from './expo';
```

### Directorio `components`

Empezaremos creando el componente del poster de la película, lo llamaremos `Poster.jsx`

Realizamos la importación de los estilos del poster que generamos en el directorio de `styles`, entre otras importaciones que serán necesarias para el componente.

```js
import { posterStyles } from '../styles';
import { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
```

Luego creamos el componente y le agregamos un parámetro llamado `movies` que será el que reciba la información de las películas que serán mostradas en el poster.

```js
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

    // Retornamos la estructura del componente
};
```

Estrucutra del componente:
```html
<View style={posterStyles.container}>
    {activeMovie ? (
        <Image source={{ uri: activeMovie.Poster }} style={{ width: 200, height: 300 }} />
    ) : (
        <Text style={posterStyles.text}>{activeMovie ? activeMovie : 'Sin datos de película'}</Text>
    )}
</View>
```

Por último realizamos el exporte del componente.
```js
export default Poster;
```

Ahora, crearemos el componente que renderizará el input y el botón que permitirá realizar ingresar el título de la película, lo llamaremos `SearchControl.jsx`. Como se ha hecho hasta este momento iniciaremos realizando los imports correspondientes, importamos el estilo diseñado desde `styles`, la paleta de colores de `constants`, el "Pressable" que permite darle funcionalidad al botón entre otras importaciones.

```js
import { searchControlStyles } from '../styles';
import { Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { ColorPalette } from '../constants';
```

Luego creamos el componente y le agregamos un parámetro llamado `onSearch` que será el que reciba la información de las películas que serán mostradas en el poster.

```js
const SearchControl = ({ onSearch }) => {
    const [input, setInput] = useState();

    // Retornamos la estructura del componente
};
```

Estrucutra del componente:
```html
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
```

Por último realizamos el exporte del componente para poder ser reutilizado en distintos lugares si así lo deseamos.
```js
export default SearchControl;
```

### Directorio `src`
El contenido del archivo `Main.jsx` será el siguiente:
```js
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
```

En este componente estamos importando los estilos que definimos en el directorio de `styles`, el componente `Poster` y `SearchControl` que creamos en el directorio de `components` y el método `getMovies` que creamos en el directorio de `services`, para contruir el componente principal de la aplicación.

Como paso final en la carpeta raíz del proyecto vamos al archivo `App.js` y reemplazamos su contenido actual por:
```js
import Main from './src/Main';

export default function App() {
    return <Main />;
}
```

## Ejecución de la aplicación

Para ejecutar la aplicación debes ejecutar el siguiente comando en la consola:
```bash
npm start
```

Esto mostrará en la consola un código QR que podrás escanear con la aplicación de Expo Go en tu smartphone.

* App android: https://play.google.com/store/apps/details?id=host.exp.exponent
* App iOS: https://apps.apple.com/us/app/expo-go/id982107779

![console_qr](/assets/console_qr.png)

![app](/assets/app.png)