import { DataSource } from 'typeorm';
import User from '../models/User.js';
import Task from '../models/Task.js';


  //Configuración de la conexión a la base de datos

  //TypeORM se encarga de crear las tablas automáticamente

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'tasks_db',
  /*synchronize permite crear las tablas de la BD y aplicar
  cambios al momento, lo utilicé al ser entorno local ya que 
  para entornos de producción entiendo que la mejor práctica
  son utilizar migraciones */
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Task],
  charset: 'utf8mb4',
});
