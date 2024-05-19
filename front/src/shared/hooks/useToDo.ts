import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { ToDo } from '../../interfaces/ToDo.interface';
import { useHttpClient } from './useFetch';
import { toDoActions } from '../../store/slices/todoSlice';
import { SERVER_URL } from '../../config';
import { TaskStatus } from '../../enums/task.enum';

type ToDosResponse = ToDo[];
type ToDoResponse = ToDo;

export const useToDo = () => {
  const dispatch = useDispatch();

  const { sendRequest, error, isLoading, clearError } = useHttpClient();

  const getTodos = useCallback(
    async (searchTitle?: string) => {
      const response = await sendRequest<ToDosResponse>(
        `${SERVER_URL}/api/todo/${searchTitle ?? ''}`
      );
      dispatch(toDoActions.setUpToDoState(response.data ?? []));
    },
    [dispatch, sendRequest]
  );

  const addTodo = useCallback(
    async (newTaskTitle: string) => {
      await sendRequest<ToDoResponse>(`${SERVER_URL}/api/todo`, 'POST', {
        title: newTaskTitle,
      });

      getTodos();
    },
    [sendRequest, getTodos]
  );

  const editTodo = useCallback(
    async (id: number, title: string, status: TaskStatus) => {
      await sendRequest<ToDoResponse>(`${SERVER_URL}/api/todo`, 'PATCH', {
        id,
        title,
        status,
      });

      getTodos();
    },
    [sendRequest, getTodos]
  );

  const deleteToDo = useCallback(
    async (id: number) => {
      await sendRequest<ToDo>(`${SERVER_URL}/api/todo/${id}`, 'DELETE');

      getTodos();
    },
    [sendRequest, getTodos]
  );

  return {
    isLoading,
    error,
    clearError,
    getTodos,
    deleteToDo,
    addTodo,
    editTodo,
  };
};
