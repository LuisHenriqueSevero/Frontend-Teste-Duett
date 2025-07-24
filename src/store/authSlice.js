import { createSlice } from "@reduxjs/toolkit";

const tokenLocal = sessionStorage.getItem("token");
const userLocal = sessionStorage.getItem("user");

const initialState = {
  token: tokenLocal || null,
  user: userLocal ? JSON.parse(userLocal) : null,
  isAuthenticated: !!tokenLocal,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
