import { Button, Grid, TextField } from '@mui/material';
import {
  StyledAddToDoContainer,
  StyledAddToDoInput,
  StyledGridSearchContainer,
} from '../styles';
import { useToDo } from '../../shared/hooks/useToDo';
import { ChangeEvent, useState } from 'react';
import SearchToDo from './SearchToDo';

const ToDoHeader = () => {
  const [newToDoText, setNewToDoText] = useState('');

  const { error, addTodo } = useToDo();

  const handleNewToDoTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setNewToDoText(value);
  };

  const handleAddToDoClick = async () => {
    setNewToDoText('');

    await addTodo(newToDoText);

    if (error) setNewToDoText(newToDoText);
  };

  return (
    <Grid container spacing={2}>
      <StyledGridSearchContainer xs={4} item>
        <SearchToDo />
      </StyledGridSearchContainer>
      <Grid xs={8} item>
        <StyledAddToDoContainer>
          <StyledAddToDoInput
            id="outlined-basic"
            label="Add To Do"
            variant="outlined"
            value={newToDoText}
            onChange={handleNewToDoTextChange}
          />
          <Button
            disabled={!newToDoText}
            variant="contained"
            size="medium"
            onClick={handleAddToDoClick}
          >
            Add To Do
          </Button>
        </StyledAddToDoContainer>
      </Grid>
    </Grid>
  );
};

export default ToDoHeader;
