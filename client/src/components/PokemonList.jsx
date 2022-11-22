import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const PokemonList = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    // Check if logged
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/auth/me", {
        headers: {
          Authorization: token,
        },
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    // Get pokemon info
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=50&offset=0")
      .then((list) => {
        setPokemons(list.data.results);
        console.log(list);
      })
      .catch((er) => console.log(er));
  }, []);
  return (
    <div>
      {pokemons.map((el) => {
        return (
          <div key={el.name}>
            <h1>{el.name}</h1>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.url.slice(
                -3,
                -1
              )}.png`}
              alt={el.name}
              // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${el.url.slice(
              //   -3,
              //   -1
              // )}.png`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
