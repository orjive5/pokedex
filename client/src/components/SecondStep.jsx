import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPassword } from '../redux/slices/signupSlice';
import { nextStep } from '../redux/slices/stepSlice';

const SecondStep = () => {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    confirmPassword === signup.password
      ? dispatch(nextStep())
      : setPasswordMatch(`Password didn't match!`);
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <input
          required
          type="password"
          placeholder="Enter your password"
          value={signup.password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          className="p-2"
        />
        <input
          required
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2"
        />
        <p className="font-bold text-red-600 text-center">{passwordMatch}</p>
        <button className="bg-red-500 text-gray-100 p-2 rounded-md hover:bg-red-600">Next</button>
      </form>
    </div>
  );
};

export default SecondStep;
