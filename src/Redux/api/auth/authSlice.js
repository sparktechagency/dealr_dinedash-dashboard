import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  // userInfo: null,
  // Add more user-related state if needed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      // state.userInfo = null;
    },
    // setUserInfo: (state, action) => {
    //   state.userInfo = action.payload;
    // },
  },
});

export const { setAccessToken, clearAuth } = authSlice.actions;

export default authSlice.reducer;
