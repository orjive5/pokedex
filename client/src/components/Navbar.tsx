import { useAppDispatch, useAppSelector } from '../hooks';
import { removeUser } from '../redux/slices/userSlice';
import { setPokemon } from '../redux/slices/pokemonSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const findPokemon = useAppSelector((state) => state.pokemon.pokemon);
  const logOut = () => {
    localStorage.clear();
    dispatch(removeUser());
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-2 sm:flex-row w-full justify-between items-center p-3 sm:px-10 sm:py-5 bg-gray-200 sticky top-0">
      <h2 className="font-semibold text-lg">Hi, {localStorage.getItem('currentUserName')}</h2>
      <input
        type="search"
        placeholder="Find pokemon..."
        value={findPokemon}
        onChange={(e) => dispatch(setPokemon(e.target.value))}
        className="p-2 rounded-md"
      />
      <button
        className="bg-red-500 text-gray-100 py-2 px-5 rounded-md hover:bg-red-600"
        onClick={logOut}>
        Log out
      </button>
    </div>
  );
};

export default Navbar;
