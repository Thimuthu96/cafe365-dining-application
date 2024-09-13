import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CartCustomDialog = (props) => {
  const { open, onClose, title, desc, handleFunc, email, setEmail } = props;

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0E9E52",
      },
    },
  });

  return (
    <Dialog
      open={open}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
          <ThemeProvider theme={theme}>
            <TextField
              label="Email"
              placeholder="Enter Email"
              type="email"
              fullWidth
              size="small"
              required
              margin="normal"
              value={email}
              color="secondary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </ThemeProvider>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="success">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleFunc();
            onClose();
          }}
          variant="contained"
          color="success"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartCustomDialog;
