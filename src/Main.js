import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import './index.css';
import { useAuth0 } from '@auth0/auth0-react';
import Login from "./components/login";
import Register from "./components/register";


function Main() {
 const [text, setText] = useState('');

 useEffect(() => {
    window.history.pushState({}, "", "/");
    const words = ['Welcome to Serenote.\n', 'A space for notes and more.'];
    let index = 0;

    const type = () => {
      if (index < words[0].length) {
        setText(words[0].slice(0, index + 1));
        index++;
        setTimeout(type, 80);
      } else if (index < words[0].length + words[1].length + 1) {
        setText(words[0] + words[1].slice(0, index - words[0].length));
        index++;
        setTimeout(type, 80);
      }
    };

    type();
 }, []);

 const { isAuthenticated } = useAuth0();

 return (
  <div id="content">
    <div id="welcome-text">
      <span>{text}</span>
      <span id="cursor">|</span>
    </div>
    <div className="buttons-container">
      {!isAuthenticated ? (
        <><Register /><Login /></>
      ) : (
        <Link to="/home"> {}
        </Link>
      )}
    </div>
  </div>
);
}

export default Main;