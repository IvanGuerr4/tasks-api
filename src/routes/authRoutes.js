import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

//Rutas de autenticación y creación/consulta de usuarios

/*Puse la creación del usuario y su consulta aquí debido a que no se 
desarrolló un CRUD completo del usuario*/

// Rutas que no requieren autenticación para registrar nuevos usuarios y login
router.post('/register', authController.register);
router.post('/login', authController.login);


// Rutas protegida, para la consulta del perfil se requiere la autenticación 
router.get('/profile', authMiddleware, authController.getProfile);

export default router;
