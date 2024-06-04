import { createSlice } from "@reduxjs/toolkit";
//interfaces
interface ErrorState {
  open: boolean;
  message: string;
  success: boolean;
}

//initial state
const initialState: ErrorState = {
  open: false,
  message: "",
  success: true,
};

const errorSlice = createSlice({
  name: "Error",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    closeModal: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { openModal, closeModal } = errorSlice.actions;

export default errorSlice.reducer;
