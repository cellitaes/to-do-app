import DoneIcon from '@mui/icons-material/Done';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { TaskStatus } from '../../../enums/task.enum.ts';

export const getIconBasedOnTaskStatus = (taskStatus: TaskStatus) => {
  switch (taskStatus) {
    case TaskStatus.ONGOING:
      return <AccessTimeIcon color="warning" />;
    case TaskStatus.DONE:
      return <DoneIcon color="success" />;
    default:
      return <FiberNewIcon color="primary" />;
  }
};
