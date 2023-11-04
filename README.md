# DOJO React Native


# Introducción - Compumovie
¡Bienvenido al proyecto CompuMovie! esta una aplicación desarrollada con React Native que permite a los usuarios buscar posters de películas utilizando un su nombre original como referencia. Este proyecto está diseñado como un dojo para guiar a los desarrolladores paso a paso en la creación y estructuración de una aplicación React Native utilizando Expo.

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

Ahora, procederemos a crear el archivo `colorPalette.js` en `constants`, allí definiremos los colores en hexadecimal que serán usados a lo largo de la aplicación de la siguiente manera:

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

Luego, en el mismo directorio de `constants` crearemos el archivo `env.js`, el cuál permitirá hacer un uso más sencillo de las variables de entorno.

```js
export const Env = {
    API_URL: process.env.EXPO_PUBLIC_API_URL,
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
};
```
Después, sin cambiar de directorio crearemos el archivo `expo.js` para exportar desde el mismo directorio las constantes de Expo que serán utiles para la creación de algunos estilos.

```js
export { default as Expo } from 'expo-constants';
```

Por último en este directorio, crearemos un archivo llamado `index.js` que será utilizado para exportar y facilitar el uso de los archivos contenidos `constants` en directorios externos 
```js
export * from './env';
export * from './colorPalette';
export * from './expo';
```

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


-- Estilos


-- Componentes



CompuMoviePosterFinder/
├── src/
│   ├── components/
│   │   └── SearchBar.js
│   ├── assets/
│   │   └── (your static files like images and logos)
│   ├── screens/
│   │   └── HomeScreen.js
│   ├── utils/
│   │   └── (any utility files you have)
│   └── App.js
├── styles/
│   └── globalStyles.js
├── .env
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

**Please note:** For brevity, not all files and folders are listed.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your system.
- Expo CLI installed globally (`npm install -g expo-cli`).
- An API key from a movie database service like OMDB or TheMovieDB (for fetching movie posters).

## Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/your-username/CompuMoviePosterFinder.git
   ```

2. Navigate to the cloned directory:

   ```
   cd CompuMoviePosterFinder
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Set up your `.env` file with the required API keys:

   ```
   EXPO_PUBLIC_API_URL=your_api_endpoint_here
   EXPO_PUBLIC_API_KEY=your_api_key_here
   ```

5. Start the Expo server:

   ```
   expo start
   ```

## Usage

### Running the Application

After installation, the Expo developer tools should open in your browser. You can then:

- Run the app in an iOS or Android simulator.
- Scan the QR code with your Expo Go app on your physical device.

### Application Walkthrough

1. **Home Screen**:
   - You will be greeted by the "CompuMovie" title.
   - Below the title, there's a view area representing where the movie poster will be displayed.  
     _Image description: View of the home screen showing a white view placeholder for the movie poster._

2. **Search for a Movie**:
   - Below the poster placeholder, there's an input field where you can type the name of the movie you're looking for.
   - A 'Search Movie' button is provided to initiate the search.
     _Image description: View of the input field and the search button._

3. **Displaying Results**:
   - Upon searching, if a movie is found, its poster will be displayed in the placeholder area.
   - If no movie is found, an alert will notify you.
     _Image description: The view area now displays the fetched movie poster or an alert message._

### Code Structure

- `App.js`:
  - This is the entry point of your application which contains the main logic of the app.

- `src/components/SearchBar.js`:
  - A component that encapsulates the input field and search button logic.

- `src/screens/HomeScreen.js`:
  - The main screen of the app which uses the `SearchBar` component and displays the movie poster.

- `styles/globalStyles.js`:
  - Contains all the global styles used across the app.

## Customization

You can easily customize the color scheme, add more functionality like fetching additional movie details, or handle different API responses by modifying the corresponding files.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

This README provides you with a clear understanding of the CompuMovie Poster Finder project. Follow each step carefully to ensure the setup is successful. Happy coding!

**End of README.md**

---

Please replace the placeholders with the actual image descriptions and links to images as required in your project documentation.