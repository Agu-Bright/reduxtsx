import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { closeModal } from "../state/auth/errorSlice";

interface State extends SnackbarOrigin {
  open: boolean;
}
interface SnackBarProps {
  children: React.ReactNode;
}

export default function SnackBar({ children }: SnackBarProps) {
  const { open, message, success } = useSelector(
    (state: RootState) => state.error
  );
  const dispatch = useDispatch();
  return (
    <>
      {children}
      <Snackbar
        className="bg-primary"
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => dispatch(closeModal())}
        message={message}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4caf50 !important",
        }}
      />
    </>
  );
}
