import { AppDataSource } from '../config/database.js';
import Task from '../models/Task.js';

const taskRepository = AppDataSource.getRepository(Task);

//Obtener todas las tareas del usuario autenticado
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskRepository.find({
      where: { userId: req.userId },
      select: ['id', 'title', 'description', 'completed', 'dueDate'],
      order: { createdAt: 'DESC' },
    });
    
    res.json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

//Consultar tarea específicada por el id
export const getTaskById = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    
    const task = await taskRepository.findOne({
      where: { 
        id: taskId,
        userId: req.userId 
      },
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error al obtener tarea:', error);
    res.status(500).json({ error: 'Error al obtener tarea' });
  }
};


//Añadir nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, completed, comments, responsible, tags } = req.body;
    
    if (!title || !description || !dueDate) {
      return res.status(400).json({ 
        error: 'Los campos title, description y dueDate son obligatorios' 
      });
    }
    
    const task = taskRepository.create({
      title,
      description,
      dueDate,
      completed: completed || false,
      comments,
      responsible,
      tags,
      userId: req.userId,
    });
    
    const savedTask = await taskRepository.save(task);
    
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};


//Actualizar estado de tarea 
export const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    
    // Buscar la tarea
    const task = await taskRepository.findOne({
      where: { 
        id: taskId,
        userId: req.userId
      },
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    const { title, description, dueDate, completed, comments, responsible, tags } = req.body;
    
    taskRepository.merge(task, {
      title: title !== undefined ? title : task.title,
      description: description !== undefined ? description : task.description,
      dueDate: dueDate !== undefined ? dueDate : task.dueDate,
      completed: completed !== undefined ? completed : task.completed,
      comments: comments !== undefined ? comments : task.comments,
      responsible: responsible !== undefined ? responsible : task.responsible,
      tags: tags !== undefined ? tags : task.tags,
    });
    
    const updatedTask = await taskRepository.save(task);
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
};


//Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    
    const task = await taskRepository.findOne({
      where: { 
        id: taskId,
        userId: req.userId 
      },
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    await taskRepository.remove(task);
    
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
};
