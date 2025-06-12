import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import logo from './assets/logo.svg';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f0f0f0';
    document.body.style.color = darkMode ? '#ffffff' : '#000000';
  }, [darkMode]);

  const handleSignIn = async () => {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      console.log('Login successful:', data);

      // Redirect to calculator page
      navigate('/calculator');
    } catch (error) {
      alert('Login failed. Try username: kminchelle, password: 0lelplR');
    }
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Top-right toggle */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: darkMode ? '#ffffff' : '#333333',
            color: darkMode ? '#000000' : '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Login form */}
      <div
        style={{
          padding: '40px',
          borderRadius: '10px',
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          minWidth: '300px',
          textAlign: 'center',
        }}
      >
        {/* Logo as Sign In Button */}
        <img
          src={logo}
          alt="Sign In"
          onClick={handleSignIn}
          style={{
            width: '100px',
            marginBottom: '24px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '0px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        />
      </div>
    </div>
  );
}

export default App;
