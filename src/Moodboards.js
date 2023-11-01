import React, { useEffect } from 'react';
import NavBar from './components/navbar';
function Moodboards() {
  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, []);

  return (
    <div id="home">
      <NavBar />
    </div>
  );
}

export default Moodboards;
