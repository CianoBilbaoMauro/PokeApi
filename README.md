## Pokémon Team Builder - Proyecto Final EDI II

Aplicación web interactiva para la gestión y creación de equipos Pokémon, consumiendo datos en tiempo real desde la **PokéAPI**. El proyecto cuenta con una interfaz estética minimalista en blanco y negro de alto contraste y persistencia de datos del lado del cliente.


## Arquitectura y Estructura de Archivos

El proyecto está desarrollado bajo el paradigma de programación modular (ES Modules), separando las responsabilidades de forma limpia y organizada:

*   **`index.html` (y Vista Registro):** Estructura base de las dos pantallas funcionales del sistema (la grilla principal de equipos y el formulario de alta).

*   **`styles.css`:** Diseño visual e identidad de la aplicación. Aplica una estética limpia, monocromática y de alto contraste (blanco, negro y escalas de grises) con fuentes de Google Fonts (`Orbitron` e `Inter`) y adaptabilidad responsiva para dispositivos móviles.

*   **`PokemonTeam.js` (Clase):** Define el modelo de datos principal. Representa la entidad del equipo con sus 3 campos simples (`nombreEquipo`, `entrenador`, `region`) y un array (`pokemons`) que contendrá los objetos de la API.

*   **`api.js` (Módulo API):** Contiene la lógica asínrónica de comunicación externa. Se encarga de hacer el `fetch` a la **PokéAPI** para resolver las URLs de cada Pokémon y extraer sus detalles específicos (imágenes, tipo, peso, altura).

*   **`storage.js` (Módulo de Almacenamiento):** Gestiona la persistencia local de los datos. Guarda y lee los equipos creados por el usuario en el `localStorage` del navegador, serializando las estructuras mediante `JSON.stringify` y `JSON.parse` para mantener el formato JSON.

*   **`ui.js` (Módulo de Interfaz):** Maneja la manipulación del DOM de manera dinámica. Recibe los arrays de datos combinados y se encarga de inyectar las tarjetas (*cards*) en la grilla y de añadir el botón de eliminación integrado al diseño exclusivamente a los equipos custom.

*   **`app.js` (Orquestador principal):** El motor que inicia la aplicación. Ejecuta la carga en paralelo: hace el `fetch` inicial al archivo estático `./data/equipos.json`, lee los datos del `localStorage`, unifica ambos orígenes de datos mediante el operador *spread* (`...`), llama al render de la interfaz y escucha los eventos globales del sistema (como la eliminación de tarjetas).

