import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        // Prepare the data as JSON
        if (username.trim() !== '' && password.trim() !== '') {
            const loginData = {
                username: username,
                password: password,
            };

            try {
                // Send the data to your endpoint using the fetch API
                const response = await fetch('https://localhost:7264/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (response.ok) {
                    console.log('Login successful');
                    await response.json().then((data) => {
                        history('/todolist/' + data.token);
                    });
                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <div className="login-form">
                <div>
                    <label>Username:</label>
                    <input type="text" id="username" value={username} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type='button' onClick={handleSubmit}>Log In</button>
                    <div className='register-link' onClick={() => window.location.href = '/register'}>Register</div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
