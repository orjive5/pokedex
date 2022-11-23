import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemon: null,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    removePokemon: (state) => {
      state.pokemon = null;
    },
  },
});

export const { setPokemon, removePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
