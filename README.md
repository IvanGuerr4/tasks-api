# tasks-api
# Prueba técnica de Backend - Sistema de gestión de tareas

## Descripción

API REST desarrollada en **Node.js** con **Express.js** para la gestión de tareas.  
Permite a los usuarios crear, consultar, editar y eliminar tareas, identificando al 
usuario que realiza las solicitudes mediante **autenticación con JWT**, lo cual 
asegura que cada usuario solo vea y modifique sus propias tareas.

La API fue desarrollada siguiendo el **modelo MVC**, con una estructura ordenada de carpetas que 
separa controladores, entidades (modelos), rutas y middleware.

## Despliegue 
El proyecto también fue desplegado en **Railway**, y se puede acceder al backend desde el siguiente enlace:

[https://tasks-api-production-6f9f.up.railway.app/](https://tasks-api-production-6f9f.up.railway.app/)

## Stack Utilizado:
- Node.js
- Express.js
- Javascript
- MySQL
- JWT para autenticación


## Instalación Local:

1.- Clonar el Repositorio
```bash
git clone https://github.com/IvanGuerr4/tasks-api.git
```
2.- Entrar a la carpeta del proyecto
```bash
cd tasks-api
```
3.- Instalar dependencias
```bash
npm install
```
4.- Crear un archivo .env (Se puede tomar de referencia el archivo env.example)
5.- Iniciar el servidor 
```bash
npm run dev
```
6.- Acceder al proyecto en el navegador
```bash
http://localhost:3000
```

## Funcionamiento de la API

Creación de Usuario

```bash
POST -> http://localhost:3000/api/auth/register
```

<img width="921" height="485" alt="image" src="https://github.com/user-attachments/assets/8e522c6a-5e4d-4936-a352-eb02ce22407e" />


Login de usuario

```bash
POST -> http://localhost:3000/api/auth/login
```

<img width="921" height="485" alt="image" src="https://github.com/user-attachments/assets/99895f44-8fe0-4a51-ab80-a9b4e7963719" />


Consulta de usuario

```bash
GET -> http://localhost:3000/api/auth/profile
```

<img width="921" height="442" alt="image" src="https://github.com/user-attachments/assets/bf3a4865-1fd1-4181-9afd-9f47473495d0" />


Añadir tarea al usuario

```bash
POST -> http://localhost:3000/api/tasks
```

<img width="921" height="569" alt="image" src="https://github.com/user-attachments/assets/72e5daaa-9b4e-4604-a389-9d9f33db02e0" />


Consultar todas las tareas del usuario

```bash
GET -> http://localhost:3000/api/tasks
```

<img width="921" height="570" alt="image" src="https://github.com/user-attachments/assets/799e51d0-7078-47d6-ba06-8c39deccdafc" />


Consultar detalle de tarea por ID

```bash
GET -> http://localhost:3000/api/tasks/{id}
```

<img width="921" height="489" alt="image" src="https://github.com/user-attachments/assets/4e340823-50c8-4370-b8b5-da587139107a" />


Editar estado de tarea

```bash
PUT -> http://localhost:3000/api/tasks/{id}
```

<img width="921" height="533" alt="image" src="https://github.com/user-attachments/assets/8215d0fb-57ba-458b-8734-bc97a0774869" />


Eliminar tarea

```bash
DELETE -> http://localhost:3000/api/tasks/{id}
```

<img width="921" height="351" alt="image" src="https://github.com/user-attachments/assets/4148fd04-6673-44ad-b677-7ff59a7e3775" />


Nota: Todos los métodos correspondientes a la gestión de tareas y la consulta del usuario necesitan el uso del JWT, se puede probar
      en postman agregándolo como header a las peticiones.











