import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useToDo } from '../../shared/hooks/useToDo';
import { useState } from 'react';
import EditToDoDialog from './EditToDoDialog';
import { TaskStatus } from '../../enums/task.enum';

type ToDoItemActionsProps = {
  title: string;
  id: number;
  status: TaskStatus;
};

const ToDoItemActions = ({ title, id, status }: ToDoItemActionsProps) => {
  const [openEditing, setOpenEditing] = useState(false);

  const { deleteToDo } = useToDo();

  const openTaskEdition = () => {
    setOpenEditing(true);
  };

  const closeTaskEdition = () => {
    setOpenEditing(false);
  };

  const toDoItemActions = [
    {
      action: 'edit',
      icon: <EditIcon />,
      onClick: openTaskEdition,
    },
    {
      action: 'delete',
      icon: <DeleteIcon color="error" />,
      onClick: deleteToDo,
    },
  ];

  const generateToDoItemActions = () =>
    toDoItemActions.map(({ action, icon, onClick }) => (
      <IconButton
        edge="end"
        key={action}
        aria-label={action}
        onClick={() => onClick(id)}
      >
        {icon}
      </IconButton>
    ));

  return (
    <>
      {generateToDoItemActions()}
      <EditToDoDialog
        id={id}
        title={title}
        taskStatus={status}
        openEditing={openEditing}
        closeTaskEdition={closeTaskEdition}
      />
    </>
  );
};

export default ToDoItemActions;
