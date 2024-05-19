import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import CustomDialog from '../../shared/components/modal/CustomDialog';
import { TaskStatus } from '../../enums/task.enum';
import { ChangeEvent, useState } from 'react';
import { useToDo } from '../../shared/hooks/useToDo';
import { StyledSelect, StyledTextField } from './styles';

type EditToDoDialogProps = {
  id: number;
  title: string;
  taskStatus: TaskStatus;
  openEditing: boolean;
  closeTaskEdition: () => void;
};

const EditToDoDialog = ({
  id,
  title,
  openEditing,
  taskStatus,
  closeTaskEdition,
}: EditToDoDialogProps) => {
  const { error, clearError, editTodo } = useToDo();

  const [taskText, setTaskText] = useState(title);
  const [status, setStatus] = useState(taskStatus);

  const handleTaskTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setTaskText(value);
  };

  const handleStatusChange = (e: SelectChangeEvent<any>) => {
    const { value } = e.target;

    setStatus(value);
  };

  const handleEditToDoClick = () => {
    editTodo(id, taskText, status);
    closeTaskEdition();
  };

  return (
    <>
      <CustomDialog
        open={openEditing}
        dialogTitle="Edit ToDo"
        handleClose={closeTaskEdition}
        dialogContent={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="edit-task-title">Task Title</InputLabel>
              <StyledTextField
                variant="outlined"
                value={taskText}
                onChange={handleTaskTextChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-multiple-name-label">Task status</InputLabel>
              <StyledSelect
                labelId="demo-multiple-name-label"
                input={<OutlinedInput label="Task status" />}
                id="demo-simple-select"
                value={status}
                label="Task status"
                onChange={handleStatusChange}
              >
                {Object.values(TaskStatus).map((taskStatus) => (
                  <MenuItem key={taskStatus} value={taskStatus}>
                    {taskStatus}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>
          </Grid>
        }
        dialogActions={
          <>
            <Button onClick={handleEditToDoClick}>Edit</Button>
            <Button onClick={closeTaskEdition}>Cancel</Button>
          </>
        }
      />
    </>
  );
};

export default EditToDoDialog;
