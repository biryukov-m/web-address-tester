import React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CustomizedSnackbars: React.FC<IProps> = ({ open, setOpen }) => {
  const handleClose = (reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose('timeout')}>
      <Alert
        onClose={() => handleClose('timeout')}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Перевірку адрес завершено!
      </Alert>
    </Snackbar>
  );
};
