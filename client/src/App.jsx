import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextStep, previousStep, goToStep } from "./redux/slices/stepSlice";

function App() {
  const step = useSelector((state) => state.step.value);
  const dispatch = useDispatch();
  return (
    <div className="bg-indigo-400">
      <h1>Welcome to Pokedex</h1>
      <div>
        <h1>Sign Up</h1>
        <h1>Already have an account? Log in</h1>
      </div>
      <div>
        <h1>STEP: {step}</h1>
        <button onClick={() => step > 0 && dispatch(previousStep())}>
          Previous step
        </button>
        <button onClick={() => step < 2 && dispatch(nextStep())}>
          Next step
        </button>
        <button onClick={() => dispatch(goToStep(0))}>First step</button>
        <button onClick={() => dispatch(goToStep(2))}>Last step</button>
      </div>
    </div>
  );
}

export default App;
