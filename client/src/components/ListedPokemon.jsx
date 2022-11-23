import React from 'react';
import { useNavigate } from 'react-router-dom';

const listedPokemon = ({ el, pokeNum }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 w-[200px] h-[250px] bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-gray-200 shadow-md hover:shadow-lg"
      key={el.name}
      onClick={() => navigate(`/pokemons/${el.name}`)}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokeNum[pokeNum.length - 1] ? pokeNum[pokeNum.length - 1] : pokeNum[pokeNum.length - 2]
        }.png`}
        alt={el.name}
        className="w-[90px] h-[90px]"
      />
      <h1 className="font-semibold">{el.name.toUpperCase()}</h1>
    </div>
  );
};

export default listedPokemon;
