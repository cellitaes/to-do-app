import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../shared/components/modal/CustomDialog';
import ToDoHeader from './components/ToDoHeader';
import ToDoList from './components/ToDoList';
import { RootState } from '../store/store';
import { Typography } from '@mui/material';
import { errorActions } from '../store/slices/errorSlice';
import { Button } from '@mui/base';
import { ERROR_OCCURED } from '../constants/messages';

const Todos = () => {
  const dispatch = useDispatch();
  const { error, errorMsg } = useSelector((state: RootState) => state.error);

  const closeDialog = () => dispatch(errorActions.clearErrors());

  return (
    <>
      <ToDoHeader />
      <ToDoList />
      <CustomDialog
        open={!!error}
        dialogContent={<Typography>{errorMsg}</Typography>}
        dialogTitle={ERROR_OCCURED}
        handleClose={closeDialog}
        dialogActions={<Button onClick={closeDialog}>Ok</Button>}
      />
    </>
  );
};

export default Todos;
