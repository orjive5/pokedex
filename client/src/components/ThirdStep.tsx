import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import axios from 'axios';
import { setUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const ThirdStep = () => {
  const signup = useAppSelector((state) => state.signup);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  type SubmitEvent = React.SyntheticEvent<HTMLFormElement>;
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    terms
      ? axios
          .post('http://localhost:8000/auth/register', {
            name: signup.name,
            surname: signup.surname,
            username: signup.username,
            email: signup.email,
            password: signup.password
          })
          .then((authorizedUser) => {
            dispatch(setUser(authorizedUser.data));
            localStorage.setItem('token', authorizedUser.data.token);
            localStorage.setItem('currentUserName', authorizedUser.data.name);
            navigate('/pokemons');
          })
          .catch((err) => {
            console.log(err);
          })
      : setTermsMessage('You need to accept Terms of Service!');
  };
  const [terms, setTerms] = useState(false);
  const [termsMessage, setTermsMessage] = useState('');
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="self-center flex gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={terms}
            onChange={() => setTerms(!terms)}
          />
          <label htmlFor="acceptTerms">Accept Terms of Service</label>
        </div>
        <p className="font-bold text-red-600 text-center">{termsMessage}</p>
        <button className="bg-red-500 text-gray-100 p-2 rounded-md hover:bg-red-600">Finish</button>
      </form>
    </div>
  );
};

export default ThirdStep;
