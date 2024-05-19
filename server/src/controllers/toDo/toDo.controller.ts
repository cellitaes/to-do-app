import { Request, Response } from 'express';
import { sendResponse } from '../../utils/functions/response';
import { TaskStatus } from '../../enums/task.enum';
import { ToDo } from '../../interfaces/ToDo.interface';
import { validationResult } from 'express-validator';
import { checkIfStatusIsDone } from '../../utils/functions/status';
import { generateNewDate } from '../../utils/functions/date';
import { filterToDosByTitle } from '../../utils/functions/todoFiltration';

let ID_COUNTER = 10;
let todos: ToDo[] = [
  {
    id: 1,
    title:
      'Choose a backend technology of your choice (Node.js, Python, Java, Dart, Kotlin, etc.)',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 2,
    title: 'Configure the backend environment to support the TODO list app',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 3,
    title: 'Establish endpoints for CRUD operations related to TODO items',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 4,
    title:
      'Utilize in-memory data structures for temporarily storing and managing the TODO items during the app’s runtime',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 5,
    title: 'Create a React project and structure it effectively',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 6,
    title:
      'Utilize appropriate networking libraries to communicate with the backend API',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 7,
    title: 'Display the list of TODO items fetched from the in-memory backend',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 8,
    title:
      'Implement interactions such as marking items as completed, adding new items, editing existing items, and deleting items',
    status: TaskStatus.NEW,
    completionDate: null,
  },
  {
    id: 9,
    title:
      'Integrate a simple search bar to allow users to search for TODO items based on their titles',
    status: TaskStatus.NEW,
    completionDate: null,
  },
];

export const getToDos = (req: Request, res: Response) => {
  const { searchTitle } = req.params;

  let filtratedToDos = todos;

  if (searchTitle)
    filtratedToDos = filterToDosByTitle(filtratedToDos, searchTitle);

  sendResponse({ res, payload: filtratedToDos });
};

export const addToDo = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return sendResponse({
      res,
      status: 400,
      message: errors.array().join('\n'),
    });

  const newTaskTitle = req.body.title;

  const newToDo: ToDo = {
    id: ID_COUNTER++,
    completionDate: null,
    status: TaskStatus.NEW,
    title: newTaskTitle,
  };

  todos.push(newToDo);

  sendResponse({ res, status: 201, payload: newToDo });
};

export const editToDo = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return sendResponse({
      res,
      status: 400,
      message: errors.array().join('\n'),
    });

  const { id, title, status } = req.body;

  const existingToDoIdx = todos.findIndex(({ id: todoId }) => todoId === id);
  const existingToDo = todos[existingToDoIdx];
  if (!existingToDo) throw new Error('Task you want to edit does not exist');

  const editedToDo = {
    ...existingToDo,
    title,
    status: status,
  };

  if (checkIfStatusIsDone(editedToDo))
    editedToDo.completionDate = generateNewDate();

  todos[existingToDoIdx] = editedToDo;

  sendResponse({ res, status: 200, payload: editedToDo });
};

export const deleteToDo = (req: Request, res: Response) => {
  const { id } = req.params;

  todos = todos.filter((todo) => todo.id !== +id);

  sendResponse({ res });
};
