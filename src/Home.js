import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div id="content">
      <div id="welcome-text">
        <span id="text1">Welcome to Serenote.</span>
        <span id="text2">App for notes and more.</span>
        <span id="cursor">|</span>
      </div>
      <div className="buttons-container">
        <Link to="/register">
          <button className="create-button">Create an Account</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Log in</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
