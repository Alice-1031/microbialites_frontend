import React, { useState } from 'react';
import { handleLogin } from '../services/api';

const LoginModal = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const result = await handleLogin(username, password);
        if (result.token) {
            localStorage.setItem('token', result.token);
            onLoginSuccess();
        } else {
            alert('Login failed: ' + result.error); // Display error message
        }
    };

    return (
        <div className="login-modal">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={login}>Enter</button>
        </div>
    );
};

export default LoginModal;