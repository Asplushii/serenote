import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const BottomNavBar = () => {
  return (
    <div className="bottom-navbar">
      <Link to="/foryou" className="nav-item">
        <div className="icon">Icon1</div>
        <div className="text">For You</div>
      </Link>
      <Link to="/journal" className="nav-item">
        <div className="icon">|</div>
        <div className="text">Journal</div>
      </Link>
      <Link to="/moodboards" className="nav-item">
        <div className="icon">Icon3</div>
        <div className="text">Moodboards</div>
      </Link>
    </div>
  );
};

export default BottomNavBar;
