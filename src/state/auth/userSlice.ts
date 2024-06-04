import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://mango-cars-server-1.onrender.com/api/v1";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  _id: string;
  createdAt: string;
  __v: number;
  phoneNumber: number;
}

interface RegisterResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string | null;
  phoneNumber?: string | null;
  region?: string | null;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface UpdateData {
  phoneNumber: string;
  region: string;
}

// Define your state interface
interface AuthState {
  isAuthenticated: boolean | null;
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  regSuccess: boolean;
  logSuccess: boolean;
  logoutSuccess: boolean;
  updateuserSuccess: boolean;
}
// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  loading: false,
  regSuccess: false,
  logSuccess: false,
  logoutSuccess: false,
  updateuserSuccess: false,
};

//register user thunk
export const registerUser = createAsyncThunk(
  "auth/registerUserAsync",
  async (formData: RegisterFormData) => {
    try {
      const { data } = await axios.post<RegisterResponse>(
        `${url}/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

//login user thunk
export const loginUser = createAsyncThunk(
  "auth/loginUserAsync",
  async (formData: LoginFormData) => {
    try {
      const { data } = await axios.post<RegisterResponse>(
        `${url}/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // Other headers if needed
          },
        }
      );
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

//load user thunk
export const loadUser = createAsyncThunk("auth/loadUserAsync", async () => {
  try {
    const { data } = await axios.get<RegisterResponse>(`${url}/me`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        // Other headers if needed
      },
    });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
});

//logout user thunk
export const logoutUser = createAsyncThunk("auth/logoutUserAsync", async () => {
  try {
    const { data } = await axios.get<RegisterResponse>(`${url}/logout`, {
      withCredentials: true,
    });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
});

//update user thunk
export const updateUser = createAsyncThunk(
  "auth/updateUserAsync",
  async (formData: UpdateData) => {
    try {
      const { data } = await axios.put<RegisterResponse>(
        `${url}/me/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // Other headers if needed
          },
        }
      );
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //additional reducers
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //register user
    builder.addCase(registerUser.pending, (state) => {
      state.isAuthenticated = false;
      state.regSuccess = false;
      state.loading = true;
      state.error = null;
      state.token = null;
      state.user = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload.success &&
        action.payload.user &&
        action.payload.token
      ) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.regSuccess = true;
      } else {
        state.error = action.payload.error ?? "Unknown error occurred.";
      }
    });
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.error.message;
      state.token = null;
      state.user = null;
      state.regSuccess = false;
    });

    //update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.updateuserSuccess = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload.success &&
        action.payload.user &&
        action.payload.token
      ) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.updateuserSuccess = true;
      } else {
        state.error = action.payload.error ?? "Unknown error occurred.";
      }
    });
    builder.addCase(updateUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
      state.updateuserSuccess = false;
    });

    //login user
    builder.addCase(loginUser.pending, (state) => {
      state.isAuthenticated = false;
      state.loading = true;
      state.error = null;
      state.token = null;
      state.user = null;
      state.logSuccess = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload.success &&
        action.payload.user &&
        action.payload.token
      ) {
        state.isAuthenticated = true;
        state.logSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      } else {
        state.error = action.payload.error ?? "Unknown error occurred.";
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.error.message ?? "login failed.";
      state.token = null;
      state.user = null;
      state.logSuccess = false;
    });

    //loaduser
    builder.addCase(loadUser.pending, (state) => {
      state.isAuthenticated = false;
      state.loading = true;
      state.error = null;
      state.token = null;
      state.user = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload.success &&
        action.payload.user &&
        action.payload.token
      ) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isAuthenticated = true;
      } else {
        state.error = action.payload.error ?? "Unknown error occurred.";
      }
    });
    builder.addCase(loadUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    });

    //logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.logoutSuccess = false;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.logoutSuccess = true;
      state.logSuccess = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = true;
      state.logoutSuccess = false;
    });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
