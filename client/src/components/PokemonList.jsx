import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const PokemonList = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(50);
  const [listOffset, setListOffset] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const findPokemon = useSelector((state) => state.pokemon.pokemon);

  // Check if user is logged
  useEffect(() => {
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
  }, []);
  // Get pokemon info
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=50&offset=${listOffset}`)
      .then((list) => {
        setPokemons(list.data.results);
        setNumberOfPages(Math.ceil(list.data.count / pokemonsPerPage));
        console.log(list);
      })
      .catch((er) => console.log(er));
  }, [listOffset]);
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {findPokemon ? (
        <div className="grid grid-cols-5 m-10 gap-5 justify-items-center">
          {pokemons.map((el) => {
            let pokeNum = el.url.split("/");
            return (
              el.name.includes(findPokemon) && (
                <div
                  className="flex flex-col items-center justify-center gap-5 w-[200px] h-[250px] bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-gray-200 shadow-md hover:shadow-lg"
                  key={el.name}
                  onClick={() => navigate(`/pokemons/${el.name}`)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokeNum[pokeNum.length - 1]
                        ? pokeNum[pokeNum.length - 1]
                        : pokeNum[pokeNum.length - 2]
                    }.png`}
                    alt={el.name}
                    className="w-[90px] h-[90px]"
                  />
                  <h1 className="font-semibold">{el.name.toUpperCase()}</h1>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-5 m-10 gap-5 justify-items-center">
            {pokemons.map((el) => {
              let pokeNum = el.url.split("/");
              return (
                <div
                  className="flex flex-col items-center justify-center gap-5 w-[200px] h-[250px] bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-gray-200 shadow-md hover:shadow-lg"
                  key={el.name}
                  onClick={() => navigate(`/pokemons/${el.name}`)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      pokeNum[pokeNum.length - 1]
                        ? pokeNum[pokeNum.length - 1]
                        : pokeNum[pokeNum.length - 2]
                    }.png`}
                    alt={el.name}
                    className="w-[90px] h-[90px]"
                  />
                  <h1 className="font-semibold">{el.name.toUpperCase()}</h1>
                </div>
              );
            })}
          </div>
          <ul className="flex gap-5 mb-10">
            {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(
              (el) => {
                return (
                  <li
                    className="bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => setListOffset((el - 1) * 50)}
                  >
                    {el}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
