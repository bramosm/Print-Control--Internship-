import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import '../components/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated()) {
        navigate('/'); // Redirect to home if already authenticated
      }
    }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admins/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        localStorage.setItem('token', json.token); // Store the JWT
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;