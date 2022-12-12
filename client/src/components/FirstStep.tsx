import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setName, setSurname, setEmail, setUsername } from '../redux/slices/signupSlice';
import { nextStep } from '../redux/slices/stepSlice';

const FirstStep = () => {
  const signup = useAppSelector((state) => state.signup);
  const dispatch = useAppDispatch();

  type SubmitEvent = React.SyntheticEvent<HTMLFormElement>;

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    dispatch(nextStep());
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <input
          required
          type="text"
          placeholder="Enter your name"
          value={signup.name}
          onChange={(e) => dispatch(setName(e.target.value))}
          className="p-2"
        />
        <input
          required
          type="text"
          placeholder="Enter your surname"
          value={signup.surname}
          onChange={(e) => dispatch(setSurname(e.target.value))}
          className="p-2"
        />
        <input
          required
          type="email"
          placeholder="Enter your email"
          value={signup.email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          className="p-2"
        />
        <input
          required
          type="text"
          placeholder="Enter your username"
          value={signup.username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
          className="p-2"
        />
        <button className="bg-red-500 text-gray-100 p-2 rounded-md hover:bg-red-600">Next</button>
      </form>
    </div>
  );
};

export default FirstStep;
