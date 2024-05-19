import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ErrorStore = {
  error: boolean;
  errorMsg: string;
};

const initialState: ErrorStore = {
  error: false,
  errorMsg: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorStore>) => {
      state.error = action.payload.error;
      state.errorMsg = action.payload.errorMsg;
    },
    clearErrors: (state) => {
      state.error = false;
      state.errorMsg = '';
    },
  },
});

export const errorActions = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
