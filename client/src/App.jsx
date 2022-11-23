import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import { setUser } from "./redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WelcomeToPokedex from "./assets/welcome.png";

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

  //Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/auth/me", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/pokemons");
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="bg-red-600 flex justify-center p-10 w-full">
        <img alt="Welcome to Pokedex" src={WelcomeToPokedex} />
      </div>
      <div className="bg-gray-800 h-5 w-full flex justify-center items-center relative">
        <div className="w-[60px] h-[60px] bg-white rounded-full absolute border-8 border-gray-800"></div>
      </div>
      {loginForm ? (
        <div className="w-[500px] bg-gray-200 mt-20 rounded-lg p-5 flex flex-col items-center gap-5">
          <h2 className="font-semibold text-lg">Log in</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="p-2"
            />
            <input
              required
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="p-2"
            />
            <button className="bg-red-500 text-gray-100 p-2 rounded-md hover:bg-red-600">
              Log in
            </button>
          </form>
          <h2 className="font-semibold text-lg">Don't have an account yet?</h2>
          <button
            className="bg-red-500 text-gray-100 p-2 w-[200px] rounded-md hover:bg-red-600"
            onClick={() => setLoginForm(false)}
          >
            Sign up
          </button>
        </div>
      ) : (
        <div className="w-[500px] bg-gray-200 mt-20 rounded-lg p-5 flex flex-col items-center gap-5">
          <h2 className="font-semibold text-lg">Sign Up</h2>
          {step === 0 && <FirstStep />}
          {step === 1 && <SecondStep />}
          {step === 2 && <ThirdStep />}
          <h2 className="font-semibold text-lg">Already have an account?</h2>
          <button
            className="bg-red-500 text-gray-100 p-2 w-[200px] rounded-md hover:bg-red-600"
            onClick={() => setLoginForm(true)}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
