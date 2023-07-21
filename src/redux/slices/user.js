import { createSlice } from "@reduxjs/toolkit";
import { login, profile } from "../API/user";

const initialState = {
  userData: { data: null, loading: true },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profile.fulfilled, (state, { payload }) => {
      state.userData = payload;
      state.userData.loading = false;
    });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const userReducer = userSlice.reducer;
