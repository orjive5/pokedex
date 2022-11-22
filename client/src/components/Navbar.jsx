import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.clear();
    dispatch(removeUser());
    window.location.reload(false);
  };
  return (
    <div>
      <h1>Hello, {localStorage.getItem("currentUserName")}</h1>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Navbar;
