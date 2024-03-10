import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        if (!username || !email || !password) {
            console.error('Please fill in all fields');
            return;
        }
        const registerData = {
            username: username,
            email: email,
            password: password,
        };
        fetch('https://localhost:7264/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Registration successful');
                    window.location.href = '/';
                } else {
                    console.error('Registration failed');
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
    };

    return (
        <div>
            <h2>Register</h2>
            <div className='login-form' >
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default Register;