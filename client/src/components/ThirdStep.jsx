import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const ThirdStep = () => {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    terms
      ? axios
          .post("http://localhost:8000/auth/register", {
            name: signup.name,
            surname: signup.surname,
            username: signup.username,
            email: signup.email,
            password: signup.password,
          })
          .then((authorizedUser) => {
            dispatch(setUser(authorizedUser.data));
            localStorage.setItem("token", authorizedUser.data.token);
            localStorage.setItem("currentUserName", authorizedUser.data.name);
            navigate("/pokemons");
          })
          .catch((err) => {
            console.log(err);
          })
      : setTermsMessage("You need to accept terms of service!");
  };
  const [terms, setTerms] = useState(false);
  const [termsMessage, setTermsMessage] = useState("");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          id="acceptTerms"
          checked={terms}
          onChange={() => setTerms(!terms)}
        />
        <label htmlFor="acceptTerms">Accept terms of service</label>
        <p>{termsMessage}</p>
        <button>Finish</button>
      </form>
    </div>
  );
};

export default ThirdStep;
