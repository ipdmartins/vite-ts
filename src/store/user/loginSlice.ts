import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiConnection from "../../services/apiCon";

export type AuthState = {
  user: {
    uuid: string;
    givenName: string;
    familyName: string;
    email: string;
  } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiConnection.post("/auth", {
        email,
        password,
      });
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data.error);
      }
    } catch (error) {
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// axios.get('/protected-resource', {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
