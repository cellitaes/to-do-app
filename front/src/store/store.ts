import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { toDoReducer } from './slices/todoSlice';
import { errorReducer } from './slices/errorSlice';

const rootReducer = combineReducers({
  todo: toDoReducer,
  error: errorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
