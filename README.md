# API_GestionEventosDeportivos

## 1. Inicio y arranque del proyecto

Para empezar, se debe proceder a instalar la carpeta "node_modules" y las dependencias del proyecto:
```js
npm i
```

En el archivo ".env", además, será necesario establecer las siguientes variables de entorno:

- El puerto donde se va a ejecutar el servidor
- La URL de la base de datos de MongoDB sobre la que se van a ejecutar las rutas de la API
- Una contraseña para ejecutar JWT

Una vez definidas las variables de entorno el proyecto está listo para ejecutar en modo desarrollo: 
```js
npm run dev
```

### Creación y conexión con el servidor

En el archivo "index.js" encontramos las configuraciones generales del proyecto, como la creación del servidor y la conexión con la BDD.

## 2. Utils: conexión con Mongo, creación del JWT y Middleware

Dentro de /src, en la carpeta "utils" encontramos aspectos misceláneos del proyecto, como:

- db_mongo.js: la conexión con el host (cluster de MongoDB) y base de datos usada a través de la dependencia "mongoose" y su exportación para ser aplicada en el index
- jwt.js: la función que crea el token de inicio de sesión (por medio de JWT) que exportamos para ser utilizado en el proceso de autenticación
- middleware.js: constituye el paso intermedio en las rutas y permite hacer validaciones para autorizar el acceso a rutas protegidas, en este caso al tratarse de una única función de validación de token se ha incluido en utils en vez de crear una carpeta específica de middleware

## 3. Rutas de creación y autenticación de usuarios

En la carpeta /api se encuentra la configuración del funcionamiento de la misma.

El archivo de rutas general ("routes.js") contiene los endpoints principales de la API (/users y /events), que a su vez tienen sus propios archivos de rutas para facilitar la organización del proyecto.

En "/api_routes/users_routes.js" encontramos los endpoints para la creación y autenticación de usuarios. Se debe utilizar la extensión Thunder Client para simular las peticiones del cliente al servidor y probar las rutas:

### Registrar un usuario

Una ruta del método POST. Si ponemos que el puerto donde se ejecuta el servidor es 4000, entonces la url sería:
http://localhost:4000/users/register

En el "Body" de la petición introduciríamos los datos del usuario a registrar en formato JSON y de acuerdo al modelo de datos disponible en "users_model.js" dentro de la carpeta /model. Por ejemplo:
```js
{
    "id": 1,
    "username": "elisa",
    "password": "1234"
}
```
Si todo ha ido bien se devuelve como respuesta la información del usuario con la contraseña encriptada.

### Inicio de sesión de usuario

Una ruta del método POST: http://localhost:4000/users/login

En el "Body" de la petición introducimos el nombre de usuario que hayamos creado y la contraseña del mismo en formato JSON y si el inicio de sesión ha sido exitoso recibiremos el token, que habrá que copiar para acceder a rutas protegidas.

### Obtener los datos de perfil

Una ruta /protegida/ del método GET que permite al usuario loggeado ver su información: http://localhost:4000/users/profile

Simplemente se necesita introducir el token de inicio de sesión en la pestaña "Auth > Bearer" de la petición.

## 4. Rutas del CRUD y consulta avanzada de eventos

En "/api_routes/events_routes.js" encontramos los endpoints para realizar el CRUD de gestión de eventos y los de consulta avanzada. Algunas de estas rutas están protegidas y necesitarán un token para su autorización. Igualmente se usará Thunder Client para probarlas.

### Gestión de eventos

#### Ver todos los eventos

Una ruta del método GET que devuelve todos los eventos registrados en la base de datos, si esta está vacía devuelve el correspondiente mensaje: http://localhost:4000/events

#### Ver eventos por ID

Una ruta del tipo GET dinámica que devuelve el evento registrado bajo el campo "id" que introduzcamos en el endpoint. Por ejemplo, si queremos acceder al evento con el "id" número 3, la url sería: http://localhost:4000/events/3

#### Crear un nuevo evento

Una ruta del tipo POST que nos permiter crear un nuevo evento en la base de datos: http://localhost:4000/events/

Atendiendo al modelo de datos "events_model.js" de la carpeta /models, en el "Body" de la petición introduciríamos un JSON como en el siguiente ejemplo:
```js
{
    "id": 1,
    "name": "Torneo de fútbol 7",
    "description": "Torneo amistoso de fútbol 7 para equipos locales",
    "date": "2025-01-12",
    "location": "Estadio Municipal",
    "sport": "futbol",
    "organizer": "elisa"
}
```

Esta ruta está PROTEGIDA, por lo que es necesario haber pegado el token en la pestaña "Auth" para pasar el middleware y estar autorizados.

#### Modificar un evento por ID

Una ruta del tipo PUT dinámica por la que podemos actualizar un documento de la base de datos utilizando en parámetro "id". Si tomáramos el ejemplo anterior la url sería: http://localhost:4000/events/1

En el "Body" de la petición introduciríamos el documento actualizado, que podría ser algo como lo siguiente:
```js
{
    "id": 1,
    "name": "Torneo de fútbol 7",
    "description": "Torneo amistoso de fútbol 7 para equipos locales",
    "date": "2025-01-11",
    "location": "Estadio Municipal",
    "sport": "futbol",
    "organizer": "juanantonio5"
}
```
La respuesta devuelve un mensaje con el documento actualizado.

Esta ruta está PROTEGIDA, por lo que es necesario haber pegado el token en la pestaña "Auth" para pasar el middleware y estar autorizados.

#### Eliminar un evento por ID

Una ruta del tipo DELETE dinámica por la que podemos eliminar un documento de la base de datos utilizando en parámetro "id". Por ejemplo: http://localhost:4000/events/4

La respuesta devuelve un mensaje de confirmación con el documento eliminado.

Esta ruta está PROTEGIDA, por lo que es necesario haber pegado el token en la pestaña "Auth" para pasar el middleware y estar autorizados.

### Consulta avanzada

Las rutas avanzadas pertenecen todas al método GET. Para evitar que interfieran con las rutas GET del CRUD, se han modificado ligeramente los endpoints con respecto a los enunciados de la actividad.

#### Ver eventos próximos

Devuelve una lista de eventos próximos a partir de la fecha actual y en orden ascendente, es decir, los más próximos primero: http://localhost:4000/events/upcoming/get

#### Filtrar eventos por deporte

Permite mostrar los eventos según el deporte que nos interese, por lo tanto en la petición es necesario introducir el parámetro "type" con el deporte deseado dentro en la pestaña "Query". Por ejemplo, si quisiéramos buscar un evento de hockey, la url sería: http://localhost:4000/events/filterbysport/events?type=hockey

#### Filtrar eventos por fecha

Permite filtrar eventos que ocurran dentro de un rango de fechas determinado, al igual que en la anterior ruta es necesario usar los parámetros Query en la petición. En este caso, se usará "from" para definir la fecha de inicio y "to" para la de finalización, ambas inclusive. Es decir que la url quedaría algo como lo siguiente: http://localhost:4000/events/filterbydate/date?from=2025-01-01&to=2025-01-31

La respuesta devuelve una lista con los eventos disponibles en orden ascendente y, si no existe ninguno, el coresspondiente mensaje.