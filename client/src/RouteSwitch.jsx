import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PokemonList from "./components/PokemonList";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemons" element={<PokemonList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
