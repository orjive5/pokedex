import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  pokemon: string;
};

const initialState: InitialState = {
  pokemon: ''
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<string>) => {
      state.pokemon = action.payload;
    },
    removePokemon: (state) => {
      state.pokemon = '';
    }
  }
});

export const { setPokemon, removePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
