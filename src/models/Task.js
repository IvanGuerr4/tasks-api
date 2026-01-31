import { EntitySchema } from 'typeorm';

//Modelo de Tareas, con la sincronización no es necesario crear la tabla manualmente, TypeORM se encarga

const Task = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
// Campos obligatorios
    title: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    description: {
      type: 'text',
      nullable: false,
    },
    completed: {
      type: 'boolean',
      default: false,
      nullable: false,
    },
    dueDate: {
      type: 'date',
      nullable: false,
    },
// Campos null
    comments: {
      type: 'text',
      nullable: true,
    },
    responsible: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    tags: {
      type: 'simple-json',
      nullable: true,
    },
// Foreign Key del usuario
    userId: {
      type: 'int',
      nullable: false,
    },
// Timestamps
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'userId',
      },
      onDelete: 'CASCADE',
    },
  },
});

export default Task;
