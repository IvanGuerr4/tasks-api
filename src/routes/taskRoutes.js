import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Todas las rutas de tareas requieren autenticación del usuario
router.use(authMiddleware);

// Rutas CRUD de tareas

// Obtener todas las tareas del usuario
router.get('/', taskController.getAllTasks);  

// Obtener tarea especifica por ID
router.get('/:id', taskController.getTaskById);  

//Crear tarea nueva
router.post('/', taskController.createTask); 

//Modificar estado de tarea
router.put('/:id', taskController.updateTask);   

//Eliminar tarea
router.delete('/:id', taskController.deleteTask);      
export default router;
