import { Box, Grid, TextField, styled } from '@mui/material';

export const StyledGridSearchContainer = styled(Grid)({
  display: 'flex',
});

export const StyledAddToDoContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const StyledAddToDoInput = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
