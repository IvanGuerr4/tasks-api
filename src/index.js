import 'reflect-metadata';
import 'dotenv/config';
//Para el proyecto se usó express.js y JS
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta principal, pequeño mensaje con descripción y como usar endpoints
app.get('/', (req, res) => {
  res.json({ 
    message: 'Tasks API con autenticación JWT',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile (requiere token JWT en header POSTMAN)',
      },
      tasks: {
        getAll: 'GET /api/tasks (requiere token JWT en header POSTMAN)',
        getById: 'GET /api/tasks/:id (requiere token JWT en header POSTMAN)',
        create: 'POST /api/tasks (requiere token JWT en header POSTMAN)',
        update: 'PUT /api/tasks/:id (requiere token JWT en header POSTMAN)',
        delete: 'DELETE /api/tasks/:id (requiere token JWT en header POSTMAN)',
      },
    },
  });
});

// Mensaje para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Estado de la conexión a la BD e inicialización del server
AppDataSource.initialize()
  .then(() => {
    console.log('Conexión correcta a la base de datos');

    app.listen(PORT, () => {
      console.log('Server listo en puerto', PORT);
      console.log('Corriendo:', process.env.NODE_ENV || 'development');
    });
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos', err);
    process.exit(1);
  });
