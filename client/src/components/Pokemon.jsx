import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";

const Pokemon = () => {
  const { pokemon_name } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState(null);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
      .then((list) => {
        setPokemonInfo(list.data);
        console.log(list.data);
      })
      .catch((er) => console.log(er));
  }, []);
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {pokemonInfo && (
        <div className="mt-10 flex flex-col items-center gap-5">
          <img
            alt={pokemon_name}
            src={
              pokemonInfo.sprites.other.home.front_default
                ? pokemonInfo.sprites.other.home.front_default
                : pokemonInfo.sprites.front_default
                ? pokemonInfo.sprites.front_default
                : pokemonInfo.sprites.other["official-artwork"].front_default
            }
            className="w-[150px] h-[150px]"
          />
          <h1 className="font-bold text-2xl">
            {pokemonInfo.name.toUpperCase()}
          </h1>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Abilities:</h1>
            <ul>
              {pokemonInfo.abilities.map((el) => {
                return (
                  <li key={el.ability.name}>
                    {el.ability.name.slice(0, 1).toUpperCase() +
                      el.ability.name.slice(1)}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Stats:</h1>
            <ul>
              {pokemonInfo.stats.map((el) => {
                return (
                  <li key={el.stat.name}>
                    {el.stat.name.slice(0, 1).toUpperCase() +
                      el.stat.name.slice(1)}
                    : {el.base_stat}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Types:</h1>
            <ul>
              {pokemonInfo.types.map((el) => {
                return (
                  <li key={el.type.name}>
                    {el.type.name.slice(0, 1).toUpperCase() +
                      el.type.name.slice(1)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <Link
        className="text-center mt-10 bg-red-500 text-gray-100 p-2 w-[200px] rounded-md hover:bg-red-600"
        to="/pokemons"
      >
        Back
      </Link>
    </div>
  );
};

export default Pokemon;
