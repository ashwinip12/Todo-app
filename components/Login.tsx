import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {
           alert('Login successful!');
            navigate('/todos');
        } else {
            alert('Please enter both username and password');
        }
    };
    
     const handleState=(e: any)=>
     {
      setUsername(e.target.value)
     }

     const handState=(e:any)=>
     {
     setPassword(e.target.value)
     }
    return (
        <div className="container">
            <div className="form login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleState}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handState}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
               
               
            </div>
        </div>
    );
};

export default Login;
