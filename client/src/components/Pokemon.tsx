import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Navbar from './Navbar';

type PokemonInfo = {
  [key: string]: any;
  abilities: string[];
};

type Abilities = {
  [key: string]: any;
};

const Pokemon = (): JSX.Element => {
  const { pokemon_name } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState<null | PokemonInfo>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
      .then((list) => {
        setPokemonInfo(list.data);
        console.log(list.data);
      })
      .catch((er) => console.log(er));
    //Check if user is logged in
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8000/auth/me', {
        headers: {
          Authorization: token
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {pokemonInfo && (
        <div className="mt-10 flex flex-col items-center gap-2 sm:gap-5">
          <img
            alt={pokemon_name}
            src={
              pokemonInfo.sprites?.other.home.front_default
                ? pokemonInfo.sprites.other.home.front_default
                : pokemonInfo.sprites.front_default
                ? pokemonInfo.sprites.front_default
                : pokemonInfo.sprites.other['official-artwork'].front_default
            }
            className="w-[90px] h-[90px] sm:w-[150px] sm:h-[150px]"
          />
          <h1 className="font-bold text-lg sm:text-2xl">{pokemonInfo.name.toUpperCase()}</h1>
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold">Abilities:</h1>
            <ul>
              {/* TODO */}
              {pokemonInfo.abilities.map((el: any) => {
                return (
                  <li key={el.ability.name}>
                    {el.ability.name.slice(0, 1).toUpperCase() + el.ability.name.slice(1)}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold">Stats:</h1>
            <ul>
              {/* TODO */}
              {pokemonInfo.stats.map((el: any) => {
                return (
                  <li key={el.stat.name}>
                    {el.stat.name.slice(0, 1).toUpperCase() + el.stat.name.slice(1)}: {el.base_stat}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold">Types:</h1>
            <ul>
              {/* TODO */}
              {pokemonInfo.types.map((el: any) => {
                return (
                  <li key={el.type.name}>
                    {el.type.name.slice(0, 1).toUpperCase() + el.type.name.slice(1)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <Link
        className="text-center m-10 bg-red-500 text-gray-100 p-2 w-[200px] rounded-md hover:bg-red-600"
        to="/pokemons">
        Back
      </Link>
    </div>
  );
};

export default Pokemon;
