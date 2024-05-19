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
import {
  ID_MUST_BE_VALID_NUMBER,
  INVALID_STATUS,
  TASK_MUST_BE_NOT_EMPTY,
  TEXT_IS_REQUIRED,
} from '../constants/messages';

const router = express.Router();

router.get('/:searchTitle?', getToDos);

router.post(
  '/',
  checkUser,
  body('title').isString().notEmpty().withMessage(TASK_MUST_BE_NOT_EMPTY),
  addToDo
);

router.patch(
  '/',
  checkUser,
  body('id').isInt().withMessage(ID_MUST_BE_VALID_NUMBER),
  body('title').isString().notEmpty().withMessage(TEXT_IS_REQUIRED),
  body('status').custom((value) => {
    if (!Object.values(TaskStatus).includes(value)) {
      throw new Error(INVALID_STATUS);
    }
    return true;
  }),

  editToDo
);

router.delete('/:id', checkUser, validateIdParam, deleteToDo);

export default router;
