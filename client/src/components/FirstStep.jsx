import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setSurname,
  setEmail,
  setUsername,
} from "../redux/slices/signupSlice";
import { nextStep } from "../redux/slices/stepSlice";

const FirstStep = () => {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(nextStep());
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Enter your name"
          value={signup.name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        <input
          required
          type="text"
          placeholder="Enter your surname"
          value={signup.surname}
          onChange={(e) => dispatch(setSurname(e.target.value))}
        />
        <input
          required
          type="email"
          placeholder="Enter your email"
          value={signup.email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          required
          type="text"
          placeholder="Enter your username"
          value={signup.username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <button>Next</button>
      </form>
    </div>
  );
};

export default FirstStep;
