import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import ListedPokemon from "./ListedPokemon";

const PokemonList = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [fullList, setFullList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        console.log(list);
      })
      .catch((er) => console.log(er));
  }, [listOffset]);

  //Get full pokemon list
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=1154&offset=0`)
      .then((list) => {
        setFullList(list.data.results);
      })
      .catch((er) => console.log(er));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {findPokemon ? (
        <div className="inline-grid grid-flow-row xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 m-10 gap-5 justify-items-center">
          {fullList.map((el, index) => {
            let pokeNum = el.url.split("/");
            return (
              el.name.includes(findPokemon) && (
                <ListedPokemon key={index} el={el} pokeNum={pokeNum} />
              )
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="inline-grid grid-flow-row xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 m-10 gap-5 justify-items-center">
            {isLoading
              ? Array.from({ length: 50 }, (_, i) => i + 1).map((el) => {
                  return <Skeleton key={el} />;
                })
              : pokemons.map((el, index) => {
                  let pokeNum = el.url.split("/");
                  return (
                    <ListedPokemon key={index} el={el} pokeNum={pokeNum} />
                  );
                })}
          </div>
          <ul className="flex flex-wrap gap-5 m-10">
            {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(
              (el) => {
                const handlePagination = () => {
                  setListOffset((el - 1) * 50);
                  setCurrentPage(el);
                };
                return (
                  <li
                    className={`${
                      currentPage === el ? "bg-gray-300" : "bg-gray-100"
                    } px-3 py-2 rounded-md hover:bg-gray-200 hover:cursor-pointer`}
                    onClick={handlePagination}
                    key={el}
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
