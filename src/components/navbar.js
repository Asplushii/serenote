import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Icon1 from './waves.png'
import Icon3 from './icon3.png'
import '../index.css'


const BottomNavBar = () => {
  return (
    <div className="bottom-navbar">
      <Link to="/foryou" className="nav-item">
      <div className="icon">
          <img src={Icon1} alt="For You Icon" className="icon32x32" /> {}
          </div>        <div className="text">For You</div>
      </Link>
      <Link to="/journal" className="nav-item">
        <div className="icon">|</div>
        <div className="text">Journal</div>
      </Link>
      <Link to="/moodboards" className="nav-item">
        <div className="icon">
          <img src={Icon3} alt="Moodboards Icon" className="icon32x32" /> {}
        </div>
        <div className="text">Moodboards</div>
      </Link>
    </div>
  );
};

export default BottomNavBar;
