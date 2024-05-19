import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDo } from '../../interfaces/ToDo.interface';

type ToDoStore = {
  todos: ToDo[];
  searchTitle: string;
};

const initialState: ToDoStore = {
  todos: [],
  searchTitle: '',
};

const toDoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setUpToDoState: (state, action: PayloadAction<ToDo[]>) => {
      state.todos = action.payload;
    },
    addToDo: (state, action: PayloadAction<ToDo>) => {
      state.todos.push(action.payload);
    },
    deleteToDo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateSearchTitle: (state, action: PayloadAction<string>) => {
      state.searchTitle = action.payload;
    },
  },
});

export const toDoActions = toDoSlice.actions;

export const toDoReducer = toDoSlice.reducer;
