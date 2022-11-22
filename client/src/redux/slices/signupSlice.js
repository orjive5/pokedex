import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  email: "",
  username: "",
  password: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setName, setSurname, setEmail, setUsername, setPassword } =
  signupSlice.actions;

export default signupSlice.reducer;
