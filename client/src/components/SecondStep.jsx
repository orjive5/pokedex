import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPassword } from "../redux/slices/signupSlice";
import { nextStep } from "../redux/slices/stepSlice";

const SecondStep = () => {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    confirmPassword === signup.password
      ? dispatch(nextStep())
      : setPasswordMatch(`Password didn't match!`);
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="password"
          placeholder="Enter your password"
          value={signup.password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <input
          required
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p>{passwordMatch}</p>
        <button>Next</button>
      </form>
    </div>
  );
};

export default SecondStep;
