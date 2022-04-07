API VENTAS_HN
==

|Métodos| Urls  | Acciones|
|:-----:|-------| --------|
|  GET  | api/users| Obtiene todos los usuarios|
|  GET  | api/users/:id| Obtener usuario por id|
|  GET  | api/users/profile/:id| Obtener datos generales del usuario por **id** (nombre,score,id foto de perfil)|
|  POST | api/users/register| Registra el usuario en la base de datos|
|  POST | api/users/login| Verifica si el correo y contraseña son válidos|
|  PUT  | api/users/:userId| Actualiza los datos del usuario po **id**|
| DELETE| api/users/:userId| Elimina usuario por **id**|

__npm install__

    Obtiene todas las dependencias necesarias

__node index.js__

    Para levantar la API