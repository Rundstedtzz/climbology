import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import logoImage from '../assets/Logo.png'; // Adjust the path if necessary
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      const response = await fetch('http://localhost:8000/account/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage or context for further requests
        // const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);  // or 'username', whichever you prefer
        navigate(`/create/${data.username}`);  // Use user-specific route
      } else {
        // Display an error message if credentials are invalid
        setErrorMessage(data.error || 'Failed to sign in.');
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        {/* <img src={logoImage} alt="Emo AI" className="signin-logo" /> */}
        <h1>Sign In</h1>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        {errorMessage && <div className="signin-error">{errorMessage}</div>} {/* Error message display */}
        <button type="submit">Sign In</button>
        <div className="signin-links">
          <Link to="/forgot">Forgot Password?</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
