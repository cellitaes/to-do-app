import { useEffect } from 'react';
import { CircularProgress, Grid, List, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import ToDoItem from './ToDoItem';
import { useToDo } from '../../shared/hooks/useToDo';
import { RootState } from '../../store/store';

const ToDoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((store: RootState) => store.todo.todos);

  const { isLoading, getTodos } = useToDo();

  useEffect(() => {
    getTodos();
  }, [dispatch, getTodos]);

  const generateToDoItems = () =>
    todos.map((todo) => {
      return <ToDoItem key={todo.id} todo={todo} />;
    });

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          ToDo List
        </Typography>

        {!isLoading ? <List>{generateToDoItems()}</List> : <CircularProgress />}
        {!todos.length && 'No to dos'}
      </Grid>
    </>
  );
};

export default ToDoList;
