import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.value += 1;
    },
    previousStep: (state) => {
      state.value -= 1;
    },
    goToStep: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { nextStep, previousStep, goToStep } = stepSlice.actions;

export default stepSlice.reducer;
