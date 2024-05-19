import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

type DialogProps = {
  open: boolean;
  dialogTitle: string;
  dialogContent: ReactNode;
  dialogActions: ReactNode;
  handleClose: () => void;
};

const CustomDialog = ({
  open,
  dialogTitle,
  dialogContent,
  dialogActions,
  handleClose,
}: DialogProps) => {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{dialogContent}</DialogContent>
        <DialogActions>{dialogActions}</DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
