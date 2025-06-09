"use client";

import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("info");
    return storedUser ? JSON.parse(storedUser) : {};
  }
  return {};
};

const initialState = {
  user: getUserFromLocalStorage(),
  organizations: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("info", JSON.stringify(action.payload));
    },
    setOrganizations: (state, action) => {
      state.organizations = action.payload;
    },
    setDefaultData: (state) => {
      state.user = {};
      localStorage.removeItem("info");
    },
  },
});

export const { setAuthUser, setOrganizations, setDefaultData } =
  userSlice.actions;
export default userSlice.reducer;
