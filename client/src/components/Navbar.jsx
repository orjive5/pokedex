import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser.user);
  console.log(currentUser);
  return <div>{currentUser && currentUser.name}</div>;
};

export default Navbar;
