import express from 'express';
import {
  addToDo,
  deleteToDo,
  editToDo,
  getToDos,
} from '../controllers/toDo/toDo.controller';
import { body } from 'express-validator';
import { validateIdParam } from '../utils/validators/paramsValidators';
import { TaskStatus } from '../enums/task.enum';
import { checkUser } from '../middlewares/checkUser';

const router = express.Router();

router.get('/:searchTitle?', getToDos);

router.post(
  '/',
  checkUser,
  body('title')
    .isString()
    .notEmpty()
    .withMessage('Task must be a non-empty string'),
  addToDo
);

router.patch(
  '/',
  checkUser,
  body('id').isInt().withMessage('ID must be a valid number'),
  body('title').isString().notEmpty().withMessage('Text is required'),
  body('status').custom((value) => {
    if (!Object.values(TaskStatus).includes(value)) {
      throw new Error('Invalid status');
    }
    return true;
  }),

  editToDo
);

router.delete('/:id', checkUser, validateIdParam, deleteToDo);

export default router;
