import { TaskStatus } from '../../enums/task.enum';
import { ToDo } from '../../interfaces/ToDo.interface';

export const checkIfStatusIsDone = (toDo: ToDo) =>
  toDo.status === TaskStatus.DONE;
