import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { ToDo } from '../../interfaces/ToDo.interface';
import ToDoItemActions from '../ToDoActions/ToDoItemActions';
import { getIconBasedOnTaskStatus } from '../../shared/utils/taskStatus/getIconBasedOnTaskStatus';

type ToDoProps = {
  todo: ToDo;
};

const TodoItem = ({ todo }: ToDoProps) => {
  const { id, title, completionDate, status } = todo;

  return (
    <ListItem
      secondaryAction={
        <ToDoItemActions title={title} id={id} status={status} />
      }
    >
      <ListItemAvatar>{getIconBasedOnTaskStatus(status)}</ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={`${!!completionDate ? completionDate : ''}`}
      />
    </ListItem>
  );
};

export default TodoItem;
