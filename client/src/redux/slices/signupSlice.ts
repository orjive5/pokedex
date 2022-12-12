import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
};

const initialState: InitialState = {
  name: '',
  surname: '',
  email: '',
  username: '',
  password: ''
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  }
});

export const { setName, setSurname, setEmail, setUsername, setPassword } = signupSlice.actions;

export default signupSlice.reducer;
