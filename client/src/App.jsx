import { useSelector, useDispatch } from "react-redux";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";

function App() {
  const step = useSelector((state) => state.step.value);
  return (
    <div className="bg-indigo-400 min-h-screen w-full">
      <h1>Welcome to Pokedex</h1>
      <h2>Sign Up</h2>
      {step === 0 && <FirstStep />}
      {step === 1 && <SecondStep />}
      {step === 2 && <ThirdStep />}
      <h2>Already have an account? Log in</h2>
    </div>
  );
}

export default App;
