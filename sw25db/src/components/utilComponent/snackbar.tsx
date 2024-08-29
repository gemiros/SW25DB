import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

type Props = {
  snackBarText: string,
  open: boolean
  setOpen: (o: boolean) => void
}
export default function AutohideSnackbar(props: Props) {
  // const [open, setOpen] = React.useState(false);
  const { open, setOpen } = props

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={props.snackBarText}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
}
