import { TaskStatus } from '../enums/task.enum';

export interface ToDo {
  id: number;
  title: string;
  status: TaskStatus;
  completionDate: Date | string;
}
