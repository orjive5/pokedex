import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemons" element={<PokemonList />} />
        <Route path="/pokemons/:pokemon_name" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
