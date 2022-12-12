import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  user: null | string;
};

const initialState: InitialState = {
  user: null
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
