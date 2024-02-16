import React, { useEffect } from 'react';
import NavBar from './components/navbar';
import Logout from './components/logout';
function Moodboards() {
  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, []);

  return (
    <div id="home">
      <Logout />
      <NavBar />
    </div>
  );
}

export default Moodboards;
