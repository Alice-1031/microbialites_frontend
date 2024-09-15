import React, { useState } from 'react';
import { handleLogin } from '../services/api';
import '../assets/css/loginModal.css';
import image1 from '../assets/images/headerbar 1.png';

const LoginModal = ({ onLoginSuccess, onLoginCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const result = await handleLogin(username, password);
    if (result.token) {
      localStorage.setItem('token', result.token);
      onLoginSuccess();
    } else {
      alert('Login failed: ' + result.error); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={image1} alt="" className="header-icon" />
        <b className="text-lg font-bold mb-2">Login</b>
        <form>
          <div className="mb-4 flex"> {/* Added flex and items-center */}
            <label 
              className="block text-gray-700 text-sm font-bold mb-2 mr-2" // Added mr-2 for spacing
              htmlFor="username">
              Username
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight   
 focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
            />
          </div>
          <div className="mb-4   
 flex items-center"> 
            <label 
              className="block text-gray-700 text-sm font-bold mb-2 mr-2" 
              htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight   
 focus:outline-none focus:shadow-outline"
              id="password"   

              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
          </div>
          <div className="button-container">

            <button className="submit-button" type="submit"   
 onClick={login}>
              Login
            </button>
            <button className="cancel-button" type="button" onClick={onLoginCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;