import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database.js';
import User from '../models/User.js';

const userRepository = AppDataSource.getRepository(User);

//Crear un nuevo usuario

/*En el método de registrar y login, ambos generan token JWT, esto es
debido a que puede que un usuario sea nuevo y le sirve para iniciar sesión
o si ya existe pero tiene mucho tiempo sin iniciar sesión, este genere otro token válido*/

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Nombre, email y contraseña son obligatorios' 
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }
    
    // Verificar si el email ya existe
    const existingUser = await userRepository.findOne({ 
      where: { email } 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'El email ya está registrado' 
      });
    }
    
    // Hasheado de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    
    const savedUser = await userRepository.save(user);
    
    // Generar token JWT
    const token = jwt.sign(
      { id: savedUser.id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};


//Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y contraseña son obligatorios' 
      });
    }
    
    const user = await userRepository.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }
    
    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

//Consultar perfil del usuario 
export const getProfile = async (req, res) => {
  try {
    const user = await userRepository.findOne({ 
      where: { id: req.userId },
      select: ['id', 'name', 'email', 'createdAt']
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};
