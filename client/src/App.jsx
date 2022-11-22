import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import { setUser } from "./redux/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const step = useSelector((state) => state.step.value);
  const [loginForm, setLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/auth/login", {
        email: loginEmail,
        password: loginPassword,
      })
      .then((authorizedUser) => {
        dispatch(setUser(authorizedUser.data));
        localStorage.setItem("token", authorizedUser.data.token);
        localStorage.setItem("currentUserName", authorizedUser.data.name);
        navigate("/pokemons");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-indigo-400 min-h-screen w-full">
      <h1>Welcome to Pokedex</h1>
      {loginForm ? (
        <div>
          <h2>Log in</h2>
          <form onSubmit={handleLogin}>
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button>Log in</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          {step === 0 && <FirstStep />}
          {step === 1 && <SecondStep />}
          {step === 2 && <ThirdStep />}
          <h2>Already have an account?</h2>
          <button onClick={() => setLoginForm(true)}>Log in</button>
        </div>
      )}
    </div>
  );
}

export default App;
