import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // IMPORTANT — using axios instance

/* =========================================
   Helpers
========================================= */

// safely parse localStorage JSON
const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userInfo")) || null;
  } catch {
    return null;
  }
};

// save user to localStorage
const saveUser = (data) => {
  localStorage.setItem("userInfo", JSON.stringify(data));
};


/* =========================================
   Async Thunks
========================================= */

/** ---------------------------
 *  LOGIN USER (using axios)
 * ----------------------------*/
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      saveUser(data);
      return data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/** ---------------------------
 *  REGISTER USER (using axios)
 * ----------------------------*/
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      saveUser(data);
      return data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);


/* =========================================
   Slice
========================================= */

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: getStoredUser(),
    status: "idle",     // idle | loading | succeeded | failed
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("userInfo");
    },
  },

  extraReducers: (builder) => {
    const setPending = (state) => {
      if (!state.userInfo) state.status = "loading"; // avoid flicker when logged in
      state.error = null;
    };

    const setRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    };

    builder
      /** REGISTER */
      .addCase(registerUser.pending, setPending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, setRejected)

      /** LOGIN */
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, setRejected);
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
